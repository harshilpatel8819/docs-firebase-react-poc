import moment from "moment";
import { Button } from "../../../components";
import { Card } from "../../../components/Card/Card";
import Loader from "../../../components/icons/Loader";
import DocCard from "./components/DocCard/DocCard";
import useDocsList from "./useDocsList";

const DocsList = () => {
  const { handleCreateDocs, handleDocClick, docs, loading } = useDocsList();

  return (
    <div className="container mx-auto md:px-14">
      <Card className="relative h-full w-full rounded-t-lg xl:p-10 md:p-8 p-[15px] border-lightGray bg-white">
        <div className="flex justify-between items-center">
          <h1 className="md:text-[22px] text-base font-semibold">Documents</h1>
          <Button onClick={handleCreateDocs}>+ Create a Doc</Button>
        </div>
        <hr className="md:mb-10 mb-5 md:mt-[30px] mt-[15px] xl:-mx-10 md:-mx-8 -mx-4 border-lightGray xl:w-[calc(100%+5rem)] md:w-[calc(100%+4rem)] w-[calc(100%+2rem)]" />

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader className="w-16 h-16" />
          </div>
        ) : docs.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-center text-gray-500 text-lg">
              No documents available.
            </p>
          </div>
        ) : (
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 justify-start xl:gap-10 md:gap-8 gap-[15px]">
            {docs.map((doc) => (
              <DocCard
                key={doc.id}
                title={doc.title}
                date={moment(doc.createdAt).format("Do MMM, YYYY")}
                id={doc.id}
                onClick={() => handleDocClick(doc.id)}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DocsList;
