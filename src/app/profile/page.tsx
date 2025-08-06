"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout succesful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/user");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-600">
        {data ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-amber-600 hover:bg-amber-500 font-bold mt-4 py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-blue-600 hover:bg-blue-500 font-bold mt-4 py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}
