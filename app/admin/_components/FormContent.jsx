import { useUser } from "@clerk/nextjs";
import AddProject from "./AddProject";
import BasicDetails from "./BasicDetails";
import { db } from "@/utils";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { project } from "@/utils/schema";
import ProjectListEdit from "./ProjectListEdit";

export default function FormContent() {
    const {user} = useUser();
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        user&&GetProjectList();
    },[user]);

    const GetProjectList = async () => {
        const result = await db.select().from(project)
        .where(eq(project.emailRef, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(project.id));

        setProjectList(result);
    }

    return (
        <div className="py-12 px-6">
            <h2 className="text-3xl font-bold">Start Designing your portfolio page</h2>
            <BasicDetails />
            <hr className="my-5" />
            <AddProject />

            <ProjectListEdit projectList={projectList} refreshData={GetProjectList} />
        </div>
    )
}