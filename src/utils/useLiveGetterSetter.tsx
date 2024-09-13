import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { ref, onValue, update, remove } from "firebase/database";
import { cursorData } from "../pages/docs/DocsDetails/useDocsDetails";

const useLiveGetterSetter = (
  refStr: string,
  key?: string,
  throttleDelay: number = 0
) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (refStr) {
      const docRef = ref(db, refStr);

      const unsubscribe = onValue(docRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setValue(key ? data[key] || "" : data);
        } else {
          setValue("");
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [refStr, key]);

  useEffect(() => {
    // Cleanup function to handle unmounting or closing tab
    const handleBeforeUnload = () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current); // Clear any existing timeouts
      }
      if (refStr && key && value) {
        const docRef = ref(db, refStr);
        update(docRef, { [key]: value }); // Update the last state in Firebase
      }
    };

    // Add event listener to handle tab closing or refresh
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [refStr, key, value]);

  const handleChange = (newValue: string) => {
    if (!key) return;
    setValue(newValue); // Update state immediately

    // Debouncing the Firebase update
    if (debounceRef.current) {
      clearTimeout(debounceRef.current); // Clear previous timeout if any
    }

    debounceRef.current = setTimeout(() => {
      if (refStr) {
        const docRef = ref(db, refStr);
        update(docRef, { [key]: newValue });
      }
    }, throttleDelay);
  };
  const updateChild = (childKey: string, childValue: cursorData) => {
    if (refStr && childKey) {
      const docRef = ref(db, `${refStr}/${childKey}`);
      update(docRef, childValue);
    }
  };
  const removeChild = (childKey: string) => {
    console.log("doesit call");
    if (refStr && childKey) {
      const docRef = ref(db, `${refStr}/${childKey}`);
      remove(docRef);
    }
  };
  return { value, loading, handleChange, updateChild, removeChild };
};

export default useLiveGetterSetter;
