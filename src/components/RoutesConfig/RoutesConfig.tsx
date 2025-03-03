import { Route, Routes } from "react-router-dom";
import { Root } from "src/Root";
import { Help } from "src/pages/Help";
import { Home } from "src/pages/Home";
import { Profile } from "src/pages/Profile";
import { ROUTES } from "src/shared/ROUTES";

export const RoutesConfig = (): JSX.Element => (
  <Routes>
    <Route path={ROUTES.root} element={<Root />} />
    <Route index element={<Home />} />
    <Route path={ROUTES.profile} element={<Profile />} />
    <Route path={ROUTES.help} element={<Help />} />
  </Routes>
);
