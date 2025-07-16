'use client'

import React, { useState } from 'react';
import * as S from './style';
import Image from 'next/image';
import Square from '../button/square';

interface CreatingModalProps {
    onClose: () => void;
}

export default function CreatingModal({ onClose }: CreatingModalProps) {
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [publicTarget, setPublicTarget] = useState('공개대상');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreviewImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
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
                <S.Left>
                    <S.Image>
                        <S.InputImage>
                            {previewImage ? (
                                <Image
                                    src={previewImage}
                                    alt="선택한 이미지"
                                    fill
                                    style={{ objectFit: 'cover', zIndex: 0 }}
                                    unoptimized
                                />
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
                    <S.Header>
                        <S.Title>새 게시물 만들기</S.Title>
                        <S.ToggleWrap>
                            <S.ToggleLabel>모임</S.ToggleLabel>
                            <S.ToggleButton
                                className={isPublic ? '' : 'inactive'}
                                onClick={() => setIsPublic(prev => !prev)}
                            >
                                <Image
                                    src="/icons/toggleOn.svg"
                                    alt="토글 ON"
                                    width={40}
                                    height={30}
                                    className="on"
                                    style={{ marginLeft: '8px' }}
                                />
                                <Image
                                    src="/icons/toggleOff.svg"
                                    alt="토글 OFF"
                                    width={50}
                                    height={28}
                                    className="off"
                                    style={{ marginTop: '2px' }}
                                />
                            </S.ToggleButton>
                        </S.ToggleWrap>
                    </S.Header>

                    <S.Textarea
                        placeholder="글을 작성하세요."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        maxLength={9999}
                    />
                    <S.CharCount>{content.length}/10000</S.CharCount>

                    <S.Row>
                        {/* 드롭다운 토글 영역 */}
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
        </S.Overlay>
    );
}
