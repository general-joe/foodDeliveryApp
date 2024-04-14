import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import rootRoutes from "./pages";

const App = () => {
  return (
    <>
      <RouterProvider router={rootRoutes} />
      <ToastContainer />
    </>
  );
};

export default App;
