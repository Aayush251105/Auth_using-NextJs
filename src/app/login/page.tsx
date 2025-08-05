"use client"; // now this becomes client side component

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  // setup router
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("login successful", response.data);

      router.push("/profile");
    } catch (error) {
      console.log("login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">{loading ? "loading" : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
      >
        {buttonDisabled ? "Enter value" : "Login here"}
      </button>
      <Link href="/signup">visit Signup page</Link>
    </div>
  );
}
