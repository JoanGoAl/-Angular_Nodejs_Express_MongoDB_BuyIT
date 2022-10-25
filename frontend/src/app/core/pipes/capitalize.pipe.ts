import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: "capitalize" })
export class CapitalizePipe implements PipeTransform {
  transform(value: string | String) {
      if (!value) return value
      return value[0].toUpperCase() + value.slice(1).toLowerCase()
  }
}
