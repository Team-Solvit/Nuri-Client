import * as S from "./style"
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"
import {useQuery} from "@apollo/client";
import {AlertQueries} from "@/services/alert";
import {AlertType} from "@/types/alert";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";
import {useLoadingEffect} from "@/hooks/useLoading";

export default function AlertScroll() {
	const {data, loading} = useQuery(AlertQueries.GET_ALERT_LIST, {
		variables: {
			start : 0
		}
	})
	const navigate = useNavigationWithProgress()
	useLoadingEffect(loading);
	return (
		<S.AlertScrollContainer>
			{!loading && data?.getNotificationList.length === 0 ?
				<>알림이 존재하지 않습니다.</> :
			  data?.getNotificationList.map((alert: AlertType) => (
					<S.Alert
						key={alert.notificationId}
						onClick={() => navigate(alert.link)}
					>
						<S.Profile>
							<Image src={Profile} alt="profile" fill/>
						</S.Profile>
						<S.Info>
							<S.Title>{alert.content}</S.Title>
						</S.Info>
					</S.Alert>
				))
			}
		</S.AlertScrollContainer>
	)
}