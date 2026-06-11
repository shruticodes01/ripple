"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { RegisterFormValidation } from "@/types/types";
import { validateSignupForm } from "@/utils/validateForms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormValidation>>({});
  const [pending, setPending] = useState<boolean>(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setPending(true);
    setServerError("");

    const { confirmPassword, ...dataToSend } = formData;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      const data = await res.json();
      setServerError(data.message ?? "Something went wrong");
    }

    setPending(false);
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center mt-8`}
    >
      <form
        className="w-full max-w-100 flex flex-col gap-4 bg-powdered-blue-100 p-6 rounded-md"
        noValidate
        onSubmit={handleSubmit}
      >
        {serverError && <p className="text-red-700 text-sm">{serverError}</p>}

        <Input
          className={`border border-blueish-black px-2 py-1 bg-white`}
          id="fullName"
          name="fullName"
          label="Full Name"
          inputDisplay="col"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />

        <Input
          className={`border border-blueish-black px-2 py-1 bg-white`}
          id="userName"
          name="userName"
          label="Username"
          inputDisplay="col"
          type="text"
          value={formData.userName}
          onChange={handleChange}
          error={errors.userName}
          required
        />
        <Input
          className={`border border-blueish-black px-2 py-1 bg-white`}
          id="email"
          name="email"
          label="Email Address"
          inputDisplay="col"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          className={`border border-blueish-black px-2 py-1 bg-white`}
          id="password"
          name="password"
          label="Password"
          inputDisplay="col"
          type="password"
          value={formData.password}
          minLength={8}
          onChange={handleChange}
          error={errors.password}
          complexityRule="Password must be 8+ chars with uppercase, lowercase, and a number"
          required
        />
        <Input
          className={`border border-blueish-black px-2 py-1 bg-white`}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          inputDisplay="col"
          type="password"
          value={formData.confirmPassword}
          minLength={8}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        <Button
          className={`border-2 border-blueish-black py-2 px-4 rounded-4xl mt-5`}
          type="submit"
          variant="outline"
          label={pending ? "Submitting..." : "Create Account"}
          disabled={pending}
        />
      </form>
      <div className="flex flex-col justify-center items-center gap-2 mt-8">
        <p>Already have an account?</p>
        <Link
          className="border-2 border-powdered-blue py-2 px-4 rounded-4xl font-bold"
          href="/signin"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
