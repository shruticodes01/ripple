import React from "react";

export type ButtonVariant = "primary" | "outline" | "text" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type InputDisplay = "row" | "col";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  inputDisplay?: InputDisplay;
  error?: string;
  className?: string;
  complexityRule?: string;
}

export interface RippleCreator {
  _id: string;
  fullName: string;
  userName: string;
  email?: string;
  avatar?: string;
}

export interface RippleData {
  _id: string;
  creator: string | RippleCreator;
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

export interface CommentData {
  _id: string;
  content: string;
  creator:
    | string
    | {
        _id: string;
        fullName: string;
        userName: string;
        avatar?: string;
      };
  ripple: string;
  likedBy: string[];
  parentComment: string | null;
  replies: CommentData[];
  createdAt: string;
  updatedAt: string;
}

export type ThemeMode = "light" | "dark";

export interface ThemeContextProps {
  theme: ThemeMode;
  onThemeToggle: () => void;
}

export interface AuthContextProps {
  user: RippleCreator | null;
  loading: boolean;
  logout: () => void;
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

export interface SigninFormValidation {
  identifier: string;
  password: string;
}
