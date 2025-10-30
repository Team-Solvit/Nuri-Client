'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'

interface GoogleMapsContextType {
  isLoaded: boolean
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined)

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined')
  }
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'] // 필요한 라이브러리 추가
  })

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext)
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider')
  }
  return context
}
