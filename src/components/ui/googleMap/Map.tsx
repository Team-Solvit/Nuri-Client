'use client'

import { useJsApiLoader, GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { useState } from 'react'
import Popup from './Popup'

const containerStyle = { width: '84.6%' }
const MARKER_SIZE = 48

const MARKERS = [
  {
    id: 1,
    position: { lat: 35.16306, lng: 129.05278 },
    title: '그랜마하우스',
    address: '부산 부산진구 가야대로',
    rooms: [
      { number: '301호', names: '오주현, 윤도훈' },
      { number: '302호', names: '오주현, 윤도훈' },
      { number: '303호', names: '오주현, 윤도훈' },
      { number: '304호', names: '오주현, 윤도훈' },
    ],
  },
  {
    id: 2,
    position: { lat: 35.07849, lng: 129.06483 },
    title: '박동현 집',
    address: '부산 영도구 와치로',
    rooms: [
      { number: '101호', names: '박동현' },
    ],
  },
]

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (!isLoaded) return <div>로딩 중…</div>

  const selectedMarker = MARKERS.find((m) => m.id === selectedId)

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={MARKERS[0].position} zoom={15}>
      {MARKERS.map((m) => (
        <Marker
          key={m.id}
          position={m.position}
          icon={{
            url: '/markers/common-marker.svg',
            scaledSize: new window.google.maps.Size(MARKER_SIZE, MARKER_SIZE),
          }}
          onClick={() =>
            setSelectedId((prev) => (prev === m.id ? null : m.id))
          }
        />
      ))}

      {selectedMarker && (
        <OverlayView
          position={selectedMarker.position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Popup
            title={selectedMarker.title}
            address={selectedMarker.address}
            rooms={selectedMarker.rooms}
          />
        </OverlayView>
      )}
    </GoogleMap>
  )
}