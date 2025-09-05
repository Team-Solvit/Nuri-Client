import React, { useState } from "react";
import * as S from "./style";
import Section from "./Section";
import { Todo } from "@/types/todo";

const imgIcon = "/icons/todo-dropdown.svg";

function formatDate(date: Date) {
  return date.toLocaleDateString('sv-SE');
}

const todosData: Todo[] = [
  { id: 1, house: "레이쉐어하우스", section: "방문", title: "레이쉐어하우스 방문", sub: "PM 5:00", checked: false, file: null, date: "2025-09-08" },
  { id: 2, house: "더샵쉐어하우스", section: "방문", title: "더샵쉐어하우스 방문", sub: "PM 5:00", checked: false, file: null, date: "2025-09-08" },
  { id: 3, house: "레이쉐어하우스", section: "전화", title: "레이쉐어하우스 통화", sub: "PM 3:00", checked: false, file: null, date: "2025-09-08" },
  { id: 4, house: "더샵쉐어하우스", section: "전화", title: "더샵쉐어하우스 통화", sub: "PM 5:00", checked: false, file: null, date: "2025-09-08" },
];

const houseOptions = ["전체", ...Array.from(new Set(todosData.map(todo => todo.house)))];

interface TodosProps {
  selectedDate: Date;
}

export default function Todos({ selectedDate }: TodosProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [todos, setTodos] = useState(todosData);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const handleDropdown = () => setDropdownOpen((v) => !v);
  const handleSelect = (option: string) => {
    setSelected(option);
    setDropdownOpen(false);
  };
  const handleCheck = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
    setUploadingId(id);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, file } : todo
        )
      );
      setUploadingId(null);
    }
  };

  const todosForDate = todos.filter(todo => todo.date === formatDate(selectedDate));

  const visitTodos = todosForDate.filter(todo => todo.section === "방문" && (selected === "전체" || todo.house === selected));
  const callTodos = todosForDate.filter(todo => todo.section === "전화" && (selected === "전체" || todo.house === selected));

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
              <S.DropdownItem
                key={opt}
                onClick={() => handleSelect(opt)}
                selected={selected === opt}
              >
                {opt}
              </S.DropdownItem>
            ))}
          </S.DropdownList>
        )}
      </S.SectionBox>
      <Section
        sectionName="방문"
        todos={visitTodos}
        handleCheck={handleCheck}
        handleFileChange={handleFileChange}
      />
      <Section
        sectionName="전화"
        todos={callTodos}
        handleCheck={handleCheck}
        handleFileChange={handleFileChange}
      />
    </S.Wrapper>
  );
}