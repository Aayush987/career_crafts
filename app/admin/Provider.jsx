"use client";

import { db } from '@/utils'
import { userinfo } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import { PreviewUpdateContext } from '../_context/PreviewUpdateContext';

function Provider({children}) {
  const [updatePreview, setUpdatePreview] = useState(0);
  return (
      <PreviewUpdateContext.Provider value={{updatePreview, setUpdatePreview}}>
        <div>
            {children}
        </div>
      </PreviewUpdateContext.Provider>
  )
}

export default Provider