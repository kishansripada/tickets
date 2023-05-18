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

   // console.log(res);
   supabase.from("tickets").insert({ purchase_price: 25 });
   return NextResponse.json({ request: "purchase complete" });
}
