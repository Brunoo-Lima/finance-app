import { Mulish } from "next/font/google";
import "../styles/globals.scss";
import { ProviderGlobal } from "@/components/providers/provider-global";

const font__primary = Mulish({
  variable: "--font-primary",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font__primary.className} ${font__primary.variable} antialiased`}
      >
        <ProviderGlobal>{children}</ProviderGlobal>
      </body>
    </html>
  );
}
