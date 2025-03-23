"use client";
import { db } from '@/utils'
import { userinfo } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from './portfolio_builder/_context/UserDetailContext';

function Provider({children}) {
    const {user} = useUser();
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
         
        user && GetUserDetails();
        
    },[user]);

    const GetUserDetails = async () => {
        const result = await db.select().from(userinfo)
        .where(eq(userinfo.email,user?.primaryEmailAddress.emailAddress));
        setUserDetail(result[0]); 
    }
  return (
    <UserDetailContext.Provider value = {{userDetail, setUserDetail}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider