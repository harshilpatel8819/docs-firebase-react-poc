import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routesConsts";
import { createDocs } from "../../../services/createDocs";
import useGetDocList from "../../../utils/useGetDocList";

type CreateDocsResponse =
  | {
      id: string;
      title: string;
      content: string;
    }
  | undefined;

const useDocsList = () => {
  const navigate = useNavigate();

  // Handles navigation to the document's page based on the docId
  const handleDocClick = (docId: string) => {
    navigate(`${routes.docs}/${docId}`);
  };

  const { docs, loading } = useGetDocList("documents");

  // Handles creating a new document and navigating to it
  const handleCreateDocs = async () => {
    try {
      // Ensure the response from createDocs is either valid or undefined
      const response: CreateDocsResponse = await createDocs();

      // Check if the response is valid (not undefined)
      if (response && response.id) {
        navigate(`${routes.docs}/${response.id}`);
      } else {
        console.error(
          "Error: Document creation failed, response is undefined."
        );
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return { handleCreateDocs, handleDocClick, docs, loading };
};

export default useDocsList;
