"use client"

import * as S from "./style"
import Image from "next/image";
import {useMutation, useQuery} from "@apollo/client";
import {AlertMutations, AlertQueries} from "@/services/alert";
import {AlertType, RedirectType} from "@/types/alert";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useLoadingEffect} from "@/hooks/useLoading";
import React, {useEffect, useState, useRef, useCallback} from "react";

export const AlertBox = ({alert} : { alert : AlertType}) =>{
	const navigate = useNavigationWithProgress()
	const [mutate] = useMutation(AlertMutations.READ_ALERT, {
		variables:{
			notificationId : alert.notificationId,
		}
	})
	const checkAlert = async () =>{
		await mutate()
	}
	useEffect(() => {
		if (alert.checked) return;
		
		const timer = setTimeout(() => {
			checkAlert();
		}, 1000);
		
		return () => clearTimeout(timer);
	}, []);
	const handleMove = async () =>{
		await mutate();
		switch (alert.redirectType) {
			case RedirectType.POST_DETAIL:
				navigate(`/post/${alert.redirectId}`);
				break;
			case RedirectType.MESSAGE:
				navigate(`/message/${alert.redirectId}`);
				break;
			case RedirectType.GROUP:
				navigate(`/meetings/${alert.redirectId}`);
				break;
			case RedirectType.USER:
				navigate(`/profile/${alert.redirectId}`);
				break;
			case RedirectType.BOARDING_MANAGE:
				navigate(`/boarding/third-party`);
				break;
			case RedirectType.GROUP_MANAGE:
				navigate(`/meeting/third-party/detail/${alert.redirectId}`);
				break;
			default:
				navigate("/");
				break;
		}
	}

	const rawCreated = alert.createAt
	const formattedDate = React.useMemo(() => {
		if (!rawCreated) return null;
		const d = new Date(rawCreated);
		if (Number.isNaN(d.getTime())) return String(rawCreated).split("T")[0];
		return d.toLocaleDateString().replace(/\//g, ".");
	}, [rawCreated]);
 	return(
 		<S.Alert
 			isRead = {alert.checked}
 			onClick={handleMove}
 		>
 			<S.Profile>
 				<Image src={"/post/default.png"} alt="profile" fill/>
 			</S.Profile>
 			<S.Info>
 				<S.Title>{alert.content}</S.Title>
				{formattedDate && <S.CreatedDate aria-hidden>{formattedDate}</S.CreatedDate>}
 			</S.Info>
 		</S.Alert>
 	)
 }

export default function AlertScroll() {
	const size = 10; // 한 번에 불러올 갯수, 필요시 조정
	const [alerts, setAlerts] = useState<AlertType[]>([]);
	const [isDone, setIsDone] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	const {data, loading, fetchMore} = useQuery(AlertQueries.GET_ALERT_LIST, {
		variables: {
			start: 0,
			size,
		},
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
	});

	// 초기 데이터 설정 및 끝 여부 판단
	useEffect(() => {
		if (data?.getNotificationList) {
			setAlerts(data.getNotificationList);
			if (data.getNotificationList.length < size) {
				setIsDone(true);
			} else {
				setIsDone(false);
			}
		}
	}, [data?.getNotificationList]);

	useLoadingEffect(loading);

	// 더 불러오기 함수
	const loadMore = useCallback(async () => {
		if (isFetchingMore || isDone) return;
		setIsFetchingMore(true);
		try {
			const res = await fetchMore({
				variables: {
					start: alerts.length,
					size,
				},
			});
			const more: AlertType[] = res?.data?.getNotificationList ?? [];
			if (!more || more.length === 0) {
				setIsDone(true);
				return;
			}
			setAlerts((prev) => [...prev, ...more]);
			if (more.length < size) {
				setIsDone(true);
			}
		} catch (e) {
			console.error(e)
		} finally {
			setIsFetchingMore(false);
		}
	}, [alerts.length, fetchMore, isDone, isFetchingMore]);

	// 마지막 요소 관찰자 설정 (무한 스크롤)
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
		if (loading || isFetchingMore) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{ root: null, rootMargin: "200px 0px", threshold: 0.1 }
		);
		if (node) observer.current.observe(node);
	}, [loading, isFetchingMore, loadMore]);

	return (
		<S.AlertScrollContainer>
			{!loading && alerts.length === 0 ? (
				<>알림이 존재하지 않습니다.</>
			) : (
				alerts.map((alert: AlertType, idx: number) => {
					// 마지막 요소에 ref 연결
					if (idx === alerts.length - 1) {
						return (
							<div key={alert.notificationId} ref={lastPostElementRef}>
								<AlertBox alert={alert}/>
							</div>
						);
					}
					return <AlertBox key={alert.notificationId} alert={alert}/>;
				})
			)}
			{/* 추가 로딩 표시(선택) */}
			{isFetchingMore && <p>로딩 중...</p>}
		</S.AlertScrollContainer>
	)
}