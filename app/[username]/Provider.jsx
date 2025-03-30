"use client";

import { db } from '@/utils';
import { project, userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';

function Provider({children}) {

  const {user} = useUser();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  useEffect(() => {
      GetUserDetails();
  },[user]);

  const GetUserDetails = async () => { 
    
  //    const result = await db.query.userinfo.findMany({
  //     with: {
  //       project: true
  //     },
  //     where:(eq(userinfo.email, user?.primaryEmailAddress.emailAddress))
  //    })
  const result = await db.select(
    {
      id: userinfo.id,
      name: userinfo.name,
      email: userinfo.email,
      logo: userinfo.logo,
      link:userinfo.link,
      bio:userinfo.bio,
      theme:userinfo.theme,
      location:userinfo.location,
      projects: {
        id: project.id,
        name: project.name,
        desc: project.desc,
        url: project.url,
        logo: project.logo,
        banner: project.banner
      }
    }
  ).from(userinfo)
  .leftJoin(project,eq(userinfo.id,project.userRef))
  .where(eq(userinfo.email, user?.primaryEmailAddress.emailAddress));

  const formattedUser = result.reduce((acc, row) => {
    if (!acc) {
      acc = {
        id: row.id,
        name: row.name,
        email: row.email,
        logo: row.logo,
        link: row.link,
        bio: row.bio,
        theme: row.theme,
        location: row.location,
        projects: []
      };
    }
    if(row.projects) {
      acc.projects.push({
        name: row.projects.name,
        desc: row.projects.desc,
        url: row.projects.url,
        id: row.projects.id,
        logo: row.projects.logo,
        banner: row.projects.banner
      });
    }
    return acc;
  }, null);


     console.log(formattedUser);
     setUserDetail(formattedUser);
    //  console.log(result2);
  }

  

  return (
    <div data-theme={userDetail?.theme}>
        {children}
    </div>
  )
}

export default Provider;