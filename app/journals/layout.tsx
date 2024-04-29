import BackButtonClient from "@/components/back-button-client";
import PageHeader from "@/components/page-header";

export default function JournalsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="p-10 h-screen">
        <BackButtonClient variant="outline" />
        <PageHeader>Your Journals</PageHeader>
        <div>{children}</div>
      </div>
    </>
  );
}
