import { Button } from "../../Button/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Dialog/Dialog";

interface DocDialogProps {
  onTriggerClick: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  icon?: React.ReactNode;
  triggerLabel: string;
  dialogTitle: string;
  confirmButtonText: string;
  children: React.ReactNode;
}

const DocDialog: React.FC<DocDialogProps> = ({
  onTriggerClick,
  isOpen,
  setIsOpen,
  icon,
  triggerLabel,
  dialogTitle,
  confirmButtonText,
  children,
}) => {
  const handleDialogClose = () => {
    setIsOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={() => {
          onTriggerClick();
          setIsOpen(true);
        }}
        asChild
        className="hover:border-primary cursor-pointer flex items-center gap-[4px] text-[12px] font-normal leading-[14.52px] text-left"
      >
        <div>
          {icon}
          <span className="hover:border-primary cursor-pointer text-[12px] font-normal leading-[14.52px] text-left">
            {triggerLabel}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[587px] max-w-[335px]">
        <DialogHeader>
          <DialogTitle className="border-b border-lightGray">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter className="md:pb-[30px] md:pr-[30px] flex pt-6">
          <Button
            onClick={handleDialogClose}
            variant="outline"
            className="!text-lightBlack md:w-[167px] w-full md:h-11 h-[38px] rounded-md border-lightGray"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogClose}
            className="md:w-[167px] w-full md:h-11 h-[38px]"
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocDialog;
