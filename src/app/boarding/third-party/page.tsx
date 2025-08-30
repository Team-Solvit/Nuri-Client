'use client'

import Square from "@/components/ui/button/square";
import Map from "@/components/ui/googleMap/Map";
import Popup from "@/components/ui/third-party/Popup";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {useApollo} from '@/lib/apolloClient';
import {BoardingService} from '@/services/boarding';
import type {RoomContract} from '@/types/boarding';
import { geocode } from '@/utils/geocode';

interface MarkerData {
  houseId: string;
  title: string;
  address: string;
  position?: { lat: number; lng: number };
  loading: boolean;
  rooms?: RoomContract[];
}

export default function BoardingThirdPartyPage() {
  const navigate = useNavigationWithProgress();
  const client = useApollo();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const initializedRef = useRef(false);

  const handleSquareClick = () => navigate('/boarding/third-party/home');

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    let cancelled = false;
    (async () => {
      try {
        const list = await BoardingService.getManageBoardingHouseList(client);
        if (cancelled) return;
        setMarkers(list.map(h => ({
          houseId: h.houseId,
          title: h.name,
          address: h.location || '',
          loading: true,
        })));
        for (const h of list) {
          if (cancelled) break;
          if (!h.location) {
            setMarkers(prev => prev.map(m => m.houseId === h.houseId ? { ...m, loading: false } : m));
            continue;
          }
          const pos = await geocode(h.location);
          if (cancelled) break;
          setMarkers(prev => prev.map(m => m.houseId === h.houseId ? { ...m, position: pos || m.position, loading: false } : m));
        }
      } catch (e) {
        if (!cancelled) console.error('Failed to load houses', e);
      }
    })();
    return () => { cancelled = true; };
  }, [client]);

  const loadRooms = useCallback((houseId: string) => {
    setMarkers(prev => {
      const already = prev.find(m => m.houseId === houseId)?.rooms;
      if (already) return prev.map(m => m.houseId === houseId ? { ...m, loading: false } : m);
      (async () => {
        try {
          const rooms = await BoardingService.getManageBoardingRoomList(client, houseId);
          setMarkers(p => p.map(m => m.houseId === houseId ? { ...m, rooms, loading: false } : m));
        } catch (e) {
          setMarkers(p => p.map(m => m.houseId === houseId ? { ...m, loading: false } : m));
        }
      })();
      return prev.map(m => m.houseId === houseId ? { ...m, loading: true } : m);
    });
  }, [client]);

  const mapMarkers = useMemo(() => markers.filter(m => m.position).map((m, i) => ({ id: i + 1, position: m.position!, houseId: m.houseId })), [markers]);
  const isReady = mapMarkers.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isReady ? (
        <Map
          markers={mapMarkers}
          label={(marker) => {
            const data = markers.find(m => m.houseId === (marker as any).houseId);
            return data?.title || '';
          }}
          onMarkerSelect={(marker) => {
            if (!marker) return;
            const data = mapMarkers.find(mm => mm.id === marker.id);
            if (data) queueMicrotask(() => loadRooms((data as any).houseId));
          }}
          renderPopup={(marker) => {
            const data = markers.find(m => m.houseId === (marker as any).houseId);
            if (!data) return null;
            const isLoading = data.loading && !data.rooms;
            const roomList = (data.rooms || []).map(r => ({
              roomId: r.room?.roomId || '',
              number: r.room?.name || '',
              names: (r.contractInfo || []).map(ci => ci?.boarder?.user?.name).filter(Boolean).join(', ')
            }));
            return (
              <Popup
                id={marker.id}
                title={data.title}
                address={data.address}
                rooms={roomList}
                loading={isLoading}
              />
            );
          }}
        />
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>주소를 좌표로 변환 중...</div>
      )}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <Square text="하숙관리" onClick={handleSquareClick} status={true} width="max-content" />
      </div>
    </div>
  );
}