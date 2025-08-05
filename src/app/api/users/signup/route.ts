import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
// in next js we have dedicated req and res
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();


// post request in next js
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);
    // check if user already exists
    // @ts-expect-error -xy
    const user = await User.findOne({ email }) as unknown;

    if(user){
      return NextResponse.json({Error: "User already exists"} , {status: 400})

      
    }
    
    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password , salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save()

    return NextResponse.json({message: "User created successfully", savedUser} , {status: 201})

  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}
