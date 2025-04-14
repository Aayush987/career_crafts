import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLink, FaLinkedin, FaTwitter } from "react-icons/fa6";

const ProfileCard = ({ userDetail }) => {
    return (
        <div 
         onClick={() => window.open(`/${userDetail.username}`, '_blank')}
         role="button"
          className="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent opacity-80" />
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="flex flex-col items-center p-6">
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-sm transition-transform group-hover:scale-105">
                   {userDetail.logo && <Image src={userDetail.logo}
                        alt={`${userDetail.name}'s profile photo`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 96px, 96px"
                        priority
                    />}
                </div>
                <h3 className="mb-1 text-xl font-semibold">{userDetail.name}</h3>
                {userDetail.location && (
                    <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        <span>{userDetail.location}</span>
                    </div>
                )}
                <p className="mb-5 text-center text-sm text-muted-foreground">{userDetail.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {userDetail.link && (
                        <a href={userDetail.link} target="_blank" rel="noopener noreferrer">
                            <FaLink size={20} />
                        </a>
                    )}
                    {userDetail.github && (
                        <a href={userDetail.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub size={20} />
                        </a>
                    )}
                    {userDetail.linkedin && (
                        <a href={userDetail.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={20} />
                        </a>
                    )}
                    {userDetail.twitter && (
                        <a href={userDetail.twitter} target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;