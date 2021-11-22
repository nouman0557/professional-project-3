import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  
  transform(list: any[], filterText: string): any {
    return list ? list.filter(
      item => {
        if (item.hasOwnProperty('System_Device')) {
           return item['System_Device']['product_name'].search(new RegExp(filterText, 'i')) > -1
        }else{
          return item['product_name'].search(new RegExp(filterText, 'i')) > -1
        }
      }
    ): [];
  }
}