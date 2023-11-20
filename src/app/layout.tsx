import type { Metadata } from "next";
import { Saira, Saira_Stencil_One } from "next/font/google";
import "./globals.css";

const saira = Saira({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-saira",
});
const sairaStencilOne = Saira_Stencil_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-saira-stencil-one",
});

export const metadata: Metadata = {
  title: "Capputeeno | E-commerce",
  description: "Find your favorite product.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${saira.variable} ${sairaStencilOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
