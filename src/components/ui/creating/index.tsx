'use client'

import React, { useState, useEffect } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';
import Header from '../header';
import Arrow from "@/assets/post/arrow-right.svg";

interface CreatingModalProps {
    onClose: () => void;
}

export default function CreatingModal({ onClose }: CreatingModalProps) {
    const [content, setContent] = useState('');
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [publicTarget, setPublicTarget] = useState('공개대상');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex(prev => (prev === 0 ? previewImages.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex(prev => (prev === previewImages.length - 1 ? 0 : prev + 1));
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
                        <button onClick={onClose} style={{ backgroundColor: 'white', border: 'none', color: '#FF4C61', fontSize: '15px' }}>업로드</button>
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
                    {!isMobile && (
                        <S.Header>
                            <S.Title>새 게시물 만들기</S.Title>
                        </S.Header>
                    )}
                    <S.Textarea
                        placeholder="글을 작성하세요."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        maxLength={9999}
                    />
                    <S.CharCount>{content.length}/10000</S.CharCount>

                    <S.Row>
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
                                    <S.DropdownItem onClick={() => handleSelectTarget('전체')}>전체</S.DropdownItem>
                                    <S.DropdownItem onClick={() => handleSelectTarget('팔로워')}>팔로워</S.DropdownItem>
                                    <S.DropdownItem onClick={() => handleSelectTarget('모임')}>모임</S.DropdownItem>
                                </S.Dropdown>
                            )}
                        </S.PublicWrap>
                    </S.Row>

                    <S.ButtonRow>
                        <Square
                            onClick={onClose}
                            text='취소'
                            width='8vw'
                            status={false}
                        />
                        <Square
                            onClick={onClose}
                            text='업로드'
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
