'use client';
import { useEffect } from 'react';
import { useLoginModalStore } from '@/store/loginModal';
import { useUserStore } from '@/store/user';

export default function AuthEventListener() {
  const { open } = useLoginModalStore();
  const clear = useUserStore(s => s.clear);

  useEffect(() => {
    const handleAuthFailed = () => {
      clear();
      open();
    };

    window.addEventListener('auth-failed', handleAuthFailed);

    return () => {
      window.removeEventListener('auth-failed', handleAuthFailed);
    };
  }, [open, clear]);

  return null;
}