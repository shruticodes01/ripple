"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { RegisterFormValidation } from "@/types/types";
import { validateSignup } from "@/utils/validateForms";
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
    const validationErrors = validateSignup(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      const data = await res.json();
      setServerError(data.errors ?? {});
    }
  };

  return (
    <div className={`w-full h-full flex justify-center items-center mt-8`}>
      {serverError && <p>{serverError}</p>}
      <form
        className="w-full max-w-100 flex flex-col gap-4 bg-powdered-blue-100 p-6 rounded-md"
        noValidate
        onSubmit={handleSubmit}
      >
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
          className={`mt-5`}
          variant="outline"
          label="Create Account"
          onClick={() => handleSubmit}
        />
      </form>
    </div>
  );
}
