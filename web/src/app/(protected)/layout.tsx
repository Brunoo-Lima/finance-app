import { Sidebar } from '@/components/sidebar/sidebar';
import s from './_layout.module.scss';
import { ProviderMaster } from '@/components/providers/provider-master';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderMaster>
      <main className={s.main__container}>
        <Sidebar />

        <div className={s.content}>{children}</div>
      </main>
    </ProviderMaster>
  );
}
