import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilterByFieldName'
})
export class ListFilterByFieldNamePipe implements PipeTransform {

  transform(list: any[], ...args: any[]): any {
    var searchText = args[0];
    var searchColumn = args[1];
    var filter = args[2]
    //var searchColumn = args[2]

    if (searchText == '' && (filter == 'all' || filter == undefined))
      return list
    if (searchColumn == '' || searchColumn == undefined)
      return list
    if (searchText == '' && filter != undefined) {
      return this.applyFilter(list, filter)
    }
    let columns = searchColumn.split(",");
    let filterArray = []
    for (var val of columns) {
      val = val.trim()
      let searchedArray = list.filter(item => {
        return item.hasOwnProperty(val) && item[val] !== null && item[val] !== '' ? item[val].search(new RegExp(searchText, 'i')) > -1 : 0
      })

      filterArray = Array.from(new Set(filterArray.concat(searchedArray)))
    }
    if(filter != undefined) {
      return this.applyFilter(filterArray,filter)
    }
    return filterArray
  }

  applyFilter(list, filter) {
    if (filter == 'all') {
      return list
    }
    else if (filter == 'low') {
      const result = list.filter(el => el['ProductStockPrice'][0]['qty_available'] < el['ProductStockPrice'][0]['alert_quantity'] && el['ProductStockPrice'][0]['qty_available'] > 0);
      return result
    }
    else if (filter == 'none') {
      const result = list.filter(el => el['ProductStockPrice'][0]['qty_available'] < 0);
      return result
    }
    else if (filter == 'plenty') {
      const result = list.filter(el => el['ProductStockPrice'][0]['qty_available'] > el['ProductStockPrice'][0]['alert_quantity']);
      return result
    }
  }

}
