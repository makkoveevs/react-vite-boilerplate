import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ACCESS_TOKEN_STORAGE_KEY } from "./shared/constants/auth.ts";
import store from "./shared/store.ts";

const hasToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) !== null;

if (hasToken) {
  try {
    await store.me();
    store.setIsAuth(hasToken);
  } catch {
    store.setIsAuth(false);
  }
}
createRoot(document.getElementById("root")!).render(<App />);
