import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { MenuIcon } from "../../icons";

interface DocMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  items: { name: string; icon: JSX.Element; onClick: () => void }[];
}

const DocMenu = ({ menuOpen, setMenuOpen, items }: DocMenuProps) => {
  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          onClick={handleToggleMenu}
          className="flex justify-center w-[22px] h-[22px] hover:border-primary cursor-pointer"
        >
          <MenuIcon className="m-auto" />
        </MenubarTrigger>
        {menuOpen && (
          <MenubarContent
            onClick={handleStopPropagation}
            align="center"
            className="flex flex-col bg-white w-[213px] rounded-lg border border-lightGray"
          >
            {items.map((item, index) => (
              <MenubarItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation(); // Stop propagation if necessary
                  item.onClick();
                  setMenuOpen(false); // Close menu after clicking an item
                }}
                className="flex items-center gap-1 text-xs font-normal py-3 hover:bg-lightGray/50 px-[15px] outline-none"
              >
                {item.icon}
                <span className="cursor-pointer text-xs font-normal">
                  {item.name}
                </span>
              </MenubarItem>
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
};

export default DocMenu;
