import { connectionString } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  let data = [];
  await mongoose.connect(connectionString);
  data = await User.find();
  //   console.log(data);
  return NextResponse.json({ data, success: true });
};

export const POST = async (req) => {
  const payload = await req.json();
  await mongoose.connect(connectionString);
  const user = new User(payload);
  const result = await user.save();
  return NextResponse.json({ result, success: true });
};
