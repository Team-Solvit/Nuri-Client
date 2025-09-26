"use client";

import React from "react";
import Modal from "@/components/layout/modal";
import * as S from "../style";
import Square from "@/components/ui/button/square";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!visible) return null;
  return (
    <Modal>
      <div style={{ zIndex: 1200 }}>
        <S.ConfirmModalContent>
          <S.ConfirmModalTitle>{title}</S.ConfirmModalTitle>
          <S.ConfirmModalMessage>{message}</S.ConfirmModalMessage>
          <S.ConfirmModalButtons>
            <Square text={cancelText} onClick={onCancel} status={false} width="max-content" />
            <Square text={confirmText} onClick={onConfirm} status={true} width="max-content" />
          </S.ConfirmModalButtons>
        </S.ConfirmModalContent>
      </div>
    </Modal>
  );
}
