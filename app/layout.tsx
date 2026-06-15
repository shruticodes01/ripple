import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/store/Providers";

export const metadata: Metadata = {
  title: "Ripple",
  description: "A twitter clone app created with Next.js and mongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={``}>
      <body className="flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
