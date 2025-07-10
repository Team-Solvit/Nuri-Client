'use client'

import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { fontSizes } from '@/styles/theme'
import Modal from '@/components/layout/modal'
import RoomDetail from '@/components/ui/third-party/RoomDetail'
import { useModalStore } from '@/store/modal'

interface Room {
  number: string
  names: string
}

interface PopupProps {
  title: string
  address: string
  rooms: Room[]
}

export default function Popup({ title, address, rooms }: PopupProps) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(address)
  }, [address])

  const { isOpen, open } = useModalStore();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleClickRoom = (room: Room) => {
    setSelectedRoom(room);
    open();
  }

  return (
    <PopupContainer>
      <Header>
        <Title>{title}</Title>
        <CopyButton onClick={handleCopy}>주소 복사</CopyButton>
      </Header>
      <Subtitle>{address}</Subtitle>

      <RoomList>
        {rooms.map((r) => (
          <RoomItem key={r.number} onClick={() => handleClickRoom(r)}>
            <RoomNumber>{r.number}</RoomNumber>
            <RoomNames>{r.names}</RoomNames>
          </RoomItem>
        ))}
      </RoomList>
      {isOpen && (
        <Modal>
          <RoomDetail room={selectedRoom} />
        </Modal>
      )}
    </PopupContainer>
  )
}

const PopupContainer = styled.div`
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  width: max-content;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
`

const Title = styled.span`
  margin: 0;
  font-size: ${fontSizes.H4};
  font-weight: 800;
`

const CopyButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 0.875rem;
  color: #666;
  &:hover {
    color: #333;
  }
`

const Subtitle = styled.p`
  margin: 0.25rem 0 0.75rem;
  font-size: ${fontSizes.Small};
  color: #8c8c8c;
`

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RoomItem = styled.div`
  background: #ff4c61;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #fff;
`

const RoomNumber = styled.div`
  font-size: 1rem;
  font-weight: 700;
`

const RoomNames = styled.div`
  font-size: 0.875rem;
  margin-top: 0.25rem;
  opacity: 0.9;
`
