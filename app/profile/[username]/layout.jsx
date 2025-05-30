import { db } from "@/utils";
import Provider from "./Provider";
import { userinfo } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function generateMetadata({ params }) {
  const USERNAME = await params.username;

  const result = await db
    .select({
      name: userinfo.name,
      bio: userinfo.bio,
      image: userinfo.logo,
    })
    .from(userinfo)
    .where(eq(userinfo.username, USERNAME))
    .then(res => res[0]);

  return {
    title: result?.name || "User Profile",
    description: result?.bio || "Create Personalized portfolios without any code",
    openGraph: {
      title: result?.name,
      description: result?.bio,
      images: [result?.image || "https://via.placeholder.com/400"],
    },
  };
}


const UserPageLayout = ({children}) => {
    return (
        <div>
            <Provider>
                {children}
            </Provider>
        </div>
    )
}

export default UserPageLayout;