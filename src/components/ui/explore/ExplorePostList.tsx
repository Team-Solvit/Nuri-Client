'use client'

import PostItem from '@/components/ui/postItem';
import * as S from './style';
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import { useMemo } from 'react';

const allPostList = [
    {
        id: 1,
        user: '해피하숙',
        title: '해피해피하숙',
        region: '남구',
        school: '부경대학교',
        station: '못골역',
        price: 300000,
        period: 6,
        gender: 'M',
        thumbnail: '/post/post-example.png',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 2,
        user: '부경원룸',
        title: '부경대 근처 원룸',
        region: '남구',
        school: '부경대학교',
        station: '경성대·부경대역',
        price: 450000,
        period: 12,
        gender: 'F',
        thumbnail: '/post/post-example2.png',
        userProfile: '/profile/profile3.jpg',
    },
    {
        id: 3,
        user: '동명기숙사',
        title: '동명대 기숙사',
        region: '남구',
        school: '동명대학교',
        station: '대연역',
        price: 250000,
        period: 3,
        gender: 'M',
        thumbnail: '/post/post-example3.png',
        userProfile: '/profile/profile5.png',
    },
    {
        id: 4,
        user: '경성하우스',
        title: '경성대 근처 하우스',
        region: '남구',
        school: '경성대학교',
        station: '경성대·부경대역',
        price: 350000,
        period: 9,
        gender: 'F',
        thumbnail: '/post/post-example4.jpeg',
        userProfile: '/profile/profile2.jpeg',
    },
    {
        id: 5,
        user: '못골원룸',
        title: '못골역 원룸',
        region: '강서구',
        school: '부경대학교',
        station: '못골역',
        price: 500000,
        period: 6,
        gender: 'M',
        thumbnail: '/post/post-example5.jpeg',
        userProfile: '/profile/profile7.png',
    },
    {
        id: 6,
        user: '문현하숙',
        title: '문현역 근처 하숙',
        region: '남구',
        school: '경성대학교',
        station: '문현역',
        price: 280000,
        period: 12,
        gender: 'F',
        thumbnail: '/post/post-example6.png',
        userProfile: '/profile/profile4.png',
    },
    {
        id: 7,
        user: '지게골원룸',
        title: '지게골역 원룸',
        region: '남구',
        school: '동명대학교',
        station: '지게골역',
        price: 400000,
        period: 3,
        gender: 'M',
        thumbnail: '/post/post-example7.png',
        userProfile: '/profile/profile9.png',
    },
    {
        id: 8,
        user: '국금하우스',
        title: '국제금융센터 근처 하우스',
        region: '남구',
        school: '부경대학교',
        station: '국제금융센터·부산은행역',
        price: 550000,
        period: 9,
        gender: 'F',
        thumbnail: '/post/post-example8.png',
        userProfile: '/profile/profile6.png',
    },
    {
        id: 9,
        user: '부산원룸',
        title: '부산대 근처 원룸',
        region: '남구',
        school: '부경대학교',
        station: '못골역',
        price: 180000,
        period: 2,
        gender: 'M',
        thumbnail: '/post/post-example9.png',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 10,
        user: '경성기숙사',
        title: '경성대 기숙사',
        region: '남구',
        school: '경성대학교',
        station: '경성대·부경대역',
        price: 320000,
        period: 8,
        gender: 'F',
        thumbnail: '/post/post-example10.png',
        userProfile: '/profile/profile8.png',
    },
    {
        id: 11,
        user: '동명하숙',
        title: '동명대 근처 하숙',
        region: '남구',
        school: '동명대학교',
        station: '대연역',
        price: 220000,
        period: 4,
        gender: 'M',
        thumbnail: '/post/post-example.png',
        userProfile: '/profile/profile3.png',
    },
    {
        id: 12,
        user: '문현원룸',
        title: '문현역 원룸',
        region: '남구',
        school: '부경대학교',
        station: '문현역',
        price: 480000,
        period: 10,
        gender: 'F',
        thumbnail: '/post/post-example2.png',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 13,
        user: '지게골하우스',
        title: '지게골역 하우스',
        region: '남구',
        school: '경성대학교',
        station: '지게골역',
        price: 380000,
        period: 7,
        gender: 'M',
        thumbnail: '/post/post-example3.png',
        userProfile: '/profile/profile5.png',
    },
    {
        id: 14,
        user: '국금원룸',
        title: '국제금융센터 원룸',
        region: '남구',
        school: '동명대학교',
        station: '국제금융센터·부산은행역',
        price: 420000,
        period: 5,
        gender: 'F',
        thumbnail: '/post/post-example4.png',
        userProfile: '/profile/profile2.png',
    },
    {
        id: 15,
        user: '못골하숙',
        title: '못골역 근처 하숙',
        region: '강서구',
        school: '부경대학교',
        station: '못골역',
        price: 260000,
        period: 11,
        gender: 'M',
        thumbnail: '/post/post-example5.png',
        userProfile: '/profile/profile7.png',
    },
    {
        id: 16,
        user: '경부하우스',
        title: '경성대·부경대역 하우스',
        region: '남구',
        school: '경성대학교',
        station: '경성대·부경대역',
        price: 520000,
        period: 6,
        gender: 'F',
        thumbnail: '/post/post-example6.png',
        userProfile: '/profile/profile4.png',
    },
    {
        id: 17,
        user: '대연원룸',
        title: '대연역 원룸',
        region: '남구',
        school: '동명대학교',
        station: '대연역',
        price: 340000,
        period: 9,
        gender: 'M',
        thumbnail: '/post/post-example7.png',
        userProfile: '/profile/profile9.png',
    },
    {
        id: 18,
        user: '문현기숙사',
        title: '문현역 근처 기숙사',
        region: '남구',
        school: '부경대학교',
        station: '문현역',
        price: 290000,
        period: 3,
        gender: 'F',
        thumbnail: '/post/post-example8.png',
        userProfile: '/profile/profile6.png',
    },
    {
        id: 19,
        user: '지게골하숙',
        title: '지게골역 근처 하숙',
        region: '남구',
        school: '경성대학교',
        station: '지게골역',
        price: 310000,
        period: 8,
        gender: 'M',
        thumbnail: '/post/post-example9.png',
        userProfile: '/profile/profile.svg',
    },
    {
        id: 20,
        user: '국금하우스2',
        title: '국제금융센터 하우스',
        region: '남구',
        school: '동명대학교',
        station: '국제금융센터·부산은행역',
        price: 460000,
        period: 12,
        gender: 'F',
        thumbnail: '/post/post-example10.png',
        userProfile: '/profile/profile8.png',
    },
    {
        id: 21,
        user: '못골기숙사',
        title: '못골역 기숙사',
        region: '강서구',
        school: '부경대학교',
        station: '못골역',
        price: 200000,
        period: 4,
        gender: 'M',
        thumbnail: '/post/post-example.png',
        userProfile: '/profile/profile3.png',
    },
    {
        id: 22,
        user: '경성원룸',
        title: '경성대 근처 원룸',
        region: '남구',
        school: '경성대학교',
        station: '경성대·부경대역',
        price: 370000,
        period: 7,
        gender: 'F',
        thumbnail: '/post/post-example2.png',
        userProfile: '/profile/profile5.png',
    },
    {
        id: 23,
        user: '동명하숙2',
        title: '동명대 하숙',
        region: '남구',
        school: '동명대학교',
        station: '대연역',
        price: 240000,
        period: 5,
        gender: 'M',
        thumbnail: '/post/post-example3.png',
        userProfile: '/profile/profile2.png',
    },
    {
        id: 24,
        user: '문현하우스',
        title: '문현역 하우스',
        region: '남구',
        school: '부경대학교',
        station: '문현역',
        price: 510000,
        period: 10,
        gender: 'F',
        thumbnail: '/post/post-example4.png',
        userProfile: '/profile/profile7.png',
    },
    {
        id: 25,
        user: '지게골원룸',
        title: '지게골역 근처 원룸',
        region: '남구',
        school: '경성대학교',
        station: '지게골역',
        price: 330000,
        period: 6,
        gender: 'M',
        thumbnail: '/post/post-example5.png',
        userProfile: '/profile/profile4.png',
    }
];


interface FilterState {
  school: string | null;
  region: string | null;
  station: string | null;
  priceRange: { min: number; max: number } | null;
  periodRange: { min: number; max: number } | null;
}

interface ExplorePostListProps {
  filters: FilterState;
}

export default function ExplorePostList({ filters }: ExplorePostListProps) {
    const navigate = useNavigationWithProgress();
    
    const filteredPosts = useMemo(() => {
        return allPostList.filter(post => {
            // 학교 필터
            if (filters.school && post.school !== filters.school) {
                return false;
            }
            
            // 지역 필터
            if (filters.region && post.region !== filters.region) {
                return false;
            }
            
            // 역 필터
            if (filters.station && post.station !== filters.station) {
                return false;
            }
            
            // 가격 필터 (원 단위로 비교)
            if (filters.priceRange) {
                if (post.price < filters.priceRange.min || post.price > filters.priceRange.max) {
                    return false;
                }
            }
            
            // 기간 필터
            if (filters.periodRange) {
                if (post.period < filters.periodRange.min || post.period > filters.periodRange.max) {
                    return false;
                }
            }
            
            return true;
        });
    }, [filters]);
    
    return (
        <S.PostList>
            {filteredPosts.map((post) => (
                <PostItem 
                    key={post.id} 
                    {...post} 
                    price={Math.floor(post.price / 10000).toString()}
                    onClick={() => navigate(`/post/${post.id}`)}
                />
            ))}
        </S.PostList>
    );
}