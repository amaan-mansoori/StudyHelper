import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="container py-6 lg:py-10 max-w-7xl animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
