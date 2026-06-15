"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SigninFormValidation } from "@/types/types";
import { validateSignin } from "@/utils/validateForms";
import { TriangleAlert } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SigninFormValidation>>({});
  const [pending, setPending] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateSignin(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setPending(true);
    setServerError("");

    try {
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res?.ok) {
        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") || "/";
        router.push(callbackUrl);
      } else {
        setServerError(data.error || "Something went wrong");
      }
    } catch {
      setServerError("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center mt-8`}>
      <form
        className="w-full max-w-100 flex flex-col gap-4 bg-powdered-blue-100 p-6 rounded-md"
        noValidate
        onSubmit={handleSubmit}
      >
        {serverError && (
          <div className="flex gap-2 justify-center items-center">
            <TriangleAlert className="w-5 h-5 text-red-700" />{" "}
            <p className="text-red-700 text-md">{serverError}</p>
          </div>
        )}
        <Input
          className={`border border-blueish-black px-2 py-1 bg-white text-blueish-black`}
          id="identifier"
          name="identifier"
          label="Email or Username"
          type="text"
          inputDisplay="col"
          error={errors.identifier}
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        <Input
          className={`border border-blueish-black px-2 py-1 bg-white text-blueish-black`}
          id="password"
          name="password"
          label="Password"
          type="password"
          inputDisplay="col"
          error={errors.password}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button
          className={`w-full max-w-fit self-center border-2 border-blueish-black py-2 px-4 rounded-4xl mt-5 font-bold`}
          type="submit"
          disabled={pending}
          label="Sign in"
        />
      </form>
      <div className="flex flex-col justify-center items-center gap-2 py-8">
        <p>Don&apos;t have an account?</p>
        <Link
          className="border-2 border-powdered-blue py-2 px-4 rounded-4xl font-bold"
          href="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
