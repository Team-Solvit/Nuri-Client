"use client"
import React, {useRef, useState} from 'react';
import * as S from './style';
import Circle from '@/components/ui/button/circle';
import Square from '@/components/ui/button/square';
import {DEFAULT_CONTRACT_OPTIONS, FACILITY_CATEGORIES} from "./data"
import {useRouter} from 'next/navigation';

const Addition = () => {
	const [contractOptions, setContractOptions] = useState<string[]>(DEFAULT_CONTRACT_OPTIONS);
	const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
	const [yearInput, setYearInput] = useState('');
	const [monthInput, setMonthInput] = useState('');
	const [images, setImages] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	
	const handleContractClick = (option: string) => {
		setSelectedContracts(prev =>
			prev.includes(option)
				? prev.filter(item => item !== option)
				: [...prev, option]
		);
	};
	
	const handleAddPeriod = () => {
		if (!yearInput && !monthInput) return;
		const month = Number(monthInput) % 12;
		const year = Math.floor(Number(monthInput) / 12) + Number(yearInput);
		
		let label = '';
		if (year && month) {
			label = `${year}년 ${month}개월`;
		} else if (year) {
			label = `${year}년`;
		} else if (month) {
			label = `${month}개월`;
		}
		if (label && !contractOptions.includes(label)) {
			setContractOptions(prev => [...prev, label]);
		}
		setYearInput('');
		setMonthInput('');
	};
	
	const handleAddImageClick = () => {
		fileInputRef.current?.click();
	};
	
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;
		const fileArr = Array.from(files);
		fileArr.forEach(file => {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (typeof ev.target?.result === 'string') {
					setImages(prev => [...prev, ev.target!.result as string]);
				}
			};
			reader.readAsDataURL(file);
		});
		e.target.value = '';
	};
	
	const handleRemoveImage = (idx: number) => {
		setImages(prev => prev.filter((_, i) => i !== idx));
	};
	
	const handleRoute = (path: string) => {
		router.push(path);
	}
	
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	
	const handleFacilityChange = (facility: string, checked: boolean) => {
		setSelectedFacilities((prev) =>
			checked ? [...prev, facility] : prev.filter((f) => f !== facility)
		);
	};
	return (
		<S.Container style={{position: 'relative'}}>
			<S.Title>방추가</S.Title>
			<S.Section>
				<S.Label>사진 추가</S.Label>
				<S.PhotoUploadList>
					{images.map((img, idx) => (
						<S.PhotoThumb key={idx} onClick={() => handleRemoveImage(idx)} style={{cursor: 'pointer'}}>
							<img src={img} alt={`추가된 사진${idx + 1}`}/>
						</S.PhotoThumb>
					))}
					<S.PhotoUploadBox onClick={handleAddImageClick} style={{cursor: 'pointer'}}>
						<S.PhotoAddGroup>
							<S.PhotoAddIcon>+</S.PhotoAddIcon>
							<S.PhotoAddText>추가하기</S.PhotoAddText>
						</S.PhotoAddGroup>
						<input
							type="file"
							accept="image/*"
							multiple
							hidden
							ref={fileInputRef}
							onChange={handleImageChange}
						/>
					</S.PhotoUploadBox>
				</S.PhotoUploadList>
			</S.Section>
			<S.Section>
				<S.Label>이름</S.Label>
				<S.Input placeholder="이름을 입력해주세요"/>
			</S.Section>
			<S.Section>
				<S.Label>자세한 설명</S.Label>
				<S.Textarea placeholder="설명을 입력해주세요"/>
			</S.Section>
			<S.SectionRow>
				<S.InputWithAddonRow>
					<S.Label>가격</S.Label>
					<div className="input-row">
						<span className="addon">₩</span>
						<input placeholder="가격을 입력해 주세요"/>
						<span className="addon">/ 월</span>
					</div>
				</S.InputWithAddonRow>
				<S.InputWithAddonRow>
					<S.Label>인원수</S.Label>
					<div className="input-row">
						<input placeholder="인원수를 입력해 주세요"/>
						<span className="addon">/ 인실</span>
					</div>
				</S.InputWithAddonRow>
			</S.SectionRow>
			<S.Section>
				<S.Label>계약기간</S.Label>
				<p>*원하시는 계약기간을 선택하시거나 추가로 작성하여 선택해주세요!</p>
				<S.ContractPeriodWrap>
					{contractOptions.map(option => (
						<Circle
							key={option}
							text={option}
							status={selectedContracts.includes(option) ? 3 : 2}
							onClick={() => handleContractClick(option)}
						/>
					))}
				</S.ContractPeriodWrap>
				<S.ContractPeriodRow>
					<S.ContractInputWrap>
						<input
							placeholder="년"
							value={yearInput}
							onChange={e => setYearInput(e.target.value.replace(/[^0-9]/g, ''))}
							type="text"
							inputMode={"numeric"}
							min={0}
							style={{width: '100%'}}
						/>
						<span className="addon">년</span>
					</S.ContractInputWrap>
					<S.ContractInputWrap>
						<input
							placeholder="개월"
							value={monthInput}
							onChange={e => setMonthInput(e.target.value.replace(/[^0-9]/g, ''))}
							type="text"
							inputMode={"numeric"}
							min={0}
							style={{width: '100%'}}
						/>
						<span className="addon">개월</span>
					</S.ContractInputWrap>
					<Circle text="추가" onClick={handleAddPeriod} status={1}/>
				</S.ContractPeriodRow>
			</S.Section>
			<S.Section>
				<S.Label>시설</S.Label>
				<S.FacilityWrap>
					{FACILITY_CATEGORIES.map((cat, idx) => (
						<div key={cat.label} style={{width: '100%', marginTop: idx !== 0 ? 24 : 0}}>
							<S.FacilityCategory>
								<label htmlFor={`cat-${idx}`}>{cat.label}</label>
							</S.FacilityCategory>
							<div style={{display: 'flex', flexWrap: 'wrap', gap: '16px 24px', marginTop: 8}}>
								{cat.items.map((item, i) => (
									<S.FacilityCheckbox key={item}>
										<input
											type="checkbox"
											id={`item-${idx}-${i}`}
											style={{marginRight: 6}}
											checked={selectedFacilities.includes(item)}
											onChange={(e) => handleFacilityChange(item, e.target.checked)}
										/>
										<label htmlFor={`item-${idx}-${i}`}>{item}</label>
									</S.FacilityCheckbox>
								))}
							</div>
						</div>
					))}
				</S.FacilityWrap>
			</S.Section>
			<S.FixedFooter>
				<S.CancelBtn onClick={() => handleRoute("/myHouse")} $width={"100%"}>
					<S.Name>취소</S.Name>
				</S.CancelBtn>
				<Square text="등록" onClick={() => {
				}} status={true} width="100%"/>
			</S.FixedFooter>
		</S.Container>
	);
};

export default Addition;
