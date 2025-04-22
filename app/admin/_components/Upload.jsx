"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { Camera } from "lucide-react";
import Image from "next/image";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const authenticator = async () => {
  try {
    const response = await fetch("https://careercraft-portfolio.vercel.app/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err) => {
  console.log("Error", err);
};




const Upload = ({onUpload}) => {
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const onSuccess = (res) => {
        console.log("Success", res);
        if(onUpload) {
            onUpload(res.url);
        }
        setImageUrl(res.url);
      };
    const [imageurl, setImageUrl] = useState("");
    const IKUploadRef = useRef(null);

    useEffect(() => {
        if(userDetail?.logo) {
            setImageUrl(userDetail.logo);
        }
    }, [userDetail]);

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <div>
          <IKUpload useUniqueFileName onError={onError} onSuccess={onSuccess} style={{display:"none"}} ref={IKUploadRef} />
        </div>
        {!imageurl ? (
        <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full cursor-pointer" onClick={() => IKUploadRef.current.click()} />
        ) : (
        <Image src={imageurl} alt="logo" width={84} height={84} className="rounded-full object-contain cursor-pointer" onClick={() => IKUploadRef.current.click()} />
        )}
        
        </ImageKitProvider>
    )
}

export default Upload;