import usersSchema from "./../../models/users.model";

export default async function createUserService(request: any, res: any) {
  // Email exiete deja ou non dans la base de donée
  // Password est bon (> 5 caractère)
  // Username est deja prit dans la base de donée

  const emailFound = await usersSchema.findOne({ email: request.email });
  console.log(emailFound);
  const usernamefound = await usersSchema.findOne({
    username: request.username,
  });

  if (emailFound || usernamefound) {
    res.status(400).json("Error...");
  } else {
    const newUser = new usersSchema({
      username: request.username,
      firstname: request.firstname,
      lastname: request.lastname,
      password: request.password,
      email: request.email,
      is_artisant: request.is_artisant,
      avatar: request.avatar,
      id_prospect: request.id_prospect,
    });

    newUser.save();

    res.status(200).json("Save into Db !");
  }
}
