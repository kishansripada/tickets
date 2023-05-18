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
   // let wwdr = await fs.readFile(path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "certs", "wwdr.pem"));
   // let signerKey = await fs.readFile(path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "certs", "signerKey.pem"));
   // let signerCert = await fs.readFile(path.join(process.cwd(), "src", "app", "api", "getapplewalletpass", "certs", "signerCert.pem"));

   // console.log(wwdr);
   const baseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : "http://localhost:8080";

   const [wwdrRes, signerKeyRes, signerCertRes] = await Promise.all([
      fetch(`${baseUrl}/certs/wwdr.pem`),
      fetch(`${baseUrl}/certs/signerKey.pem`),
      fetch(`${baseUrl}/certs/signerCert.pem`),
   ]);
   const wwdrArrayBuffer = await wwdrRes.arrayBuffer();
   const signerKeyArrayBuffer = await signerKeyRes.arrayBuffer();
   const signerCertArrayBuffer = await signerCertRes.arrayBuffer();

   const wwdr = Buffer.from(wwdrArrayBuffer);
   const signerKey = Buffer.from(signerKeyArrayBuffer);
   const signerCert = Buffer.from(signerCertArrayBuffer);
   // Fetch the files from the public directory

   const iconPng = await fetch(`${baseUrl}/Event.pass/icon.png`);
   const icon2xPng = await fetch(`${baseUrl}/Event.pass/icon@2x.png`);
   const logoPng = await fetch(`${baseUrl}/Event.pass/logo.png`);
   const logo2xPng = await fetch(`${baseUrl}/Event.pass/logo@2x.png`);

   const passJsonResponse = await fetch(`${baseUrl}/Event.pass/pass.json`);
   const passJson = await passJsonResponse.json();
   const passJsonBuffer = Buffer.from(JSON.stringify(passJson));

   // Convert the files to Buffer
   // const passJsonBuffer = Buffer.from(await passJson.json());
   const iconPngBuffer = Buffer.from(await iconPng.arrayBuffer());
   const icon2xPngBuffer = Buffer.from(await icon2xPng.arrayBuffer());
   const logoPngBuffer = Buffer.from(await logoPng.arrayBuffer());
   const logo2xPngBuffer = Buffer.from(await logo2xPng.arrayBuffer());

   try {
      /** Each, but last, can be either a string or a Buffer. See API Documentation for more */
      // const { wwdr, signerCert, signerKey, signerKeyPassphrase } = getCertificatesContentsSomehow();

      const newPass = new PKPass(
         {
            "pass.json": passJsonBuffer,
            "icon.png": iconPngBuffer,
            "icon@2x.png": icon2xPngBuffer,
            "logo.png": logoPngBuffer,
            "logo@2x.png": logo2xPngBuffer,
         },
         {
            /**
             * Note: .pass extension is enforced when reading a
             * model from FS, even if not specified here below
             */
            // model: path.join(__dirname, "Event.pass"),
            // certificates: {
            wwdr,
            signerCert,
            signerKey,
            signerKeyPassphrase: "test",
            // },
         },
         {
            serialNumber: "AAGH44625236dddaffbda",
            description: res.description,
            foregroundColor: res.foregroundColor,
            backgroundColor: res.backgroundColor,
            labelColor: res.labelColor,
         }
      );
      // .then(async (newPass) => {
      for (let i = 0; i < res.eventTicket.primaryFields.length; i++) {
         newPass.primaryFields.push(res.eventTicket.primaryFields[i]);
      }
      for (let i = 0; i < res.eventTicket.secondaryFields.length; i++) {
         newPass.secondaryFields.push(res.eventTicket.secondaryFields[i]);
      }
      for (let i = 0; i < res.eventTicket.auxiliaryFields.length; i++) {
         newPass.auxiliaryFields.push(res.eventTicket.auxiliaryFields[i]);
      }
      for (let i = 0; i < res.eventTicket.headerFields.length; i++) {
         newPass.headerFields.push(res.eventTicket.headerFields[i]);
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
      // });
   } catch (err) {
      console.log(err);
      // doSomethingWithTheError(err);
   }
   // console.log(res);

   return NextResponse.json({ request: res });
}
