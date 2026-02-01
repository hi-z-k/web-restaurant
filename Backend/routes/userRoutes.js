import { loginUser, createUser, checkUserExists } from '../controllers/userController.js';
import { getBody } from './routeUtils.js';

export const userRoutes = async (req, res, pathname, method) => {
  const pathSegments = pathname.split('/').filter(Boolean);

  if (method === "POST") {
    if (pathname === "/login") {
      const body = await getBody(req);
      await loginUser(req, res, body);
      return;
    }

    if (pathname === "/users") {
      const body = await getBody(req);
      await createUser(req, res, body);
      return;
    }

    if (pathSegments[0] === "users" && pathSegments[1]) {
      const email = decodeURIComponent(pathSegments[1]);
      await checkUserExists(req, res, email);
      return;
    }
  }

  return "not_found";
};