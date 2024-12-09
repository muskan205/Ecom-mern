import { Request, Response } from "express";
import { UserNew } from "../src/entity/User";
const { AppDataSource } = require("../src/data-source");


// Controller to create a new user
export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName ,description} = req.body;

  if (!firstName || !lastName ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = new UserNew();
    user.firstName = firstName;
    user.lastName = lastName;
    user.description=description;

    // Save the user to the database
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id:", user.id);

    // Return the saved user
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user to the database" });
  }
};

// Controller to get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(UserNew).find();
    res.json(users); // Return users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users from the database" });
  }
};

//Delete user api
export const deleteUser = async (req:Request,res:Response)=>{
  try{

    const {id} =req.body;
    console.log("********id",id)
   const userDeleted= await AppDataSource
    .createQueryBuilder()
    .delete()
    .from('muskan_new')
    .where("id = :id", { id })
    .execute() 
    res.json(userDeleted)
    res.status(200).json("user deleted")
   
  }
  catch(error:any){
    
    console.log("error query builder");
    console.log('====================================');
  }
}
