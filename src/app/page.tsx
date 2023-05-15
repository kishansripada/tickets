import Image from "next/image";

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-start px-5 xl:px-36 bg-black">
         <div className=" text-5xl sm:text-6xl md:text-9xl xl:text-[150px] xl:leading-[1]  text-white font-bold pt-20">
            <p
               style={{
                  color: "transparent",
                  // webkitBackgroundClip: "text",
                  backgroundClip: "text",
               }}
               className=" animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent   font-bold "
            >
               automatic, tiered pricing for your campus event
            </p>
         </div>
         <p className="mx-auto text-base xl:text-2xl mt-8 px-[5%] text-center sm:mt-10 sm:max-w-md sm:px-0 md:mt-12 md:max-w-lg xl:mt-14 xl:max-w-xl text-white">
            the simplest way to sell tickets to your small to medium scale campus event. let us handle the pricing tiers and venmo requests so that
            you can focus on your event.
         </p>
      </main>
   );
}
