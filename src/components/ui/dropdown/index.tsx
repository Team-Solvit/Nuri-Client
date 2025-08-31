'use client';

import * as S from './style';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface DropdownProps {
    text: string;
    list: string[];
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function Dropdown({ text, list, isOpen, onOpen, onClose }: DropdownProps) {
    const [selected, setSelected] = useState<string>(text);
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
          onOpen();
        }
    };
      
    const handleSelect = (item: string) => {
        setSelected(item);
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
                    <S.Input type="text" placeholder="반경 입력(m)" />
                    <S.List>
                        {list.map((item, idx) => (
                            <S.ListItem
                                key={idx}
                                onClick={() => handleSelect(item)}
                            >
                                {item}
                            </S.ListItem>
                        ))}
                    </S.List>
                </S.Container>
            )}
        </S.DropdownContainer >
    );
}
