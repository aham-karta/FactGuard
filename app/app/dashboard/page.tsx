"use client"
import { useSearchParams } from 'next/navigation';
const HomePage = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('v');
    console.log("it is "+search)
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
};

export default HomePage;