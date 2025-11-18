'use client'

import Dropdown from '@/components/ui/dropdown';
import SelectItem from '@/components/ui/selectItem';
import * as S from './style';
import { useState, useEffect } from 'react';
import { BoardingRoomSearchFilter, Location } from '@/types/explore';

interface ExploreFilterProps {
  onFilterChange: (filter: Partial<BoardingRoomSearchFilter>) => void;
}

export default function ExploreFilter({ onFilterChange }: ExploreFilterProps) {
  const [openedDropdown, setOpenedDropdown] = useState<null | string>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const schoolList = ['부경대학교', '경성대학교', '동명대학교'];
  const regionList = ['남구'];
  const stationList = ['못골역', '국제금융센터·부산은행역', '문현역', '지게골역', '대연역', '경성대·부경대역'];

  const getLocation = (name: string): Location => {
    const coordinates: { [key: string]: { lat: number; lon: number } } = {
      '부경대학교': { lat: 35.1338, lon: 129.1036 },
      '경성대학교': { lat: 35.1378, lon: 129.1019 },
      '동명대학교': { lat: 35.1378, lon: 129.0462 },
      '못골역': { lat: 35.1356, lon: 129.0908 },
      '국제금융센터·부산은행역': { lat: 35.1400, lon: 129.0948 },
      '문현역': { lat: 35.1382, lon: 129.0841 },
      '지게골역': { lat: 35.1375, lon: 129.0970 },
      '대연역': { lat: 35.1351, lon: 129.0974 },
      '경성대·부경대역': { lat: 35.1378, lon: 129.1019 },
    };

    const coord = coordinates[name] || { lat: 35.1379, lon: 129.0556 };
    return {
      lat: coord.lat,
      lon: coord.lon,
      radiusMeters: name
    };
  };

  const handleSchoolSelect = (school: string, radius: string) => {
    // 초기 텍스트("학교")인 경우 필터 제거
    if (school === '학교') {
      onFilterChange({ school: undefined });
      return;
    }
    const location = getLocation(school);
    location.radiusMeters = radius;
    onFilterChange({ school: location });
  };

  const handleStationSelect = (station: string, radius: string) => {
    if (station === '역') {
      onFilterChange({ station: undefined });
      return;
    }
    const location = getLocation(station);
    location.radiusMeters = radius;
    onFilterChange({ station: location });
  };

  const handleRegionSelect = (region: string, radius?: string) => {
    if (region === '지역(구)') {
      onFilterChange({ region: undefined });
      return;
    }
    onFilterChange({ region: radius ? `${region} (${radius}m)` : region });
  };


  const handlePriceChange = (values: [number, number] | null) => {
    if (values === null) {
      // 취소 시 가격 필터 제거
      onFilterChange({ price: undefined });
    } else {
      onFilterChange({
        price: {
          min: values[0],
          max: values[1]
        }
      });
    }
  };

  const handlePeriodChange = (values: [number, number] | null) => {
    if (values === null) {
      onFilterChange({ contractPeriod: undefined });
    } else {
      onFilterChange({
        contractPeriod: {
          min: values[0],
          max: values[1]
        }
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 430;
      setIsMobile(mobile);
      if (mobile) setShowFilters(false);
      else setShowFilters(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {(!isMobile || showFilters) && (
        <S.Dropdown>
          <Dropdown
            text="지역(구)"
            list={regionList}
            isOpen={openedDropdown === 'region'}
            onOpen={() => setOpenedDropdown('region')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={handleRegionSelect}
            showRadius={false}
          />
          <Dropdown
            text="역"
            list={stationList}
            isOpen={openedDropdown === 'station'}
            onOpen={() => setOpenedDropdown('station')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={handleStationSelect}
            showRadius={true}
          />
          <Dropdown
            text="학교"
            list={schoolList}
            isOpen={openedDropdown === 'school'}
            onOpen={() => setOpenedDropdown('school')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={handleSchoolSelect}
            showRadius={true}
          />
          <SelectItem
            text="가격"
            isOpen={openedDropdown === 'money'}
            onOpen={() => setOpenedDropdown('money')}
            onClose={() => setOpenedDropdown(null)}
            onChangeRange={handlePriceChange}
          />
          <SelectItem
            text="기간"
            isOpen={openedDropdown === 'period'}
            onOpen={() => setOpenedDropdown('period')}
            onClose={() => setOpenedDropdown(null)}
            onChangeRange={handlePeriodChange}
          />
        </S.Dropdown>
      )}
      {isMobile && (
        <S.FilterToggle onClick={() => setShowFilters(prev => !prev)}>
          {showFilters ? '필터 접기' : '필터 보기'}
        </S.FilterToggle>
      )}
    </>
  );
}