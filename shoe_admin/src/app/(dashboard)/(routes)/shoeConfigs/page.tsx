'use client'
import ShoeConfigsTabs from '@/app/(dashboard)/(routes)/shoeConfigs/shoeConfigsTabs'
import { setSessionToken } from '@/app/api/axiosClient';
import { useAppContext } from '@/app/AppProvider';
import React, { useEffect } from 'react'

export default function ShoeConfigsPage() {
  const { sessionToken } = useAppContext();

  useEffect(() => {
      if (sessionToken) {
          setSessionToken(sessionToken);
      }
  }, [sessionToken]);
  return (
    <ShoeConfigsTabs/>
  )
}
