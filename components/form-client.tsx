"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "../services/auth-service";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@/context/user-context";
import { json } from "stream/consumers";
import { useToast } from "./ui/use-toast";

interface FormClientProps {
  name: string;
}

interface FormData {
  userName: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  course: string;
  year: string;
}

const FormClient: React.FC<FormClientProps> = ({ name }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    course: "",
    year: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setUser } = useUser();

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("api base url:  ", process.env.BASE_API_URL);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (name === "login") {
        try {
          const loginResponse = await login(formData.email, formData.password);
          console.log("Login Success:", loginResponse);
          localStorage.setItem("studentUser", JSON.stringify(loginResponse));
          setUser(loginResponse);
          router.push("/journal");
          toast({
            variant: "default",
            description: "Login successful",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            description: "Invalid credentials.",
          });
        }
      } else if (name === "register") {
        const registerResponse = await register(formData);
        setUser(registerResponse);
        console.log("Register success:", registerResponse);
        localStorage.setItem("studentUser", JSON.stringify(registerResponse));
        router.push("/auth");
        location.reload();
        toast({
          variant: "default",
          description: "Registration successful",
        });
      }
    } catch (error) {
      console.error("Error:", error || "Unknown Error");
      toast({
        variant: "destructive",
        description: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-lg">
      <div className="flex flex-col gap-4">
        {name === "login" ? (
          <>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
          </>
        ) : (
          <>
            <Label htmlFor="userName">Username</Label>
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="firstName">
              First Name <span className="text-primary/50">(optional)</span>
            </Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 px-3"
            />
            <Label htmlFor="lastName">
              Last Name <span className="text-primary/50">(optional)</span>
            </Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 px-3"
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <div className="flex gap-x-4">
              <div>
                <Label htmlFor="email">Course</Label>
                <Input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="p-2 px-3 mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Year</Label>
                <Input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="p-2 px-3 mt-2"
                />
              </div>
            </div>
          </>
        )}
        <Button type="submit" className="w-full mt-6 capitalize text-md">
          {name}
        </Button>
      </div>
    </form>
  );
};

export default FormClient;
