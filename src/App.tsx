import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Form from "./pages/Form";
import Data from "./pages/Data";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Form />} />
      <Route path="/data" element={<Data />} />
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
