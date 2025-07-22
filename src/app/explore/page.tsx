'use client'

import Dropdown from '@/components/ui/dropdown';
import * as S from './style';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostItem from '@/components/ui/postItem';
import SelectItem from '@/components/ui/selectItem';


export default function Explore() {
    const schoolList = ['부경대학교', '경성대학교', '동명대학교', '동명대학교', '동명대학교', '동명대학교', '동명대학교', '동명대학교', '동명대학교', '동명대학교',];
    const regionList = ['강서구', '동래구', '북구', '남구'];
    const stationList = ['하단역', '부산역']
    const [openedDropdown, setOpenedDropdown] = useState<null | 'school' | 'region' | 'station' | 'money' | 'period' | 'gender'>(null);
    const router = useRouter()

    const postList = [
        {
            id: 1,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            period: 6,
            gender: 'M',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 2,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            period: 6,
            gender: 'M',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 3,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            period: 6,
            gender: 'M',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 4,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            period: 6,
            gender: 'M',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 5,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            period: 6,
            gender: 'M',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 6,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            period: 6,
            gender: 'M',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        }
    ];

    const handleClick = (id: number) => {
        router.push(`/post/${id}`)
    }

    return (
        <S.Container onClick={() => setOpenedDropdown(null)}>
            <S.Search>
                <Image
                    src='/icons/search.svg'
                    alt="search"
                    width={24}
                    height={24}
                />
                <S.Input
                    type='text'
                    placeholder='검색어를 입력하세요.'
                >
                </S.Input>
            </S.Search>
            <S.Dropdown>
                <Dropdown
                    text="학교"
                    list={schoolList}
                    isOpen={openedDropdown === 'school'}
                    onOpen={() => setOpenedDropdown('school')}
                    onClose={() => setOpenedDropdown(null)}
                />
                <Dropdown
                    text="지역(구)"
                    list={regionList}
                    isOpen={openedDropdown === 'region'}
                    onOpen={() => setOpenedDropdown('region')}
                    onClose={() => setOpenedDropdown(null)}
                />
                <Dropdown
                    text="역"
                    list={stationList}
                    isOpen={openedDropdown === 'station'}
                    onOpen={() => setOpenedDropdown('station')}
                    onClose={() => setOpenedDropdown(null)}
                />
                <SelectItem
                    text="가격"
                    isOpen={openedDropdown === 'money'}
                    onOpen={() => setOpenedDropdown('money')}
                    onClose={() => setOpenedDropdown(null)}
                />
                <SelectItem
                    text="기간"
                    isOpen={openedDropdown === 'period'}
                    onOpen={() => setOpenedDropdown('period')}
                    onClose={() => setOpenedDropdown(null)}
                />
            </S.Dropdown>
            <S.PostList>
                {postList.map(post => (
                    <PostItem
                        key={post.id}
                        {...post}
                        onClick={handleClick}
                    />
                ))}
            </S.PostList>
        </S.Container>
    );
}