"use client";

import { useState } from 'react';
import { addMonths } from 'date-fns';
import { useNavigationWithProgress } from '@/hooks/useNavigationWithProgress';
import type { PostDetailUnion } from '@/types/postDetail';
import { useApollo } from '@/lib/apolloClient';
import { useAlertStore } from '@/store/alert';
import { ContractService } from '@/services/contract';
import { useRouter } from 'next/navigation';

export function useContract(postInfo: PostDetailUnion | null, currentUserId?: string | null) {
  const client = useApollo();
  const { success, error } = useAlertStore();
  const navigate = useNavigationWithProgress();
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const sendContract = async (period: number) => {
    if (!postInfo || postInfo.__typename !== 'BoardingPost') return;
    if (!currentUserId) {
      error('로그인이 필요합니다.');
      return;
    }
    if (creating) return;

    setCreating(true);
    try {
      const roomId = postInfo.room.roomId;
      const boarderId = currentUserId;
      const hostId = postInfo.room.boardingHouse.host.user.userId;
      const expiryDate = addMonths(new Date(), period).toISOString();

      const ok = await ContractService.createContract(client, {
        roomId,
        hostId,
        contractPeriod: period,
        expiryDate,
      });

      if (ok) {
        success('계약 요청을 보냈습니다.');
        const user = [hostId, boarderId].sort();
        console.log(user.join(':'));
        router.back();
        setTimeout(() => {
          navigate(`/message/${user.join(':')}`);
        }, 100);
      } else {
        error('계약 요청에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      error('계약 요청 중 오류가 발생했습니다.');
    } finally {
      setCreating(false);
    }
  };

  return { creating, sendContract } as const;
}
