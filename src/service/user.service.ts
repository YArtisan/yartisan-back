import usersSchema from "../models/users.model";
import { createUserdto } from "../dto/users.dto";

async function createUserService(request: createUserdto, res: any): Promise<void> {
  const emailFound = await usersSchema.findOne({ email: request.email });

  if (emailFound) {
    res.status(400).json("Error...");
  } else {
    const newUser = new usersSchema({
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      address_id: request.address_id,
      profile_picture: request.profile_picture,
      is_artisant: request.is_artisant,
      created_at: request.created_at,
      last_update: request.last_update,
    });

    newUser.save();

    res.status(200).json("Save into Db !");
  }
}

async function updateUserService(request: any, res: any): Promise<void> {
  try {
    const userId = request.userId;

    const updatedData = {
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      address_id: request.address_id,
      profile_picture: request.profile_picture,
      is_artisant: request.is_artisant,
      created_at: request.created_at,
      last_update: request.last_update,
    };

    await usersSchema.updateOne({ id: userId }, updatedData);

    res.status(200).json("User updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUserService(request: any, res: any): Promise<void> {
  try {
    const userId = request.userId;

    // Delete the user
    await usersSchema.deleteOne({ id: userId });

    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserDataService(request: any, res: any): Promise<void> {
  try {
    const userId = request.userId;

    const userData = await usersSchema.findOne({ id: userId });

    if (!userData) {
      res.status(404).json("User not found");
      return;
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { createUserService, updateUserService, getUserDataService, deleteUserService };
