"use client";
import { useEffect, useTransition, useState } from "react";
import dynamic from "next/dynamic";
// const InstagramEmbed = dynamic(() => import("../[eventId]/InstagramEmbed").then((mod) => mod.InstagramEmbed), {
//    loading: () => <p>Loading...</p>,
// });
// const Date = dynamic(() => import("./Date").then((mod) => mod.Date), {
//    loading: () => <p>Loading...</p>,
// });
// import { Date } from "./Date";
import { Venmo } from "./form/Venmo";
// import { InstagramEmbed } from "./InstagramEmbed";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPaymentLink } from "./api";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { headers, cookies } from "next/headers";
export const revalidate = 0;
import Script from "next/script";
import { createClient } from "@supabase/supabase-js";
async function getEvent(eventHandle: string) {
   // const supabase = createServerComponentSupabaseClient({
   //    supabaseUrl: "https://ztjwnqoxzawzchzggpew.supabase.co",
   //    supabaseKey:
   //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk",
   //    headers,
   //    cookies,
   // });

   const supabase = createClient(
      "https://ztjwnqoxzawzchzggpew.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk"
   );

   let { data: event, error } = await supabase.from("events").select("*").eq("handle", eventHandle).single();

   return event;
}

export default async function Home({ params: { eventHandle } }: { params: { eventHandle: string } }) {
   // const router = useRouter();
   // let [paymentLink, setPaymentLink] = useState();
   // useEffect(() => {
   //    getPaymentLink("prod_NsOJPEMZDCWyhV", 2500).then((r) => {
   //       setPaymentLink(r.url);
   //    });
   // }, []);
   const event = await getEvent(eventHandle);
   console.log(event);
   // console.log(formatDateHuman(event.start_time));
   return (
      <>
         <div className="bg-black flex-grow ">
            <div className="bg-black h-20 grid place-items-center px-[10%] ">
               <div className="bg-neutral-900 max-w-[700px] w-full h-12 rounded-md text-white flex flex-row items-center justify-center">
                  <div className="text-white bg-red-700 py-[1px] px-2 rounded-md text-xs flex flex-row items-center mr-2">
                     <div className="bg-white h-2 w-2 rounded-full animate-pulse mr-2"></div>
                     <p>LIVE</p>
                  </div>
                  <p className="text-sm text-neutral-300 tracking-wide ">
                     {/* <span className="text-xl mr-1">🔥</span>  */}
                     <span className="font-semibold text-white">14</span> tickets left at this price
                  </p>
               </div>
            </div>
            <div className="flex flex-col  items-center w-full h-full ">
               <main className="flex lg:w-full lg:flex-row flex-col items-start justify-between lg:px-[10%] px-5 h-full lg:max-w-none pb-7 pt-5 ">
                  <div className="z-10 w-full flex flex-col  text-sm lg:w-2/3 mr-5 ">
                     <div className="flex flex-row child:mr-2">
                        <div className=" bg-indigo-800  py-[1px] px-2 mb-2 text-indigo-100 rounded-md  text-xs font-semibold flex flex-row items-center  ">
                           <p className="">
                              <span className="text-sm mr-2">⏳</span>
                              {getTimeLeftUntil(new Date("2023-09-16"))}
                           </p>
                        </div>
                        <div className=" bg-red-800  py-[1px] px-2 mb-2 text-indigo-100 rounded-md self-start text-xs font-semibold flex flex-row items-center  ">
                           <p className="">
                              <span className="text-sm mr-2">🔥</span>
                              Price is increasing
                           </p>
                        </div>
                     </div>

                     <div className=" mt-2  text-2xl font-bold text-neutral-100">
                        <span className="text-3xl font-bold animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent ">
                           {event.name}
                        </span>{" "}
                        {/* <span className=" text-base text-neutral-400 font-light"> on </span>{" "} */}
                        {/* <Date event={event} /> */}
                        <span className=" text-xl  font-light">{formatDateHuman(event.start_time)}</span>{" "}
                        {/* <span className=" text-base text-neutral-400 font-light"> @ </span> */}
                        {/* <span className=" text-xl  font-light">{formatDateAndTime(event.start_time).time}</span> */}
                     </div>
                     <div className="text-2xl font-bold text-neutral-100"></div>
                     <div className="flex flex-row items-center mt-1">
                        <p className="text-2xl font-bold text-neutral-100">
                           <span className=" text-sm text-neutral-400 font-light">Presented by</span>{" "}
                           <span className=" text-base  font-light">@kishansripada</span>{" "}
                           <span className=" text-sm text-neutral-400 font-light">and</span>{" "}
                           <span className=" text-base  font-light">@instgramusername</span>
                        </p>
                     </div>
                     <div className="py-10 flex flex-row ">
                        <img className="h-16 rounded-full mr-4" src="/michigan.jpeg" alt="" />
                        <img className="h-16 rounded-full" src="/msu.jpeg" alt="" />
                     </div>
                     <div className="flex flex-row items-center  text-sm">
                        <p className="text-2xl mr-2">📍</p>
                        <p className="  font-light text-neutral-300">Rogel Ballroom @ The Michigan Union</p>
                     </div>
                     <div className="flex flex-row items-center  text-sm">
                        <p className="text-2xl mr-2">⏰ </p>
                        <p className="  font-light text-neutral-300">3 hours long</p>
                     </div>
                     <div className="flex flex-row items-center mt-3">
                        <p className="text-white ">add to your calendar</p>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6 stroke-white ml-2"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                     </div>

                     <div>
                        <p className="font-light text-neutral-300 text-lg mt-7">
                           {/* <span className="text-2xl mr-2">ℹ️</span> */}
                           We are going to be having our first ever Punjabi Gala on September 17th at 7:00pm! This will be held at University of
                           Michigan’s Rogel Ballroom in Ann Arbor. This is a formal night filled with food, music with a live DJ, bhangra and giddha
                           performances, and an open dance floor! The Google Form is listed below to purchase tickets. You don’t want to miss out!
                        </p>
                     </div>
                  </div>
                  <div className="mt-10 lg:mt-0 lg:w-1/3 max-w-[90%] overflow-clip">
                     <img src="/gala.png" className=" border border-neutral-600 rounded-md" alt="" />

                     {/* <InstagramEmbed event={event}></InstagramEmbed> */}
                  </div>
               </main>
            </div>

            <div className="h-24 w-full fixed bottom-0  border-t border-neutral-700 flex flex-row items-center px-5 lg:px-10 z-50 bg-black">
               <div className=" lg:justify-end justify-between flex flex-row items-center w-full ">
                  <div className="flex flex-row items-end mr-6 ">
                     <p className="text-2xl font-semibold text-white ">$25</p>
                  </div>

                  <Link href={`/${eventHandle}/form`}>
                     <div className="text-black bg-white  px-4 py-2 rounded-full flex flex-row items-center">
                        <p>get tickets</p>
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
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}

function getTimeLeftUntil(date: Date): string {
   let now = new Date();
   let diff = date.getTime() - now.getTime();

   if (diff <= 0) {
      return "The event has already occurred";
   }

   let diffInSeconds = Math.floor(diff / 1000);
   let diffInMinutes = Math.floor(diffInSeconds / 60);
   let diffInHours = Math.floor(diffInMinutes / 60);
   let diffInDays = Math.floor(diffInHours / 24);

   if (diffInDays > 0) {
      return `${diffInDays} days left`;
   } else if (diffInHours > 0) {
      return `${diffInHours} hours left`;
   } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minutes left`;
   } else {
      return `${diffInSeconds} seconds left`;
   }
}

function formatDateHuman(dateStr: string): string {
   const now = new Date();
   const inputDate = new Date(dateStr);

   const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const dayOfWeek = dayNames[inputDate.getDay()];

   const optionsDate: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
   const optionsTime: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric", hour12: true };

   let strDate = new Intl.DateTimeFormat("en-US", optionsDate).format(inputDate);
   let strTime = new Intl.DateTimeFormat("en-US", optionsTime).format(inputDate);

   // Add appropriate ordinal suffix to the day
   let day = inputDate.getDate();
   let suffix = "th";
   if (day % 10 == 1 && day != 11) {
      suffix = "st";
   } else if (day % 10 == 2 && day != 12) {
      suffix = "nd";
   } else if (day % 10 == 3 && day != 13) {
      suffix = "rd";
   }

   // Combine month name, day with suffix
   strDate = strDate.replace(new RegExp(day + "$"), `${day}${suffix}`);

   // Convert AM/PM to lowercase
   strTime = strTime.replace("AM", "am").replace("PM", "pm");

   // Check if date is today or tomorrow
   if (now.toDateString() === inputDate.toDateString()) {
      return `today @ ${strTime}`;
   } else if (now.getDate() + 1 === inputDate.getDate() && now.getMonth() === inputDate.getMonth() && now.getFullYear() === inputDate.getFullYear()) {
      return `tmrw @ ${strTime}`;
   } else if (
      now.getDate() <= inputDate.getDate() &&
      now.getDate() + 7 > inputDate.getDate() &&
      now.getMonth() === inputDate.getMonth() &&
      now.getFullYear() === inputDate.getFullYear()
   ) {
      return `this ${dayOfWeek}, ${strDate} @ ${strTime}`;
   } else if (
      now.getDate() + 7 <= inputDate.getDate() &&
      now.getDate() + 14 > inputDate.getDate() &&
      now.getMonth() === inputDate.getMonth() &&
      now.getFullYear() === inputDate.getFullYear()
   ) {
      return `next ${dayOfWeek}, ${strDate} @ ${strTime}`;
   } else {
      return `${dayOfWeek}, ${strDate} @ ${strTime}`;
   }
}
