import { useParams } from "react-router-dom";
import useLiveGetterSetter from "../../utils/useLiveGetterSetter";
import { forwardRef, useImperativeHandle, useState } from "react";
import DropDownArrow from "../icons/DropDownArrow";
import { Button } from "../Button/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../Drawer/Drawer";
import CloseIcon from "../icons/CloseIcon";
import ReloadIcon from "../icons/ReloadIcon";
import DocHistoryPopover from "./DocHistoryPopover";

const VersionItem: React.FC<{
  history?: any;
  currentVersion?: Boolean;
}> = ({ history, currentVersion }) => {
  const { handleChange, value }: any = useLiveGetterSetter(`documents/`, history.id);
  return (
    <div className={`px-6 pt-[17px] pb-5 ${"hover:bg-gray group"}`}>
      <div className="flex gap-[15px] cursor-pointer">
        <div className="mt-1.5">
          <DropDownArrow />
        </div>
        <div className="flex justify-between w-full">
          <div>
            <h4
              className={`text-base font-normal ${
                (value?.versionId == history.versionId) ? "text-primary" :  "text-mediumGray"
              } group-hover:font-semibold`}
            >
              {history.updatedAt}
            </h4>
          </div>
          <DocHistoryPopover history={history} handleChange={handleChange} value={value} />
        </div>
      </div>
    </div>
  );
};

const DocHistory = forwardRef((props, ref) => {
  const { id } = useParams();
  const { value, loading, handleChange } = useLiveGetterSetter(
    `documents/${id}/version-history`
  );
  console.log("hello", value);
  const [isOpen, setIsOpen] = useState(false);

  // Use Imperative Handle to expose openDrawer and closeDrawer
  useImperativeHandle(ref, () => ({
    openDrawer: () => setIsOpen(true),
    closeDrawer: () => setIsOpen(false),
  }));

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DrawerTrigger asChild>
        <Button className="bg-primary/10 hover:!text-white !text-primary h-11 md:flex hidden">
          <ReloadIcon className="pr-1 w-[24px] h-[24px]" /> History
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="flex items-center justify-between px-5 py-[27px] border-b border-lightGray">
          <h3 className="text-xl font-medium">Version History</h3>
          <DrawerClose className="text-xl mr-3">
            <CloseIcon />
          </DrawerClose>
        </div>

        <div className="py-[25px]">
          {value &&
            value.map((history, index) => (
              <div key={index}>
                <VersionItem
                  key={history.id}
                  history={history}
                  currentVersion={Boolean(index === 0)}
                />
              </div>
            ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
});

export default DocHistory;
