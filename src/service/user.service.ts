import usersSchema from "../models/users.model.js";
import { usersDto } from "../dto/users.dto.js";

async function createUserService (request: usersDto, res: any): Promise<void> {
  await usersSchema.deleteOne({ email: request.email })
  throw new Error("sqdqsd");

  const emailFound = await usersSchema.findOne({ email: request.email })

  if (emailFound) {
    res.status(400).json({ status: false, message: "This email already exist" })
  } else {
    const newUser = new usersSchema({
      id: request.user_id,
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      phone_number: request.phone_number
    });

    newUser.save();
    if (newUser) {
      res.status(200).json({ status: true, message: "User added" });
    } else {
      res.status(400).json({ status: false, message: "Cannot add this user" });
    }
  }
}

async function updateUserService (request: usersDto, res: any): Promise<void> {
  try {
    const updatedData = {
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      phone_number: request.phone_number,
    };

    await usersSchema.updateOne({ id: request.user_id }, updatedData);

    res.status(200).json({ status: true, message: "User updated successfully" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

async function deleteUserService (request: usersDto, res: any): Promise<void> {
  try {
    const userId = request.user_id;

    await usersSchema.deleteOne({ id: userId });

    res.status(200).json({ status: true, message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

async function getUserDataService (id: string, res: any): Promise<void> {
  try {
    const userId = id;

    const userData = await usersSchema.findOne({ id: userId });

    if (!userData) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    res.status(200).json({ status: true, data: userData });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export default { createUserService, updateUserService, getUserDataService, deleteUserService };
