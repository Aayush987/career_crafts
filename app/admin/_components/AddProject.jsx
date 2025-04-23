import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/utils";
import { project } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Link2 } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function AddProject({refreshData}) {

    const [openUrlInput, setOpenUrlInput] = useState(false);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const {user} = useUser();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
          e.preventDefault();
          console.log(e.target[0].value);
          setLoading(true);
          const result = await db.insert(project)
          .values({
               url: e.target[0].value,
               emailRef: user?.primaryEmailAddress.emailAddress,
               userRef: userDetail?.id
          })
          setOpenUrlInput(false);
          if(result) {
            setLoading(false);
            toast.success('New Project Added', {
                position: 'top-right'
            })
            refreshData();
          }else {
            setLoading(false);
          }
    }

    return (
        <div>
            {!openUrlInput ? 
                <button
                 onClick={() => setOpenUrlInput(true)}
                 className="btn btn-secondary w-full">+ Add New Project</button>
                :
                <form onSubmit={handleSubmit} className="p-3 rounded-lg bg-gray-800">
                <div>
                    <label className="pb-3 font-bold">Project Url:</label>
                    <label className="input input-bordered flex items-center gap-2 my-3">
                        <Link2 />
                        <input type="url" defaultValue={"https://"} className="grow" placeholder="Project Url" />
                    </label>
                </div>
                <button type="submit" disabled={loading} className="btn btn-secondary w-full">+ Add New Project</button>
                </form>
            }
            
           
        </div>
    )
}