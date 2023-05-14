// "use client";
import { useEffect, useTransition, useState } from "react";
import dynamic from "next/dynamic";
import { Form } from "./Form";
// const InstagramEmbed = dynamic(() => import("../[eventId]/InstagramEmbed").then((mod) => mod.InstagramEmbed), {
//    loading: () => <p>Loading...</p>,
// });
import { Venmo } from "./Venmo";
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

   const event = await getEvent(eventHandle);
   console.log(event);
   return (
      <>
         <div className="bg-neutral-900 h-screen flex flex-col items-center w-full py-20 ">
            <p className="text-white text-3xl mb-9">{event.name}</p>
            <Form event={event}></Form>
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
