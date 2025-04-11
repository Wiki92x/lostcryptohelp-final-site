// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {children}
    </section>
  );
}
