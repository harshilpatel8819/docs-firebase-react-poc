import { debounce } from "lodash";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef, useState, version } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase";
import useLiveGetterSetter from "../../../utils/useLiveGetterSetter";
import ReactQuill from "react-quill";
import { useGetUser } from "../../../utils/useGetUser";
import { v4 as uuidv4 } from "uuid";

export interface cursorData {
  name: string;
  color: string;
  range?: {
    index: number;
    length: number;
  };
  img: string;
}

const useDocsDetails = () => {
  const { id } = useParams();
  const { name: userName, uuid: userId, color, img } = useGetUser();

  const cursorData: cursorData = {
    name: userName,
    color,
    img,
  };

  const quillRef = useRef<ReactQuill | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const { value: contentValue, handleChange: handleContentChange } =
    useLiveGetterSetter(`documents/${id}`, "content");

  const {
    value: cursorsValue,
    updateChild: updateCursor,
    removeChild: removeCursor,
  } = useLiveGetterSetter(`documents/${id}/cursors`, "");

  const { value: histroyValue, handleChange: histroyhandleChange }: any =
    useLiveGetterSetter(`documents/${id}`, "version-history", 0);

  const { value: documentData }: any = useLiveGetterSetter(`documents/${id}`);

  const modules = {
    cursors: true,
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  // Handle cursor changes and sync cursor positions with Firebase
  const handleSelectionChange = (range: any, source: string, editor: any) => {
    if (range && source === "user" && userId) {
      cursorData.range = range; // Cursor position (start and end)

      updateCursor(userId, cursorData); // Sync cursor position to Firebase
    }
  };

  // Debounced pushDocumentToHistory
  const pushDocumentToHistory = debounce(() => {
    const histroyData = Array.isArray(histroyValue) ? histroyValue : [];
    const updatedDocument = {
      ...documentData,
      updatedAt: new Date().toUTCString(),
      versionId : uuidv4()
    };
    delete updatedDocument["version-history"];
    histroyData.unshift(updatedDocument);
    histroyhandleChange(histroyData);
  }, 2000);

  const handleEditorChange = (
    content: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    if (source === "user") {
      const quill = quillRef.current.getEditor();
      cursorData.range = quill.getSelection();
      updateCursor(userId, cursorData);
      handleContentChange({ content: editor.getContents() } as any);

      // Debounced document history update
      pushDocumentToHistory();
    }
  };

  // Other useEffects and methods remain the same
  useEffect(() => {
    if (
      quillRef.current &&
      contentValue &&
      contentValue.content &&
      editorReady
    ) {
      const editorInstance = quillRef.current.getEditor();
      const quillContent = editorInstance.getContents();
      if (
        JSON.stringify(contentValue.content) !== JSON.stringify(quillContent)
      ) {
        const currentSelection = editorInstance.getSelection();
        editorInstance.setContents(contentValue.content);
        if (currentSelection) {
          editorInstance.setSelection(currentSelection);
        }
      }
    }
  }, [contentValue, editorReady]);

  useEffect(() => {
    if (quillRef.current && editorReady) {
      const editorInstance = quillRef.current.getEditor();
      const cursorModule = editorInstance.getModule("cursors");
      if (cursorsValue) {
        Object.keys(cursorsValue).forEach((uid) => {
          if (uid !== userId) {
            const { range, name, color } = cursorsValue[uid];
            cursorModule.createCursor(uid, name, color);
            cursorModule.toggleFlag(uid, true);
            cursorModule.moveCursor(uid, range);
          }
        });
      }
    }
  }, [cursorsValue, userId, editorReady]);

  useEffect(() => {
    updateCursor(userId, cursorData);
    if (quillRef.current) {
      setEditorReady(true);
    }
    return () => removeCursor(userId);
  }, []);
  window.addEventListener("beforeunload", () => removeCursor(userId));
  return { quillRef, modules, handleEditorChange, handleSelectionChange };
};

export default useDocsDetails;
