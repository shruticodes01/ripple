import { RegisterFormValidation } from "@/types/types";

export const validateSignup = (values: RegisterFormValidation) => {
  const errors: Partial<RegisterFormValidation> = {};
  if (!values.fullName.trim()) {
    errors.fullName = "Name is required";
  }

  if (!values.userName.trim()) {
    errors.userName = "Username is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i.test(
      values.email,
    )
  ) {
    errors.email = "Please provide a valid email";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
      values.password,
    )
  ) {
    errors.password = "Password too weak";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
