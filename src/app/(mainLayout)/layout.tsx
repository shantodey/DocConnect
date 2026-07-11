import React from 'react';

const layout = ({children}) => {
    return (
        <main className="min-h-full flex flex-col">
            {children}
        </main>
    );
};

export default layout;