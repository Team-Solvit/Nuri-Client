'use client'

import { Suspense } from 'react'
import MeetingThirdPartyContainer from '@/containers/meeting/third-party'
import * as S from './style'
import ThirdPartyMeetingSkeleton from '@/components/ui/skeleton/ThirdPartyMeetingSkeleton'

export default function MeetingThirdParty() {
  return (
    <S.Wrapper>
      <Suspense fallback={<ThirdPartyMeetingSkeleton />}>
        <MeetingThirdPartyContainer />
      </Suspense>
    </S.Wrapper>
  )
}