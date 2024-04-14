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
            const { default: Home } = await import("./Home/Home");
            return { Component: Home };
          }}
        />
        <Route
          path="order"
          lazy={async () => {
            const { default: PlaceOrder } = await import(
              "./PlaceOrder/PlaceOrder"
            );
            return { Component: PlaceOrder };
          }}
        />
        <Route
          path="cart"
          lazy={async () => {
            const { default: Cart } = await import("./Cart/Cart");
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
      <Route
        path="admin-dashboard"
        lazy={async () => {
          const { default: AdminLayout } = await import("./admin");
          return { Component: AdminLayout };
        }}
      />
    </>
  )
);

export default rootRoutes;
