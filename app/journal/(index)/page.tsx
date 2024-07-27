'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";
// import { useUser } from "@/context/user-context";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

const JournalPage = () => {


  const user = JSON.parse(localStorage.getItem('studentUser')!)

  usePublicRouteRedirect();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-4 items-center">
        <h2 className="text-6xl font-bold">
          Welcome, {user?.userName ? user?.userName : user?.firstName}!
        </h2>
        <p className="text-primary/80 text-xl">
          Ready to jot down or revisit your journal? Let&apos;s start!
        </p>
        <div className="flex gap-x-4 mt-4">
          <Link href={`/journal/create`}>
            <Button className="rounded-full px-10 py-6 text-lg">
              Create Journal
            </Button>
          </Link>
          <Link href="/journals">
            <Button
              variant="outline"
              className="rounded-full border border-primary/50 px-10 py-6 text-lg"
            >
              My Journals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
