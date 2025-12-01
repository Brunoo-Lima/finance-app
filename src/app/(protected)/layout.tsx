import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />

      <main className="w-full">{children}</main>
    </>
  );
}
