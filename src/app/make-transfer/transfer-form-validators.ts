import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createAmountValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        console.log("TCL: value", value)

        if (!value) {
            return null;
        }

        const notMoreThan2DecimalPlaces = /^-?\d*[.,]?\d{0,2}$/.test(value);
        console.log("TCL: allowsDecimals", notMoreThan2DecimalPlaces)

        const mustBePositive = Math.sign(+value) > 0;
        console.log("TCL: mustBePositive", mustBePositive)

        const amountIsMoreThan500 = +value >= 500;
        console.log("TCL: amountIsMoreThan500", amountIsMoreThan500)

        const amountValid = notMoreThan2DecimalPlaces && mustBePositive && amountIsMoreThan500;
        console.log("TCL: amountValid", amountValid)

        return !amountValid ? {
            moreThan2DecimalPlaces: !notMoreThan2DecimalPlaces,
            mustBePositive: !mustBePositive,
            amountIsMoreThan500: !amountIsMoreThan500}: null;
    }
}