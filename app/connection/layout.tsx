export default function ConnLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-[url('/public/back-form.jpg')] h-64 w-full bg-cover bg-center backdrop-blur-md flex items-center justify-center">
            {children}
        </main>
    )
}