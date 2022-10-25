import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalizeArray' })
export class CapitalizeArray implements PipeTransform {
  falseValue: Array<any> = [];

  transform(value: Array<any>) {
    console.log(value[0]);

    //! NO RECOGE EL DATO product_image

    value.map((item) => {
      console.log(item);



      /*
       * Comprueba que todos los valores de las llaves son de tipo string
       */

      this.falseValue.push(
        Object.fromEntries(
          Object.entries(item)
            .map((e) => {
              if (e[0] == 'title' || e[0] == 'name') {
                e[1] =
                  String(e[1])[0].toUpperCase() +
                  String(e[1]).slice(1).toLowerCase();
              }

              return e;
            })
        )
      );
    });

    return this.falseValue
  }
}

// if (typeof item == "object") {
//   Object.entries(item).map((entry) => {
//     if (typeof entry[0] != "string" || typeof entry[1] != "string") throw new Error('Values must be String')
//     // if (entry[0] == "title" || entry[0] == "name") {
//     //   entry[1] = entry[1][0]: Array<String> =
//     // }
//   })
// }

// if (typeof item == "string") {
//   return item[0].toUpperCase() + item.slice(1).toLowerCase()
// }

// throw new Error('Only can pass Array of Objects or Array of Stings')
