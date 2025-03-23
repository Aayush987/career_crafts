"use client";
import { useContext, useEffect } from "react";
import UserDetailInfo from "./_components/UserDetailInfo";
import { UserDetailContext } from "../_context/UserDetailContext";
import ProjectList from "./_components/ProjectList";

const UserPage = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  useEffect(() => {
    console.log("user detail from useeffect",userDetail);
  },[]);
    return (
        // <div className="p-3 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="container mx-auto px-4 py-9">
          <div>
            <UserDetailInfo userDetail = {userDetail} />
          </div>
          <div className="mt-4 md:col-span-2">
            <ProjectList projectList = {userDetail}   />
          </div>
        </div>
    )
}

export default UserPage;