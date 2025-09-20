import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as S from "./style";

const imgChecked = "/icons/todo-checkbox-checked.svg";
const imgVector = "/icons/todo-checkbox.svg";
const ClockIcon = "/icons/third-party-clock.svg";

import { Todo } from "@/types/todo";

interface SectionProps {
  loading: boolean;
  sectionName: string;
  todos: Todo[];
  handleCheck: (id: number) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

export default function Section({ loading, sectionName, todos, handleCheck, handleFileChange }: SectionProps) {
  const acceptDoc = ".hwp,.hwpx,.doc,.docx,.pdf,application/x-hwp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf";

  const [initialPending, setInitialPending] = useState(true);
  useEffect(() => {
    if (!loading) setInitialPending(false);
  }, [loading]);

  const showLoading = loading || (initialPending && todos.length === 0);
  const showEmpty = !showLoading && todos.length === 0;

  return (
    <S.Section>
      <S.SectionLabel>{sectionName}</S.SectionLabel>
      <S.TodoList>
        {showLoading ? (
          <S.TodoItem style={{ justifyContent: 'center', color: '#bbb', fontSize: 16, boxShadow: 'none', background: 'transparent' }}>
            불러오는 중...
          </S.TodoItem>
        ) : showEmpty ? (
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
                          <S.FileName>{typeof todo.file === 'string' ? todo.file : todo.file.name}</S.FileName>
                          <S.ReUploadButton as="label" disabled={todo.uploading}>
                            {todo.uploading ? '업로드 중...' : '다시 올리기'}
                            <input
                              type="file"
                              accept={acceptDoc}
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileChange(e, todo.id)}
                              disabled={todo.uploading}
                            />
                          </S.ReUploadButton>
                        </>
                      ) : (
                        <>
                          {todo.uploading ? '업로드 중...' : '파일을 업로드 해주세요.'}
                          <S.PlusButton as="label" disabled={todo.uploading}>
                            +
                            <input
                              type="file"
                              accept={acceptDoc}
                              style={{ display: 'none' }}
                              onChange={(e) => handleFileChange(e, todo.id)}
                              disabled={todo.uploading}
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
