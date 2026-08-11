import { FC, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Routings } from "./routings";
import { ProtectedRoute } from "./ProtectedRoute";
import Loader from "../components/Loader/Loader";

export const PageRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {Routings.map((route) => {
            return route?.protected ? (
              <Route
                path={route.path}
                key={route?.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
