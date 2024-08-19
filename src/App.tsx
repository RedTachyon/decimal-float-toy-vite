import React from 'react';
import FloatToy from './FloatToy';
import './index.css';

const App: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">(Decimal) Float Toy</h1>
            <p>
                Inspired by <a href={"https://evanw.github.io/float-toy/"} className="text-blue-600 underline hover:text-blue-800">the other float toy</a>,
                this is a demonstration of how floating point numbers could work if they were implemented in decimal instead of binary.
            </p>
            <FloatToy mode="binary" useSign={true} exponentBits={8} mantissaBits={23} />
            <FloatToy mode="decimal" useSign={true} exponentBits={5} mantissaBits={10} />
        </div>
    );
};

export default App;
