import { Card, CardContent, DocsIcons } from "../../../../../components";
import DocCardOptions from "../DocCardOptions/DocCardOptions";

type DocCardProps = {
  /**
   * Doc id
   */
  id: string;
  /**
   * The title of the document, displayed on the card.
   */
  title: string;
  /**
   * The date associated with the document, shown below the title.
   */
  date: string;
  /**
   * Callback function when the card is clicked.
   */
  onClick: () => void;
};

const DocCard = ({ title, date, onClick, id }: DocCardProps) => {
  return (
    <Card
      className="border-lightGray bg-gray md:p-3 p-2 rounded-md md:h-[330px] h-[208px] flex flex-col xl:w-[236px] w-full hover:border-primary cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0 bg-white border border-lightGray rounded flex items-center justify-center flex-1">
        <DocsIcons />
      </CardContent>

      <div className="flex justify-between items-center">
        <div className="md:mt-3 mt-[9px]">
          <p className="md:text-base text-sm overflow-hidden whitespace-nowrap text-ellipsis lg:w-40 w-[100px]">
            {title}
          </p>
          <span className="text-xs text-lightBlack mt-[5px]">{date}</span>
        </div>
        <div className="flex items-center justify-center">
          <DocCardOptions id={id} title={title} />
        </div>
      </div>
    </Card>
  );
};

export default DocCard;
