import Image from "next/image";

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-start px-5 xl:px-36 bg-black overflow-hidden relative">
         <div className=" text-6xl sm:text-6xl md:text-9xl xl:text-[150px] xl:leading-[1]  text-white font-bold pt-12">
            <p
               style={{
                  color: "transparent",
                  // webkitBackgroundClip: "text",
                  backgroundClip: "text",
               }}
               className="relative z-10 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent   font-bold "
            >
               automatic, tiered pricing for your campus event
            </p>
         </div>
         <p className="mx-auto text-sm xl:text-2xl mt-8 px-[5%] text-center sm:mt-10 sm:max-w-md sm:px-0 md:mt-12 md:max-w-lg xl:mt-14 xl:max-w-xl text-white">
            the simplest way to sell tickets to your small to medium scale campus event. let us handle the pricing tiers and venmo requests so that
            you can focus on your event.
         </p>
         <img className="w-[250px] right-[50px] top-[200px] rotate-12 absolute" src="/iphone.png" alt="" />
         <a href="https://forms.gle/HgNNmuoXCSvJRdVk7">
            <div className="text-black bg-white mt-7 px-4 py-2 rounded-full flex flex-row items-center">
               <p>request for an event</p>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
               </svg>
            </div>
         </a>
      </main>
   );
}
