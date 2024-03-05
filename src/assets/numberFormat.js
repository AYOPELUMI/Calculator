import { removeComma } from "./removeComma";

export const round = (n, decimal =0 ) =>{
    return Number(`${Math.round(`${n}e${decimal}`)}e-${decimal}`);
  }

export const toOptionalFixed = (num) =>{
    num = removeComma(num)
     num = Number(num)

    return numberFormat(`${Number.parseFloat(num.toFixed(4))}`)
}

export function numberFormat(number){
    number = String(number)
    return number.length > 0 ? new Intl.NumberFormat("en-US",{  maximumFractionDigits: 6}).format(number): number
}