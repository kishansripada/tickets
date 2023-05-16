"use client";
import { useEffect, useTransition, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { getPaymentLink } from "../api";

import { useRouter } from "next/navigation";
import { Venmo } from "./Venmo";
export function Form({ event }) {
   const router = useRouter();
   const [formData, setFormData] = useState({ name: "", email: "", university: "" });
   let [paymentLink, setPaymentLink] = useState();
   useEffect(() => {
      if (!isValidEmail(formData.email)) return;
      getPaymentLink("prod_NsOJPEMZDCWyhV", Math.round(2500 / 0.94), formData.email).then((r) => {
         setPaymentLink(r.url);
      });
   }, [formData.email]);
   const addVenmoButton = () => {
      paypal.Buttons().render("#paypal-button-container");
   };

   return (
      <div className="lg:w-[400px] w-full px-5 lg:px-0 text-white text-sm ">
         <p className="text-center text-base py-4"> just a few questions and you'll be on your way ⚡️</p>
         <p>name</p>
         <div className="bg-neutral-700 border-2 p-2 border-purple-600 rounded-md flex flex-row justify-between items-center">
            <input
               autoCapitalize="none"
               onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value.toLowerCase() });
               }}
               value={formData.name}
               spellCheck="false"
               type="name"
               className=" h-8 w-full text-xl bg-neutral-700 focus:outline-none"
            />
            {formData.name.length ? <p className="text-xl">✅</p> : null}
         </div>
         <p className="mt-3">email</p>
         <div className="bg-neutral-700 border-2 p-2 border-purple-600 rounded-md flex flex-row justify-between items-center">
            <input
               autoCapitalize="none"
               onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value.toLowerCase() });
               }}
               spellCheck="false"
               type="email"
               className=" h-8 w-full text-xl bg-neutral-700 focus:outline-none"
            />
            {isValidEmail(formData.email) ? <p className="text-xl">✅</p> : null}
         </div>
         <p className="mt-3">university</p>
         <div className="bg-neutral-700 border-2 p-2 border-purple-600 flex rounded-md flex-row justify-between items-center">
            <input
               autoCapitalize="none"
               onChange={(e) => {
                  setFormData({ ...formData, university: e.target.value.toLowerCase() });
               }}
               value={formData.university}
               spellCheck="false"
               className=" h-8 w-full text-xl bg-neutral-700 focus:outline-none"
            />
            {formData.university.length ? <p className="text-xl">✅</p> : null}
         </div>
         <Script
            onLoad={addVenmoButton}
            src="https://www.paypal.com/sdk/js?client-id=AenK64-hOKcbxbJfrU2gj0iOMKl8iPAOmWsgxR-j9kMzf8pZX96IG2V4t-VEFGk5mgcAGxxwg-vb92P6&enable-funding=venmo"
         />
         <div id="paypal-button-container"></div>
         <div
            style={{
               opacity: formData.name.length && isValidEmail(formData.email) && formData.university.length ? 1 : 0,
            }}
            className="flex flex-row items-center justify-center transition duration-300 mt-8"
         >
            <div
               onClick={() => {
                  router.push(createVenmoLink(event.venmo_username, 25, `${formData.name}\n${formData.email}\n${event.name}`));
               }}
               className="cursor-pointer border border-white rounded-md px-3 py-2  "
            >
               <Venmo></Venmo>
            </div>

            <p className="text-lg px-5">or</p>
            <div
               className="flex flex-row items-center cursor-pointer border border-white rounded-md px-3 "
               onClick={() => {
                  router.push(paymentLink);
               }}
            >
               <div className="border-white border-r mr-3 ">
                  {" "}
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className=" h-7 my-2 mr-3"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                     />
                  </svg>
               </div>

               {/* <p className="text-white text-3xl mx-3">|</p> */}

               <div>
                  <svg className={"fill-white h-7"} xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" viewBox="0 0 512 210.2">
                     <path d="M93.6 27.1C87.6 34.2 78 39.8 68.4 39c-1.2-9.6 3.5-19.8 9-26.1 6-7.3 16.5-12.5 25-12.9 1 10-2.9 19.8-8.8 27.1m8.7 13.8c-13.9-.8-25.8 7.9-32.4 7.9-6.7 0-16.8-7.5-27.8-7.3-14.3.2-27.6 8.3-34.9 21.2-15 25.8-3.9 64 10.6 85 7.1 10.4 15.6 21.8 26.8 21.4 10.6-.4 14.8-6.9 27.6-6.9 12.9 0 16.6 6.9 27.8 6.7 11.6-.2 18.9-10.4 26-20.8 8.1-11.8 11.4-23.3 11.6-23.9-.2-.2-22.4-8.7-22.6-34.3-.2-21.4 17.5-31.6 18.3-32.2-10-14.8-25.6-16.4-31-16.8m80.3-29v155.9h24.2v-53.3h33.5c30.6 0 52.1-21 52.1-51.4s-21.1-51.2-51.3-51.2h-58.5zm24.2 20.4h27.9c21 0 33 11.2 33 30.9s-12 31-33.1 31h-27.8V32.3zM336.6 169c15.2 0 29.3-7.7 35.7-19.9h.5v18.7h22.4V90.2c0-22.5-18-37-45.7-37-25.7 0-44.7 14.7-45.4 34.9h21.8c1.8-9.6 10.7-15.9 22.9-15.9 14.8 0 23.1 6.9 23.1 19.6v8.6l-30.2 1.8c-28.1 1.7-43.3 13.2-43.3 33.2 0 20.2 15.7 33.6 38.2 33.6zm6.5-18.5c-12.9 0-21.1-6.2-21.1-15.7 0-9.8 7.9-15.5 23-16.4l26.9-1.7v8.8c0 14.6-12.4 25-28.8 25zm82 59.7c23.6 0 34.7-9 44.4-36.3L512 54.7h-24.6l-28.5 92.1h-.5l-28.5-92.1h-25.3l41 113.5-2.2 6.9c-3.7 11.7-9.7 16.2-20.4 16.2-1.9 0-5.6-.2-7.1-.4v18.7c1.4.4 7.4.6 9.2.6z" />
                  </svg>
               </div>
            </div>
         </div>
      </div>
   );
}

const isValidEmail = (email: string) => {
   return String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

function createVenmoLink(recipients: string, amount: number, note: string): string {
   const baseUrl = "https://venmo.com/?txn=pay&audience=private";
   const encodedNote = encodeURIComponent(note);

   return `${baseUrl}&recipients=${recipients}&amount=${amount.toFixed(2)}&note=${encodedNote}`;
}
