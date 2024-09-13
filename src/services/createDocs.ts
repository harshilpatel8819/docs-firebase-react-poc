import { ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase"; // Firebase Realtime Database instance

const initialDefaultData = {
  id: uuidv4(),
  title: "untitled docs",
  content: "",
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
};

export const createDocs = async (initialData : any = initialDefaultData) => {
  initialData = {...initialDefaultData, ...initialData}
  const docRef = ref(db, `documents/${initialData?.id}`);

  try {
    await set(docRef, initialData);
    return initialData;
  } catch (error) {
    console.error("Error creating new document:", error);
  }
};
