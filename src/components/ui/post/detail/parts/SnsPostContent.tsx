"use client";

import React from "react";
import Image from "next/image";
import * as S from "../style";
import Square from "@/components/ui/button/square";

interface Hashtag { hashtagId: string; name: string; postId: string }

interface SnsPostContentProps {
  date: string;
  hashtags?: Hashtag[];
  isEditingPost: boolean;
  editingPostContent: string;
  editingImages: string[];
  newImages: File[];
  uploading: boolean;
  displayDesc: string;
  onChangeContent: (v: string) => void;
  onRemoveImage: (index: number) => void;
  onRemoveNewImage: (index: number) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
}

export default function SnsPostContent({
  date,
  hashtags,
  isEditingPost,
  editingPostContent,
  editingImages,
  newImages,
  uploading,
  displayDesc,
  onChangeContent,
  onRemoveImage,
  onRemoveNewImage,
  onImageUpload,
  onCancelEdit,
  onSaveEdit,
}: SnsPostContentProps) {
  return (
    <>
      <S.RightTopRow>
        <S.RightPeriodTags>
          {hashtags && hashtags.length > 0 &&
            hashtags.map((tag) => (
              <S.RightPeriodTag key={tag.hashtagId}>#{tag.name}</S.RightPeriodTag>
            ))}
        </S.RightPeriodTags>
      </S.RightTopRow>
      <S.RightSub>{date}</S.RightSub>
      {isEditingPost ? (
        <S.EditPostContainer>
          <S.EditPostTextareaWrapper>
            <S.EditPostInlineTextarea
              value={editingPostContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeContent(e.target.value)}
              placeholder="게시물 내용을 입력하세요... (#태그 사용 가능)"
              maxLength={3000}
            />
            <S.CharCounter>
              {editingPostContent.length} / 3000
            </S.CharCounter>
          </S.EditPostTextareaWrapper>

          <S.EditImageSection>
            <S.EditImageTitle>이미지</S.EditImageTitle>
            <S.EditImageGrid>
              {editingImages.map((src, index) => (
                <S.EditImageItem key={`existing-${index}`}>
                  <Image
                    src={src.startsWith("http") ? src : `https://cdn.solvit-nuri.com/file/${src}`}
                    alt={`기존 이미지 ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <S.EditImageRemoveBtn onClick={() => onRemoveImage(index)}>×</S.EditImageRemoveBtn>
                </S.EditImageItem>
              ))}
              {newImages.map((file, index) => (
                <S.EditImageItem key={`new-${index}`}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`새 이미지 ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <S.EditImageRemoveBtn onClick={() => onRemoveNewImage(index)}>×</S.EditImageRemoveBtn>
                </S.EditImageItem>
              ))}
              <S.EditImageUploadBtn>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <S.EditImageUploadIcon>+</S.EditImageUploadIcon>
                  <span>이미지 추가</span>
                </label>
              </S.EditImageUploadBtn>
            </S.EditImageGrid>
          </S.EditImageSection>

          <S.EditPostButtons>
            <Square
              text="취소"
              onClick={onCancelEdit}
              status={false}
              width="max-content"
            />
            <Square
              text={uploading ? "업로드 중..." : "저장"}
              onClick={onSaveEdit}
              status={!uploading}
              width="max-content"
            />
          </S.EditPostButtons>
        </S.EditPostContainer>
      ) : (
        <S.RightDesc>{displayDesc}</S.RightDesc>
      )}
    </>
  );
}
