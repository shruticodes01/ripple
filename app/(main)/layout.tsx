"use client";

import Header from "@/components/header/Header";
import SidebarNav from "@/components/sidebar/SidebarNav";
import SidebarTrends from "@/components/sidebar/SidebarTrends";
import Container from "@/layouts/Container";
import ThemeContainer from "@/layouts/ThemeContainer";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContainer>
      <Header />
      <Container className={`md:grid md:grid-cols-[20%_55%_25%]`}>
        <SidebarNav></SidebarNav>
        <main className={`main pt-20 px-3 row-span-full`}>{children}</main>
        <SidebarTrends></SidebarTrends>
      </Container>
    </ThemeContainer>
  );
}
