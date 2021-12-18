import Chat from "../pages/Chat";
import Drink from "../pages/Drink";
import Money from "../pages/Money";
import User from "../pages/Admin/User";
import Notification from "../pages/Admin/Notification";
import Foods from "../pages/Admin/Foods";
import Statistical from "../pages/Admin/Statistical";
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

export const PUBLIC_ROUTER_ADMIN = [
  {
    key: "user",
    path: "/admin/user",
    container: User,
    exact: true,
  },
  {
    key: "event",
    path: "/admin/notification",
    container: Notification,
    exact: true,
  },
  {
    key: "foods",
    path: "/admin/foods",
    container: Foods,
    exact: true,
  },
  {
    key: "statistical",
    path: "/admin/statistical",
    container: Statistical,
    exact: true,
  },
];
