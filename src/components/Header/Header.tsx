import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../Button/Button";
import DocHistory from "../DocHistory/DocHistory";
import { Input } from "../Input/Input";
import {
  BackButtonIcon,
  CopyIcon,
  HeaderLogo,
} from "../icons";
import CopyRoundIcon from "../icons/CopyRoundIcon";
import DropArrow from "../icons/DropArrow";
import useHeader from "./useHeader";
import { DocMenu } from "../shared";
import ReloadIcon from "../icons/ReloadIcon";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../Tooltip/Tooltip";




interface HeaderProps {
  isUpdating?: boolean;
  title?: string;
  saveLoading?: boolean;
}

const Header = ({
  isUpdating = false,
  title = "",
  saveLoading = true,
}: HeaderProps) => {

  const {
    handleChange,
    value,
    handleCopyLink,
    copyText,
    handleSelect,
    getInitial,
    menuOpen,
    setMenuOpen,
    displayedAvatars,
    docHistoryRef,
    params,
    navigate,
    avatars,
    selectedUser,
    cursorsValue,
  } = useHeader();

  // Avatar rendering based on user, showing initials
  const renderAvatar = (user: { color: string; name: string }) => {
    if (user)
      return (
        <div key={index} className="md:border-[3px] md:hover:border-primary/30 border-transparent rounded-full cursor-pointer">
          <span
          key={user.name}
            className={`md:w-[34px] w-5 md:h-[34px] h-5 m-[1px] ${user.color} flex items-center justify-center rounded-full md:text-base text-[11px] text-white`}
          >
            {getInitial(user.name)}
          </span>
        </div>
      );
  };

  return (
    <>
      <header
        className={`bg-white p-5 px-10 [@media(max-width:425px)]:p-3 z-10 flex items-center justify-between border border-lightGray opacity-[0px] ${
          isUpdating &&
          "[@media(max-width:425px)]:bg-transparent [@media(max-width:425px)]:border-0 [@media(max-width:425px)]:shadow-none"
        }`}
      >
        
        <div className="flex items-center">
          {params.id && (
            <button aria-label="back-button" onClick={() => navigate(-1)}>
              <BackButtonIcon />
            </button>
          )}
          <HeaderLogo
            className={isUpdating ? "ml-[19px]]" : "md:w-[38px] w-[26px]"}
          />
          <span
            className={`${
              title
                ? "text-[22px] font-medium leading-[26.63px] text-left"
                : "text-2xl font-bold leading-[30.91px] text-left ml-[5px]"
            } [@media(max-width:425px)]:font-[Inter] [@media(max-width:425px)]:text-lg [@media(max-width:425px)]:font-medium [@media(max-width:425px)]:leading-[21.78px] [@media(max-width:425px)]:text-left`}
          >
            {params.id ? (
              <Input
                className="border-0 focus:border border-lightGray p-1 text-[22px] font-medium lg:w-auto w-[90px]"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
              />
            ) : (
              "Docs"
            )}
          </span>
        </div>
        {params.id && (
          <div className="flex items-center gap-2">
            <div className="lg:flex items-center hidden gap-2">
              {Object.values(cursorsValue) &&
                Object.values(cursorsValue)
                  .slice(0, 4)
                  .map((avatar) => (
                    <TooltipProvider delayDuration={200} key={avatar?.name}>
                      <Tooltip>
                          <TooltipTrigger>
                        <div className="size-9 rounded-full overflow-hidden">
                            <img
                              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${avatar?.name}+params.id`}
                              className=""
                            />
                        </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{avatar?.name}</p>
                          </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
            </div>

            {Object.values(cursorsValue).length > 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="focus-visible:ring-0 border-2 border-primary bg-primary/10 rounded-full !py-1 md:gap-2 gap-2 md:!pl-0  md:!pr-1.5 !px-1"
                  >
                    <div className="size-9 rounded-full overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${
                          avatars.find((avatar) => avatar.id === selectedUser)
                            ?.name
                        }+params.id`}
                      />
                    </div>
                    <span className="text-black flex justify-center items-center gap-1">
                      {Object.keys(cursorsValue).length} <DropArrow />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-20">
                  <DropdownMenuRadioGroup
                    value={selectedUser}
                    onValueChange={handleSelect}
                    className="bg-white shadow-dropDownShadow border border-lightGray rounded-lg mt-[33px] h-[252px] overflow-y-auto"
                  >
                    {Object.values(cursorsValue)
                      .slice(4)
                      .map((avatar) => (
                        <DropdownMenuRadioItem
                          value={avatar.id}
                          key={avatar.id}
                          className="flex items-center gap-[9px] px-5 py-1 outline-none hover:bg-lightBlack/10 cursor-pointer"
                        >
                          <div className="size-9 rounded-full overflow-hidden">
                            <img
                              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${avatar?.name}+avatar.id`}
                            />
                          </div>
                          <span>{avatar.name}</span>
                        </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <DocHistory />
            <Button
              className="md:flex gap-1 h-11 hidden"
              onClick={handleCopyLink}
            >
              <CopyRoundIcon /> {copyText}
            </Button>
            <div className="lg:hidden md:hidden">
                <DocMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}
                items={
                  [
                    {name: "History", icon: <ReloadIcon />, onClick:  () => docHistoryRef.current.openDrawer()},
                    {name: copyText, icon: <CopyIcon />, onClick:handleCopyLink},
                  ]
                }
                />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
