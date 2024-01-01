import { connectionString } from "@/lib/db";
import { User } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  let data =[];
  await mongoose.connect(connectionString);
  data = await User.find();
  //   console.log(data);
  return NextResponse.json({data,success:true});
};

export const POST = async (req) => {
  const payload = await req.json();
  await mongoose.connect(connectionString);
  const user = new User(payload);

  const result = await user.save();
  return NextResponse.json({ result,success:true });
};

// {
//     firstname: "nisha",
//     lastname: "panchal",
//     gender: "male",
//     email: "nisha@gmail.com",
//     dob: "07-01-2024",
//     phone: "8779059029",
//     about: "Jai Vahanvati Maa",
//   }
