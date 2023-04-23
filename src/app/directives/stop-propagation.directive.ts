import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appStopPropagation]",
})
export class StopPropagationDirective {
  @HostListener("click", ["$event"])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener("keyup", ["$event"])
  onKeyUp(event: KeyboardEvent) {
    event.stopPropagation();
  }
}
