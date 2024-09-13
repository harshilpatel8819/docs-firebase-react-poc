import { ref, update } from "firebase/database";
import { db } from "../../firebase";

const useRenameDoc = (refStr: string) => {
  const renameDoc = async (docId: string, newTitle: string) => {
    if (!refStr || !docId || !newTitle) return;

    const docRef = ref(db, `${refStr}/${docId}`);
    try {
      await update(docRef, { title: newTitle });
    } catch (error) {
      console.error("Error renaming document: ", error);
    }
  };

  return { renameDoc };
};

export default useRenameDoc;
