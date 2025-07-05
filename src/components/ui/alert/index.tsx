'use client';
import { useEffect, useState } from 'react';
import * as S from './style';
import Image from "next/image";
import Smile from "@/assets/icon/smile.svg"
import Lose from "@/assets/icon/lose.svg"
import X from "@/assets/icon/x.svg"

interface Props {
	description : string,
	success : boolean
}

export default function Alert({description="error", success=false}: Props) {
	const [visible, setVisible] = useState(true);
	const [isLeaving, setIsLeaving] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLeaving(false);
		}, 5_000);
		
		return () => clearTimeout(timer);
	}, []);
	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, 5_500);
		
		return () => clearTimeout(timer);
	}, []);
	
	const closeAlert = () =>{
		setIsLeaving(false);
		setTimeout(()=>{
			setVisible(false);
		}, 500)
	}
	if (!visible) return null;
	
	return (
		<S.Alert isLeaving = {!isLeaving}>
			<S.Content>
				<S.Close onClick={closeAlert }>
					<Image src={X} alt="X" />
				</S.Close>
				<S.Emotion success={success}>
					<Image src={success ? Smile : Lose} alt="emotion" />
				</S.Emotion>
				<S.TextBox success={success}>
					<h3>{success ? "Success" : "Error"}</h3>
					<p>{description}</p>
				</S.TextBox>
			</S.Content>
			<S.GageBox>
				<S.Gauge success={success} />
			</S.GageBox>
		</S.Alert>
	);
}