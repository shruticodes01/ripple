"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SigninFormValidation } from "@/types/types";
import { validateSignin } from "@/utils/validateForms";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SigninFormValidation>>({});

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

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setErrors(data.errors || {});
    }
  };

  return (
    <>
      <form className="" noValidate onSubmit={handleSubmit}>
        <Input
          className=""
          id="identifier"
          name="identifier"
          label="Email or Username"
          type="text"
          error={errors.identifier}
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        <Input
          className=""
          id="password"
          name="password"
          label="Password"
          type="password"
          error={errors.password}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button className="" type="submit" />
      </form>
    </>
  );
}
