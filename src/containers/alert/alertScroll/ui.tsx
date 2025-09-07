"use client"

import * as S from "./style"
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"
import {useMutation, useQuery} from "@apollo/client";
import {AlertMutations, AlertQueries} from "@/services/alert";
import {AlertType} from "@/types/alert";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useLoadingEffect} from "@/hooks/useLoading";
import {useEffect} from "react";

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
	return(
		<S.Alert
			isRead = {alert.checked}
			onClick={() => navigate(alert.link)}
		>
			<S.Profile>
				<Image src={Profile} alt="profile" fill/>
			</S.Profile>
			<S.Info>
				<S.Title>{alert.content}</S.Title>
			</S.Info>
		</S.Alert>
	)
}

export default function AlertScroll() {
	const {data, loading} = useQuery(AlertQueries.GET_ALERT_LIST, {
		variables: {
			start : 0
		}
	})
	useLoadingEffect(loading);
	return (
		<S.AlertScrollContainer>
			{!loading && data?.getNotificationList.length === 0 ?
				<>알림이 존재하지 않습니다.</> :
			  data?.getNotificationList.map((alert: AlertType) => (
					<AlertBox key={alert.notificationId} alert={alert}/>
				))
			}
		</S.AlertScrollContainer>
	)
}