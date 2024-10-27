"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import BackgroundPattern from "@/components/background-pattern";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { usePrivateRouteRedirect } from "@/hooks/use-auth-redirection";

export default function Home() {
  usePrivateRouteRedirect();

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-y-6 h-max z-10 mt-40">
        <h1 className="text-5xl leading-[60px] text-center font-black w-[80%] mx-auto text-transparent bg-clip-text bg-gradient-to-tr from-[#132b3e] to-[#2474a5]">
          Smart Journal: Leveraging BERT Algorithm for Enhanced Sentiment
          Detection
        </h1>
        <Link href="/journal">
          <div className="relative items-center h-12 flex bg-[#132b3e] p-1 rounded-lg w-[160px] group">
            <div className="h-[80%] flex items-center justify-center rounded-md w-10 bg-[#d2fe00] absolute top-0 bottom-0 right-0 left-0 ml-[6px] m-auto group-hover:w-[92%] transition-all">
              <MdKeyboardDoubleArrowRight />
              <MdKeyboardDoubleArrowRight className="hidden group-hover:block transition-all" />
              <MdKeyboardDoubleArrowRight className="hidden group-hover:block transition-all" />
              <MdKeyboardDoubleArrowRight className="hidden group-hover:block transition-all" />
              <MdKeyboardDoubleArrowRight className="hidden group-hover:block transition-all" />
              <MdKeyboardDoubleArrowRight className="hidden group-hover:block transition-all" />
              <MdKeyboardDoubleArrowRight className="hidden group-hover:block transition-all" />
            </div>
            <p className="text-white min-w-max px-4 ml-10">Get Started</p>
          </div>
        </Link>
        <img
          src="/images/landing-emotions.png"
          className="w-[50%] h-full translate-y-20"
        />
      </div>
      {/* <BackgroundPattern /> */}
    </div>
  );
}
