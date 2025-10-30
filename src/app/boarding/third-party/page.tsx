'use client'

import Square from "@/components/ui/button/square";
import Map from "@/components/ui/googleMap/Map";
import Popup from "@/components/ui/third-party/Popup";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {useApollo} from '@/lib/apolloClient';
import {BoardingService} from '@/services/boarding';
import type {RoomContract} from '@/types/boarding';
import type { RoomContractInfo } from '@/types/boarding';
import {useLoadingEffect} from '@/hooks/useLoading';

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
  const [initialLoading, setInitialLoading] = useState(true);
  const initializedRef = useRef(false);

  const handleSquareClick = () => navigate('/boarding/third-party/home');

  useEffect(() => {
  if (initializedRef.current) return;

  let alive = true;
  setInitialLoading(true);

  (async () => {
    try {
      const list = await BoardingService.getManageBoardingHouseList(client);
      if (!alive) return;

      setMarkers(list.map(h => {
        const hasCoords = h.lat != null && h.lon != null;
        return {
          houseId: h.houseId,
          title: h.name,
          address: h.location || '',
          position: hasCoords ? { lat: Number(h.lat), lng: Number(h.lon) } : undefined,
          loading: false,
        };
      }));
      initializedRef.current = true;
    } catch (e) {
      if (alive) console.error('Failed to load houses', e);
    } finally {
      if (alive) setInitialLoading(false);
    }
  })();

  return () => { alive = false; };
}, [client]);

  useLoadingEffect(initialLoading);

  const loadRooms = useCallback((houseId: string) => {
    setMarkers(prev => {
      const already = prev.find(m => m.houseId === houseId)?.rooms;
      if (already) return prev.map(m => m.houseId === houseId ? { ...m, loading: false } : m);
      (async () => {
        try {
          const rooms = await BoardingService.getManageBoardingRoomList(client, houseId);
          setMarkers(p => p.map(m => m.houseId === houseId ? { ...m, rooms, loading: false } : m));
        } catch (e) {
          console.error('Failed to load rooms', e);
          setMarkers(p => p.map(m => m.houseId === houseId ? { ...m, loading: false } : m));
        }
      })();
      return prev.map(m => m.houseId === houseId ? { ...m, loading: true } : m);
    });
  }, [client]);

  const mapMarkers = useMemo(() => markers.filter(m => m.position).map((m, i) => ({ id: i + 1, position: m.position!, houseId: m.houseId })), [markers]);
  const isReady = !initialLoading && mapMarkers.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isReady && (
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
              names: (r.contractInfo as RoomContractInfo[] | undefined)?.map((ci: RoomContractInfo) => ci?.boarder?.user?.name).filter(Boolean).join(', ') || ''
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
      )}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <Square text="하숙관리" isLoading={initialLoading} onClick={handleSquareClick} status={true} width="max-content" />
      </div>
    </div>
  );
}