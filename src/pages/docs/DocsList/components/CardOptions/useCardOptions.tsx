import { useState } from "react";

// Define types for the option object
interface Option {
  icon: string;
  /**
   * The name of the option displayed to the user
   */
  label: string;
  /**
   * A function that gets triggered when the option is clicked.
   */
  onClick: () => void;
  /**
   * A JSX element for any custom UI.
   */
  customComponent?: JSX.Element;
}

// Define the return type of the useCardOptions hook
interface UseCardOptionsReturn {
  /**
   * A function that gets triggered when the option is closed.
   */
  handleClose: () => void;
  /**
   * The options of the menu.
   */
  options: Option[];
}

const useCardOptions = (): UseCardOptionsReturn => {
  // State to manage offline availability
  const [isAvailableOffline, setIsAvailableOffline] = useState<boolean>(false);

  // Handler to rename card
  const handleRename = () => {
    console.log("Rename clicked");
  };

  // Handler to delete card
  const handleDelete = () => {
    console.log("Delete clicked");
  };

  // Handler to toggle offline availability
  const handleToggleOffline = () => {
    setIsAvailableOffline((prev) => !prev);
    console.log("Available offline toggled:", !isAvailableOffline);
  };

  const options: Option[] = [
    { icon: "✏️", label: "Rename", onClick: handleRename },
    { icon: "🗑️", label: "Delete", onClick: handleDelete },
    {
      icon: "📶",
      label: "Available offline",
      onClick: handleToggleOffline,
      customComponent: (
        <input
          type="checkbox"
          checked={isAvailableOffline}
          onChange={handleToggleOffline}
        />
      ),
    },
  ];

  // Handler to close the options menu
  const handleClose = (): void => {
    console.log("Options closed");
  };

  return { handleClose, options };
};

export default useCardOptions;
