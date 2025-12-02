import { Sidebar } from "@/components/sidebar/sidebar";
import s from "./_layout.module.scss";
import { Header } from "@/components/header/header";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className={s.main__container}>
        <Sidebar />

        <div className={s.content}>{children}</div>
      </main>
    </>
  );
}
