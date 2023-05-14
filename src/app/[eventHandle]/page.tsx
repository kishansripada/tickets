// "use client";
import { useEffect, useTransition, useState } from "react";
import dynamic from "next/dynamic";
// const InstagramEmbed = dynamic(() => import("../[eventId]/InstagramEmbed").then((mod) => mod.InstagramEmbed), {
//    loading: () => <p>Loading...</p>,
// });
import { Venmo } from "./form/Venmo";
import { InstagramEmbed } from "./InstagramEmbed";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPaymentLink } from "./api";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
export const revalidate = 0;

async function getEvent(eventHandle: string) {
   const supabase = createServerComponentSupabaseClient({
      supabaseUrl: "https://ztjwnqoxzawzchzggpew.supabase.co",
      supabaseKey:
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk",
      headers,
      cookies,
   });

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
   return (
      <>
         <div className="bg-black ">
            <div className="bg-neutral-900 h-20 grid place-items-center px-[10%] ">
               <div className="bg-black max-w-[700px] w-full h-12 rounded-md text-white flex flex-row items-center justify-center">
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
            <div className="flex flex-col bg-neutral-900 items-center w-full h-full ">
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
                        <span className="text-3xl font-semibold text-neutral-100">{event.name}</span>{" "}
                        <span className=" text-base text-neutral-400 font-light"> on </span>{" "}
                        <span className=" text-xl  font-light">{formatDateAndTime(event.start_time).date}</span>{" "}
                        <span className=" text-base text-neutral-400 font-light"> @ </span>
                        <span className=" text-xl  font-light">{formatDateAndTime(event.start_time).time}</span>
                     </div>
                     <div className="text-2xl font-bold text-neutral-100"></div>
                     <div className="flex flex-row items-center mt-1">
                        <p className="text-2xl font-bold text-neutral-100">
                           <span className=" text-sm text-neutral-400 font-light">Presented by</span>{" "}
                           <span className=" text-base  font-light">@spartansikhs</span>{" "}
                           <span className=" text-sm text-neutral-400 font-light">and</span>{" "}
                           <span className=" text-base  font-light">@michigansikhs</span>
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
                     <div
                        className="mt-4 rounded-xl lg:mr-5"
                        style={{
                           // maxWidth: "100%",
                           listStyle: "none",
                           transition: "none",
                           overflow: "hidden",
                           // maxWidth: 400,
                           height: 200,
                        }}
                     >
                        <div id="embed-ded-map-canvas" style={{ height: "100%", width: "100%", maxWidth: "100%" }}>
                           <iframe
                              style={{
                                 height: "100%",
                                 width: "100%",
                                 border: 0,
                                 filter: "invert(90%)",
                              }}
                              src="https://www.google.com/maps/embed/v1/place?q=Michigan+Union,+South+State+Street,+Ann+Arbor,+MI,+USA&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                           />
                        </div>
                        <a className="from-embedmap-code" href="https://kbj9qpmy.com/hrn" id="grab-map-info">
                           Hosting Right Now
                        </a>
                        <style
                           dangerouslySetInnerHTML={{
                              __html:
                                 "#embed-ded-map-canvas img{max-width:none!important;background:none!important;font-size: inherit;font-weight:inherit;}",
                           }}
                        />
                     </div>
                  </div>
                  <div className="mt-10 lg:mt-0 lg:w-1/3 w-full ">
                     <InstagramEmbed event={event}></InstagramEmbed>
                  </div>
               </main>
            </div>

            <div className="h-24 w-full fixed bottom-0  border-t border-neutral-700 flex flex-row items-center px-5 lg:px-10 z-50 bg-black">
               <div className=" lg:justify-end justify-between flex flex-row items-center w-full ">
                  <div className="flex flex-row items-end mr-6 ">
                     {/* <p className="text-neutral-500 text-xs mr-3 mb-1">price locked in at</p> */}
                     <p className="text-2xl font-semibold text-white ">$25</p>
                  </div>

                  <Link href={`/${eventHandle}/form`}>
                     <button
                        // onClick={() => {
                        //    if (!paymentLink) return;
                        //    router.push(paymentLink);
                        // }}
                        className="bg-indigo-700 rounded-md px-4 py-2 text-white"
                     >
                        Get tickets
                     </button>
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

type DateAndTime = {
   date: string;
   time: string;
};

function formatDateAndTime(inputDate: string): DateAndTime {
   // Create a Date object from the input string
   let dateObj = new Date(inputDate);

   // Define an array with the names of the months
   let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   // Format the date
   let day = dateObj.getDate();
   let suffix = ["th", "st", "nd", "rd"][(day - 20) % 10] || ["th", "st", "nd", "rd"][day] || "th";
   let date = `${monthNames[dateObj.getMonth()]} ${day}${suffix}`;

   // Format the time
   let hours = dateObj.getHours();
   let minutes = dateObj.getMinutes();
   let ampm = hours >= 12 ? "pm" : "am";
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   let minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
   let time = `${hours}:${minutesStr}${ampm}`;

   // Return the formatted date and time
   return { date, time };
}
