"use client";

import styled from "@emotion/styled";
import Navigate from "@/components/ui/navigate/ui";
import AlertScroll from "@/containers/alert/alertScroll/ui";

export default function AlertPage() {
  return (
    <AlertContainer>
      <AlertScroll />
      <Navigate />
    </AlertContainer>
  )
}

const AlertContainer = styled.section`
  display: grid;
  grid-template-columns: 5.5fr 1fr;
  gap: 4rem;
  margin: 10vh 4rem 0 4rem;
  align-items: flex-start;
  height: 90vh;
  max-height: 90vh;
`