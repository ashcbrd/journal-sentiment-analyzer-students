import BackButtonClient from "@/components/back-button-client";
import journal from "../../../data/journals.json";

const JournalPage = ({ params }: { params: { slug: string } }) => {
  const journalData = journal.data.find(
    (journal) => journal._id === params.slug
  );
  return (
    <div className="p-20 flex flex-col">
      <BackButtonClient variant="outline" className="w-max" />
      <h2 className="mt-20">{journalData?.title}</h2>
    </div>
  );
};

export default JournalPage;
