'use client';

import Image from 'next/image';
import * as S from './style';
import { useState } from 'react';
import { Range } from 'react-range';
import Square from '../button/square';

interface SelectItemProps {
    text: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onChangeRange?: (values: [number, number]) => void;
}

export default function SelectItem({ text, isOpen, onOpen, onClose, onChangeRange }: SelectItemProps) {
    const [selected, setSelected] = useState<string>(text);
    const unit = text === '가격' ? '원' : text === '기간' ? '개월' : '';

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        isOpen ? onClose() : onOpen();
    };

    const STEP = text === '가격' ? 10000 : 1;
    const MAX = text === '가격' ? 2000000 : 100;
    const MIN = text === '가격' ? 0 : 1;
    const [values, setValues] = useState<[number, number]>([MIN, MAX]);

    const formatNumber = (num: number) => {
        if (text === '가격') {
            return num.toLocaleString('ko-KR');
        }
        return num.toString();
    };

    const parseNumber = (str: string) => {
        if (text === '가격') {
            const cleaned = str.replace(/,/g, '');
            return cleaned === '' ? 0 : Number(cleaned);
        }
        return str === '' ? 0 : Number(str);
    };

    const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = parseNumber(e.target.value);
        if (num < MIN) num = MIN;
        if (num > values[1]) num = values[1];
        setValues([num, values[1]]);
    };

    const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        let num = parseNumber(e.target.value);
        if (num > MAX) num = MAX;
        if (num < values[0]) num = values[0];
        setValues([values[0], num]);
    };


    return (
        <S.Container onClick={(e) => e.stopPropagation()}>
            <S.Select onClick={toggleDropdown} selected={selected !== text}>
                {selected}
                <Image
                    src={selected !== text ? '/icons/dropdown2.svg' : '/icons/dropdown.svg'}
                    alt="dropdown"
                    width={12}
                    height={12}
                />
            </S.Select>

            {isOpen && (
                <S.Main>
                    <S.Title>{text}</S.Title>
                    <S.Input>
                        <S.Input1
                            type="text"
                            value={formatNumber(values[0])}
                            onChange={onChangeMin}
                        />
                        <span>~</span>
                        <S.Input2
                            type="text"
                            value={formatNumber(values[1])}
                            onChange={onChangeMax}
                        />
                        <span>{unit}</span>
                    </S.Input>

                    <Range
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        values={values}
                        onChange={(newValues) => setValues(newValues as [number, number])}
                        renderTrack={({ props, children }) => {
                            const { key, ...restProps } = props as any;
                            const [minVal, maxVal] = values;
                            const left = ((minVal - MIN) / (MAX - MIN)) * 100;
                            const right = ((maxVal - MIN) / (MAX - MIN)) * 100;

                            return (
                                <div
                                    key={key}
                                    {...restProps}
                                    style={{
                                        height: '6px',
                                        width: '100%',
                                        background: `linear-gradient(
                                            to right,
                                            #ccc 0%,
                                            #ccc ${left}%,
                                            #ff4d6d ${left}%,
                                            #ff4d6d ${right}%,
                                            #ccc ${right}%,
                                            #ccc 100%
                                        )`,
                                        borderRadius: '4px',
                                        position: 'relative',
                                    }}
                                >
                                    {children}
                                </div>
                            );
                        }}
                        renderThumb={({ props }) => {
                            const { key, ...restProps } = props as any;
                            return (
                                <div
                                    key={key}
                                    {...restProps}
                                    style={{
                                        ...restProps.style,
                                        height: '20px',
                                        width: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                                    }}
                                />
                            );
                        }}
                    />
                    <S.Button>
                        <Square
                            text="취소"
                            status={false}
                            onClick={onClose}
                            width='100px'
                        />
                        <Square
                            text="완료"
                            status={true}
                            onClick={() => {
                                setSelected(`${formatNumber(values[0])} ~ ${formatNumber(values[1])}${unit}`);
                                if (onChangeRange) onChangeRange(values);
                                onClose();
                            }}
                            width='100px'
                        />
                    </S.Button>
                </S.Main>
            )}
        </S.Container>
    );
}