"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { categories, siteNames } from "@/config/categories";

export default function Home() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error("Error checking email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-start min-h-screen max-w-1/2 mx-auto">
      <section className="flex items-center w-full">
        <h1 className="font-bold">willow</h1>
        <div className="ml-auto">
          <HoverCard>
            <HoverCardTrigger>
              <div className="inline-flex items-center justify-center rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                ?
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    by using this tool you agree not to do uncool things with it
                  </h4>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>
      <p>
        input an email address and see in which websites they have registered
        accounts
      </p>
      <section className="flex items-center mt-2 space-x-2 w-full">
        <Input
          className="flex-grow"
          type="email"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleCheck} disabled={loading}>
          {loading ? "Checking..." : "gimme the info"}
        </Button>
      </section>
      <section className="flex flex-col justify-center items-start mt-10 w-full py-4">
        {results && (
          <div className="w-full space-y-6">
            {Object.entries(categories).map(([category, sites]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold border-b pb-2 lowercase">{category}</h3>
                <div className="space-y-1 lowercase">
                  {sites.map((site) => (
                    <div
                      key={site}
                      className="flex justify-between items-center py-1 px-2 hover:bg-slate-50 rounded"
                    >
                      <span>{siteNames[site] || site}</span>
                      <span>
                        {results[site] ? "✅" : "🚫"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
