"use client";
// import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SidebarNav from "@/components/sidebar/SidebarNav";
import SidebarTrends from "@/components/sidebar/SidebarTrends";
import Container from "@/layouts/Container";
import ThemeContainer from "@/layouts/ThemeContainer";
import { useTheme } from "@/store/themeContext/useTheme";

import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <ThemeContainer>
      <Header />
      <Container
        className={`grid__container ${theme === "light" ? "bg-white" : "bg-blueish-black"}`}
      >
        <SidebarNav></SidebarNav>
        <main className={`min-h-screen main pt-20 `}>{children}</main>
        <SidebarTrends></SidebarTrends>
      </Container>
    </ThemeContainer>
  );
}
