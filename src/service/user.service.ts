import usersSchema from "../models/users.model.js";
import { usersDto } from "../dto/users.dto.js";

async function createUserService(request: usersDto, res: any): Promise<void> {
  const emailFound = await usersSchema.findOne({ email: request.email });

  if (emailFound) {
    res.status(400).json({ status: false, message: "This email doesn't exist" });
  } else {
    const newUser = new usersSchema({
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      address_id: request.address_id,
      profile_picture: request.profile_picture,
      is_artisant: request.is_artisant,
    });

    newUser.save();
    res.status(200).json({ status: true, message: "User added" });
  }
}

async function updateUserService(request: usersDto, res: any): Promise<void> {
  try {
    const updatedData = {
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      address_id: request.address_id,
      profile_picture: request.profile_picture,
      is_artisant: request.is_artisant,
    };

    await usersSchema.updateOne({ id: request.user_id }, updatedData);

    res.status(200).json({ status: true, message: "User updated successfully" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
}

async function deleteUserService(request: usersDto, res: any): Promise<void> {
  try {
    const userId = request.user_id;

    await usersSchema.deleteOne({ id: userId });

    res.status(200).json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
}

async function getUserDataService(request: usersDto, res: any): Promise<void> {
  try {
    const userId = request.user_id;

    const userData = await usersSchema.findOne({ id: userId });

    if (!userData) {
      res.status(404).json({ status: false, message: "User not found" });
      return;
    }

    res.status(200).json({ status: true, data: userData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export default { createUserService, updateUserService, getUserDataService, deleteUserService };
