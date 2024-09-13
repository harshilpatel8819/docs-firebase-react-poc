import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

interface IDocs {
  content: object;
  cursor: object;
  id: string;
  title: string;
  versionHistory: Array<IDocs>;
}

const useDocList = (refStr: string) => {
  const [docs, setDocs] = useState<IDocs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (refStr) {
      const docRef = ref(db, refStr);

      const unsubscribe = onValue(docRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Firebase Realtime Database returns an object, convert it to an array of docs
          const docList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setDocs(docList);
        } else {
          setDocs([]); // Handle case where no data is available
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [refStr]);

  return { docs, loading };
};

export default useDocList;
