import React, { RefObject } from "react";
import Image from "next/image";
import * as S from "./style";

const imgChecked = "/icons/todo-checkbox-checked.svg";
const imgVector = "/icons/todo-checkbox.svg";
const ClockIcon = "/icons/third-party-clock.svg";

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

interface SectionProps {
  sectionName: string;
  todos: Todo[];
  handleCheck: (id: number) => void;
  handleUploadClick: (id: number) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export default function Section({ sectionName, todos, handleCheck, handleUploadClick, handleFileChange, fileInputRef }: SectionProps) {
  return (
    <S.Section>
      <S.SectionLabel>{sectionName}</S.SectionLabel>
      <S.TodoList>
        {todos.length === 0 ? (
          <S.TodoItem style={{ justifyContent: 'center', color: '#bbb', fontSize: 16, boxShadow: 'none', background: 'transparent' }}>
            할 일이 없습니다.
          </S.TodoItem>
        ) : (
          todos.map((todo) => (
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
  );
}
