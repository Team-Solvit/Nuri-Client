'use client';

import Dropdown from '@/components/ui/dropdown';
import SelectItem from '@/components/ui/selectItem';
import * as S from './style';
import Image from 'next/image';
import { useState } from 'react';

export interface FilterState {
  region: string;
  station: string;
  school: string;
  price: number;
  period: number;
}

interface ExploreFilterProps {
  onFilterChange: (
    filter: FilterState,
    priceFilterActive: boolean,
    periodFilterActive: boolean
  ) => void;
}

export default function ExploreFilter({ onFilterChange }: ExploreFilterProps) {
  const [openedDropdown, setOpenedDropdown] = useState<null | string>(null);
  const [filter, setFilter] = useState<FilterState>({
    region: '',
    station: '',
    school: '',
    price: 600000,
    period: 12,
  });

  const priceFilterActive = filter.price !== 600000;
  const periodFilterActive = filter.period !== 12;

  const schoolList = ['부경대학교', '경성대학교', '동명대학교'];
  const regionList = ['남구'];
  const stationList = [
    '못골역',
    '국제금융센터·부산은행역',
    '문현역',
    '지게골역',
    '대연역',
    '경성대·부경대역',
  ];

  const handleSelect = (key: keyof FilterState, value: any) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);

    onFilterChange(
      newFilter,
      key === 'price' ? value !== 600000 : priceFilterActive,
      key === 'period' ? value !== 12 : periodFilterActive
    );
  };

  return (
    <>
      <S.Search>
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        <S.Input type="text" placeholder="검색어를 입력하세요." />
      </S.Search>
      <S.Dropdown>
        <Dropdown
          text="지역"
          list={regionList}
          isOpen={openedDropdown === 'region'}
          onOpen={() => setOpenedDropdown('region')}
          onClose={() => setOpenedDropdown(null)}
          onSelect={(item) => handleSelect('region', item)}
        />
        <Dropdown
          text="역"
          list={stationList}
          isOpen={openedDropdown === 'station'}
          onOpen={() => setOpenedDropdown('station')}
          onClose={() => setOpenedDropdown(null)}
          onSelect={(item) => handleSelect('station', item)}
        />
        <Dropdown
          text="학교"
          list={schoolList}
          isOpen={openedDropdown === 'school'}
          onOpen={() => setOpenedDropdown('school')}
          onClose={() => setOpenedDropdown(null)}
          onSelect={(item) => handleSelect('school', item)}
        />
        <SelectItem
          text="가격"
          isOpen={openedDropdown === 'price'}
          onOpen={() => setOpenedDropdown('price')}
          onClose={() => setOpenedDropdown(null)}
          onChangeRange={(values) => handleSelect('price', values[1])}
        />
        <SelectItem
          text="기간"
          isOpen={openedDropdown === 'period'}
          onOpen={() => setOpenedDropdown('period')}
          onClose={() => setOpenedDropdown(null)}
          onChangeRange={(values) => handleSelect('period', values[1])}
        />
      </S.Dropdown>
    </>
  );
}
