'use client'

import React, { useState, useEffect } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';
import Header from '../header';
import Arrow from "@/assets/post/arrow-right.svg";
import { useApollo } from '@/lib/apolloClient';
import { createPost } from '@/services/post';
import { ShareRange } from '@/types/post';
import { imageService } from '@/services/image';

interface CreatingModalProps {
    onClose: () => void;
}

export default function CreatingModal({ onClose }: CreatingModalProps) {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [publicTarget, setPublicTarget] = useState('공개범위');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const apolloClient = useApollo();

    const prevImage = () => {
        setCurrentIndex(prev => (prev === 0 ? previewImages.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex(prev => (prev === previewImages.length - 1 ? 0 : prev + 1));
    };

    const getShareRange = (target: string): ShareRange => {
        switch (target) {
            case '전체':
                return ShareRange.ALL;
            case '팔로워':
                return ShareRange.FRIENDS;
            case '모임':
                return ShareRange.PRIVATE;
            default:
                return ShareRange.ALL;
        }
    };

    const extractHashTags = (text: string): { hashtags: string[], cleanedContent: string } => {
        const hashtagRegex = /#([^\s#]+)/g;
        const matches = [...text.matchAll(hashtagRegex)].map(m => m[1]);
        const hashtags = Array.from(new Set(matches));

        const cleanedContent = text.replace(hashtagRegex, '').trim();

        return { hashtags, cleanedContent };
    };


    // 게시물 생성
    const handleSubmit = async () => {
        if (!content.trim() || !title.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        if (previewImages.length === 0) {
            alert('최소 한 장의 이미지를 선택해주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            const imageFiles: File[] = [];
            for (const base64Image of previewImages) {
                const response = await fetch(base64Image);
                const blob = await response.blob();
                const file = new File([blob], `image-${Date.now()}.png`, { type: 'image/png' });
                imageFiles.push(file);
            }

            const uploadResult = await imageService.upload(imageFiles);

            const imageUrls = uploadResult.data?.files || uploadResult.files || uploadResult.urls || uploadResult || [];

            const { hashtags, cleanedContent } = extractHashTags(content);

            const result = await createPost(apolloClient, {
                postInfo: {
                    title: title,
                    contents: cleanedContent,
                    shareRange: getShareRange(publicTarget),
                    isGroup: publicTarget === '모임'
                },
                files: imageUrls,
                hashTags: hashtags
            });

            if (result) {
                alert('게시물이 성공적으로 생성되었습니다!');
                onClose();
            } else {
                alert('게시물 생성에 실패했습니다.');
            }
        } catch (error) {
            alert('게시물 생성 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];

            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setPreviewImages(prev => {
                            const updated = [...prev, reader.result as string];
                            setCurrentIndex(updated.length - 1);
                            return updated;
                        });
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };


    const handleToggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleSelectTarget = (target: string) => {
        setPublicTarget(target);
        setIsDropdownOpen(false);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleOverlayClick = () => {
        onClose();
        closeDropdown();
    };

    const handleModalClick = () => {
        if (isDropdownOpen) closeDropdown();
    };

    return (
        <S.Overlay onClick={handleOverlayClick}>
            <S.Modal onClick={e => {
                e.stopPropagation();
                handleModalClick();
            }}>
                {isMobile && (
                    <S.HeaderM>
                        <S.Title>새 게시물 만들기</S.Title>
                        <button onClick={onClose} style={{ backgroundColor: 'white', border: 'none', color: 'gray', fontSize: '15px', marginLeft: 'auto' }}>취소</button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: 'white',
                                border: 'none',
                                color: '#FF4C61',
                                fontSize: '15px',
                                opacity: isSubmitting ? 0.6 : 1
                            }}
                        >
                            {isSubmitting ? '업로드 중...' : '업로드'}
                        </button>
                    </S.HeaderM>
                )}
                <S.Left>
                    <S.Image>
                        <S.InputImage>
                            {previewImages.length > 0 ? (
                                <S.ImageWrapper>
                                    <S.SlideImages currentIndex={currentIndex}>
                                        {previewImages.map((img, idx) => (
                                            <div key={idx} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                                                <Image
                                                    src={img}
                                                    alt={`선택한 이미지 ${idx + 1}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    unoptimized
                                                />
                                            </div>
                                        ))}
                                    </S.SlideImages>

                                    {previewImages.length > 1 && (
                                        <>
                                            <S.PrevBtn onClick={prevImage}>
                                                <Image src={Arrow} alt="arrow" fill style={{ objectFit: "cover" }} />
                                            </S.PrevBtn>
                                            <S.NextBtn onClick={nextImage}>
                                                <Image src={Arrow} alt="arrow" fill style={{ objectFit: "cover" }} />
                                            </S.NextBtn>
                                        </>
                                    )}

                                    <S.AddMoreImageBtn as="label" htmlFor="fileUpload">
                                        <S.AddMoreIcon>+</S.AddMoreIcon>
                                        <S.AddMoreText>사진을 더 추가하세요</S.AddMoreText>
                                    </S.AddMoreImageBtn>
                                </S.ImageWrapper>

                            ) : (
                                <>
                                    <p>사진을 선택하세요.</p>
                                    <S.FileBtn as="label" htmlFor="fileUpload">파일 열기</S.FileBtn>
                                </>
                            )}


                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />

                        </S.InputImage>
                    </S.Image>

                    <S.ProfileRow>
                        <S.ProfileImg>
                            <Image
                                src="/profile/profile.svg"
                                alt="프로필"
                                width={48}
                                height={48}
                            />
                        </S.ProfileImg>
                        <S.ProfileName>huhon123</S.ProfileName>
                    </S.ProfileRow>
                </S.Left>

                <S.Main>
                    <S.Top>
                        {!isMobile && (
                            <S.Header>
                                <S.Title>새 게시물 만들기</S.Title>
                            </S.Header>
                        )}
                        <S.Row>
                            <S.PublicSection>
                                <S.PublicWrap
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleToggleDropdown();
                                    }}
                                >
                                    <S.PublicIconWrap>
                                        <Image
                                            src="/icons/eyes.svg"
                                            alt="공개대상"
                                            width={18}
                                            height={16}
                                        />
                                        <S.PublicLabel>{publicTarget}</S.PublicLabel>
                                    </S.PublicIconWrap>

                                    {isDropdownOpen && (
                                        <S.Dropdown
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <S.DropdownItem onClick={() => handleSelectTarget('전체')}>전체공개</S.DropdownItem>
                                            <S.DropdownItem onClick={() => handleSelectTarget('팔로워')}>팔로워만</S.DropdownItem>
                                            <S.DropdownItem onClick={() => handleSelectTarget('모임')}>모임원만</S.DropdownItem>
                                        </S.Dropdown>
                                    )}
                                </S.PublicWrap>
                            </S.PublicSection>
                        </S.Row>
                    </S.Top>

                    <S.TitleInput
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength={100}
                    />

                    <S.Textarea
                        placeholder="글을 작성하세요. (#을 사용하여 해시태그를 추가할 수 있습니다.)"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        maxLength={9999}
                    />
                    <S.CharCount>{content.length}/10000</S.CharCount>

                    <S.ButtonRow>
                        <Square
                            onClick={onClose}
                            text='취소'
                            width='8vw'
                            status={false}
                        />
                        <Square
                            onClick={handleSubmit}
                            text={isSubmitting ? '업로드 중...' : '업로드'}
                            width='8vw'
                            status={true}
                        />
                    </S.ButtonRow>
                </S.Main>
            </S.Modal>
            {isMobile && <Header />}
        </S.Overlay>
    );
}