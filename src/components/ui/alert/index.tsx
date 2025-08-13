'use client';
import {useEffect} from 'react';
import * as S from './style';
import Image from "next/image";
import Smile from "@/assets/icon/smile.svg"
import Lose from "@/assets/icon/lose.svg"
import X from "@/assets/icon/x.svg"
import {createPortal} from 'react-dom';
import {useAlertStore} from "@/store/alert";


export default function Alert() {
	const {isStatus, description, none, isLeavingAnimation, setIsLeavingAnimation, isVisible} = useAlertStore();
	
	useEffect(() => {
		const leavingTimer = setTimeout(() => {
			setIsLeavingAnimation(false);
		}, 4_800);
		const visibleTimer = setTimeout(() => {
			none();
		}, 5_500);
		return () => {
			clearTimeout(leavingTimer);
			clearTimeout(visibleTimer);
		};
	}, [isStatus]);
	
	const closeAlert = () => {
		setIsLeavingAnimation(false);
		setTimeout(() => {
			none();
		}, 500)
	}
	if (!isVisible && isStatus === "none") return null;
	
	return (
		createPortal(
			<S.Alert isLeaving={!isLeavingAnimation}>
				<S.Content>
					<S.Close onClick={closeAlert}>
						<Image src={X} alt="X"/>
					</S.Close>
					<S.Emotion>
						<Image src={isStatus === "success" ? Smile : Lose} alt="emotion"/>
					</S.Emotion>
					<S.TextBox success={isStatus === "success"}>
						<h3>{isStatus === "success" ? "Success" : "Error"}</h3>
						<p>
							{description.length > 60
								? description.slice(0, 60) + '...'
								: description}
						</p>
					</S.TextBox>
				</S.Content>
				<S.GageBox>
					<S.Gauge success={isStatus === "success"}/>
				</S.GageBox>
			</S.Alert>,
			document.body
		)
	);
}