import React, { useState, useRef } from "react";
import Image from "next/image";
import * as S from "./style";

const imgIcon = "/icons/todo-dropdown.svg";
const imgVector = "/icons/todo-checkbox.svg";
const imgChecked = "/icons/todo-checkbox-checked.svg";
const ClockIcon = "/icons/third-party-clock.svg";

const dropdownOptions = ["전체", "방문", "전화"];

interface Todo {
  id: number;
  house: string;
  section: string;
  title: string;
  sub: string;
  checked: boolean;
  file: File | null;
  date: string;
}

function formatDate(date: Date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const kst = new Date(date.getTime() - tzOffset + 9 * 60 * 60000);
  return kst.toISOString().slice(0, 10);
}

const todosData: Todo[] = [
  { id: 1, house: "레이쉐어하우스", section: "방문", title: "레이쉐어하우스 방문", sub: "PM 5:00", checked: false, file: null, date: "2025-07-12" },
  { id: 2, house: "더샵쉐어하우스", section: "방문", title: "더샵쉐어하우스 방문", sub: "PM 5:00", checked: false, file: null, date: "2025-07-12" },
  { id: 3, house: "레이쉐어하우스", section: "전화", title: "레이쉐어하우스 통화", sub: "PM 3:00", checked: false, file: null, date: "2025-07-13" },
  { id: 4, house: "더샵쉐어하우스", section: "전화", title: "더샵쉐어하우스 통화", sub: "PM 5:00", checked: false, file: null, date: "2025-07-13" },
];

// 하숙집명 옵션 동적 생성
const houseOptions = ["전체", ...Array.from(new Set(todosData.map(todo => todo.house)))];

interface TodosProps {
  selectedDate: Date;
}

export default function Todos({ selectedDate }: TodosProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("전체");
  const [todos, setTodos] = useState(todosData);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const handleUploadClick = (id: number) => {
    setUploadingId(id);
    fileInputRef.current?.click();
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

  // 날짜 기준으로만 먼저 필터링
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
      <S.Section>
        <S.SectionLabel>방문</S.SectionLabel>
        <S.TodoList>
          {visitTodos.length === 0 ? (
            <S.TodoItem style={{ justifyContent: 'center', color: '#bbb', fontSize: 16, boxShadow: 'none', background: 'transparent' }}>
              할 일이 없습니다.
            </S.TodoItem>
          ) : (
            visitTodos.map((todo) => (
              <S.TodoItem key={todo.id}>
                <S.CheckBox
                  src={todo.checked ? imgChecked : imgVector}
                  alt="checkbox"
                  onClick={() => handleCheck(todo.id)}
                  tabIndex={0}
                />
                <S.TodoInfo>
                  <S.TodoTitle>{todo.title}</S.TodoTitle>
                  <S.TodoSub>
                    {!todo.checked ? (
                      <>
                        <S.SubIconWrap>
                          <Image src={ClockIcon} alt="" width={16} height={16} />
                        </S.SubIconWrap>
                        {todo.sub}
                      </>
                    ) : (
                      <S.UploadWrap>
                        {todo.file ? (
                          <>
                            <S.FileName>{todo.file.name}</S.FileName>
                            <S.ReUploadButton onClick={() => handleUploadClick(todo.id)}>
                              다시 올리기
                              <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e, todo.id)}
                              />
                            </S.ReUploadButton>
                          </>
                        ) : (
                          <>
                            파일을 업로드 해주세요.
                            <S.PlusButton onClick={() => handleUploadClick(todo.id)}>+
                              <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e, todo.id)}
                              />
                            </S.PlusButton>
                          </>
                        )}
                      </S.UploadWrap>
                    )}
                  </S.TodoSub>
                </S.TodoInfo>
              </S.TodoItem>
            ))
          )}
        </S.TodoList>
      </S.Section>
      <S.Section>
        <S.SectionLabel>전화</S.SectionLabel>
        <S.TodoList>
          {callTodos.length === 0 ? (
            <S.TodoItem style={{ justifyContent: 'center', color: '#bbb', fontSize: 16, boxShadow: 'none', background: 'transparent' }}>
              할 일이 없습니다.
            </S.TodoItem>
          ) : (
            callTodos.map((todo) => (
              <S.TodoItem key={todo.id}>
                <S.CheckBox
                  src={todo.checked ? imgChecked : imgVector}
                  alt="checkbox"
                  onClick={() => handleCheck(todo.id)}
                  tabIndex={0}
                />
                <S.TodoInfo>
                  <S.TodoTitle>{todo.title}</S.TodoTitle>
                  <S.TodoSub>
                    {!todo.checked ? (
                      <>
                        <S.SubIconWrap>
                          <Image src={ClockIcon} alt="" width={16} height={16} />
                        </S.SubIconWrap>
                        {todo.sub}
                      </>
                    ) : (
                      <S.UploadWrap>
                        {todo.file ? (
                          <>
                            <S.FileName>{todo.file.name}</S.FileName>
                            <S.ReUploadButton onClick={() => handleUploadClick(todo.id)}>
                              다시 올리기
                              <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e, todo.id)}
                              />
                            </S.ReUploadButton>
                          </>
                        ) : (
                          <>
                            파일을 업로드 해주세요.
                            <S.PlusButton onClick={() => handleUploadClick(todo.id)}>+
                              <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e, todo.id)}
                              />
                            </S.PlusButton>
                          </>
                        )}
                      </S.UploadWrap>
                    )}
                  </S.TodoSub>
                </S.TodoInfo>
              </S.TodoItem>
            ))
          )}
        </S.TodoList>
      </S.Section>
    </S.Wrapper>
  );
}