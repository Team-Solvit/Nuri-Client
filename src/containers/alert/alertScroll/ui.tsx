import * as S from "./style"
import Image from "next/image";
import Profile from "@/assets/meeting/member-profile.png"
import {useQuery} from "@apollo/client";
import {AlertQueries} from "@/services/alert";
import {AlertType} from "@/types/alert";
import {useNavigationWithProgress} from "@/hooks/useNavigationWithProgress";

export default function AlertScroll() {
	const {data} = useQuery(AlertQueries.GET_ALERT_LIST)
	const navigate = useNavigationWithProgress()
	
	return (
		<S.AlertScrollContainer>
			{data && data.getAlertList.map((alert: AlertType) => (
				<S.Alert
					key={alert.alertId}
					onClick={() => navigate(alert.alertNavigate)}
				>
					<S.Profile>
						<Image src={Profile} alt="profile" fill/>
					</S.Profile>
					<S.Info>
						<S.Title>{alert.alertContent}</S.Title>
					</S.Info>
				</S.Alert>
			))}
		</S.AlertScrollContainer>
	)
}