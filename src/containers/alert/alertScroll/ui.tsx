"use client"

import * as S from "./style"
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { AlertMutations, AlertQueries } from "@/services/alert";
import { AlertType, RedirectType } from "@/types/alert";
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useLoadingEffect } from "@/hooks/useLoading";
import React, { useEffect, useState, useRef, useCallback } from "react";
import AlertScrollSkeleton from "@/components/ui/skeleton/AlertScrollSkeleton";
import { useAlertStore } from "@/store/alert";

export const AlertBox = ({ alert }: { alert: AlertType }) => {
	const navigate = useNavigationWithProgress();
	const { error } = useAlertStore();
	const [mutate] = useMutation(AlertMutations.READ_ALERT, {
		variables: { notificationId: alert.notificationId },
	});

	const checkAlert = useCallback(async () => {
		try {
			await mutate();
		} catch {
			error('알림 확인 처리에 실패했습니다.');
		}
	}, [mutate]);

	useEffect(() => {
		if (alert.checked) return;

		const timer = setTimeout(() => {
			checkAlert();
		}, 1000);

		return () => clearTimeout(timer);
	}, [alert.checked, checkAlert]);

	const handleMove = async () => {
		await mutate();
		switch (alert.redirectType) {
			case RedirectType.POST_DETAIL:
				navigate(`/post/${alert.redirectId}`);
				break;
			case RedirectType.MESSAGE:
				navigate(`/message`);
				break;
			case RedirectType.GROUP:
				navigate(`/meetings`);
				break;
			case RedirectType.USER:
				navigate(`${alert.redirectId}`);
				break;
			case RedirectType.BOARDING_MANAGE:
				navigate(`/boarding/third-party`);
				break;
			case RedirectType.GROUP_MANAGE:
				navigate(`/meeting/third-party`);
				break;
			default:
				navigate("/");
				break;
		}
	};

	const formattedDate = React.useMemo(() => {
		if (!alert.createAt) return null;
		const d = new Date(alert.createAt);
		if (Number.isNaN(d.getTime())) return String(alert.createAt).split("T")[0];
		return d.toLocaleDateString().replace(/\//g, ".");
	}, [alert.createAt]);

	return (
		<S.Alert isRead={alert.checked} onClick={handleMove}>
			<S.Profile>
				<Image src={"/post/default.png"} alt="profile" fill />
			</S.Profile>
			<S.Info>
				<S.Title>{alert.content}</S.Title>
				{formattedDate && <S.CreatedDate>{formattedDate}</S.CreatedDate>}
			</S.Info>
		</S.Alert>
	);
};

export default function AlertScroll() {
	const [alerts, setAlerts] = useState<AlertType[]>([]);
	const [isDone, setIsDone] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [page, setPage] = useState(0);

	const { data, loading, fetchMore } = useQuery(AlertQueries.GET_ALERT_LIST, {
		variables: { start: 0 },
		fetchPolicy: "no-cache",
		nextFetchPolicy: "no-cache",
	});

	useEffect(() => {
		if (data?.getNotificationList) {
			setAlerts(data.getNotificationList);
			setIsDone(data.getNotificationList.length === 0);
			setPage(1);
		}
	}, [data?.getNotificationList]);

	useLoadingEffect(loading || isFetchingMore);

	useEffect(() => {
		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	const loadMore = useCallback(async () => {
		if (isFetchingMore || isDone) return;
		setIsFetchingMore(true);
		try {
			const res = await fetchMore({
				variables: { start: page },
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev;
					return {
						getNotificationList: [
							...prev.getNotificationList,
							...fetchMoreResult.getNotificationList,
						],
					};
				},
			});
			const more: AlertType[] = res?.data?.getNotificationList ?? [];
			if (!more.length) {
				setIsDone(true);
				return;
			}
			setPage(prev => prev + 1);
		} catch {
		} finally {
			setIsFetchingMore(false);
		}
	}, [page, fetchMore, isDone, isFetchingMore]);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (loading || isFetchingMore) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) loadMore();
				},
				{ root: null, rootMargin: "200px 0px", threshold: 0.1 }
			);
			if (node) observer.current.observe(node);
		},
		[loading, isFetchingMore, loadMore]
	);

	// 로딩 중이면 스켈레톤 컴포넌트 렌더링
	if (loading) {
		return <AlertScrollSkeleton />;
	}

	return (
		<S.AlertScrollContainer>
			{!loading && alerts.length === 0 ? (
				<>알림이 존재하지 않습니다.</>
			) : (
				<>
					{alerts.map((alert, idx) => {
						if (idx === alerts.length - 1) {
							return (
								<div key={alert.notificationId} ref={lastPostElementRef}>
									<AlertBox alert={alert} />
								</div>
							);
						}
						return <AlertBox key={alert.notificationId} alert={alert} />;
					})}
					{isFetchingMore && <AlertScrollSkeleton />}
					{isDone && alerts.length > 0 && (
						<S.EndMessage>더 이상 알림이 없습니다.</S.EndMessage>
					)}
				</>
			)}
		</S.AlertScrollContainer>
	);
}