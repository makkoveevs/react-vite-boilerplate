import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ACCESS_TOKEN_STORAGE_KEY } from "./shared/constants/auth.ts";
import store from "./shared/store.ts";

const isAuthorized = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) !== null;
store.setIsAuth(isAuthorized);

if (isAuthorized) {
  await store.me();
}

createRoot(document.getElementById("root")!).render(<App />);
