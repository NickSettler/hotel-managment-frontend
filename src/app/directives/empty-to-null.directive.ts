import { Directive, HostListener, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { isEmpty } from "lodash";

@Directive({
  selector: "[appEmptyToNull]",
})
export class EmptyToNullDirective {
  constructor(@Self() private ngControl: NgControl) {}

  @HostListener("keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (isEmpty(value)) this.ngControl.control?.setValue(null);
  }
}
