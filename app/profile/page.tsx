"use client";

import BackButtonClient from "@/components/back-button-client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { usePublicRouteRedirect } from "@/hooks/use-auth-redirection";

// function getData(id: string) {
//   const response = axiosInstance
//     .get(`/admin/${id}`, {})
//     .then((response) => {
//       let result = response;
//       return result;
//     })
//     .catch((error) => {
//       console.log("Error", error);
//     });

//   return response;
// }

const ProfilePage = ({ params }: { params: { slug: string } }) => {
  // const { user } = useUser();
  const user = JSON.parse(localStorage.getItem("studentUser")!);

  usePublicRouteRedirect();

  return (
    <div className="flex items-center justify-center h-screen pt-40">
      <div className="w-[60%] h-max bg-white rounded-lg shadow-md shadow-zinc-100 p-10 relative">
        <BackButtonClient
          variant="outline"
          className="absolute left-0 -top-16"
        />
        <div className="pt-20">
          <Avatar className="absolute -top-20 right-0 left-0 bg-[#1d425d] border-4 border-zinc-500 w-40 h-40 mx-auto mb-10 flex items-center justify-center">
            <h2 className="text-white text-7xl font-semibold uppercase">
              {user.userName ? user.userName[0] : user.firstName[0]}
            </h2>
          </Avatar>
          <div className="flex justify-between">
            <h2 className="text-primary text-3xl font-semibold">
              Profile Details
            </h2>
            {/* <Button className="px-6">Edit</Button> */}
          </div>
          <div className="flex flex-col gap-y-2 mt-6">
            <div>
              <p className="text-xl">
                Name:{" "}
                <span className="font-semibold">
                  {user.userName
                    ? user.userName
                    : `${user?.firstName} ${user?.lastName}}`}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xl">
                Email: <span className="font-semibold">{user?.email}</span>
              </p>
            </div>
            <div>
              <p className="text-xl">
                Course: <span className="font-semibold">{user?.course}</span>
              </p>
            </div>
            <div>
              <p className="text-xl">
                Year: <span className="font-semibold">{user?.year}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
