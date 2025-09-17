'use client'

import Dropdown from '@/components/ui/dropdown';
import SelectItem from '@/components/ui/selectItem';
import * as S from './style';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BoardingRoomSearchFilter, Location, ContractPeriod, Price } from '@/types/explore';

interface ExploreFilterProps {
  onFilterChange: (filter: Partial<BoardingRoomSearchFilter>) => void;
  onSearchKeywordChange: (keyword: string) => void;
  searchKeyword: string;
}

export default function ExploreFilter({ onFilterChange, onSearchKeywordChange, searchKeyword }: ExploreFilterProps) {
  const [openedDropdown, setOpenedDropdown] = useState<null | string>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const schoolList = ['부경대학교', '경성대학교', '동명대학교'];
  const regionList = ['남구'];
  const stationList = ['못골역', '국제금융센터·부산은행역', '문현역', '지게골역', '대연역', '경성대·부경대역'];

  // 학교/역 좌표 매핑 (실제로는 API에서 가져와야 함)
  const getLocation = (name: string, type: 'school' | 'station'): Location => {
    const coordinates: { [key: string]: { lat: number; lon: number } } = {
      '부경대학교': { lat: 35.1379, lon: 129.0556 },
      '경성대학교': { lat: 35.1379, lon: 129.0556 },
      '동명대학교': { lat: 35.1379, lon: 129.0556 },
      '못골역': { lat: 35.1379, lon: 129.0556 },
      '국제금융센터·부산은행역': { lat: 35.1379, lon: 129.0556 },
      '문현역': { lat: 35.1379, lon: 129.0556 },
      '지게골역': { lat: 35.1379, lon: 129.0556 },
      '대연역': { lat: 35.1379, lon: 129.0556 },
      '경성대·부경대역': { lat: 35.1379, lon: 129.0556 },
    };

    const coord = coordinates[name] || { lat: 35.1379, lon: 129.0556 };
    return {
      lat: coord.lat,
      lon: coord.lon,
      radiusMeters: name
    };
  };

  const handleSchoolSelect = (school: string, radius: string) => {
    const location = getLocation(school, 'school');
    location.radiusMeters = radius;
    onFilterChange({ school: location });
  };

  const handleStationSelect = (station: string, radius: string) => {
    const location = getLocation(station, 'station');
    location.radiusMeters = radius;
    onFilterChange({ station: location });
  };

  const handleRegionSelect = (region: string, radius: string) => {
    onFilterChange({ region: `${region} (${radius}m)` });
  };

  const handlePriceChange = (values: [number, number]) => {
    onFilterChange({
      price: {
        min: values[0],
        max: values[1]
      }
    });
  };

  const handlePeriodChange = (values: [number, number]) => {
    onFilterChange({
      contractPeriod: {
        min: values[0],
        max: values[1]
      }
    });
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
      <S.Search>
        <Image src='/icons/search.svg' alt="search" width={24} height={24} />
        <S.Input
          type='text'
          placeholder='검색어를 입력하세요.'
          value={searchKeyword}
          onChange={(e) => onSearchKeywordChange(e.target.value)}
        />
      </S.Search>

      {(!isMobile || showFilters) && (
        <S.Dropdown>
          <Dropdown
            text="지역(구)"
            list={regionList}
            isOpen={openedDropdown === 'region'}
            onOpen={() => setOpenedDropdown('region')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={handleRegionSelect} />
          <Dropdown
            text="역"
            list={stationList}
            isOpen={openedDropdown === 'station'}
            onOpen={() => setOpenedDropdown('station')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={handleStationSelect}
          />
          <Dropdown
            text="학교"
            list={schoolList}
            isOpen={openedDropdown === 'school'}
            onOpen={() => setOpenedDropdown('school')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={handleSchoolSelect} />
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