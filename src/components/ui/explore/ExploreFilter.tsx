'use client'

import Dropdown from '@/components/ui/dropdown';
import SelectItem from '@/components/ui/selectItem';
import * as S from './style';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FilterState {
  school: string | null;
  region: string | null;
  station: string | null;
  priceRange: { min: number; max: number } | null;
  periodRange: { min: number; max: number } | null;
}

interface ExploreFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function ExploreFilter({ onFilterChange }: ExploreFilterProps) {
  const [openedDropdown, setOpenedDropdown] = useState<null | string>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>({
    school: null,
    region: null,
    station: null,
    priceRange: null,
    periodRange: null,
  });

  const schoolList = ['부경대학교', '경성대학교', '동명대학교'];
  const regionList = ['남구', '강서구'];
  const stationList = ['못골역', '국제금융센터·부산은행역', '문현역', '지게골역', '대연역', '경성대·부경대역'];
  


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

  // 필터 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (type: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleDropdownSelect = (type: 'school' | 'region' | 'station', value: string) => {
    handleFilterChange(type, value);
    setOpenedDropdown(null);
  };

  const handleRangeChange = (type: 'priceRange' | 'periodRange', values: [number, number]) => {
    handleFilterChange(type, { min: values[0], max: values[1] });
  };

  return (
    <>
      <S.Search>
        <Image src='/icons/search.svg' alt="search" width={24} height={24} />
        <S.Input type='text' placeholder='검색어를 입력하세요.' />
      </S.Search>

      {(!isMobile || showFilters) && (
        <S.Dropdown>
          <Dropdown
            text="학교"
            list={schoolList}
            isOpen={openedDropdown === 'school'}
            onOpen={() => setOpenedDropdown('school')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={(value: string) => handleDropdownSelect('school', value)}
            selectedValue={filters.school} />
          <Dropdown
            text="지역(구)"
            list={regionList}
            isOpen={openedDropdown === 'region'}
            onOpen={() => setOpenedDropdown('region')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={(value: string) => handleDropdownSelect('region', value)}
            selectedValue={filters.region} />
          <Dropdown
            text="역"
            list={stationList}
            isOpen={openedDropdown === 'station'}
            onOpen={() => setOpenedDropdown('station')}
            onClose={() => setOpenedDropdown(null)}
            onSelect={(value: string) => handleDropdownSelect('station', value)}
            selectedValue={filters.station}
          />
          <SelectItem
            text={filters.priceRange ? `${filters.priceRange.min.toLocaleString()}원 ~ ${filters.priceRange.max.toLocaleString()}원` : "가격"}
            type="price"
            isOpen={openedDropdown === 'money'}
            onOpen={() => setOpenedDropdown('money')}
            onClose={() => setOpenedDropdown(null)}
            onChangeRange={(values) => handleRangeChange('priceRange', values)}
          />
          <SelectItem
            text={filters.periodRange ? `${filters.periodRange.min}개월 ~ ${filters.periodRange.max}개월` : "기간"}
            type="period"
            isOpen={openedDropdown === 'period'}
            onOpen={() => setOpenedDropdown('period')}
            onClose={() => setOpenedDropdown(null)}
            onChangeRange={(values) => handleRangeChange('periodRange', values)}
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