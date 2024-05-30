import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 

const Sidebar = () => {
  const session = useSession();
  const router = useRouter();

  // Redirect if user is unauthenticated
  if(session.status==="unauthenticated"){
    router.push("/")
    return null; // Return null to avoid rendering anything else
  }

  // Check if session data is not yet loaded
  if(session.status === "loading") {
    return <div>Loading...</div>;
  }

  // Ensure session data and user data are present
  if(session.status === "authenticated" && session.data && session.data.user) {
    return (
      <div className="top-0 left-0 fixed h-full w-64 bg-[#181b2b] flex flex-col border-[#8DECB4] rounded-r-xl border-2">
        <div className="flex items-center flex-col">
              <h1 className="text-3xl font-bold text-white mt-2">
                Fact<span className="text-[#8DECB4]">Guard</span>
              </h1>
              {/* Check if user image exists before rendering */}
              {session.data.user.image && 
                <img src={session.data.user.image} className="rounded-full mt-16 border-[#8DECB4] border-2" alt="User Image" />
              }
              {/* Check if user name exists before rendering */}
              {session.data.user.name && 
                <h2 className="text-white mt-3 text-lg">Hello, {session.data.user.name}!</h2>
              }
              <div className="mt-12 w-full">
        <button
          className="flex pt-2 flex-row text-lg justify-center w-full h-12 text-[#8DECB4] hover:bg-[#2c3347] hover:text-white transition-all duration-300 ease-in-out text-center rounded-xl" onClick={()=>{router.push("/dashboard")}}
        > 
          <span className="">Dashboard</span>
        </button>
        <button
          className="flex pt-2 flex-row w-full text-lg justify-center h-12 text-[#8DECB4] hover:bg-[#2c3347] hover:text-white transition-all duration-300 ease-in-out text-center rounded-xl" onClick={()=>{router.push("/dashboard/history")}}
        >
          <span className="">History</span>
        </button>
        </div>
        <button className="text-[#8DECB4] mt-72" onClick={async()=>{await signOut();router.push("/")}}><img className="rounded-full bg-red-400 p-2 w-12 transition-all duration-1000 ease-in-out" src="https://i.ibb.co/ZXQJ9FX/logout.png" alt="Logout"></img></button>
      </div>
      </div>
    );
  }

  // If session is authenticated but user data is not yet loaded
  return <div>Loading...</div>;
};

export default Sidebar;
