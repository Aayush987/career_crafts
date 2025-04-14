"use client";

import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
    const [username, setUsername] = useState("");
    const { user } = useUser();
    const route = useRouter();

    useEffect(() => {
        user && checkUser();
    },[user])

    const checkUser = async () => {
            console.log("Checking user");   
            console.log("user",user);
            const result = await db.select().from(userinfo)
            .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));
    
            if(result?.length > 0) {
                route.replace('/admin');
            }
            console.log(result);
        }

    const handleBtnClick = async () => {
        if(username.length > 20) {
            toast.error("Username should not be more than 10 characters!", {
                position: "top-right"
            });
            return;
        }

        const result = await db.insert(userinfo)
        .values({
             name: user?.fullName,
             email: user?.primaryEmailAddress?.emailAddress,
             username: username.replace(' ','')
        })

        if(result) {
            toast.success("Username created successfully!", {
                position: "top-right"
            });
            setTimeout(() => {
                window.location.reload(); 
    
                setTimeout(() => {
                    route.push('/admin');
                }, 1000);  
            }, 1000); 
        }

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-10 border rounded-lg flex flex-col">
                <h2 className="font-bold text-2xl py-5 text-center">Create Portfolio Username</h2>
                <label className="py-2">Add Username for your portfolio</label>
                <input
                 onChange={(e) => setUsername(e.target.value)}
                 type="text" placeholder="Type here" className="input py-2 input-bordered w-full max-w-xs" />
                <button
                 onClick={() => handleBtnClick()}
                 disabled = {!username} className="btn btn-primary mt-3">Create</button>
            </div>
        </div>
    )
}