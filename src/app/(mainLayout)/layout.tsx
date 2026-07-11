import Footer from '@/components/Footer';
import Navbar from '@/components/Navber';
import React from 'react';

const layout = ({children}) => {
    return (
        <main className="min-h-full flex flex-col">
            <Navbar/>
            {children}
            <Footer/>
        </main>
    );
};

export default layout;