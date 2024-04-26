import Link from "next/link";
import profile from "../../../data/profile.json";
import { Button } from "@/components/ui/button";

const JournalPage = () => {
  const profileData = profile.data;
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-4 items-center">
        <h2 className="text-6xl font-bold">
          Welcome, {profileData.firstName}!
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
          <Link href={`/journals`}>
            <Button
              variant="ghost"
              className="rounded-full border border-primary px-10 py-6 text-lg"
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
