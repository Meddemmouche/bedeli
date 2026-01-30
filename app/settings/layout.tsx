// app/settings/layout.tsx
import SideBar from "@/app/components/sideBar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}