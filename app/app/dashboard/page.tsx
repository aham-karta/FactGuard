"use client";

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Suspense } from 'react';

const HomePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('v');
  const session = useSession();
  const router = useRouter();
  const [validation, setValidation] = useState<string>('');
  const [links, setLinks] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [newLink, setNewLink] = useState<string>('');

  // useEffect(() => {
  //   if (search) {
  //     validate();
  //   }
  // }, [search]);

  const validate = async () => {
    const response = await axios.post("http://localhost:8000/api/guard-the-fact", { url: search });
    console.log(response.data);
    setValidation(response.data.text);
    setLinks(removeDuplicates(response.data.links || []));
    setImages(removeDuplicates(response.data.images || []));
  };

  const removeDuplicates = (array: string[]) => {
    return Array.from(new Set(array));
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
            {validation.length>0 &&(<div><h2 className="pt-4 pl-4 font-mono text-2xl underline">Summary - </h2>
            <h2 className="p-8 text-justify font-mono text-white">{validation}</h2></div>)}
            <div>
              {images.length > 0 && (
                <div>
                  <h3 className="pt-4 pl-4 font-mono text-2xl underline">Images - </h3>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div>
                    <img key={index} src={image} alt={`image-${index}`} className="w-full h-auto rounded-lg" />
                    <br></br>
                    </div>
                    ))}
                  </div>
                </div>
              )}
              {links.length > 0 && (
                <div>
                  <h3 className="pt-4 pl-4 font-mono text-2xl underline">Links - </h3>
                  <ul className="p-4 list-disc list-inside">
                    {links.map((link, index) => (
                      <div>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#8DECB4] hover:underline font-mono">{link}</a>
                      <br></br>
                      <br></br>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button onClick={validate} className="bg-[#8DECB4] rounded-xl w-full h-16 mt-2 outline-none pl-2 max-h-16 min-h-16 text-xl text-black font-bold active:bg-[#181b2b] active:border-[#8DECB4] active:border-2 active:text-[#8DECB4]">Proceed</button>
        </div>
        <div className="w-4/12 max-h-[98vh] h-[98vh] rounded-xl border-[#8DECB4] border-2 mt-2 mb-2 ml-2 mr-2">
          <iframe className="w-full rounded-t-xl h-80 border-b border-[#8DECB4]" src={`https://www.youtube.com/embed/${search}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen title="YouTube video"></iframe>
          <div className="flex flex-col items-center">
            <input className="mt-48 w-11/12 outline-none text-[#8DECB4] font-mono bg-transparent border-b-2 border-[#8DECB4] text-center placeholder:text-xl text-xl" placeholder="paste link here" type="text" onChange={(e) => { setNewLink(e.target.value) }} value={newLink}></input>
            <button onClick={() => { router.push("/dashboard?v=" + newLink.slice(newLink.lastIndexOf('=') + 1)) }} className="bg-[#8DECB4] rounded-xl w-11/12 h-16 mt-2 outline-none max-h-16 min-h-16 text-xl text-black font-bold active:bg-[#181b2b] active:border-[#8DECB4] active:border-2 active:text-[#8DECB4]">+ New Video</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HomePage />
  </Suspense>
);

export default HomePageWrapper;
