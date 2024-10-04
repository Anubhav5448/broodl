"use client";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { signup, login } = useAuth();
  const { authenticating, setAuthenticating } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signup(email, password);
      } else {
        console.log("Logging in existing user");
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-4xl sm:text-5xl  ${fugaz.className}`}>
        {isRegister ? "Register" : "Log In"}
      </h3>
      <p className="">You&apos;re one step away</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 py-4 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 "
        placeholder="Email"
        type="email"
      />
      <input
        value={password}
        onChange
        className="w-full max-w-[400px] mx-auto px-3 py-4 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 "
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto ">
        <Button clickHandler={handleSubmit} text={authenticating ? "Submitting" : "Submit"} full />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account" : "Don&apos;t have an account?"}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600"
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
