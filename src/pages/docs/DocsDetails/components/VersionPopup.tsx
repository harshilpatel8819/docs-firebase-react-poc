import React, { useState } from 'react'
import { DocDialog } from '../../../../components/shared'
import { EditIcon, Input, TextArea } from '../../../../components'

const VersionPopup = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [versionDialogOpen, setVersionDialogOpen] = useState<boolean>(false);
    const handleMenuClose = () => {
        setMenuOpen(false);
    };

  return (
    <DocDialog
    triggerLabel="Name this version"
    dialogTitle="Name this version"
    confirmButtonText="Save"
    icon={<EditIcon />}
    isOpen={versionDialogOpen}
    setIsOpen={setVersionDialogOpen}
    onTriggerClick={handleMenuClose}
    >
        <div className="flex flex-col gap-4 md:px-[30px] px-5 pt-[30px]">
            <label htmlFor="name" className="text-left md:text-base text-sm">
                Please enter a new name for the document
            </label>
            <Input
                id="name"
                placeholder="Enter name here"
                className="col-span-3 border-lightGray bg-gray placeholder:text-lightBlack focus:outline-none text-sm"
            />
            <label htmlFor="name" className="text-left md:text-base text-sm">
                Description
            </label>
            <TextArea
                id="description"
                placeholder="What you have changed"
                className="col-span-3 border-lightGray bg-gray placeholder:text-lightBlack focus:outline-none text-sm"
            />
        </div>
    </DocDialog>
  )
}

export default VersionPopup