import jwt from "jsonwebtoken";

export const generateJWt = (id: string, userName: string, role: string) => {
  return jwt.sign(
    {id, userName, role},
    process.env.SECRET_KEY,
    {expiresIn: '30d'}
  )
}