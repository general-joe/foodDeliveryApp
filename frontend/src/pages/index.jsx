import Layout from "../components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Users Layout */}
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
      {/* Admin Dashboard */}
      <Route
        path="admin-dashboard"
        lazy={async () => {
          const { default: AdminLayout } = await import("./admin");
          return { Component: AdminLayout };
        }}
      >
        <Route
          path="category"
          lazy={async () => {
            const { default: Category } = await import("./admin/category");
            return { Component: Category };
          }}
        />
        <Route
          path="edit-category/:id"
          lazy={async () => {
            const { default: Category } = await import(
              "./admin/category/editCategory"
            );
            return { Component: Category };
          }}
        />
        <Route
          path="add-category"
          lazy={async () => {
            const { default: CreateCategory } = await import(
              "./admin/category/createCategory"
            );
            return { Component: CreateCategory };
          }}
        />
        <Route
          path="clients"
          lazy={async () => {
            const { default: Clients } = await import("./admin/clients");
            return { Component: Clients };
          }}
        />
        <Route
          path="clients/edit-client/:id"
          lazy={async () => {
            const { default: Clients } = await import(
              "./admin/clients/editClient"
            );
            return { Component: Clients };
          }}
        />
        <Route
          path="orders"
          lazy={async () => {
            const { default: Orders } = await import("./admin/orders");
            return { Component: Orders };
          }}
        />
        <Route
          path="order-details/:id"
          lazy={async () => {
            const { default: Orders } = await import(
              "./admin/orders/orderDetails"
            );
            return { Component: Orders };
          }}
        />
        <Route
          path="created-orders"
          lazy={async () => {
            const { default: Orders } = await import(
              "./admin/orders/orderByStatus/created"
            );
            return { Component: Orders };
          }}
        />
        <Route
          path="processed-orders"
          lazy={async () => {
            const { default: Orders } = await import(
              "./admin/orders/orderByStatus/processed"
            );
            return { Component: Orders };
          }}
        />
        <Route
          path="delivered-orders"
          lazy={async () => {
            const { default: Orders } = await import(
              "./admin/orders/orderByStatus/delivered"
            );
            return { Component: Orders };
          }}
        />
        <Route
          path="recipe"
          lazy={async () => {
            const { default: Recipe } = await import("./admin/recipe");
            return { Component: Recipe };
          }}
        />
        <Route
          path="edit-recipe/:id"
          lazy={async () => {
            const { default: Recipe } = await import(
              "./admin/recipe/editRecipe"
            );
            return { Component: Recipe };
          }}
        />
        <Route
          path="add-recipe"
          lazy={async () => {
            const { default: CreateRecipe } = await import(
              "./admin/recipe/createRecipe"
            );
            return { Component: CreateRecipe };
          }}
        />
      </Route>
    </>
  )
);

export default rootRoutes;
