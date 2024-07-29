"use client";

import Link from "next/link";
import { MdDelete } from "react-icons/md";

import { Button } from "@/components/ui/button";
import response from "../../../data/journals.json";
import BackButtonClient from "@/components/back-button-client";
import JournalClient from "@/components/journal-client";
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

function getData(id: string) {
  const response = axiosInstance
    .get(`/journal/${id}`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

export default function JournalPage({ params }: { params: { slug: string } }) {
  const [journal, setJournal] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getData(params.slug).then((data) => {
      console.log(data);
      // @ts-ignore
      setJournal(data.data);
    });
  }, [params.slug]);

  usePublicRouteRedirect();

  function handleDeleteJournal(id: string) {
    const response = axiosInstance
      .delete(`/journal/${id}`, {})
      .then((response) => {
        let result = response;
        toast({
          description: "Journal deleted successfully.",
        });
        router.push("/journal");
        return result;
      })
      .catch((error) => {
        console.log("Error", error);
      });

    return response;
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
          {/* @ts-ignore */}
          <h2 className="font-semibold text-4xl p-4">{journal?.title}</h2>
        </div>
        <hr />
        {/* @ts-ignore */}
        <p className="p-4">{journal?.entry}</p>
      </div>
      {/* @ts-ignore */}
      <JournalClient sentiments={journal?.sentiment_score} />
    </div>
  );
}
