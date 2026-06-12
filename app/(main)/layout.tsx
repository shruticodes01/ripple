"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SidebarNav from "@/components/sidebar/SidebarNav";
import SidebarTrends from "@/components/sidebar/SidebarTrends";
import Container from "@/layouts/Container";
import ThemeContainer from "@/layouts/ThemeContainer";
import ThemeContextProvider from "@/store/themeContext/ThemeContext";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContextProvider>
      <ThemeContainer>
        <Header />
        <Container className="grid__container">
          <SidebarNav></SidebarNav>
          <main className="min-h-screen main">{children}</main>
          <SidebarTrends></SidebarTrends>
        </Container>
        <Footer />
      </ThemeContainer>
    </ThemeContextProvider>
  );
}
