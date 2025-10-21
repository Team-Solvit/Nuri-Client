'use client'

import React, { Fragment, useState } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  OverlayView,
} from '@react-google-maps/api'
import { colors, fontSizes } from '@/styles/theme'

const containerStyle = { width: '100%', height: '100vh' }
const MARKER_SIZE = 48
const OFFSET_X = MARKER_SIZE / 2
const OFFSET_Y = -MARKER_SIZE / 4

// 기본 위치: 동경 128.7384361, 북위 34.8799083
const DEFAULT_CENTER = { lat: 35.18, lng: 129.08 }

interface MarkerItem {
  id: number
  position: { lat: number; lng: number }
}

interface MapProps {
  markers: MarkerItem[]
  label: (m: MarkerItem) => string
  renderPopup: (m: MarkerItem) => React.ReactNode
	onMarkerSelect?: (m: MarkerItem | null) => void,
	fallbackCenter?: { lat: number; lng: number },
}

export default function Map({ markers, label, renderPopup, onMarkerSelect }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  if (!isLoaded) return <div>로딩 중…</div>
  const selected = markers.find((m) => m.id === selectedId) || null

  // 마커가 있으면 확대, 없으면 축소
  const zoomLevel = markers.length > 0 ? 15 : 10

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        (markers.find(m => m.id === selectedId)?.position) ??
        markers[0]?.position ??
        DEFAULT_CENTER
      }
      zoom={zoomLevel}
    >
      {markers.map((m) => {
        const isHovered = m.id === hoveredId
        const isSelected = m.id === selectedId
        const isActive = isHovered || isSelected
        const size = isActive ? MARKER_SIZE * 1.03 : MARKER_SIZE

        return (
          <Fragment key={m.id}>
            <Marker
              position={m.position}
              icon={{
                url: '/markers/common-marker.svg',
                scaledSize: new window.google.maps.Size(size, size),
                anchor: new window.google.maps.Point(size / 2, size),
              }}
              onClick={() =>
                setSelectedId((prev) => {
                  const next = prev === m.id ? null : m.id
	                const sel = next !== null
		                ? markers.find((mm) => mm.id === next) || null
		                : null
                  if (onMarkerSelect) {
                    requestAnimationFrame(() => {
	                    onMarkerSelect(sel)
                    })
                  }
                  return next
                })
              }
              onMouseOver={() => setHoveredId(m.id)}
              onMouseOut={() => setHoveredId(null)}
            />

            <OverlayView
              position={m.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={() => ({
                x: OFFSET_X,
                y: OFFSET_Y,
              })}
            >
              <div
                style={{
                  pointerEvents: 'none',
                  transform: isActive
                    ? 'translate(-50%, -100%) scale(1.03)'
                    : 'translate(-50%, -100%) scale(1)',
                  transition: 'transform 50ms ease-out',
                  whiteSpace: 'nowrap',
                  fontSize: fontSizes.H4,
                  fontWeight: 700,
                  color: colors.primary,
                  textShadow: isActive
                    ? '0 2px 8px rgba(0,0,0,0.15)'
                    : '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {label(m)}
              </div>
            </OverlayView>
          </Fragment>
        )
      })}

      {selected && (
        <OverlayView
          position={selected.position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(_w, h) => ({
            x: MARKER_SIZE / 2 + 8,
            y: MARKER_SIZE / 2 + -h,
          })}
        >
          {renderPopup(selected)}
        </OverlayView>
      )}
    </GoogleMap>
  )
}
