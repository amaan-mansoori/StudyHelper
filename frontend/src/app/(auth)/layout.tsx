export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
            {/* Soft background gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
            </div>
            <div className="w-full max-w-md p-4 relative z-10 w-full animate-fade-in">
                {children}
            </div>
        </div>
    );
}
