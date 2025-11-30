import type { Metadata } from "next";
import { DashLayout } from "./_components/dash-layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard para sua conta.",
};

export default function DashboardPage() {
  return (
    <section>
      <h1>Dashboard</h1>

      <DashLayout />
    </section>
  );
}
