export const ROUTES = {
  root: "/",
  app: "/app",
  admin: "/admin",
  users: "/admin/users",
  params: "/admin/params",
  profile: "/profile",
  help: "/help",
  login: "/auth/login",
  logout: "/auth/logout"
};

export const ROUTE_NAMES: Record<keyof typeof ROUTES, string> = {
  root: "Главная",
  app: "Приложения",
  admin: "Администрирование",
  users: "Пользователи",
  params: "Параметры",
  profile: "Профиль",
  help: "Справка",
  login: "Вход",
  logout: "Выход"
};
