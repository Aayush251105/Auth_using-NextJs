import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request: NextRequest){
    try {
       const userId = await getDataFromToken(request);
       // @ts-expect-error -no
       const user = await User.findById(userId).select("-password");

       return NextResponse.json({
        Message: "user found",
        data: user
       })
    } catch (error) {
        return NextResponse.json({Error: error.message}, {status : 400})
    }
}
