"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BackgroundPattern from "@/components/background-pattern";
import { useUser } from "@/context/user-context";
import { axiosInstance } from "@/lib/utils";

interface journalData {
  title: string;
  entry: string;
}

const CreateJournalPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [journalData, setJournalData] = useState<journalData>({
    title: "",
    entry: "",
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/journal", {
        ...journalData,
        student_id: user._id,
      });
      console.log(response.data);
      toast({
        variant: "default",
        description: "Journal Created!",
      });
      router.push(`/${response.data._id}`);
    } catch (error) {
      console.error("Error submitting journal:", error);
      toast({
        variant: "destructive",
        description: "Error submitting journal. Please try again.",
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="h-max bg-white w-[600px] mx-auto rounded-xl p-10 z-10 shadow-md shadow-zinc-200 relative">
        <div className="flex items-center mb-10 gap-x-2">
          <h2 className=" text-4xl font-bold text-primary">Create Journal</h2>
        </div>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl font-semibold text-primary">Title</label>
            <Input
              value={journalData.title}
              onChange={(e) =>
                setJournalData({ ...journalData, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-xl font-semibold text-primary">
              Journal Entry
            </label>
            <Textarea
              className="h-full"
              value={journalData.entry}
              onChange={(e) =>
                setJournalData({
                  ...journalData,
                  entry: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full flex justify-between">
            <Button
              onClick={handleSubmit}
              className="min-w-[244px] rounded-full"
            >
              Submit
            </Button>
            {journalData.title || journalData.entry ? (
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="outline"
                    className="min-w-[244px] rounded-full border border-primary/50"
                  >
                    Cancel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to discard your changes?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Any unsaved changes will be
                      lost permanently.
                    </DialogDescription>
                  </DialogHeader>

                  <Button
                    onClick={router.back}
                    className="rounded-full px-10 ml-auto"
                  >
                    Discard Changes
                  </Button>
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                onClick={router.back}
                variant="outline"
                className="min-w-[244px] rounded-full border border-primary/50"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
      <BackgroundPattern />
    </div>
  );
};

export default CreateJournalPage;
