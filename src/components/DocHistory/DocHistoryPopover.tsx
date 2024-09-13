import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { useState } from "react";
import { CopyIcon, MenuIcon } from "../icons";
import ReloadIcon from "../icons/ReloadIcon";
import { Separator } from "../Separator/Separator";
import useLiveGetterSetter from "../../utils/useLiveGetterSetter";

const DocHistoryPopover = ({
  history,
  title,
  id,
  value,
  handleChange,
}: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="flex justify-center w-[22px] h-[22px] hover:border-primary cursor-pointer"
          >
            <MenuIcon
              className="m-auto"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </MenubarTrigger>
          <MenubarContent
            onClick={(e) => {
              e.stopPropagation();
            }}
            align="center"
            className="flex flex-col justify-between bg-white w-[213px] h-auto rounded-lg border border-lightGray mr-2.5"
          >
            <Separator className="border-1 border-lightBlack" />
            <MenubarItem
              onClick={() => {
                handleChange({
                  ...value,
                  content: history?.content,
                  title: history?.title,
                  versionId: history?.versionId,
                });
              }}
              className="flex items-center gap-1 text-xs font-normal leading-[14.52px] text-left py-3 hover:bg-lightGray/50 outline-0 px-[15px]"
            >
              <ReloadIcon className="pr-1" />

              <span className=" text-[12px] font-normal leading-[14.52px] text-left">
                Restore version
              </span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default DocHistoryPopover;
