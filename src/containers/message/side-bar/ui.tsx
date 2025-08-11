import * as S from "./style"
import Image from "next/image";
import {useState} from "react";
import UnderArrow from "@/assets/icon/arrow-under.svg"
import Search from "@/assets/icon/search.svg"
import Profile from "@/assets/meeting/member-profile.png"
import {useParams, useRouter} from "next/navigation";
import NProgress from "nprogress";
import UserSelectionModal from "@/containers/message/user-selection/ui";

export default function MessageSideBar() {
	const [showUserModal, setShowUserModal] = useState(false);
	
	const fakeData1 = [
		{id: 1, name: "그랜마 하우스", last_message: "감사합니다"},
		{id: 2, name: "그랜마 하우스", last_message: "감사합니다"},
		{id: 3, name: "그랜마 하우스", last_message: "감사합니다"},
	]
	const fakeData2 = [
		{id: 4, name: "그랜마 하우스", last_message: "감사합니다"},
		{id: 5, name: "그랜마 하우스", last_message: "감사합니다"},
		{id: 6, name: "그랜마 하우스", last_message: "감사합니다"},
	]
	const fakeData3 = [
		{id: 7, name: "그랜마 하우스", last_message: "감사합니다"},
		{id: 8, name: "그랜마 하우스", last_message: "감사합니다"},
		{id: 9, name: "그랜마 하우스", last_message: "감사합니다"},
	]
	const [isDrop, setIsDrop] = useState([
		false, false, false
	]);
	const handleDrop = (number: number) => {
		const newDrop = [...isDrop];
		newDrop[number - 1] = !newDrop[number - 1];
		setIsDrop(newDrop)
	}
	const router = useRouter();
	const handleRouter = (id: number) => {
		NProgress.start()
		router.push(`/message/${id}`, {scroll: false});
	}
	const params = useParams();
	return (
		<S.MessageContainer>
			<S.NewChat>
				<p>채팅방 추가</p>
				<S.NewChatButton onClick={() => setShowUserModal(true)}>
					+
				</S.NewChatButton>
				{showUserModal && (
					<UserSelectionModal
						onClose={() => setShowUserModal(false)}
						onCreate={() => {
							handleRouter(0);
						}}
					/>
				)}
			</S.NewChat>
			<S.Search>
				<input type={"text"} placeholder={"채팅방을 입력하세요"}/>
				<Image src={Search} alt={"search-icon"} width={16} height={16}/>
			</S.Search>
			<S.CategoryList>
				<S.CategoryBox isDrop={isDrop[0]}>
					<S.Category>
						<h3>하숙 메시지</h3>
						<Image
							style={{transform: isDrop[0] ? "rotate(0deg)" : "rotate(180deg)"}}
							onClick={() => handleDrop(1)}
							src={UnderArrow}
							alt={"arrow-icon"}
						/>
					</S.Category>
					{fakeData1.map((item) => {
						return (
							<S.ChatBox
								key={item.id}
								onClick={() => handleRouter(item.id)}
								isRead={Number(params.id) === item.id}
							>
								<S.Profile>
									<Image src={Profile} alt={"profile"} fill/>
								</S.Profile>
								<S.Info>
									<h4>{item.name}</h4>
									<p>{item.last_message}</p>
								</S.Info>
							</S.ChatBox>
						)
					})}
				</S.CategoryBox>
				<S.CategoryBox isDrop={isDrop[1]}>
					<S.Category>
						<h3>모임 메시지</h3>
						<Image
							style={{transform: isDrop[1] ? "rotate(0deg)" : "rotate(180deg)"}}
							onClick={() => handleDrop(2)}
							src={UnderArrow}
							alt={"arrow-icon"}
						/>
					</S.Category>
					{fakeData2.map((item) => {
						return (
							<S.ChatBox
								key={item.id}
								onClick={() => handleRouter(item.id)}
								isRead={Number(params.id) === item.id}
							>
								<S.Profile>
									<Image src={Profile} alt={"profile"} fill/>
								</S.Profile>
								<S.Info>
									<h4>{item.name}</h4>
									<p>{item.last_message}</p>
								</S.Info>
							</S.ChatBox>
						)
					})}
				</S.CategoryBox>
				<S.CategoryBox isDrop={isDrop[2]}>
					<S.Category>
						<h3>개인 메시지</h3>
						<Image
							style={{transform: isDrop[2] ? "rotate(0deg)" : "rotate(180deg)"}}
							onClick={() => handleDrop(3)}
							src={UnderArrow}
							alt={"arrow-icon"}
						/>
					</S.Category>
					{fakeData3.map((item) => {
						return (
							<S.ChatBox
								key={item.id}
								onClick={() => handleRouter(item.id)}
								isRead={Number(params.id) === item.id}
							>
								<S.Profile>
									<Image src={Profile} alt={"profile"} fill/>
								</S.Profile>
								<S.Info>
									<h4>{item.name}</h4>
									<p>{item.last_message}</p>
								</S.Info>
							</S.ChatBox>
						)
					})}
				</S.CategoryBox>
			</S.CategoryList>
		</S.MessageContainer>
	)
}