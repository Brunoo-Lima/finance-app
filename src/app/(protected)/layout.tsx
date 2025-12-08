import { Sidebar } from "@/components/sidebar/sidebar";
import s from "./_layout.module.scss";
import { Header } from "@/components/header/header";
import { ProviderMaster } from "@/components/providers/provider-master";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderMaster>
      <Header />

      <main className={s.main__container}>
        <Sidebar />

        <div className={s.content}>{children}</div>
      </main>
    </ProviderMaster>
  );
}
