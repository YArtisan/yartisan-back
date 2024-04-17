import { NextFunction, Request } from "express";
import { Response } from "express";
import usersSchema from "../models/users.model.js";
import { auth } from "../../api/index.js";
import artisantModel from "../models/artisant.model.js";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = req.headers.authorization ?? "";
  const idToken = authorization.split(" ")[1] ?? "";
  if (idToken == null || idToken === "") {
    next();
    return;
  }
  console.log("id token", idToken);
  const decodedToken = await auth.verifyIdToken(idToken);
  console.log("decoded token", decodedToken);
  
  const [user, artisan] = await Promise.all([
    usersSchema.findOne({ email: decodedToken.email }).lean(),
    artisantModel.findOne({ email: decodedToken.email }).lean(),
  ]);

  
  if (!!artisan) {
    delete (artisan as any).password;
    console.log("artisan",artisan)
    req.user = { ...artisan, userFunction: "artisan" };
  } else if (!!user) {
    delete (user as any).password;
    console.log("user",artisan)
    req.user = { ...user, userFunction: "user" };
  }

  next();
};
