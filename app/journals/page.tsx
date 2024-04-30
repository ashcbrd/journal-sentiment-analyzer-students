"use client";

import Link from "next/link";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import journals from "../../data/journals.json";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/context/user-context";
import { useEffect, useState } from "react";

function getData(id?: string) {
  const response = axiosInstance
    .get(`/journal/student/${id}`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

const JournalsPage = () => {
  const { user } = useUser();
  const [journals, setJournals] = useState(null);

  useEffect(() => {
    console.log("userid: ", user._id)
    getData(user._id).then((data) => {
      setJournals(data?.data);
    });
  }, []);

  usePublicRouteRedirect();

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-10">
        {journals ? (
          journals.map((journal, index) => (
            <Link href={`/journal/${journal._id}`} key={index}>
              <Card className="hover:bg-zinc-50">
                <CardHeader>
                  <CardTitle>{journal.title}</CardTitle>
                  <CardDescription className="truncate">
                    {journal.entry}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <h2 className="font-md text-xl text-center">
            No journals Yet. Click{" "}
            <Link href={"/journal/create"} className="underline">
              here
            </Link>{" "}
            to create journal.
          </h2>
        )}
      </div>
    </div>
  );
};

export default JournalsPage;
