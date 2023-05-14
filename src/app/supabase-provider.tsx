"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

type MaybeSession = Session | null;

type SupabaseContext = {
   supabase: SupabaseClient<Database>;
   session: MaybeSession;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({ children, session }: { children: React.ReactNode; session: MaybeSession }) {
   const [supabase] = useState(() =>
      createBrowserSupabaseClient({
         supabaseUrl: "https://ztjwnqoxzawzchzggpew.supabase.co",
         supabaseKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0anducW94emF3emNoemdncGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMzAyMTksImV4cCI6MTk5OTYwNjIxOX0.aoaY3o7uzJSbCps6U23dhTjtaYTyIDV8FAlwbbp3Kzk",
      })
   );
   const router = useRouter();

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(() => {
         router.refresh();
      });

      return () => {
         subscription.unsubscribe();
      };
   }, [router, supabase]);

   return (
      <Context.Provider value={{ supabase, session }}>
         <>{children}</>
      </Context.Provider>
   );
}

export const useSupabase = () => {
   const context = useContext(Context);

   if (context === undefined) {
      throw new Error("useSupabase must be used inside SupabaseProvider");
   }

   return context;
};
