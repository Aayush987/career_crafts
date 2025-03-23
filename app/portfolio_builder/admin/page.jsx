"use client";

import { db } from "@/utils";
import { userinfo } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FormContent from "./_components/FormContent";
import MobilePreview from "./_components/MobilePreview";

export default function Page() {
    
    const { user } = useUser();
    const route = useRouter();

    useEffect(() => {
        console.log("Checking effect");
        // checkUser();
        user && checkUser();
    },[user]);

    const checkUser = async () => {
        console.log("Checking user");   
        console.log("user",user);
        const result = await db.select().from(userinfo)
        .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));

        if(result?.length == 0) {
            route.replace('/create');
        }
        console.log(result);
    }
    return (
        <div className="p-5">
            <div className="grid grid-cols-1 lg:grid-cols-3">
               <div className="col-span-2">
                   <FormContent />
               </div>
               <div>
                   <MobilePreview />
               </div>
            </div>
        </div>
    )
}