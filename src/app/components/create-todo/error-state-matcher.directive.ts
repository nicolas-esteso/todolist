import { Directive, Host, Input } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FormControlState } from 'ngrx-forms';

/**
 * Angular material components are meant to work with 'angular/forms'.
 * When using ngrx-forms, we need to 'manually' update the inputs' inner status to reflect the actual
 * status of the form.
 * Without this, components like 'mat-error', which rely on the form's current status to determine if they sould
 * be displayed or not, don't work out of the box.
 */
@Directive({
  selector: '[tdErrorChecker]',
})
export class ErrorStateMatcherDirective {

  @Input() set tdErrorChecker(formState: FormControlState<any>) {
    const hasError = formState.isInvalid && formState.isDirty;

    if (this.input) {
      this.input.errorState = hasError;
    }
  }

  constructor(@Host() private input: MatInput) { }
}
