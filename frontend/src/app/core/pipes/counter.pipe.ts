import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "counter" })
export class CounterPipe implements PipeTransform {
  transform(value: number) {
      if (!value) return [value]
      return new Array<number>(value)
  }
}
