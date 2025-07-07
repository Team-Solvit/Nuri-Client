'use client'

import Map from "@/components/ui/googleMap/Map"
import Popup from "@/components/ui/googleMap/Popup"

export default function Home() {
	const markers = [
		{
			id: 1,
			position: { lat: 35.16306, lng: 129.05278 },
		},
		{
			id: 2,
			position: { lat: 35.07849, lng: 129.06483 },
		},
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
		}
	]
	return (
		<Map markers={markers} label={(m) => rooms[m.id - 1].title} renderPopup={(marker: typeof markers[0]) => (
			<Popup title={rooms[marker.id - 1].title} address={rooms[marker.id - 1].address} rooms={rooms[marker.id - 1].rooms ?? []} />
		)}>
		</Map>
		<div style={{ display: "flex"}}>
			<Alert
				description={"이제 어떤게 와도 가능함."}
				success={true}/>	
			<button onClick={open}>modal</button>
			<Modal>
				<p>dddd</p>
			</Modal>
		</div>
	
	)
}