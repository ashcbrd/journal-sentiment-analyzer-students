"use client";

import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import JournalClient from "@/components/journal-client";
import BackButtonClient from "@/components/back-button-client";

function getData(id: string) {
  const response = axiosInstance
    .get(`/journal/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

export default function JournalPage({ params }: { params: { slug: string } }) {
  const [journal, setJournal] = useState<any>(null);
  const [allowAdminRead, setAllowAdminRead] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getData(params.slug).then((data) => {
      setJournal(data.data);
      setAllowAdminRead(data.data.allow_admin_read);
    });
  }, [params.slug]);

  usePublicRouteRedirect();

  function handleDeleteJournal(id: string) {
    axiosInstance
      .delete(`/journal/${id}`)
      .then((response) => {
        toast({
          description: "Journal deleted successfully.",
        });
        router.push("/journal");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  function handleSwitchToggle() {
    const newAllowAdminRead = !allowAdminRead;
    setAllowAdminRead(newAllowAdminRead);

    const updatedJournal = {
      ...journal,
      allow_admin_read: newAllowAdminRead,
    };

    axiosInstance
      .patch(`/journal/${params.slug}`, updatedJournal)
      .then(() => {
        toast({
          description: `Journal visibility ${
            newAllowAdminRead ? "enabled" : "disabled"
          } for admin.`,
        });
      })
      .catch((error) => {
        console.error("Error updating journal visibility", error);
        setAllowAdminRead(!newAllowAdminRead);
      });
  }

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <BackButtonClient variant="outline" />
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="py-6">
              <MdDelete size={30} className="text-[#1d425d]" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this journal?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                journal.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => handleDeleteJournal(params.slug)}
              className="w-max ml-auto"
            >
              Delete Journal
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col w-full mt-10 bg-white rounded-lg">
        <div className="flex w-full justify-between items-center">
          <h2 className="font-semibold text-4xl p-4">{journal?.title}</h2>
        </div>
        <hr />
        <p className="p-4">{journal?.entry}</p>
      </div>

      <div className="flex mt-6 items-center gap-x-4 text-zinc-600 bg-white w-max px-4 py-2 rounded-lg">
        <Switch checked={allowAdminRead} onCheckedChange={handleSwitchToggle} />
        <p>Allow admin to read journal.</p>
      </div>

      <JournalClient sentiments={journal?.sentiment_score} />
    </div>
  );
}
