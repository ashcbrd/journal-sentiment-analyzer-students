import PageHeader from "@/components/page-header";
import Navbar from "@/containers/navbar";

export default function JournalsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
      <div className="px-10 py-4 h-screen mt-20">

        <PageHeader>Messages</PageHeader>
        <div>{children}</div>
      </div>
    </>
  );
}
