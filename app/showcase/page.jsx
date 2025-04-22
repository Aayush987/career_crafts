"use client";
import { db } from "@/utils"
import { userinfo } from "@/utils/schema"
import { useEffect, useState } from "react";
import UserDetailInfo from "../profile/[username]/_components/UserDetailInfo";
import ProfileCard from "./_components/ProfileCard";
import Header from "../_components/Header";
import { eq } from "drizzle-orm";

export default function Page() {
    const [user, setUser] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    useEffect(() => {
        FetchUsers();
    },[]);

    useEffect(() => {
        if (searchText === "") {
            setFilteredProfiles(user); 
        } else {
            const filterUsers = user.filter((u) =>
                u.name.toLowerCase().includes(searchText.toLowerCase())
            );
            console.log(filterUsers);
            setFilteredProfiles(filterUsers);
        }
    },[searchText,user]);


    const FetchUsers = async () => {
        const result = await db.select().from(userinfo);
        console.log(result);
        setUser(result);
    }
    return (
        <div>
        <Header />
            <section className="bg-muted/30 pt-16 pb-12">
                <div className="container text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Portfolio Showcase</h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Explore stunning portfolios created by professionals across various industries. Get inspired and see
                        what's possible with PortfolioBuilder.
                    </p>
                </div>
            </section>
           <div className="flex items-center justify-center pb-4">
            <input type="text" className="bg-inherit border-2 border-white w-[18rem] px-2 py-2 rounded-lg" placeholder="Search for a Profile.." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
           </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                {/* {(filteredProfiles?.length > 0 ? filteredProfiles : user).map((user) => (
                    <ProfileCard key={user.id} userDetail={user} />
                ))} */}
                {/* {
                    user.map((user) => (
                        <ProfileCard key={user.id} userDetail={user} />
                    ))
                } */}
                {
                    filteredProfiles.map((user) => (
                        <ProfileCard key={user.id} userDetail={user} />
                    ))
                }
            </div>
        </div>
    )
}