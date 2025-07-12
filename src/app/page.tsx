'use client'

import PostScroll from "@/containers/home/post-scroll/ui";
import Navigate from "@/containers/home/navigate/ui";
import styled from "@emotion/styled";

export default function Home() {
	return (
		<HomeContainer>
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