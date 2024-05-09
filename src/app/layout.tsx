import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider"
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Tirage - HAQ",
  description: "Tirage de prix pour les tournois HAQ",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon/favicon-light.ico',
        href: '/images/favicon/favicon-light.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon/favicon-dark.ico',
        href: '/images/favicon/favicon-dark.ico',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
