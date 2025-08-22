"use client"; // now this becomes client side component

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  // connecting to backend
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      // api call can use fetch also
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      // redirect to login
      router.push("/login");
    } catch (err) {
      console.log("Signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center border hover:border-blue-400 border-gray-300 p-20 rounded-2xl hover:shadow-lg shadow-blue-400 ">
        <h1 className="font-medium text-4xl mb-3 font-serif italic tracking-wider text-blue-400 ">
          {loading ? "Loading" : "Signup"}{" "}
        </h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        />
        <button
          onClick={onSignup}
          className="p-2  rounded-lg mb-4 focus:outline-none hover:bg-amber-400 bg-amber-600"
        >
          {buttonDisabled ? "No signup" : "Signup"}
        </button>
        <Link href="/login">visit login page</Link>
      </div>
    </div>
  );
}
