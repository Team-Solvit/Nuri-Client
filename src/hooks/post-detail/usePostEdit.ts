"use client";

import { useState } from "react";
import type { PostDetailUnion } from "@/types/postDetail";
import { PostDetailService } from "@/services/postDetail";
import { useAlertStore } from "@/store/alert";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useApollo } from "@/lib/apolloClient";

export function usePostEdit(postInfo: PostDetailUnion | null, refresh: (id: string) => Promise<PostDetailUnion | null>) {
  const { success, error } = useAlertStore();
  const { upload: uploadFiles, loading: uploading } = useFileUpload();
  const client = useApollo();

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostContent, setEditingPostContent] = useState("");
  const [editingImages, setEditingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleEditPost = () => {
    if (!postInfo || postInfo.__typename !== "SnsPost") return;
    setEditingPostContent(postInfo.contents);
    setEditingImages(postInfo.files.map((f) => f.url));
    setNewImages([]);
    setIsEditingPost(true);
  };

  const saveEditPost = async () => {
    if (!postInfo || postInfo.__typename !== "SnsPost" || !editingPostContent.trim()) return;
    
    const originalContent = postInfo.contents || "";
    const originalImageIds = postInfo.files.map((f) => f.url);
    const hasContentChanged = editingPostContent !== originalContent;
    const hasImagesChanged = 
      editingImages.length !== originalImageIds.length ||
      editingImages.some((img, idx) => img !== originalImageIds[idx]) ||
      newImages.length > 0;

    if (!hasContentChanged && !hasImagesChanged) {
      error("수정된 내용이 없습니다.");
      return;
    }

    try {
      let uploadedImageIds: string[] = [];
      if (newImages.length > 0) {
        uploadedImageIds = await uploadFiles(newImages);
      }
      const allImageIds = [...editingImages, ...uploadedImageIds];

      const hashTagMatches = editingPostContent.match(/#[^\s#]+/g) || [];
      const hashTags = hashTagMatches.map((tag) => tag.substring(1));
      const hashtagsForUi = hashTags.map((name, i) => ({ hashtagId: `${i}`, name, postId: postInfo.postId }));

      const postUpdateInput = {
        postId: postInfo.postId,
        postInfo: {
          title: postInfo.title || "",
          contents: editingPostContent,
          shareRange: "ALL" as const,
          isGroup: false,
        },
        files: allImageIds,
        hashTags: hashTags,
      };

      await PostDetailService.updatePost(client, postUpdateInput);

      setIsEditingPost(false);
      setEditingPostContent("");
      setEditingImages([]);
      setNewImages([]);
      success("게시물이 수정되었습니다.");

      const updated = await refresh(postInfo.postId);
      if (updated && updated.__typename === "SnsPost") {
        updated.hashtags = hashtagsForUi;
      }
    } catch {
      error("게시물 수정에 실패했습니다.");
    }
  };

  const cancelEditPost = () => {
    setIsEditingPost(false);
    setEditingPostContent("");
    setEditingImages([]);
    setNewImages([]);
  };

  const removeImage = (index: number) => {
    setEditingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const displayDesc = (() => {
    if (!postInfo) return "";
    if (postInfo.__typename === "SnsPost") {
      const raw = postInfo.contents || "";
      if (isEditingPost) return raw;
      const withoutTags = raw
        .replace(/(^|\s)#[^\s#]+/g, "$1")
        .replace(/[ ]{2,}/g, " ")
        .trim();
      return withoutTags;
    }
    return postInfo.room.description || "";
  })();

  return {
    uploading,
    isEditingPost,
    editingPostContent,
    editingImages,
    newImages,
    setEditingPostContent,
    handleEditPost,
    saveEditPost,
    cancelEditPost,
    removeImage,
    handleImageUpload,
    removeNewImage,
    displayDesc,
  } as const;
}
