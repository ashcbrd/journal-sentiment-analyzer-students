"use client";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";
import { axiosInstance } from "@/lib/utils";
import { useEffect, useState } from "react";
import EmptyState from "@/components/empty-state";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

function getadmins() {
  const response = axiosInstance
    .get(`/admin`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

function getConversations(userId: string) {
  const response = axiosInstance
    .get(`/message/${userId}`, {})
    .then((response) => {
      let result = response;
      return result;
    })
    .catch((error) => {
      console.log("Error", error);
    });

  return response;
}

const ChatPage = () => {
  const [admins, setAdmins] = useState(null);
  const [conversations, setConversations] = useState(null);

  const user = JSON.parse(localStorage.getItem("studentUser")!);

  usePublicRouteRedirect();

  useEffect(() => {
    getadmins().then((data) => {
      setAdmins(data.data);
    });
  }, []);

  useEffect(() => {
    getConversations(user._id).then((data) => {
      setConversations(data.data);
    });
  }, [user._id]);

  const adminConvos = Array.from(
    new Map(
      conversations && conversations.map((item) => [item.receiver_id, item])
    ).values()
  );

  const sortedConvos = [...adminConvos].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="flex flex-col gap-y-4 px-4">
      <div className="flex gap-x-10 mb-20 overflow-x-scroll">
        {admins &&
          admins.map((admin, index) => (
            <div key={index} className="flex flex-col items-center gap-y-2">
              <Link
                key={index}
                href={`/message/admin/${admin._id}`}
                className="rounded-full bg-zinc-300 border border-blue-300 w-16 h-16 flex items-center justify-center"
              >
                <Avatar className="flex uppercase font-semibold items-center justify-center">
                  <p className="">{admin.firstName[0]}</p>
                </Avatar>
              </Link>
              <p className="w-max">{admin.firtName} {admin.lastName}</p>
            </div>
          ))}
      </div>
      <h3 className="font-semibold text-3xl mb-4">Recent Conversations</h3>
      {conversations && conversations.length ? (
        <div className="flex flex-col gap-y-4">
          {sortedConvos.map((item, index) => (
            <Link href={`/message/admin/${item.receiver_id}`} key={index}>
              <Card className="flex gap-x-4 items-center px-6 py-4">
                <Avatar className="bg-zinc-100 border flex items-center justify-center">
                  <p className="uppercase">{item.receiver_name[0]}</p>
                </Avatar>
                <div className="w-max flex flex-col gap-y-2">
                  <CardTitle className="flex items-center gap-x-4">
                    {item.receiver_name}
                    <p className="text-sm text-zinc-600 font-[400] bg-zinc-100 rounded px-3 py-1">
                      {new Date(item?.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </CardTitle>
                  <CardDescription>
                    <p className="text-md">{item.message}</p>
                  </CardDescription>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState>
          <h2 className="text-2xl font-medium text-zinc-500">
            No Conversations Yet.
          </h2>
        </EmptyState>
      )}
    </div>
  );
};

export default ChatPage;
