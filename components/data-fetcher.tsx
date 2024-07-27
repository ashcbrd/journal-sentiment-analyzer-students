import { getData } from "@/lib/get-data";

interface DataFetcherProps {
  params: { slug: string };
  url: string;
  children: (data: { data: any[] }) => React.ReactNode;
}

export default async function DataFetcher({
  params,
  children,
  url,
}: DataFetcherProps) {
  const data = await getData(url);
  return <>{children({ data })}</>;
}
