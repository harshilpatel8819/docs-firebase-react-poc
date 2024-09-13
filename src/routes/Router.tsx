import { Navigate, useRoutes } from "react-router-dom";
import { AppLayout } from "../components";
import { DocsDetails, DocsPage } from "../pages";
import { routes } from "./routesConsts";

const Router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Navigate to={routes.docs} replace />,
    },
    {
      path: routes.docs,
      element: <AppLayout />,
      children: [
        {
          path: routes.docs,
          element: <DocsPage />,
        },
        { path: `${routes.docs}/:id`, element: <DocsDetails /> },
      ],
    },
  ]);

  return element;
};

export default Router;
