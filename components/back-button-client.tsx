"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { Button, ButtonProps } from "./ui/button";

const BackButtonClient = ({
  className,
  variant,
  prevPage = false,
}: {
  className?: string;
  variant?: ButtonProps["variant"];
  prevPage?: boolean;
}) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={variant}
      className={className}
    >
      <ArrowLeftIcon />
    </Button>
  );
};

export default BackButtonClient;
