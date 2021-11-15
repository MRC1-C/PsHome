import Chat from "../pages/Chat";
import Drink from "../pages/Drink";
import Money from "../pages/Money";

export const PUBLIC_ROUTER = [
  {
    key: "drink",
    path: "/",
    container: Drink,
    exact: true,
  },
  {
    key: "chat",
    path: "/chat",
    container: Chat,
    exact: true,
  },
  {
    key: "money",
    path: "/money",
    container: Money,
    exact: true,
  },
];
