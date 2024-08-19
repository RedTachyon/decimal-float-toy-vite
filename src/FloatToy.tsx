import React, { useState } from 'react';
import { computeFloatValue, FloatConfig } from './utils/floatConverter';

interface FloatToyProps {
    mode: 'binary' | 'decimal';
    useSign: boolean;
    exponentBits: number;
    mantissaBits: number;
}

const FloatToy: React.FC<FloatToyProps> = ({ mode, useSign, exponentBits, mantissaBits }) => {
    const totalBits = (useSign ? 1 : 0) + exponentBits + mantissaBits;
    const [digits, setDigits] = useState(Array(totalBits).fill('0'));

    const incrementDigit = (index: number) => {
        const maxDigit = mode === 'binary' ? 1 : 9;
        const newDigit = (parseInt(digits[index]) + 1) % (maxDigit + 1);
        updateDigit(index, newDigit.toString());
    };

    const setToZero = (index: number) => {
        updateDigit(index, '0');
    };

    const updateDigit = (index: number, value: string) => {
        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);
    };

    const config: FloatConfig = {
        mode,
        useSign,
        exponentBits,
        mantissaBits,
    };

    const { signPart, exponentPart, mantissaPart, result } = computeFloatValue(digits, config);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 mb-8">
            <table className="table-fixed border-collapse mb-4 cursor-default">
                <tbody>
                <tr>
                    {digits.map((digit, index) => (
                        <td
                            key={`digit-${index}`}
                            className={`w-8 h-8 text-center border border-gray-400 text-lg select-none
                  ${useSign && index === 0 ? 'bg-blue-100 hover:bg-blue-200' : index < exponentBits + (useSign ? 1 : 0) ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}
                  cursor-default`}
                            onClick={() => incrementDigit(index)}
                        >
                            {digit}
                        </td>
                    ))}
                </tr>
                {mode === "decimal" && (
                    <tr>
                        {digits.map((_, index) => (
                            <td
                                key={`down-${index}`}
                                className={`w-8 h-8 text-center border border-gray-400 cursor-default select-none
                  ${useSign && index === 0 ? 'bg-blue-100 hover:bg-blue-200' : index < exponentBits + (useSign ? 1 : 0) ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}
                  cursor-default`}
                                onClick={() => setToZero(index)}
                            >
                                &#10060;
                            </td>
                        ))}
                    </tr>
                )}
                </tbody>
            </table>
            <div className="text-lg font-semibold bg-white p-4 border rounded shadow">
                <span className="bg-blue-100 p-1 rounded">{signPart}</span> *{" "}
                <span
                    className="bg-green-100 p-1 rounded"
                    dangerouslySetInnerHTML={{ __html: exponentPart }}
                /> *{" "}
                <span className="bg-red-100 p-1 rounded">{mantissaPart}</span> ={" "}
                <span>{result}</span>
            </div>
        </div>
    );

};

export default FloatToy;
