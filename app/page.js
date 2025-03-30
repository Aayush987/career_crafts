"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
   <div>
      <h1>Home Page</h1>
      <h2>User : {user?.fullName}</h2>
      <UserButton />
   </div>
  );
}
