'use client'

import Dropdown from '@/components/ui/dropdown';
import SelectItem from '@/components/ui/selectItem';
import * as S from './style';
import Image from 'next/image';
import { useState } from 'react';

export default function ExploreFilter() {
  const [openedDropdown, setOpenedDropdown] = useState<null | string>(null);
  const schoolList = ['부경대학교', '경성대학교', '동명대학교'];
  const regionList = ['강서구', '동래구', '북구', '남구'];
  const stationList = ['하단역', '부산역'];

  return (
    <>
      <S.Search>
        <Image src='/icons/search.svg' alt="search" width={24} height={24} />
        <S.Input type='text' placeholder='검색어를 입력하세요.' />
      </S.Search>
      <S.Dropdown>
        <Dropdown text="학교" list={schoolList} isOpen={openedDropdown === 'school'} onOpen={() => setOpenedDropdown('school')} onClose={() => setOpenedDropdown(null)} />
        <Dropdown text="지역(구)" list={regionList} isOpen={openedDropdown === 'region'} onOpen={() => setOpenedDropdown('region')} onClose={() => setOpenedDropdown(null)} />
        <Dropdown text="역" list={stationList} isOpen={openedDropdown === 'station'} onOpen={() => setOpenedDropdown('station')} onClose={() => setOpenedDropdown(null)} />
        <SelectItem text="가격" isOpen={openedDropdown === 'money'} onOpen={() => setOpenedDropdown('money')} onClose={() => setOpenedDropdown(null)} />
        <SelectItem text="기간" isOpen={openedDropdown === 'period'} onOpen={() => setOpenedDropdown('period')} onClose={() => setOpenedDropdown(null)} />
      </S.Dropdown>
    </>
  );
}
