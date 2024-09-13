import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { useState } from "react";
import { toast } from "react-toastify";
import { CopyIcon, MenuIcon } from "../../../../../components";
import DeleteIcon from "../../../../../components/icons/DeleteIcon";
import RenameIcon from "../../../../../components/icons/RenameIcon";
import { DeleteDocumentDialog } from "../DeleteDocumentDialog";
import { RenameDocumentDialog } from "../RenameDocumentDialog";

const DocCardOptions = ({ title, id }: { title: string; id: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleRenameDialogOpen = () => {
    setRenameDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleCopyLink = () => {
    const docLink = window.location.href + id;
    window.navigator.clipboard.writeText(docLink);
    toast.success("Link copied");
  };

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
            className="flex flex-col justify-between bg-white w-[213px] h-[128px] rounded-lg border border-lightGray"
          >
            <MenubarItem
              onClick={() => {
                handleMenuClose();
                setRenameDialogOpen(true);
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-normal leading-[14.52px] text-left py-3 hover:bg-lightGray/50 outline-0 px-[15px]"
            >
              <RenameIcon />
              <span className="hover:border-primary cursor-pointer text-xs font-normal leading-[14.52px] text-left">
                Rename
              </span>
            </MenubarItem>

            <MenubarItem
              onClick={() => {
                handleMenuClose();
                setDeleteDialogOpen(true);
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-normal leading-[14.52px] text-left py-3 hover:bg-lightGray/50 outline-0 px-[15px]"
            >
              <DeleteIcon />
              <span className="hover:border-primary cursor-pointer text-xs font-normal leading-[14.52px] text-left">
                Delete
              </span>
            </MenubarItem>

            <MenubarItem
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-xs font-normal leading-[14.52px] text-left py-3 hover:bg-lightGray/50 outline-0 px-[15px]"
            >
              <CopyIcon width={14} height={14} strokeWidth={1} />
              <span className=" text-xs font-normal leading-[14.52px] text-left">
                Copy Link
              </span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <RenameDocumentDialog
          setMenuOpen={setMenuOpen}
          title={title}
          open={renameDialogOpen}
          setRenameDialogOpen={setRenameDialogOpen}
          onMenuItemClick={handleRenameDialogOpen}
          id={id}
        />
        <DeleteDocumentDialog
          setMenuOpen={setMenuOpen}
          open={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          onMenuItemClick={handleDeleteDialogOpen} // Close menu on delete dialog open
          id={id}
        />
      </Menubar>
    </>
  );
};

export default DocCardOptions;
