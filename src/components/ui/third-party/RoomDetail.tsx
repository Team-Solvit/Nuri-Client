interface Room {
  number: string
  names: string
}

export default function RoomDetail({ room }: { room: Room | null }) {
  if (!room) return null;

  return (
    <div>
      <h2>Room Detail</h2>
      <p>Room Number: {room.number}</p>
      <p>Occupants: {room.names}</p>
    </div>
  );
}