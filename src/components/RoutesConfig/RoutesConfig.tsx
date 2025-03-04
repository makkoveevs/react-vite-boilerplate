import { Route, Routes } from "react-router-dom";
import { Root } from "src/Root";
import { AuthLayout } from "src/layouts/AuthLayout";
import { MainLayout } from "src/layouts/MainLayout";
import { Login } from "src/pages/Auth/Login";
import { Logout } from "src/pages/Auth/Logout/Logout";
import { Help } from "src/pages/Help";
import { Home } from "src/pages/Home";
import { Profile } from "src/pages/Profile";
import { ROUTES } from "src/shared/ROUTES";

export const RoutesConfig = (): JSX.Element => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.root} element={<Root />} />
      <Route path={ROUTES.help} element={<Help />} />
      <Route path={ROUTES.profile} element={<Profile />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.logout} element={<Logout />} />
    </Route>
  </Routes>
);
