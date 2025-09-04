'use client'

import Image from 'next/image';
import * as S from './style';
import PostItem from '@/components/ui/postItem';
import Square from '@/components/ui/button/square';
import {useState, useRef} from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import {useRouter} from 'next/navigation';
import NProgress from 'nprogress';

export default function ProfilePage() {
    const router = useRouter()
    const [selected, setSelected] = useState(1);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowModal, setShowFollowModal] = useState(false);

    const profile = {
        userid: 'Happy_y',
        userProfile: '/profile/profile.svg',
        introduction: '아주엄청매우항상매일너무겁나 행복하다.',
        followers: 400,
        follow: 400,
        post: 10,
    }

    const postList = [
        {
            id: 1,
            user: '해ㅠ피',
            title: '모던 원룸 하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 2,
            user: '해ㅠ피',
            title: '깔끔한 투룸',
            region: '마포구',
            price: '45',
            thumbnail: '/post/post-example10.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 3,
            user: '해ㅠ피',
            title: '아늑한 고시원',
            region: '서초구',
            price: '25',
            thumbnail: '/post/post-example3.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 4,
            user: '해ㅠ피',
            title: '넓은 원룸',
            region: '송파구',
            price: '50',
            thumbnail: '/post/post-example4.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 5,
            user: '해ㅠ피',
            title: '신축 하숙집',
            region: '강남구',
            price: '60',
            thumbnail: '/post/post-example5.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 6,
            user: '해ㅠ피',
            title: '조용한 원룸',
            region: '영등포구',
            price: '35',
            thumbnail: '/post/post-example6.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 7,
            user: '해ㅠ피',
            title: '펜트하우스 뷰',
            region: '용산구',
            price: '80',
            thumbnail: '/post/post-example7.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 8,
            user: '해ㅠ피',
            title: '복층 원룸',
            region: '성동구',
            price: '55',
            thumbnail: '/post/post-example8.png',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 9,
            user: '해ㅠ피',
            title: '미니멀 원룸',
            region: '동대문구',
            price: '28',
            thumbnail: '/post/post-example9.png',
            userProfile: '/profile/profile.svg',
        }
    ];

    const [imageUrl, setImageUrl] = useState(profile.userProfile);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = (id: number) => {
        router.push(`/post/${id}`)
    }

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const fileInput = () => {
        inputRef.current?.click();
    };

    const handleBtnClick = (path: string) => {
        NProgress.start()
        router.push(path)
    }

    return (
        <S.ProfileWrapper>
            <S.Profile>
                <S.ProfileImage onClick={fileInput}>
                    <Image
                        src={imageUrl}
                        alt="프로필"
                        fill
                        style={{ objectFit: 'cover', zIndex: 0 }}
                    />
                    <S.PlusIcon>
                        <Image src="/icons/plus.svg" alt="추가 아이콘" width={65} height={57} />
                    </S.PlusIcon>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={imageChange}
                        ref={inputRef}
                        hidden
                    />
                </S.ProfileImage>

                <S.ProfileMain>
                    <S.ButtonRow>
                        <S.Nickname>{profile.userid}</S.Nickname>
                        <S.Button>
                            <Square
                                text="프로필 편집"
                                status={true}
                                onClick={() => handleBtnClick('/setting/profile')}
                                width="120px"
                            />
                            <Square
                                text="설정"
                                status={true}
                                onClick={() => handleBtnClick('/setting')}
                                width="120px"
                            />
                        </S.Button>
                    </S.ButtonRow>
                    <S.Stats>
                        <S.Stat>
                            <S.StatValue>{profile.post}</S.StatValue>
                            <S.StatLabel>게시물</S.StatLabel>
                        </S.Stat>
                        <S.Stat style={{ cursor: 'pointer' }} onClick={() => setShowFollowerModal(true)}>
                            <S.StatValue1>{profile.followers}</S.StatValue1>
                            <S.StatLabelF>팔로워</S.StatLabelF>
                        </S.Stat>
                        <S.Stat style={{ cursor: 'pointer' }} onClick={() => setShowFollowModal(true)}>
                            <S.StatValue2>{profile.follow}</S.StatValue2>
                            <S.StatLabelF2>팔로잉</S.StatLabelF2>
                        </S.Stat>
                    </S.Stats>
                    <S.introduction>{profile.introduction}</S.introduction>
                </S.ProfileMain>
            </S.Profile>
            <S.Side isSelected={selected}>
                <S.Tab>
                    <p onClick={() => setSelected(1)}>하숙집</p>
                </S.Tab>
                <S.Tab2>
                    <p onClick={() => setSelected(2)}>게시물</p>
                </S.Tab2>
            </S.Side>
            <S.PostList>
                {selected === 1 && (
                    <S.List1>
                        {postList.map(post => (
                            <PostItem
                                key={post.id}
                                {...post}
                                onClick={handleClick}
                                hideProfile
                            />
                        ))}

                    </S.List1>
                )}
                {selected === 2 && (
                    <S.List2>
                        {postList.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </S.List2>
                )}
            </S.PostList>
            {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} />}
            {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} />}
        </S.ProfileWrapper>
    );
}