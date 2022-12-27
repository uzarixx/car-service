import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'

export const CheckRoleMiddleware =  (role: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({message: "Не авторизован"})
      }
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY)
      if (decoded.role !== role) {
        return res.status(403).json({message: "Нет доступа"})
      }
      req.user = decoded
      next()
    } catch (e) {
      res.status(401).json({message: "Пользователь не авторизован"})
    }
  }
}