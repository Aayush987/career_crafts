"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Camera, Github, Link2, MapPin } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Upload from "./Upload";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareGithub, FaTwitter, FaXTwitter } from "react-icons/fa6";
import { PreviewUpdateContext } from "@/app/_context/PreviewUpdateContext";
import { ImProfile } from "react-icons/im";

export default function BasicDetails() {
    const [selectedOption, setSelectedOption] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [inputValue, setInputValue] = useState("");
    const {user} = useUser();

    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    useEffect(() => {
    //  console.log("userdetail,", userDetail);
    }, [userDetail]);

    useEffect(() => {
      switch (selectedOption) {
        case "location":
          setInputValue(userDetail?.location || "");
          break;
        case "link":
          setInputValue(userDetail?.link || "");
          break;
        case "github":
          setInputValue(userDetail?.github || "");
          break;
        case "linkedin":
          setInputValue(userDetail?.linkedin || "");
          break;
        case "twitter":
          setInputValue(userDetail?.twitter || "");
          break;
        default:
          setInputValue("");
      }
    }, [selectedOption, userDetail]);

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
      const value = event.target.value;
      setInputValue(value);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () =>{
              const result = await db.update(userinfo)
              .set({
                [fieldName]: value
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

    const renderInputField = () => {
      switch (selectedOption) {
        case "location": 
           return (
            <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <MapPin />
              <input
                type="text"
                className="grow"
                placeholder="Location"
                value={inputValue}
                onChange={(event) => onInputChange(event, 'location')}
              />
            </label>
          </div>
           );

        case "link": 
          return (
            <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <Link2 />
              <input
                type="text"
                className="grow"
                placeholder="URL"
                value={inputValue}
                onChange={(event) => onInputChange(event, 'link')}
              />
            </label>
          </div>
          );

        case "github":
          return ( 
           <div className="mt-2">
           <label className="input input-bordered flex items-center gap-2">
           <FaGithub />
             <input
               type="text"
               className="grow"
               placeholder="URL"
               value={inputValue}
               onChange={(event) => onInputChange(event, 'github')}
             />
           </label>
         </div>
          );
        case "linkedin":
          return (
            <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
               <FaLinkedin />
              <input
                type="text"
                className="grow"
                placeholder="URL"
                value={inputValue}
                onChange={(event) => onInputChange(event, 'linkedin')}
              />
            </label>
          </div>
          );
        case "twitter":
          return (
            <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
                <FaTwitter />
              <input
                type="text"
                className="grow"
                placeholder="URL"
                value={inputValue}
                onChange={(event) => onInputChange(event, 'twitter')}
              />
            </label>
          </div>
          )
      }
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
                     <FaLinkedin
                     onClick={() => setSelectedOption("linkedin")}
                     className={`h-12 w-12 p-3 rounded-md text-blue-500 hover:bg-gray-600 ${selectedOption == 'linkedin' && 'bg-gray-600'}`} />
                     <FaSquareGithub
                     onClick={() => setSelectedOption("github")}
                     className={`h-12 w-12 p-3 rounded-md text-black hover:bg-gray-600 ${selectedOption == 'github' && 'bg-gray-600'}`} />
                     <FaXTwitter 
                     onClick={() => setSelectedOption("twitter")}
                     className={`h-12 w-12 p-3 rounded-md text-black hover:bg-gray-600 ${selectedOption == 'twitter' && 'bg-gray-600'}`} />
                    <div
                      onClick={() => window.open(`/profile/${userDetail.username}`, '_blank')}
                      className="tooltip tooltip-secondary tooltip-bottom"
                      data-tip="Click to see your profile page"
                    >
                      <ImProfile className="h-12 w-12 p-3 rounded-md text-black hover:bg-gray-600 cursor-pointer" />
                    </div>
                </div>
                {renderInputField()}
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