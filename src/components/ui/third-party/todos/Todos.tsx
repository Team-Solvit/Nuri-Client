import React, { useState, useEffect, useMemo } from "react";
import * as S from "./style";
import Section from "./Section";
import { Todo } from "@/types/todo";
import { useApollo } from '@/lib/apolloClient';
import { BoardingService } from '@/services/boarding';
import { useLoadingEffect } from '@/hooks/useLoading';
import { useFileUpload } from '@/hooks/useFileUpload';

const imgIcon = "/icons/todo-dropdown.svg";

function formatDate(date: Date) {
  return date.toLocaleDateString('sv-SE');
}

interface TodosProps {
  selectedDate: Date;
  houseId?: string;
}

export default function Todos({ selectedDate, houseId }: TodosProps) {
  const client = useApollo();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const { upload: uploadFiles } = useFileUpload();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const works = await BoardingService.getBoardingManageWork(client, { date: formatDate(selectedDate), houseId });
        if (cancelled) return;
        const mapped: Todo[] = works.map(w => ({
          id: Number(w.manageWorkId) || Math.random(),
          house: w.relationship?.boarderHouse?.name || '미지정',
          section: w.type === 'VISIT' ? '방문' : '전화',
          title: w.name,
          sub: w.date,
          checked: !!w.status || !!w.file,
          file: w.file ?? null,
          date: w.date,
          manageWorkId: w.manageWorkId,
        }));
        setTodos(mapped);
        if (selected !== '전체' && !mapped.some(t => t.house === selected)) setSelected('전체');
      } catch (e) {
        if (!cancelled) console.error('Failed to load manage work', e);
        setTodos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [client, selectedDate, houseId]);

  useLoadingEffect(loading);

  const houseOptions = useMemo(() => ['전체', ...Array.from(new Set(todos.map(t => t.house)))], [todos]);

  const handleDropdown = () => setDropdownOpen((v) => !v);
  const handleSelect = (option: string) => { setSelected(option); setDropdownOpen(false); };
  const handleCheck = (id: number) => {
    const target = todos.find(t => t.id === id);
    if (!target) return;
    const prevChecked = target.checked;
    const nextChecked = !prevChecked;

    setTodos(prev => prev.map(t => t.id === id ? { ...t, checked: nextChecked } : t));
    setUploadingId(id);

    (async () => {
      if (!target.manageWorkId) return;
      try {
        if (nextChecked) await BoardingService.completeWork(client, target.manageWorkId as any);
        else await BoardingService.inCompleteWork(client, target.manageWorkId as any);
      } catch (e) {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, checked: prevChecked } : t));
      } finally {
        setUploadingId(null);
      }
    })();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const target = todos.find(t => t.id === id);
      setTodos(prev => prev.map(t => t.id === id ? { ...t, file, uploading: true } : t));
      setUploadingId(id);
      (async () => {
        try {
          if (target?.manageWorkId) {
            const uploaded = await uploadFiles([file]);
            const uploadedId = uploaded?.[0];
            if (uploadedId) {
              await BoardingService.uploadWorkFile(client, { workId: target.manageWorkId, file: uploadedId });
              setTodos(prev => prev.map(t => t.id === id ? { ...t, file: uploadedId, uploading: false } : t));
            } else {
              throw new Error('업로드 ID 없음');
            }
          }
        } catch (err) {
          console.error('File upload failed', err);
          setTodos(prev => prev.map(t => t.id === id ? { ...t, file: null, uploading: false } : t));
        } finally {
          setUploadingId(null);
        }
      })();
    }
  };

  const currentDateStr = formatDate(selectedDate);
  const todosForDate = todos.filter(t => t.date === currentDateStr);
  const visitTodos = todosForDate.filter(t => t.section === '방문' && (selected === '전체' || t.house === selected));
  const callTodos = todosForDate.filter(t => t.section === '전화' && (selected === '전체' || t.house === selected));

  return (
    <S.Wrapper>
      <S.SectionBox>
        <S.SectionHeader onClick={handleDropdown} tabIndex={0}>
          <S.SectionTitle>{selected}</S.SectionTitle>
          <S.Icon src={imgIcon} alt="icon" dropdownopen={dropdownOpen ? 1 : 0} />
        </S.SectionHeader>
        {dropdownOpen && (
          <S.DropdownList>
            {houseOptions.map((opt) => (
              <S.DropdownItem key={opt} onClick={() => handleSelect(opt)} selected={selected === opt}>
                {opt}
              </S.DropdownItem>
            ))}
          </S.DropdownList>
        )}
      </S.SectionBox>
      <Section sectionName="방문" todos={visitTodos} handleCheck={handleCheck} handleFileChange={handleFileChange} />
      <Section sectionName="전화" todos={callTodos} handleCheck={handleCheck} handleFileChange={handleFileChange} />
    </S.Wrapper>
  );
}