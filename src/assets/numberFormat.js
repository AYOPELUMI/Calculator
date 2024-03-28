import { removeComma } from "./removeComma";

export const round = (n, decimal =0 ) =>{
    return Number(`${Math.round(`${n}e${decimal}`)}e-${decimal}`);
  }

export const toOptionalFixed = (num) =>{
    console.log({num})
    num = removeComma(num)
     num = Number(num)
     console.log(num)
    console.log(Number.parseFloat(num.toFixed(4)))
    return numberFormat(`${Number.parseFloat(num.toFixed(4))}`)
}
export const displayDecimalPoint = (num) =>{
    num = String(num)
    let decimalPoint = num.indexOf(".")
    console.log({decimalPoint})
    decimalPoint = Number(decimalPoint)
    let numClone = num.slice(0,decimalPoint)
    return numberFormat(numClone)+num.slice(decimalPoint)
}
export function numberFormat(number){
    number = String(number)
    return number.length > 0  ? new Intl.NumberFormat("en-US",{ maximumFractionDigits: 6}).format(number): number
}