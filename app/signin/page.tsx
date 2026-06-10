"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { SigninFormValidation } from "@/types/types";
import { validateSignin } from "@/utils/validateForms";
import { signIn } from "next-auth/react";

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

    const res = await signIn("credentials", {
      identifier: formData.identifier,
      password: formData.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setServerError(res?.error || "Something went wrong");
    }
    setPending(false);
  };

  return (
    <>
      <form className="" noValidate onSubmit={handleSubmit}>
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
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
        <Button className="" type="submit" disabled={pending} label="sign-in" />
      </form>
    </>
  );
}
