import Footer from '@/components/Footer';
import Navbar from '@/components/Navber';
import { Toaster } from 'sonner';

const layout = ({children}) => {
    return (
        <main className="min-h-full flex flex-col">
            <Navbar/>
            {children}
             <Toaster />
            <Footer/>
        </main>
    );
};

export default layout;