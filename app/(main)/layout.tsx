import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Container from "@/layouts/Container";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
