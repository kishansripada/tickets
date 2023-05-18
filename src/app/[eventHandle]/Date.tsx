"use client";
// import { useEffect, useTransition, useState } from "react";
import Script from "next/script";
import Image from "next/image";
// import { getPaymentLink } from "./api";

export function Date({ event }) {
   //    console.log(event);
   return (
      <>
         <span className=" text-xl  font-light">{formatDateHuman(event.start_time)}</span>{" "}
      </>
   );
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
