'use client'

import Square from "@/components/ui/button/square"
import Map from "@/components/ui/googleMap/Map"
import Popup from "@/components/ui/third-party/Popup"
import { useRouter } from "next/navigation"

const markers = [
  {
    id: 1,
    position: { lat: 35.16306, lng: 129.05278 },
  },
  {
    id: 2,
    position: { lat: 35.07849, lng: 129.06483 },
  },
  {
    id: 3,
    position: { lat: 35.546829650762426, lng: 129.32603096267658 }
  },
  {
    id: 4,
    position: { lat: 35.560167702919, lng: 129.29183753246 }
  }
]
const rooms = [
  {
    id: 1,
    title: "그랜마하우스",
    address: "부산 부산진구 가야대로",
    rooms: [
      { number: "301호", names: "오주현, 윤도훈" },
      { number: "302호", names: "오주현, 윤도훈" },
      { number: "103호", names: "오주현, 윤도훈" },
    ],
  },
  {
    id: 2,
    title: "박동현 집",
    address: "부산 영도구 와치로",
    rooms: [{ number: "101호", names: "박동현" }],
  },
  {
    id: 3,
    title: "박소은 집",
    address: "울산 남구 월평로195번길 8",
    rooms: [{ number: "101호", names: "박소은" }]
  },
  {
    id: 4,
    title: "김민재 집",
    address: "울산광역시 중구 종가로 140",
    rooms: [{ number: "103호", names: "김민재" }]
  }
]

export default function BoardingThirdPartyPage() {
  const router = useRouter();
  const handleSquareClick = () => {
    router.push("/boarding/third-party/home");
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Map markers={markers} label={(m) => rooms[m.id - 1].title} renderPopup={(marker: typeof markers[0]) => (
        <Popup id={marker.id} title={rooms[marker.id - 1].title} address={rooms[marker.id - 1].address} rooms={rooms[marker.id - 1].rooms ?? []} />
      )}>
      </Map>
      <div style={{ position: "absolute", top: 16, right: 16 }}>
        <Square text="하숙관리" onClick={handleSquareClick} status={true} width="max-content" />
      </div>
    </div>
  );
}