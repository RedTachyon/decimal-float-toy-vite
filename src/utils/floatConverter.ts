import Decimal from 'decimal.js';

export interface FloatConfig {
    mode: 'binary' | 'decimal';
    useSign: boolean;
    exponentBits: number;
    mantissaBits: number;
}

export function computeFloatValue(digits: string[], config: FloatConfig): { signPart: string, exponentPart: string, mantissaPart: string, result: string } {
    const { mode, useSign, exponentBits, mantissaBits } = config;
    const totalBits = digits.length;
    let sign = 1;
    let exponent = 0;
    let mantissa = new Decimal(1);
    let exponentBias = mode === 'binary' ? (Math.pow(2, exponentBits - 1) - 1) : (Math.pow(10, exponentBits - 1) - 1);
    let exponentMax = mode === 'binary' ? Math.pow(2, exponentBits) - 1 : Math.pow(10, exponentBits) - 1;
    const base = mode === 'binary' ? 2 : 10;

    if (useSign) {
        sign = digits[0] === '0' ? 1 : -1;
        digits = digits.slice(1);
    }

    const exponentValue = parseInt(digits.slice(0, exponentBits).join(''), mode === 'binary' ? 2 : 10);
    const mantissaValue = new Decimal(parseInt(digits.slice(exponentBits).join(''), mode === 'binary' ? 2 : 10));

    if (exponentValue === exponentMax && !mantissaValue.isZero()) {
        return { signPart: sign === 1 ? "1" : "-1", exponentPart: "NaN", mantissaPart: "NaN", result: "NaN" };
    }

    if (exponentValue === exponentMax && mantissaValue.isZero()) {
        return { signPart: sign === 1 ? "1" : "-1", exponentPart: "Infinity", mantissaPart: "", result: sign === 1 ? "Infinity" : "-Infinity" };
    }

    if (exponentValue === 0 && mantissaValue.isZero()) {
        return { signPart: sign === 1 ? "1" : "-1", exponentPart: `${base}<sup>0</sup>`, mantissaPart: "0", result: sign === 1 ? "0" : "-0" };
    }

    if (exponentValue === 0) {
        exponent = 1 - exponentBias;
        mantissa = mantissaValue.dividedBy(new Decimal(base).pow(mantissaBits));
    } else {
        exponent = exponentValue - exponentBias;
        mantissa = new Decimal(1).plus(mantissaValue.dividedBy(new Decimal(base).pow(mantissaBits)));
    }

    const fraction = exponentValue === 0 ? `0.${mantissaValue.toString().padStart(mantissaBits, '0')}` : `1.${mantissaValue.toString().padStart(mantissaBits, '0')}`;
    const resultValue = new Decimal(sign).times(mantissa).times(new Decimal(base).pow(exponent));

    return {
        signPart: sign === 1 ? "1" : "-1",
        exponentPart: `${base}<sup>${exponent}</sup>`,
        mantissaPart: fraction,
        result: resultValue.toString()
    };
}
