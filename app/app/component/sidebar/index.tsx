import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Corrected import path

const Sidebar = () => {
  const session = useSession();
  const router = useRouter();
  if(session.status==="unauthenticated"){
    router.push("/")
  }
  if(session.status==="authenticated"){
  return (
    <div className="top-0 left-0 fixed h-full w-64 bg-[#181b2b] flex flex-col border-[#8DECB4] rounded-r-xl border-2">
      <div className="flex items-center flex-col">
            <h1 className="text-3xl font-bold text-white mt-2">
              Fact<span className="text-[#8DECB4]">Guard</span>
            </h1>
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
      <button className="text-[#8DECB4] mt-[60vh]" onClick={async()=>{await signOut();router.push("/")}}><img className="rounded-full bg-red-400 p-2 w-12 transition-all duration-1000 ease-in-out" src="https://i.ibb.co/ZXQJ9FX/logout.png"></img></button>
    </div>
    </div>
  );
};}

export default Sidebar;
