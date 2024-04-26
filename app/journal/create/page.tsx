"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import BackgroundPattern from "@/components/background-pattern";

const CreateJournalPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="h-max bg-white w-[600px] mx-auto rounded-xl p-10 z-10 shadow-md shadow-zinc-200">
        <div className="flex items-center mb-10 gap-x-2">
          <h2 className=" text-4xl font-bold text-primary">Create Journal</h2>
        </div>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl font-semibold text-primary">Title</label>
            <Input />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-xl font-semibold text-primary">
              Journal Entry
            </label>
            <Textarea className="h-full" />
          </div>
          <div className="w-full flex gap-x-6">
            <Button className="w-full">Submit</Button>
            <Button variant="destructive" className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <BackgroundPattern />
    </div>
  );
};

export default CreateJournalPage;
