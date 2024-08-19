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
            <p>
                Here you can see a regular binary float32. Very mindful, very demure.
            </p>
            <FloatToy mode="binary" useSign={true} exponentBits={8} mantissaBits={23} />
            <p>
                And here is a decimal float8. It's a little more... expressive. You can see it reaching absurd values thanks to the base 10 representation.
            </p>
            <FloatToy mode="decimal" useSign={true} exponentBits={2} mantissaBits={5} />
        </div>
    );
};

export default App;
