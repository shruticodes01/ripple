import React from "react";

export type ButtonVariant = "primary" | "outline" | "text" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export type InputDisplay = "row" | "col";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  inputDisplay?: InputDisplay;
  error?: string;
  className?: string;
}

export interface Ripple {
  id: number;
  creatorId: string;
  content: string;
  comments: string[];
  likedBy: string[];
  rePost: string[];
  sharePost: string[];
  bookmark: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface RippleResponse {
  posts: Ripple[];
  total: number;
  skip: number;
  limit: number;
}

export type ThemeMode = "light" | "dark";

export interface ThemeContextProps {
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export type ContainerType = "default" | "narrow";

export interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  containerType?: ContainerType;
}

export interface RegisterFormValidation {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
