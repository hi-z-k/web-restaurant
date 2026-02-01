import { getUsers, createUser } from '../controllers/userController.js';
import { getBody } from './routeUtils.js';

export const userRoutes = async (req, res, pathname, method) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/users") {
    if (method === "GET") {
      await getUsers(req, res, url);
      return;
    }
    if (method === "POST") {
      const body = await getBody(req);
      await createUser(req, res, body);
      return;
    }
  }
  return "not_found";
};