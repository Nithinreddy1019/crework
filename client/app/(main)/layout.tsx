import { Sidebar } from "./_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <main className="h-screen flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-50">
                {children}
            </div>
        </main>
    );
}
 
export default MainLayout;