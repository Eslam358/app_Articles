"use server"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");


  if (!token) return null;
  const userInfo = jwt.verify(
    token?.value as string,
    process.env.JWT_SECRET_KEY as string
  ) as any;
  return userInfo;

};


