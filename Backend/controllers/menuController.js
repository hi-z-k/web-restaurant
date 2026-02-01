import { Menu } from '../models/Menu.js';

export const getMenu = async (req, res) => {
  try {
    const items = await Menu.find();
    res.writeHead(200);
    res.end(JSON.stringify(items));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ message: error.message }));
  }
};