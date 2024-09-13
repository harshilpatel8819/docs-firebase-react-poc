import { useEffect, useRef, useState } from "react";
import useLiveGetterSetter from "../../utils/useLiveGetterSetter";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const getRandomColor = () => {
  const colors = [
    "bg-purple",
    "bg-orange",
    "bg-blue",
    "bg-primary",
    "bg-red-500",
    "bg-lightBlack",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
const useHeader = () => {
  
  const params = useParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const [copyText, setCopyText] = useState("Copy Link");
  const [historyDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState("Herry");
  const [avatars, setAvatars] = useState<
    { id: string; color: string; name: string }[]
  >([]);

  // List of users with full names
  const userList = [
    { id: "Herry", name: "Herry" },
    { id: "Non", name: "Non" },
    { id: "David", name: "David" },
    { id: "Rachel", name: "Rachel" },
    { id: "Xander", name: "Xander" },
  ];

  // Generate random colors only once when the component mounts
  useEffect(() => {
    const coloredAvatars = userList.map((user) => ({
      ...user,
      color: getRandomColor(), // Assign random color
    }));
    setAvatars(coloredAvatars);
  }, []); // Empty dependency array ensures this runs only once

  // Handle selecting a new user
  const handleSelect = (value: string) => {
    setSelectedUser(value);
  };

  // Function to extract the first letter (initial) of the name
  const getInitial = (name: string) => name.charAt(0).toUpperCase();


  const displayedAvatars =
    avatars.length &&
    avatars.filter((avatar) => avatar.id !== selectedUser).slice(0, 4);

    const [menuOpen, setMenuOpen] = useState(false);
    const docHistoryRef = useRef(null);

  const { value, loading, handleChange } = useLiveGetterSetter(
    `documents/${id}`,
    "title"
  );

  const { value: cursorsValue } = useLiveGetterSetter(
    `documents/${id}/cursors`,
  );

  const docLink = window.location.href;

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(docLink);
    setCopyText("Copied");

    setInterval(() => {
      setCopyText("Copy Link");
    }, 2000);
  };

  const handleHistoryDrawer = () => {
    setIsHistoryDrawerOpen(true);
  };

  return {
    value,
    loading,
    handleChange,
    handleCopyLink,
    copyText,
    handleHistoryDrawer,
    historyDrawerOpen,
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
  };
};

export default useHeader;
