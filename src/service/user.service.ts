import usersSchema from "../models/users.model.js";
import { usersDto } from "../dto/users.dto.js";

async function createUserService (request: usersDto, res: any): Promise<void> {
  const emailFound = await usersSchema.findOne({ email: request.email })

  if (emailFound) {
<<<<<<< HEAD
    res
      .status(400)
      .json({ status: false, message: "This email already exist" });
=======
    res.status(400).json({ status: false, message: "This email already exist" });
>>>>>>> 41882d01a7b5268feff3e6ea4097456ba81a4f4a
  } else {
    const newUser = new usersSchema({
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
<<<<<<< HEAD
      phone_number: request.phone_number,
=======
      phone_number: request.phone_number
>>>>>>> 41882d01a7b5268feff3e6ea4097456ba81a4f4a
    });

    await newUser.save();
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

    res
      .status(200)
      .json({ status: true, message: "User updated successfully" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

async function deleteUserService (request: usersDto, res: any): Promise<void> {
  try {
    const userId = request.user_id;

    await usersSchema.deleteOne({ id: userId });

    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

<<<<<<< HEAD
async function getUserDataService(userId: string): Promise<usersDto> {
  return new Promise((resolve, reject) => {
    usersSchema
      .findOne({ id: userId })
      .lean()
      .then((e) => resolve(e as usersDto))
      .catch(reject);
  });
=======
async function getUserDataService (request: usersDto, res: any): Promise<void> {
  try {
    const userId = request.user_id;

    const userData = await usersSchema.findOne({ id: userId });

    if (!userData) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    res.status(200).json({ status: true, data: userData });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
>>>>>>> 41882d01a7b5268feff3e6ea4097456ba81a4f4a
}

export default {
  createUserService,
  updateUserService,
  getUserDataService,
  deleteUserService,
};
