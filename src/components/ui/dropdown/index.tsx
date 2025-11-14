'use client';

import * as S from './style';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Square from '../button/square';
import { useAlertStore } from '@/store/alert';

interface DropdownProps {
    text: string;
    list: string[];
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect?: (item: string, radius: string) => void;
    showRadius?: boolean;
}

export default function Dropdown({ text, list, isOpen, onOpen, onClose, onSelect, showRadius }: DropdownProps) {
    const { error } = useAlertStore();
    const [selected, setSelected] = useState<string>(text);
    const [tempSelected, setTempSelected] = useState<string>(text);
    const [radius, setRadius] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isOpen) {
            onClose();
        } else {
            if (selected !== text && showRadius) {
                const match = selected.match(/^(.+?)\s*\((\d+)m\)$/);
                if (match) {
                    setTempSelected(match[1]);
                    setRadius(match[2]);
                } else {
                    setTempSelected(selected);
                    setRadius('');
                }
            } else {
                setTempSelected(selected);
                setRadius('');
            }
            onOpen();
        }
    };

    const handleSelect = (item: string) => {
        setTempSelected(item);
    };

    const handleComplete = () => {
        if (showRadius) {
            if (radius.trim() && tempSelected === text) {
                error(`${text}를 선택해주세요.`);
                return;
            }
            
            if (tempSelected !== text && !radius.trim()) {
                error('반경을 입력해주세요.');
                return;
            }
            
            if (radius.trim() && (isNaN(Number(radius)) || Number(radius) <= 0)) {
                error('올바른 반경 값을 입력해주세요.');
                return;
            }
        }
    
        setSelected(showRadius ? `${tempSelected} (${radius}m)` : tempSelected);
    
        if (onSelect) {
            onSelect(tempSelected, showRadius ? `${radius}m` : '');
        }
    
        onClose();
    };
    


    const handleCancel = () => {
        if (selected !== text) {
            setSelected(text);
            setTempSelected(text);
            setRadius('');
            if (onSelect) {
                onSelect(text, '');
            }
        } else {
            setTempSelected(text);
            setRadius('');
        }
        onClose();
    };

    return (
        <S.DropdownContainer ref={dropdownRef}>
            <S.Dropdown onClick={toggleDropdown} selected={selected !== text}>
                {selected}
                <Image
                    src={selected !== text ? '/icons/dropdown2.svg' : '/icons/dropdown.svg'}
                    alt="dropdown"
                    width={12}
                    height={12}
                />
            </S.Dropdown>

            {isOpen && (
                <S.Container>
                    {showRadius && (
                        <S.Input
                            type="text"
                            placeholder="반경 입력(m)"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                        />
                    )}

                    <S.List>
                        {list.map((item, idx) => (
                            <S.ListItem
                                key={idx}
                                onClick={() => handleSelect(item)}
                                selected={tempSelected === item}
                            >
                                {item}
                            </S.ListItem>
                        ))}
                    </S.List>

                    <S.Button>
                        <Square
                            text="취소"
                            status={false}
                            onClick={handleCancel}
                            width="100px"
                        />
                        <Square
                            text="완료"
                            status={true}
                            onClick={handleComplete}
                            width="100px"
                        />
                    </S.Button>
                </S.Container>
            )}

        </S.DropdownContainer >
    );
}
