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
// import { Venmo } from "./form/Venmo";
// import { InstagramEmbed } from "./InstagramEmbed";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import QRCode from "react-qr-code";

// import { getPaymentLink } from "./api";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { headers, cookies } from "next/headers";
export const revalidate = 0;
import Script from "next/script";
import { createClient } from "@supabase/supabase-js";
// async function getEvent(eventHandle: string) {
//    // const supabase = createServerComponentSupabaseClient({
//    //    supabaseUrl: "https://ztjwnqoxzawzchzggpew.supabase.co",
//    //    supabaseKey:
//    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk",
//    //    headers,
//    //    cookies,
//    // });

//    const supabase = createClient(
//       "https://ztjwnqoxzawzchzggpew.supabase.co",
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk"
//    );

//    let { data: event, error } = await supabase.from("events").select("*").eq("handle", eventHandle).single();

//    return event;
// }

export default async function Home({ params: { id } }: { params: { id: string } }) {
   // const router = useRouter();
   // let [paymentLink, setPaymentLink] = useState();
   // useEffect(() => {
   //    getPaymentLink("prod_NsOJPEMZDCWyhV", 2500).then((r) => {
   //       setPaymentLink(r.url);
   //    });
   // }, []);
   //    const event = await getEvent(eventHandle);
   //    console.log(event);
   // console.log(formatDateHuman(event.start_time));
   return (
      <>
         <div className="bg-black flex-grow text-white flex flex-col items-center ">
            <div className="lg:w-[400px] w-full px-5 lg:px-0 text-white ">
               {/* <p className="text-right text-xs">{id}</p> */}
               <p className="text-center text-3xl py-4">you're all set, kishan 👍</p>
               {/* <p>name</p> */}
               <div className="border border-white" style={{ height: "auto", margin: "0 auto", maxWidth: 170, width: "100%" }}>
                  <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={id} viewBox={`0 0 256 256`} />
               </div>
               <div className="w-full flex flex-row mt-4 justify-center">
                  <a target="_blank" href={"https://ztjwnqoxzawzchzggpew.supabase.co/storage/v1/object/public/passes/with%20header.pkpass"}>
                     <img className="w-[170px] " src="/addtowallet.svg" alt="" />
                  </a>
               </div>
            </div>
         </div>
      </>
   );
}
