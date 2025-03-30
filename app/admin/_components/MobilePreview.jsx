"use client";
import { PreviewUpdateContext } from "@/app/_context/PreviewUpdateContext"
import { useContext } from "react"

export default function MobilePreview() {

    const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);

    return (
        <div className="p-5">
            <div className="border-[13px] border-black h-screen rounded-[40px] m-2 shadow-md shadow-primary">
            <iframe
              title="Profile"
              key={updatePreview}
              src={process.env.NEXT_PUBLIC_BASE_URL + "/aayush"}
              width="100%"
              height="100%"
              className="rounded-[25px]"
             />
            </div>
        </div>
    )
}