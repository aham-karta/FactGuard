"use client"
import { useSearchParams } from 'next/navigation';
import {useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'
const HomePage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('v');
    const session = useSession()
    const router=useRouter()
    console.log("it is "+search)
    if (session.status === "loading") {
        return (
        <div className="fixed top-[25.5vh] left-[41.5vw]">
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2N4eWw2c3F0dnRkcDJqMDNyNWdsanIxeHh4dmdudHRlZ2Z0dzB4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zFwqvI1atpDkLPhBgY/giphy.gif"></img>
        </div>
      )
      }
      if(session.status==="unauthenticated"){
        router.push("/signup")
      }
      if(session.status==="authenticated"){
    return (
    <div className="bg-[#181b2b] w-full h-full pl-4 text-white">
    <div className="flex flex-row">
        <div className="w-8/12 h-[98vh] rounded-xl border-[#8DECB4] border-2 ml-2 mt-2 mb-2 pl-2 pr-2 pt-2">
        <div className="bg-[#2e3352] rounded-xl w-full h-[87vh] pl-2 pr-2 pb-2 text-lg overflow-y-auto">smtg eher ot cjeck paddng </div>
        <textarea className="bg-[#2e3352] rounded-xl w-full h-16 mt-2 outline-none pl-2 max-h-16 min-h-16 text-lg"></textarea>
        </div>
        <div className="w-4/12 max-h-[98vh] h-[98vh] rounded-xl border-[#8DECB4] border-2 mt-2 mb-2 ml-2 mr-2">
        <iframe className="w-full rounded-t-xl h-80 border-b border-[#8DECB4]" src={`https://www.youtube.com/embed/${search}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h2 className="pl-4 pt-4 pb-4 max-h-[60vh] overflow-y-auto text-lg">video descrioption checkin gwrap checkin gwrap checkin gwrap checkin gwrapcheckin gwrapcheckin gwrapcheckin checkin gwrap checkin gwrap checkin gwrap checkin gwrapcheckin gwrap checkin gwrap checkin gwrapcheckin gwrap checkin gwrap checkin gwrap checkin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapcheckin gwrapvgwrapcheckin gwrapcheckin gwrap</h2>
        </div>
    </div>
    </div>
    
    );
};}

export default HomePage;