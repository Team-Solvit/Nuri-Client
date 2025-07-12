'use client'
import PostScroll from "@/containers/home/post-scroll/ui";
import Navigate from "@/components/ui/navigate/ui";
import styled from "@emotion/styled";
import Square from "@/components/ui/button/square";
import Circle from "@/components/ui/button/circle";

export default function Home() {
	return (
		<HomeContainer>
			<Square text={"취소"} onClick={() => {
			}} status={true} width={"100px"}/>
			<Square text={"취소"} onClick={() => {
			}} status={false} width={"100px"}/>
			<Circle onClick={() => {
			}} status={1} text={"취소"}/>
			<Circle onClick={() => {
			}} status={2} text={"취소"}/>
			<Circle onClick={() => {
			}} status={3} text={"취소"}/>
			
			<PostScroll/>
			<Navigate/>
		</HomeContainer>
	)
}

const HomeContainer = styled.section`
  display: grid;
  grid-template-columns: 5.5fr 1fr;
  gap: 4rem;
  margin: 10vh 4rem 0 4rem;
  align-items: flex-start;
  height: 90vh;
  max-height: 90vh;
`