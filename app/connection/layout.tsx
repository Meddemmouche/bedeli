export default function ConnLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div 
                className="fixed inset-0 w-full h-screen bg-cover bg-center -z-10"
                style={{ backgroundImage: "url('/back-form.jpg')" }}
            />
            
            <main className="h-[calc(100vh-8rem)] w-full flex items-center justify-center">
                {children}
            </main>
        </>
    )
}