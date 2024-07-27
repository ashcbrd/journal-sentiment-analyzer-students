"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { Button, ButtonProps } from "./ui/button";

const BackButtonClient = ({
  className,
  variant,
  prevPage = false
}: {
  className?: string;
  variant?: ButtonProps["variant"];
  prevPage?: boolean
}) => {
  const router = useRouter();

  return (
    <Button onClick={() => {
      if(prevPage) {
        router.back()
      } else {
        router.push('/journal')
      }
    }} variant={variant} className={className}>
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButtonClient;
