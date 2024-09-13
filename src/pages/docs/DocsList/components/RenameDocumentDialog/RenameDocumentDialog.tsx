import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Dialog, Input } from "../../../../../components";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/Dialog/Dialog";
import useRenameDoc from "../../../../../utils/useRenameDoc";

type RenameDocumentDialogType = {
  open: boolean;
  setRenameDialogOpen: (param: boolean) => void;
  title: string;
  setMenuOpen: (param: boolean) => void;
  onMenuItemClick: () => void;
  id: string;
};

const RenameDocumentDialog = ({
  open,
  setRenameDialogOpen,
  title,
  setMenuOpen,
  id,
}: RenameDocumentDialogType) => {
  const [renameDocValue, setRenameDocValue] = useState(title);
  const { renameDoc } = useRenameDoc("documents");
  const handleClose = () => {
    setRenameDialogOpen(false);
    setMenuOpen(false);
  };

  const handleRenameDoc = () => {
    renameDoc(id, renameDocValue);
    setRenameDialogOpen(false);
    toast.success("Renamed successfully");
  };

  return (
    <Dialog open={open} modal={true} onOpenChange={setRenameDialogOpen}>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white z-50 sm:max-w-[587px] max-w-[335px]"
      >
        <DialogHeader>
          <DialogTitle className="border-b border-lightGray">
            Rename Document
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 md:px-[30px] px-5 pt-[30px] md:pb-[50px] pb-[30px]">
          <label htmlFor="name" className="text-left md:text-base text-sm">
            Please enter a new name for the document
          </label>
          <Input
            id="name"
            placeholder="Enter name here"
            className="col-span-3 border-lightGray bg-gray placeholder:text-lightBlack focus:outline-none text-sm"
            value={renameDocValue}
            onChange={(e) => setRenameDocValue(e.target.value)}
          />
        </div>
        <DialogFooter className="md:pb-[30px] md:pr-[30px] p-5 flex">
          <Button
            onClick={handleClose}
            variant="outline"
            className="!text-lightBlack md:w-[167px] w-full md:h-11 h-[38px] rounded-md border-lightGray"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRenameDoc}
            className="md:w-[167px] w-full md:h-11 h-[38px]"
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDocumentDialog;
