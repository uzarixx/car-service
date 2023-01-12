import jwt from 'jsonwebtoken'
import {NextFunction, Response} from "express";
import {getUserById} from "../db/user";


export default async function authUser(req: any, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: "Ви не авторізовані"})
    }
    const secret = process.env.SECRET_KEY
    const decoded: any = jwt.verify(token, secret)
    if (!decoded) return res.status(401).json({message: "Ви не авторізовані"})
    const user = await getUserById(decoded.id)
    if (!user) return res.status(401).json({message: "Ви не авторізовані"})
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
}