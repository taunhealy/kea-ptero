'use client'

import React from 'react';
import { CheckInProvider } from '@/contexts/CheckInContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <CheckInProvider>{children}</CheckInProvider>;
}

