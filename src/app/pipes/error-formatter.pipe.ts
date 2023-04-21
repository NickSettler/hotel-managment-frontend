import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Pipe({
  name: "errorFormatter",
})
export class ErrorFormatterPipe implements PipeTransform {
  transform(errors: ValidationErrors | null, fieldName: string): string | null {
    if (errors?.["nonNullable"]) return `${fieldName} is required`;
    if (errors?.["required"]) return `${fieldName} is required`;
    if (errors?.["email"]) return `${fieldName} is not valid email`;
    if (errors?.["inputMask"]) return `${fieldName} is invalid`;

    return null;
  }
}
