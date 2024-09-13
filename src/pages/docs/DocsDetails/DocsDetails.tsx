import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import useDocsDetails from "./useDocsDetails";
import Loader from "../../../components/icons/Loader";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);
const DocsDetails = () => {
  const { quillRef, modules, handleEditorChange, handleSelectionChange } =
    useDocsDetails();

  return (
    <div className="container mx-auto flex justify-center">
      {false ? (
        <Loader />
      ) : (
        <ReactQuill
          className="w-full h-screen"
          ref={quillRef}
          theme="snow"
          modules={modules}
          onChange={handleEditorChange}
          onChangeSelection={handleSelectionChange}
        />
      )}
    </div>
  );
};

export default DocsDetails;
