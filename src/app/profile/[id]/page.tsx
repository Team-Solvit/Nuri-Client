'use client'

import Image from 'next/image';
import * as S from './style';
import PostItem from '@/components/ui/postItem';
import Square from '@/components/ui/button/square';
import {useState, useRef, useEffect} from 'react';
import Post from '@/components/ui/post';
import Follow from '@/components/ui/follow';
import FollowerList from '@/components/ui/follower';
import {useRouter, useParams} from 'next/navigation';
import NProgress from 'nprogress';

interface UserProfile {
    userid: string;
    userProfile: string;
    introduction: string;
    followers: number;
    follow: number;
    post: number;
    isFollowing?: boolean;
}

export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    
    const [selected, setSelected] = useState(1);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowModal, setShowFollowModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const [profile, setProfile] = useState<UserProfile>({
        userid: userId || 'Unknown_User',
        userProfile: '/profile/profile.svg',
        introduction: '',
        followers: 0,
        follow: 0,
        post: 0,
        isFollowing: false
    });


    const postList = [
        {
            id: 1,
            user: profile.userid,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.userProfile,
        },
        {
            id: 2,
            user: profile.userid,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.userProfile,
        },
        {
            id: 3,
            user: profile.userid,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.userProfile,
        },
        {
            id: 4,
            user: profile.userid,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.userProfile,
        },
        {
            id: 5,
            user: profile.userid,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.userProfile,
        },
        {
            id: 6,
            user: profile.userid,
            title: '하숙집 소개',
            region: '강서구',
            price: '30',
            thumbnail: '/post/post-example.png',
            userProfile: profile.userProfile,
        }
    ];

    const handleClick = (id: number) => {
        router.push(`/post/${id}`)
    }

    const handleBtnClick = (path: string) => {
        NProgress.start()
        router.push(path)
    }

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    }

    return (
        <S.ProfileWrapper>
            <S.Profile>
                <S.ProfileImage>
                    <Image
                        src={profile.userProfile}
                        alt="프로필"
                        fill
                        style={{ objectFit: 'cover', zIndex: 0 }}
                    />
                </S.ProfileImage>

                <S.ProfileMain>
                    <S.ButtonRow>
                        <S.Nickname>{profile.userid}</S.Nickname>
                        <S.Button>
                            <Square
                                text={isFollowing ? "언팔로우" : "팔로우"}
                                status={!isFollowing}
                                onClick={handleFollowToggle}
                                width="120px"
                            />
                            <Square
                                text="메시지"
                                status={true}
                                onClick={() => handleBtnClick(`/message/${userId}`)}
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
            {showFollowModal && <Follow onClose={() => setShowFollowModal(false)} userId={profile.userid} />}
            {showFollowerModal && <FollowerList onClose={() => setShowFollowerModal(false)} userId={profile.userid} />}
        </S.ProfileWrapper>
    );
}
