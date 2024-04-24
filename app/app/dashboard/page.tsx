"use client"
import { useSearchParams } from 'next/navigation';
import {useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Home from '../page'
const HomePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('v');
  const session = useSession();
  const router = useRouter();
  const [validation, set_validation] = useState();
  const [links, set_links] = useState([]);
  const [images, set_images] = useState([]);
  const [loading, set_loading] = useState(false);
  

  const validate = async () => {
      //set_loading(true);
      const response = await axios.post("http://localhost:8000/api/guard-the-fact", { url: search });
      console.log(response.data)
      //set_validation(response.data.final);
      //set_links(response.data.links);
      //set_images(response.data.images);
  };

  if (session.status === "loading") {
      return (
          <div className="fixed top-[25.5vh] left-[41.5vw]">
              <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2N4eWw2c3F0dnRkcDJqMDNyNWdsanIxeHh4dmdudHRlZ2Z0dzB4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zFwqvI1atpDkLPhBgY/giphy.gif" alt="loading" />
          </div>
      );
  }

  if (session.status === "unauthenticated") {
      router.push("/signin");
  }

  return (
      <div className="bg-[#181b2b] w-full h-full pl-4 text-white">
          <div className="flex flex-row">
              <div className="w-8/12 h-[98vh] rounded-xl border-[#8DECB4] border-2 ml-2 mt-2 mb-2 pl-2 pr-2 pt-2">
                  <div className="bg-[#2e3352] rounded-xl w-full h-[87vh] pl-2 pr-2 pb-2 text-lg overflow-y-auto">
                      {!loading && <Home />}
                      {loading && (
                          <>
                              <h2 className="p-5">{validation}</h2>
                              <div className="grid grid-cols-2 gap-7 ml-4 mr-4">
                                  {links.map((link, index) => (
                                      <button key={index} className="h-[19.75vh] overflow-hidden bg-[#181b2b] border-[#8DECB4] border rounded-xl mt-2 hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105" onClick={() => window.open(link.url, '_blank')}>
                                          <div className={`flex flex-col justify-center text-white text-center rounded-tr-lg rounded-br-lg p-4`}>
                                              <h2 className="text-lg mt-2">{link.title}</h2>
                                              <p className="text-sm text-[#8DECB4] mt-2">{link.content}</p>
                                          </div>
                                      </button>
                                  ))}
                              </div>
                              <div className="grid grid-cols-2 gap-7 ml-4 mr-4 mt-4">
                                  {images.map((link, index) => (
                                      <button key={index} className="h-auto w-auto overflow-hidden bg-[#181b2b] border-[#8DECB4] border rounded-xl mt-2 hover:shadow-2xl transition-all duration-500 ease-in-out hover:scale-105" onClick={() => window.open(link, '_blank')}>
                                          <div className={`flex flex-col justify-center text-white text-center rounded-tr-lg rounded-br-lg p-4`}>
                                              <button><img src={link} alt={`image_${index}`} /></button>
                                          </div>
                                      </button>
                                  ))}
                              </div>
                          </>
                      )}
                  </div>
                  <button onClick={validate} className="bg-[#8DECB4] rounded-xl w-full h-16 mt-2 outline-none pl-2 max-h-16 min-h-16 text-xl text-black font-bold active:bg-[#181b2b] active:border-[#8DECB4] active:border-2 active:text-[#8DECB4]">Proceed</button>
              </div>
              <div className="w-4/12 max-h-[98vh] h-[98vh] rounded-xl border-[#8DECB4] border-2 mt-2 mb-2 ml-2 mr-2">
                  <iframe className="w-full rounded-t-xl h-80 border-b border-[#8DECB4]" src={`https://www.youtube.com/embed/${search}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen title="YouTube video"></iframe>
                  <button onClick={()=>{set_loading(false)}} className="mt-4 bg-[#8DECB4] ml-1 rounded-xl w-[27vw] h-16 mt-2 outline-none pl-2 max-h-16 min-h-16 text-xl text-black font-bold active:bg-[#181b2b] active:border-[#8DECB4] active:border-2 active:text-[#8DECB4]">+ New Video</button>
              </div>
          </div>
      </div>
  );
};

export default HomePage;
