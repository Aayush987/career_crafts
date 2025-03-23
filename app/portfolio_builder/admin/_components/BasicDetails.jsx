"use client";
import { UserDetailContext } from "@/app/portfolio_builder/_context/UserDetailContext";
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Camera, Link2, MapPin } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Upload from "./Upload";
import Image from "next/image";
import { PreviewUpdateContext } from "@/app/portfolio_builder/_context/PreviewUpdateContext";

export default function BasicDetails() {
    const [selectedOption, setSelectedOption] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const {user} = useUser();

    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    useEffect(() => {

    }, [userDetail]);

    useEffect(() => {
        if (!imageUrl) return; // Prevent running when imageUrl is empty
    
        const updateDatabase = async () => {
          try {
            const result = await db.update(userinfo).set({ logo: imageUrl }).where(eq(userinfo.email, user?.primaryEmailAddress.emailAddress));
    
            if (result) {
              toast.success("Photo Saved!", { position: "top-right" });
            } else {
              toast.error("Error updating photo!", { position: "top-right" });
            }
          } catch (error) {
            console.error("Database Update Error:", error);
            toast.error("Database Error!", { position: "top-right" });
          }
        };
    
        updateDatabase();
      }, [imageUrl]); // Runs when imageUrl changes

    let timeoutId;
    const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);
    const onInputChange = (event,fieldName) => {

        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () =>{
              const result = await db.update(userinfo)
              .set({
                [fieldName]: event.target.value
              }).where(eq(userinfo.email, user?.primaryEmailAddress.emailAddress));
              
              if(result) {
                toast.success('Saved!', {
                    position: 'top-right'
                })

                setUpdatePreview(updatePreview + 1);


              }else {
                toast.error('Error!', {
                    position: 'top-right'
                })
              }
        },1000);
    }

    const handleImageUpload = async(imageUrl) => {
        setImageUrl(imageUrl);
        console.log("Image Url", imageUrl);
        // const result = await db.update(userinfo)
        // .set({
        //     logo: imageUrl
        // }).where(eq(userinfo.email, user?.primaryEmailAddress.emailAddress));

        // if(result) {
        //     toast.success('Photo Saved!', {
        //         position: 'top-right'
        //     })
        //   }else {
        //     toast.error('Error!', {
        //         position: 'top-right'
        //     })
        //   }

    }

    // const handleFileUpload = async (event) => {
    //       const file = event.target.files[0];
    //       const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    //         method: 'POST',

    //       })
    // }


    return (
        <div className="p-7 rounded-lg bg-gray-800 my-7">
            <div className="flex gap-6 items-center">
                <label htmlFor="file-input">
                    {/* <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full cursor-pointer" /> */}
                    <Upload onUpload = {handleImageUpload} />
                </label>
                {/* <input type="file" id="file-input" onChange={handleFileUpload} accept="image/png, image/gif, image/jpeg" style={{display:'none'}} /> */}
                <input type="text" placeholder="Username" defaultValue={userDetail?.name} onChange={(event) => onInputChange(event, 'name')} className="input input-bordered w-full" />
            </div>
            <textarea className="textarea textarea-bordered mt-3 w-full" defaultValue={userDetail?.bio} placeholder="Write Something About Yourself" onChange={(event) => onInputChange(event, 'bio')}></textarea>

            <div>
                <div className="flex gap-3 mt-6">
                    <MapPin
                     onClick={() => setSelectedOption("location")}
                     className={`h-12 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${selectedOption == 'location' && 'bg-gray-600'}`} />
                    <Link2
                     onClick={() => setSelectedOption("link")}
                     className={`h-12 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${selectedOption == 'link' && 'bg-gray-600'}`} />
                </div>
                {selectedOption == "location" ? (
                    <div className="mt-2">
                    <label className="input input-bordered flex items-center gap-2">
                        <MapPin />
                        <input type="text" className="grow" placeholder="Location" key={1} defaultValue={userDetail?.location} onChange={(event) => onInputChange(event, 'location')} />
                    </label>
                    </div>
                ): (
                    <div className="mt-2">
                    <label className="input input-bordered flex items-center gap-2">
                        <Link2 />
                        <input type="text" className="grow" placeholder="URL" key={2} defaultValue={userDetail?.link} onChange={(event) => onInputChange(event, 'link')} />
                    </label>
                    </div>
                )}
                {/* <div className="mt-2">
                <label className="input input-bordered flex items-center gap-2">
                    <MapPin />
                    <input type="text" className="grow" placeholder="Email" />
                </label>
                </div> */}
            </div>
        </div>
    )
}