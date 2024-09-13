import { ref, remove } from "firebase/database";
import { db } from "../../firebase";

const useDeleteDoc = (refStr: string) => {
  const deleteDoc = async (docId: string) => {
    if (!refStr || !docId) return;
    console.log(docId);
    const docRef = ref(db, `${refStr}/${docId}`);
    try {
      await remove(docRef); // Delete the document at the specified path
      console.log(`Document with ID: ${docId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return { deleteDoc };
};

export default useDeleteDoc;
