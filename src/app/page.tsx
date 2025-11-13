'use client'

import PostScroll from "@/containers/home/post-scroll/ui";
import Navigate from "@/components/ui/navigate/ui";
import styled from "@emotion/styled";
import {mq} from "@/styles/media";

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

  ${mq.mobile} {
    grid-template-columns: 1fr;
    margin: 0;
    max-height: 100vh;
    height: 100vh;
  }
`