import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderPartSupplierFilter'
})
export class OrderPartSupplierPipe implements PipeTransform {

    transform(list: any[], filterText: string): any {

        if(!list) return null
        if(filterText == '') return list
        return list ? list.filter(
            item => {
                return JSON.stringify(item.Supplier.supplier_company).toLowerCase().includes(filterText.toLowerCase()) || JSON.stringify(item.sku_number).toLowerCase().includes(filterText.toLowerCase()) ;
              //  item.Supplier.supplier_company.search(new RegExp(filterText, 'i')) > -1 || item.sku_number.search(new RegExp(filterText, 'i')) > -1
            }
        ) : [];
    }

}