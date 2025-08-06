import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
// in next js we have dedicated req and res
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // if user exists
    // @ts-expect-error -no
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { Error: "user does not exist" },
        { status: 500 }
      );
    }
    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { Error: "Incorrect Password" },
        { status: 500 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}
