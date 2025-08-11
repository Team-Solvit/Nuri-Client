'use client';

import * as S from './style';
import Image from 'next/image';
import { useState } from 'react';
interface DropdownProps {
    text: string;
    list: string[];
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSelect: (item: string) => void;
}

export default function Dropdown({ text, list, isOpen, onOpen, onClose, onSelect }: DropdownProps) {
    const [selected, setSelected] = useState<string>(text);

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
        onSelect(item);
    };

    return (
        <S.DropdownContainer onClick={(e) => e.stopPropagation()}>
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
                    <S.Input type="text" placeholder={`${text}를 검색`} />
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
