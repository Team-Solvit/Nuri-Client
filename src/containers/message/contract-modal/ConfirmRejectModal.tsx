import React from 'react';
import Square from "@/components/ui/button/square";
import styled from "@emotion/styled";
import {colors, fontSizes} from "@/styles/theme";

const Black = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
  gap: 0.5rem;
`;


export const Title = styled.h3`
  font-size: ${fontSizes.H3};
  font-weight: 600;
  color: ${colors.text};

  & > span {
    color: ${colors.primary};
  }
`
export const Text = styled.p`
  font-size: ${fontSizes.Body};
  color: ${colors.text};
`
export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
  width: 100%;
`

interface ConfirmRejectModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	type: '결제' | '룸투어'
}

export const ConfirmRejectModal: React.FC<ConfirmRejectModalProps> = ({
	                                                                      isOpen,
	                                                                      onClose,
	                                                                      onConfirm,
	                                                                      type
                                                                      }) => {
	if (!isOpen) return null;
	
	return (
		<Black onClick={onClose}>
			<Content onClick={(e) => e.stopPropagation()}>
				<Title>{type} 거절</Title>
				<Text>정말 거절하시겠습니까?</Text>
				<ButtonContainer>
					<Square
						text="취소"
						onClick={onClose}
						status={false}
						width="100%"
					/>
					<Square
						text="확인"
						onClick={() => {
							onConfirm();
							onClose();
						}}
						status={true}
						width="100%"
					/>
				</ButtonContainer>
			</Content>
		</Black>
	);
};
