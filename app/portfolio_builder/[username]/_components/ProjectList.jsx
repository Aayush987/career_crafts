import Link from "next/link";

const ProjectList = ({projectList}) => {
   // if(!projectList) return null;
   //  return (
   //    projectList && (
   //       <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
   //          {projectList.projects && projectList.projects.length > 0 ? (
   //             projectList.projects.map((project, index) => (
   //                <Link 
   //                   href={project.url} 
   //                   key={project.id || `project-${index}`} 
   //                   className="border shadow-sm rounded-lg p-7 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
   //                >
   //                   <div>
   //                   <h2 className="font-bold">{project.name}</h2>
   //                   </div>
   //                   <h2 className="text-base-content/80 text-xs lg:text-sm my-2">{project.desc}</h2>
   //                </Link>
   //             ))
   //             ) : (
   //             <p className="text-gray-500 text-center w-full">No projects found.</p>
   //             )}
   //    </div>
   //    )
        
   //  )
   return (
      projectList?.projects && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {projectList.projects && projectList.projects.length > 0 ? (
               projectList.projects.map((project, index) => (
                  <Link 
                     href={project.url} 
                     key={project.id || `project-${index}`} 
                     className="border shadow-sm rounded-lg p-7 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
                  >
                     <div>
                     <h2 className="font-bold">{project.name}</h2>
                     </div>
                     <h2 className="text-base-content/80 text-xs lg:text-sm my-2">{project.desc}</h2>
                  </Link>
               ))
               ) : (
               <p className="text-gray-500 text-center w-full">No projects found.</p>
               )}
      </div>
      )
        
    )
}

export default ProjectList;