import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'supplierBuyBackFilter'
})
export class supplierBuyBack implements PipeTransform {
  result
  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (filter == 'true') {
      filter = true
    } else {
      filter = false
    }
    this.result = items.filter(item => item.is_buyback == filter);
    if(this.result.length === 0){
      return[-1];
    }
    return this.result

  }
}