"use client"
import React, {useEffect, useRef, useState} from 'react';
import * as S from './style';
import Circle from '@/components/ui/button/circle';
import Square from '@/components/ui/button/square';
import {DEFAULT_CONTRACT_OPTIONS, FACILITY_CATEGORIES} from "./data"
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useAlertStore} from "@/store/alert";
import {useQuery} from "@apollo/client";
import {BoardingHouseQueries, BoardingHouseService} from "@/services/boardingHouse";
import {useApollo} from "@/lib/apolloClient";
import {CreateBoardingHouseType, GetBoardingRoomByRoomId} from "@/types/boardinghouse";
import {useFileUpload} from "@/hooks/useFileUpload";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useUpdateRoomNumber} from "@/store/updateRoomNumber";

export default function Addition(){
	const [contractOptions, setContractOptions] = useState<string[]>(DEFAULT_CONTRACT_OPTIONS);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
	const [yearInput, setYearInput] = useState('');
	const [monthInput, setMonthInput] = useState('');
	const [images, setImages] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { upload, loading } = useFileUpload();
	const [monthlyRent, setMonthlyRent] = useState('');
	const [headCount, setHeadCount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	useLoadingEffect(loading || isLoading)
	
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

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;
		const fileArr = Array.from(files);
		try {
			const uploaded = await upload(fileArr);
			setImages(prev => [...prev, ...uploaded]);
		} catch (err) {
			console.error("이미지 업로드 실패", err);
		} finally {
			e.target.value = '';
		}
	};
	
	const handleRemoveImage = (idx: number) => {
		setImages(prev => prev.filter((_, i) => i !== idx));
	};

	const navigate = useNavigationWithProgress();
	const handleRoute = (path: string) => {
		navigate(path);
	}

	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

	const handleFacilityChange = (facility: string, checked: boolean) => {
		setSelectedFacilities((prev) =>
			checked ? [...prev, facility] : prev.filter((f) => f !== facility)
		);
	};

	const params = useParams();
	const roomId = Array.isArray(params.roomId) ? params.roomId[0] : params.roomId;

	const { data } = useQuery(BoardingHouseQueries.GET_BOARDING_HOUSE_ROOM_INFO, {
		variables: {
			roomId: roomId
		}
	});

	console.log(data)


	const { error, success } = useAlertStore();
	
	const {roomNumber : roomId, refetch} = useUpdateRoomNumber();
	const {data} = useQuery(BoardingHouseQueries.GET_BOARDING_HOUSE_ROOM_INFO, {
		variables: {
			roomId: roomId
		},
		skip: !roomId,
		fetchPolicy: "network-only"
	});
	function convertToContractString(periods: number[]): string[] {
		return periods.map((num) => {
			const years = Math.floor(num / 12);
			const months = num % 12;
			let result = "";
			
			if (years > 0) result += `${years}년`;
			if (months > 0) result += `${months}개월`;
			
			return result || "0개월"; // 0개월 처리
		});
	}
	console.log(selectedContracts)
	useEffect(() => {
		setName("");
		setDescription("");
		setMonthlyRent("");
		setHeadCount("");
		setSelectedFacilities([]);
		setSelectedContracts([]);
		setImages([]);
		setYearInput("");
		setMonthInput("");
		setContractOptions(DEFAULT_CONTRACT_OPTIONS);
	}, []);
	useEffect(() => {
		setImages([]);
		if(data?.getBoardingRoom){
			const roomInfo: GetBoardingRoomByRoomId = data.getBoardingRoom;
			setName(roomInfo?.name);
			setDescription(roomInfo?.description);
			setMonthlyRent(roomInfo?.monthlyRent.toString());
			setContractOptions((prev) => {
				const newOptions = convertToContractString(
					roomInfo?.contractPeriod?.map(item => item.contractPeriod) ?? []
				);
				return Array.from(new Set([...prev, ...newOptions]));
			});
			setHeadCount(roomInfo?.headCount.toString());
			setSelectedFacilities(roomInfo?.boardingRoomOption?.map((item) => item.name) || []);
			setSelectedContracts(convertToContractString(roomInfo?.contractPeriod.map(item=>item.contractPeriod)));
			setImages(roomInfo?.boardingRoomFile.map((file) => file.url));
		}
	}, [data?.getBoardingRoom]);
	
	const client = useApollo();
	const checkValue = async () => {
		
		if (!images.length) return error('사진을 추가해주세요');
		if (!name) return error('방의 이름을 추가해주세요');
		if (!description) return error('방의 내용을 추가해주세요');
		if (!contractOptions.length) return error('가격을 추가해주세요');
		if (!selectedContracts.length) return error('계약 기간을 선택해주세요');
		if (!monthlyRent|| Number(monthlyRent) <= 0) return error("월세를 입력해주세요")
		if (!headCount|| Number(headCount) <= 0) return error("인원수를 입력해주세요")
		setIsLoading(true)
		const contractPeriod = selectedContracts.map((item) => {
			const yearMatch = item.match(/(\d+)년/);
			const monthMatch = item.match(/(\d+)개월/);
			
			const years = yearMatch ? parseInt(yearMatch[1], 10) : 0;
			const months = monthMatch ? parseInt(monthMatch[1], 10) : 0;
			
			return years * 12 + months;
		});
		if (contractPeriod.some(p => p <= 0)) {
			setIsLoading(false);
			return error('계약 기간은 1개월 이상으로 선택해주세요');
		}
		const roomInput : CreateBoardingHouseType = {
			boardingRoomInfo :{
				name,
				monthlyRent: Number(monthlyRent),
				headCount: Number(headCount),
				description:description
			},
			files : images,
			contractPeriod : contractPeriod,
			options:selectedFacilities
		}
		try {
			if (roomId && refetch) {
				// 방 수정
				const result = await BoardingHouseService.patchBoardingRoom(client, {
					...roomInput, roomId: roomId
				});
				success("방 수정 성공");
				refetch();
				console.log(result);
				navigate("/myHouse");
			} else {
				// 방 생성
				const result = await BoardingHouseService.createBoardingRoom(client, roomInput);
				success("방 생성 성공");
				navigate("/myHouse");
				console.log(result);
				if(refetch) refetch()
			}
		} catch (e) {
			console.error(e);
			error(roomId ? "방 수정 실패" : "방 생성 실패");
		}finally {
			setIsLoading(false)
		}
	};
	return (
		<S.Container style={{ position: 'relative' }}>
			<S.Title>{roomId ? "방수정" : "방추가"}</S.Title>
			<S.Section>
				<S.Label>사진 추가</S.Label>
				<S.PhotoUploadList>
					{images?.map((img, idx) => (
						<S.PhotoThumb key={idx} onClick={() => handleRemoveImage(idx)} style={{ cursor: 'pointer' }}>
							<img src={process.env.NEXT_PUBLIC_IMAGE_URL + img} alt={`추가된 사진${idx + 1}`} />
						</S.PhotoThumb>
					))}
					<S.PhotoUploadBox onClick={handleAddImageClick} style={{ cursor: 'pointer' }}>
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
				<S.Input
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="이름을 입력해주세요"
				/>
			</S.Section>
			<S.Section>
				<S.Label>자세한 설명</S.Label>
				<S.Textarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="설명을 입력해주세요"
				/>
			</S.Section>
			<S.SectionRow>
				<S.InputWithAddonRow>
					<S.Label>가격</S.Label>
					<div className="input-row">
						<span className="addon">₩</span>
						<input
							type={"number"}
							min={0}
							max={1000000000}
							value={monthlyRent}
							onChange={(e) => setMonthlyRent(e.target.value.replace(/[^0-9]/g, ''))} 
							placeholder="가격을 입력해 주세요" 
						/>
						<span className="addon">/ 월</span>
					</div>
				</S.InputWithAddonRow>
				<S.InputWithAddonRow>
					<S.Label>인원수</S.Label>
					<div className="input-row">
						<input 
							value={headCount}
							type={"number"}
							min={0}
							max={100}
							onChange={(e) => setHeadCount(e.target.value.replace(/[^0-9]/g, ''))} 
							placeholder="인원수를 입력해 주세요" 
						/>
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
							style={{ width: '100%' }}
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
							style={{ width: '100%' }}
						/>
						<span className="addon">개월</span>
					</S.ContractInputWrap>
					<Circle text="추가" onClick={handleAddPeriod} status={1} />
				</S.ContractPeriodRow>
			</S.Section>
			<S.Section>
				<S.Label>시설</S.Label>
				<S.FacilityWrap>
					{FACILITY_CATEGORIES.map((cat, idx) => (
						<div key={cat.label} style={{ width: '100%', marginTop: idx !== 0 ? 10 : 0 }}>
							<S.FacilityCategory>
								<label htmlFor={`cat-${idx}`}>{cat.label}</label>
							</S.FacilityCategory>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 24px', marginTop: 8 }}>
								{cat.items.map((item, i) => (
									<S.FacilityCheckbox key={item}>
										<input
											type="checkbox"
											id={`item-${idx}-${i}`}
											style={{ marginRight: 6 }}
											checked={selectedFacilities?.includes(item)}
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
					checkValue();
				}} status={true} width="100%"/>
			</S.FixedFooter>
		</S.Container>
	);
};

