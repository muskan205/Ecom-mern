import { Router, Request, Response } from "express"; // Import necessary types from express
import { createUser, deleteUser, getAllUsers } from "../controllers/userControllers";

const router = Router();

// POST route to create a new user
router.post("/users", async (req: Request, res: Response) => {
  try {
    await createUser(req, res);  // Call the controller function for creating a user
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// GET route to fetch all users
router.get("/get/users", async (req: Request, res: Response) => {
  try {
    await getAllUsers(req, res);  // Call the controller function for getting all users
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// GET route to fetch all users
router.delete("/delete", async (req: Request, res: Response) => {
  try {
    await deleteUser(req, res);  // Call the controller function for getting all users
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

export default router;
