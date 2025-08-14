"use client"

import MyHouseScroll from "@/containers/myHouse/houseScroll/ui";
import Navigate from "@/components/ui/navigate/ui";
import styled from "@emotion/styled";
import LeaveModal from "@/containers/myHouse/leave-modal/ui";
import {mq} from "@/styles/media";

export default function MyHouse() {
	return (
		<HouseContainer>
			<MyHouseScroll/>
			<Navigate/>
		</HouseContainer>
	)
}

const HouseContainer = styled.section`
  display: grid;
  grid-template-columns: 5.5fr 1fr;
  gap: 4rem;
  margin: 10vh 4rem 0 4rem;
  align-items: flex-start;
  height: 90vh;
  max-height: 90vh;

  ${mq.mobile} {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    margin: 0;
  }
`