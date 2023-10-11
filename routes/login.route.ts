import express from "express";

export default function(app: any) {
  const jsonMiddleware = express.json();
  
  app.post('/login', jsonMiddleware, (req, res) => {
    res.json("message")
  });
}