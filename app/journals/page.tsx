import Link from "next/link";
import journals from "../../data/journals.json";

const JournalsPage = () => {
  const journalsData = journals.data;

  return (
    <div className="grid grid-cols-4 gap-4 p-10">
      {journalsData.map((journal, index) => (
        <Link
          href={`/journal/${journal._id}`}
          className="p-4 bg-secondary rounded-lg border w-[300px] shadow-md shadow-zinc-200/50 cursor-pointer hover:bg-zinc-200/70"
          key={index}
        >
          <h3 className="font-semibold text-2xl">{journal.title}</h3>
          <p className="truncate text-primary/70">{journal.entry}</p>
        </Link>
      ))}
    </div>
  );
};

export default JournalsPage;
