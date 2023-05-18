import { NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
export async function POST(request: Request) {
   const supabase = createClient(
      "https://ztjwnqoxzawzchzggpew.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk"
   );

   const { searchParams } = new URL(request.url);
   const id = searchParams.get("id");
   const res = await request.json();
   let wwdr = await fs.readFile(path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "certs", "wwdr.pem"));
   let signerKey = await fs.readFile(path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "certs", "signerKey.pem"));
   let signerCert = await fs.readFile(path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "certs", "signerCert.pem"));
   // console.log(wwdr);
   try {
      /** Each, but last, can be either a string or a Buffer. See API Documentation for more */
      // const { wwdr, signerCert, signerKey, signerKeyPassphrase } = getCertificatesContentsSomehow();

      const pass = await PKPass.from(
         {
            /**
             * Note: .pass extension is enforced when reading a
             * model from FS, even if not specified here below
             */
            model: path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "Event.pass"),
            certificates: {
               wwdr,
               signerCert,
               signerKey,
               signerKeyPassphrase: "test",
            },
         },
         {
            serialNumber: "AAGH44625236dddaffbda",
            description: res.description,
            foregroundColor: res.foregroundColor,
            backgroundColor: res.backgroundColor,
            labelColor: res.labelColor,
         }
      ).then(async (newPass) => {
         for (let i = 0; i < res.eventTicket.primaryFields.length; i++) {
            newPass.primaryFields.push(res.eventTicket.primaryFields[i]);
         }
         for (let i = 0; i < res.eventTicket.secondaryFields.length; i++) {
            newPass.secondaryFields.push(res.eventTicket.secondaryFields[i]);
         }
         for (let i = 0; i < res.eventTicket.auxiliaryFields.length; i++) {
            newPass.auxiliaryFields.push(res.eventTicket.auxiliaryFields[i]);
         }

         newPass.setLocations(res.locations);
         newPass.setBarcodes(res.qrcontents);
         newPass.setExpirationDate(new Date(res.expirationDate));
         newPass.setRelevantDate(new Date(res.relevantDate));
         const bufferData = newPass.getAsBuffer();
         const { data, error } = await supabase.storage
            .from("passes")
            .upload(`${res.qrcontents}.pkpass`, bufferData, { contentType: "application/vnd.apple.pkpass" });

         // console.log(error);
         // fs.writeFile(`${res.qrcontents}.pkpass`, bufferData);
      });
   } catch (err) {
      console.log(err);
      // doSomethingWithTheError(err);
   }
   // console.log(res);

   return NextResponse.json({ request: res });
}
