'use client'

import React, { useState, useEffect } from 'react';
import MobilePhoneAuth from './mobile';
import DesktopPhoneAuth from './desktop';

interface PhoneAuthProps {
  onVerifySuccess: (phoneNumber: string) => void;
  onClose: () => void;
}

export default function PhoneAuth({ onVerifySuccess, onClose }: PhoneAuthProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <MobilePhoneAuth 
      onVerifySuccess={onVerifySuccess} 
      onClose={onClose} 
    />
  ) : (
    <DesktopPhoneAuth 
      onVerifySuccess={onVerifySuccess} 
      onClose={onClose} 
    />
  );
}
