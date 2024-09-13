import { toast } from "react-toastify";
import { Button, Card, Dialog } from "../../../../../components";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/Dialog/Dialog";
import TrashIcon from "../../../../../components/icons/TrashIcon";
import useDeleteDoc from "../../../../../utils/useDeleteDoc";

type DeleteDocumentDialogType = {
  open: boolean;
  setMenuOpen: (param: boolean) => void;
  setDeleteDialogOpen: (param) => void;
  onMenuItemClick: () => void;
  id: string;
};

const DeleteDocumentDialog = ({
  open,
  setMenuOpen,
  setDeleteDialogOpen,
  id,
}: DeleteDocumentDialogType) => {
  const handleMenuClose = () => {
    setDeleteDialogOpen((pre: boolean) => !pre); // Close the menubar
    setMenuOpen(false);
  };

  const { deleteDoc } = useDeleteDoc("documents");
  const handleDeleteDoc = () => {
    deleteDoc(id);
    toast.success("Doc deleted!");
  };

  return (
    <Dialog open={open} onOpenChange={setDeleteDialogOpen}>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white sm:max-w-[587px] max-w-[335px]"
      >
        <DialogHeader>
          <DialogTitle className="border-b border-lightGray">
            Delete Document
          </DialogTitle>
        </DialogHeader>
        <Card className="flex justify-center md:w-[137px] w-[70px] md:h-[137px] h-[70px] m-auto gap-0 rounded-md border-0 bg-primary/10 md:mt-[30px] mt-[25px] md:mb-5 mb-[15px]">
          <TrashIcon className="m-auto w-9" />
        </Card>

        <span className="font-Inter md:text-lg text-sm font-normal md:leading-[26px] leading-5 text-center md:mb-10 mb-[30px] md:px-24 px-5">
          Are you sure you want to permanently delete the 'Plaito Project'
          document?
        </span>

        <DialogFooter className="flex !justify-center md:mb-[30px] mb-5 mx-5">
          <Button
            onClick={handleMenuClose}
            variant="outline"
            className="!text-lightBlack md:w-[167px] w-full md:h-11 h-[38px] rounded-md border-lightGray"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteDoc}
            className="md:w-[167px] w-full md:h-11 h-[38px]"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocumentDialog;
