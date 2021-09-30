import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export function createAmountValidator(
  balance: BehaviorSubject<number>,
  minimumAcceptableBalance: number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const notMoreThan2DecimalPlaces = /^-?\d*[.,]?\d{0,2}$/.test(value);

    const mustBePositive = Math.sign(+value) > 0;

    const balanceBelowMinimum =
      balance.getValue() - +value <= -minimumAcceptableBalance;

    const amountValid =
      notMoreThan2DecimalPlaces && mustBePositive && !balanceBelowMinimum;

    return !amountValid
      ? {
          moreThan2DecimalPlaces: !notMoreThan2DecimalPlaces,
          mustBePositive: !mustBePositive,
          balanceAcceptable: balanceBelowMinimum,
        }
      : null;
  };
}
