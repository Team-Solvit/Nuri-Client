'use client';
import {useEffect, useState} from 'react';
import * as S from './style';
import Image from "next/image";
import Smile from "@/assets/icon/smile.svg"
import Lose from "@/assets/icon/lose.svg"
import X from "@/assets/icon/x.svg"

interface Props {
	description: string,
	success: boolean
}

export default function Alert({description = "error", success = false}: Props) {
	const [visible, setVisible] = useState(true);
	const [isLeaving, setIsLeaving] = useState(true);
	useEffect(() => {
		const leavingTimer = setTimeout(() => {
			setIsLeaving(false);
		}, 4_800);
		const visibleTimer = setTimeout(() => {
			setVisible(false);
		}, 5_500);
		return () => {
			clearTimeout(leavingTimer);
			clearTimeout(visibleTimer);
		};
	}, []);
	
	const closeAlert = () => {
		setIsLeaving(false);
		setTimeout(() => {
			setVisible(false);
		}, 500)
	}
	if (!visible) return null;
	
	return (
		<S.Alert isLeaving={!isLeaving}>
			<S.Content>
				<S.Close onClick={closeAlert}>
					<Image src={X} alt="X"/>
				</S.Close>
				<S.Emotion>
					<Image src={success ? Smile : Lose} alt="emotion"/>
				</S.Emotion>
				<S.TextBox success={success}>
					<h3>{success ? "Success" : "Error"}</h3>
					<p>
						{description.length > 60
							? description.slice(0, 60) + '...'
							: description}
					</p>
				</S.TextBox>
			</S.Content>
			<S.GageBox>
				<S.Gauge success={success}/>
			</S.GageBox>
		</S.Alert>
	);
}