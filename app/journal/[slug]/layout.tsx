export default function JournalPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-10">{children}</div>;
}
