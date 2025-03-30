"use client";
import { PreviewUpdateContext } from "@/app/_context/PreviewUpdateContext";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { THEMES } from "@/app/_data/Themes";
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ThemeOptions() {


    const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);
    const {user} = useUser();
    const {userDetails, setUserDetails} =  useContext(UserDetailContext);
    const onThemeSelect = async (theme) => {
        const result = await db.update(userinfo)
        .set({
            theme: theme
        }).where(eq(userinfo.email, user?.primaryEmailAddress.emailAddress));

        if(result) {
            toast.success('Saved', {
                position: "top-right",
            })
          setUpdatePreview(updatePreview + 1);
        }
    }

    return (
        <div>
            <h2 className="font-bold text-3xl py-10">Select Your Page Theme</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {THEMES.map((theme, index) => (
                    <div className={`flex p-3 bg-gray-900 rounded-lg hover:scale-105 transition-all cursor-pointer ${userDetails?.theme == theme && `border rounded-lg`}`}
                      onClick={() => onThemeSelect(theme)}
                    >
                        <div className="w-full h-[40px] flex justify-center items-center">
                          <p>{theme}</p>     
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}