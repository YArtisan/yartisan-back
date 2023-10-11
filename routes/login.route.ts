import express from "express";
import usersSchema from '../models/users.model'

export default function(app: any) {
  const jsonMiddleware = express.json();
  
  app.post('/login', jsonMiddleware, (req, res) => {

    const newUser = new usersSchema({
      username: 'michel',
      firstname: 'Mich',
      lastname: 'Hell',
      password: 'qweasd',
      email: 'qweqwe@qwe.fr',
      is_artisant: false,
      avatar: 'qweqewqweqweqwe',
      id_prospect: 'qwe1as4sadasdad556a8sd8d'
    });

    newUser.save();
    res.json("message")
  });
}