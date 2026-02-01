import { getMenu } from '../controllers/menuController.js';

export const menuRoutes = async (req, res, pathname, method) => {
  if (pathname === "/menu" && method === "GET") {
    await getMenu(req, res);
    return "done";
  }
  return "not_found";
};