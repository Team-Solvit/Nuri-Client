"use client"

import React, { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled";
import { colors, radius } from "@/styles/theme";
import { mq } from "@/styles/media";

type Props = {
  onSelectAddress: (address: string, lat: number, lng: number) => void
}

export default function AddressInput({ onSelectAddress }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=ko`
    script.async = true
    script.onload = () => {
      if (!service) {
        setService(new window.google.maps.places.AutocompleteService())
      }
    }
    document.head.appendChild(script)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value || !service) {
      setPredictions([])
      return
    }

    service.getPlacePredictions(
      { input: value, componentRestrictions: { country: "kr" } },
      (preds) => setPredictions(preds || [])
    )
  }

  const handleSelect = (placeId: string, description: string) => {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    )
    placesService.getDetails({ placeId }, (place) => {
      if (!place?.geometry?.location) return
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      onSelectAddress(description, lat, lng)
      setPredictions([])
      if (inputRef.current) inputRef.current.value = description
    })
  }

  return (
    <Wrapper>
      <Input
        ref={inputRef}
        placeholder="도로명, 건물명으로 검색해주세요"
        onChange={handleChange}
      />
      {predictions.length > 0 && (
        <Dropdown>
          {predictions.map((p) => (
            <DropdownItem
              key={p.place_id}
              onClick={() => handleSelect(p.place_id, p.description)}
            >
              {p.description}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 49%;
`

const Input = styled.input`
  flex: 1;
  height: 55px;
  width: 100%;
  font-size: 16px;
  padding: 0 12px;
  border: 1px solid #b9b9b9;
  border-radius: ${radius.sm};

  &::placeholder {
    color: ${colors.gray};
    font-family: "SCoreDream", sans-serif;
    font-size: 15px;
  }

  ${mq.mobile} {
    width: 93vw;
    padding: 15px;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: ${radius.sm};
  z-index: 9999;
  max-height: 300px;
  overflow-y: auto;
`

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${colors.gray};
    color: white;
  }
`