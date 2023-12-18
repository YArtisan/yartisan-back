import artisanSchema from "./../models/artisant.model.js";
import userSchema from './../models/users.model.js'
import { artisantDto } from './../dto/artisant.dto.js'

async function signinArtisantService(request: artisantDto, res: any): Promise<void> {
  const artisantFound = await artisanSchema.findOne({
    email: request.email,
  });

  if (artisantFound) {
    if (artisantFound.password == request.password) {
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ status: false });
    }
  } else {
    res.status(400).json({ status: false });
  }
}

async function signinUserService(request: artisantDto, res: any): Promise<void> {
  const userFound = await userSchema.findOne({
    email: request.email,
  });

  if (userFound) {
    if (userFound.password == request.password) {
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ status: false, message: "Wrong password" });
    }
  } else {
    res.status(400).json({ status: false, message: "This email doesn't exist" });
  }
}


export default { signinArtisantService, signinUserService };
