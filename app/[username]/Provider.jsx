"use client";

import { db } from '@/utils';
import { project, userinfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import { usePathname } from 'next/navigation';
import { AdvancedUserDetailContext } from '../_context/AdvancedUserDetailContext';

function Provider({children}) {

  const [advanceduserDetail, setAdvancedUserDetail] = useState({});
  const USERNAME = usePathname().replace('/','');

  useEffect(() => {
      GetUserDetails();
  },[]);

  const GetUserDetails = async () => { 
  const result = await db.select(
    {
      id: userinfo.id,
      name: userinfo.name,
      email: userinfo.email,
      logo: userinfo.logo,
      link:userinfo.link,
      github:userinfo.github,
      linkedin:userinfo.linkedin,
      twitter:userinfo.twitter,
      bio:userinfo.bio,
      theme:userinfo.theme,
      location:userinfo.location,
      projects: {
        id: project.id,
        name: project.name,
        desc: project.desc,
        url: project.url,
        logo: project.logo,
        banner: project.banner,
        category: project.category
      }
    }
  ).from(userinfo)
  .leftJoin(project,eq(userinfo.id,project.userRef))
  .where(eq(userinfo.username, USERNAME));

  const formattedUser = result.reduce((acc, row) => {
    if (!acc) {
      acc = {
        id: row.id,
        name: row.name,
        email: row.email,
        logo: row.logo,
        link: row.link,
        github:row.github,
        linkedin:row.linkedin,
        twitter:row.twitter,
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
        banner: row.projects.banner,
        category: row.projects.category
      });
    }
    return acc;
  }, null);


     console.log(formattedUser);
     setAdvancedUserDetail(formattedUser);
    //  console.log(result2);
  }

  

  return (
    <div data-theme={advanceduserDetail?.theme}>
      <AdvancedUserDetailContext.Provider value = {{advanceduserDetail, setAdvancedUserDetail}}>
        {children}
      </AdvancedUserDetailContext.Provider>
    </div>
  )
}

export default Provider;