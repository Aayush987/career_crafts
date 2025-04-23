import Image from "next/image";
import Link from "next/link";
import { MapPin, Github, Twitter, Linkedin, Mail, Link2 } from "lucide-react";
import { FaGithub, FaLink, FaLinkedin, FaTwitter } from "react-icons/fa6";

const UserDetailInfo = ({userDetail}) => {
  console.log(userDetail);
    if (!userDetail) return null;
    return (
     userDetail && (
       <div className="flex flex-col md:flex-row md:gap-10 md:items-center">
           <div className="my-4 md:my-8 flex items-center max-sm:justify-center">
           {userDetail.logo ? (
            <Image
              src={userDetail.logo}
              alt={userDetail.name || "User Logo"}
              width={192}
              height={192}
              className=" w-[90px] h-[90px] md:w-[192px] md:h-[192px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[90px] h-[90px] rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm text-gray-500">No Image</span>
            </div>
          )}
           </div>
           <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
              <h2 className="md:text-4xl ">{userDetail?.name}</h2>
              <p className=" text-gray-400 my-2 flex text-center justify-center gap-[3px] md:gap-1"><MapPin /> {userDetail?.location}</p>
              <h2 className="text-gray-500 md:max-w-2xl md:text-lg max-sm:text-center md:my-4">{userDetail?.bio}</h2>
            <div className="flex gap-4 my-4 md:mt-0">
              <a href={userDetail?.link} target="_blank" rel="noopener noreferrer">
                <FaLink size={20} />
              </a>
              <a href={userDetail?.github} target="_blank" rel="noopener noreferrer">
                <FaGithub size={20} />
              </a>
              <a href={userDetail?.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} />
              </a>
              <a href={userDetail?.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter size={20} />
              </a>
            </div>
           </div>
          
       </div>
     )
  )
};

export default UserDetailInfo;