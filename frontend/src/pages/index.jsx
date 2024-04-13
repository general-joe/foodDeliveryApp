import Layout from "../components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          index
          lazy={async () => {
            const { default: Home } = await import("./Home");
            return { Component: Home };
          }}
        />
        <Route
          path="cart"
          lazy={async () => {
            const { default: Cart } = await import("./cart");
            return { Component: Cart };
          }}
        />
        <Route
          path="about-us"
          lazy={async () => {
            const { default: AboutUs } = await import("./about-us");
            return { Component: AboutUs };
          }}
        />
      </Route>
    </>
  )
);

export default rootRoutes;
