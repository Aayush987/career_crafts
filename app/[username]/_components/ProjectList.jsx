import { db } from "@/utils";
import { project, ProjectClicks, userinfo } from "@/utils/schema";
import moment from "moment/moment";
import Link from "next/link";
import AnalyticCharts from "./AnalyticCharts";
import { eq, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ProjectList = ({projectList}) => {

   const [projectClickData, setProjectClickData] = useState([]);
   const USERNAME = usePathname().replace('/','');
   
   console.log(projectList?.projects);
   useEffect(() => {
      ProjectAnalyticData();
   },[]);

   const onProjectClick = async (project) => {
           const result = await db.insert(ProjectClicks)
           .values({
               month:moment().format('MMM'),
               projectRef: project.id,

           })

         window.open(project.url, '_blank');
   }

   const ProjectAnalyticData = async () => {
         const result = await db.select({
            totalClick: sql`count(${ProjectClicks.id})`.mapWith(Number),
            month:ProjectClicks.month,
            projectId: ProjectClicks.projectRef
         }).from(ProjectClicks)
         .rightJoin(project,eq(ProjectClicks.projectRef,project.id))
         .innerJoin(userinfo,eq(project.userRef,userinfo.id))
         .where(eq(userinfo.username,USERNAME))
         .groupBy(ProjectClicks.projectRef,ProjectClicks.month)
         
         setProjectClickData(result);
         console.log(result);
   }

   const GetProjectWiseAnalyticData = (projectId) => {
        let response = projectClickData?.filter((project) => project.projectId === projectId)
        let result = [];
        
        result.push({
         month: "March",
         totalClick: 0,
         projectId: 0,
        },
        {
         month: "April",
         totalClick: 0,
         projectId: 0,
        },
      )

      const finalResult = [...result,...response];

      return finalResult;
   }

   if (!projectList || !projectList.projects) {
      return null; 
    }
    
    if (projectList.projects.length === 0) {
      return <p className="text-gray-500 text-center w-full">No projects found.</p>;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {projectList.projects.map((project, index) => (
          <div 
            key={project.id || `project-${index}`} 
            onClick={() => onProjectClick(project)}
            className="border shadow-sm rounded-lg p-7 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-sm md:text-lg">{project.name}</h2>
              <span className="inline-block bg-red-500 text-white text-[10px] md:text-sm p-2 font-medium md:px-3 md:py-1 rounded-full">{project.category}</span>
            </div>
            <h2 className="text-base-content/80 text-xs lg:text-sm my-2">{project.desc}</h2>
            <AnalyticCharts data={GetProjectWiseAnalyticData(project.id)} />
          </div>
        ))}
      </div>
    );
}

export default ProjectList;