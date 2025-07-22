'use client'

import Image from 'next/image';
import * as S from './style';
import PostItem from '@/components/ui/postItem';
import { useRouter } from 'next/navigation'
import Square from '@/components/ui/button/square';
import { useState, useRef } from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import NProgress from "nprogress";

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
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 2,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 3,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 4,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 5,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/room.svg',
            userProfile: '/profile/profile.svg',
        },
        {
            id: 6,
            user: '해ㅠ피',
            title: '해피해피하숙',
            region: '강서구',
            price: '30',
            thumbnail: '/post/room.svg',
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
                            <S.StatLabel>게시물</S.StatLabel>
                            <S.StatValue>{profile.post}</S.StatValue>
                        </S.Stat>
                        <S.Stat style={{ cursor: 'pointer' }} onClick={() => setShowFollowerModal(true)}>
                            <S.StatLabelF>팔로워</S.StatLabelF>
                            <S.StatValue1>{profile.followers}</S.StatValue1>
                        </S.Stat>
                        <S.Stat style={{ cursor: 'pointer' }} onClick={() => setShowFollowModal(true)}>
                            <S.StatLabelF2>팔로잉</S.StatLabelF2>
                            <S.StatValue2>{profile.follow}</S.StatValue2>
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