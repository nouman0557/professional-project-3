
export class PoOrder {
    [x: string]: any
    allorders = []
    allItems = []
    allProducts = []
    constructor() {
    }

    addOrder(order) {
        let itemExist = false
        for (let i = 0; i < this.allItems.length; i++) {
            if (this.allItems[i]._id === order._id) {
                itemExist = true
            }
        }
        if (!itemExist) {
            this.allItems.push(order)
            return this.allItems
        }
        else {
            var index = this.allItems.map(x => {
                return x._id;
              }).indexOf(order._id);
              this.allItems[index].selectedQuantity = Number(order.selectedQuantity + 1)
            return this.allItems
        }
    }

    removeItem(index) {
        console.log('all items-->',this.allItems);
        this.allItems.splice(index, 1);
        return this.allItems
    }

    getAllOrders() {
        return this.allItems
    }
    
    retrieveOrder(order) {
        this.allItems = order
    }

    existingIds = 0
    getId() {
        debugger
        let id = this.existingIds + 1
        if (id < 10) {
            return '#Order-00000' + id
        }
        else if (id >= 10 && id < 100) {
            return '#Order-0000' + id
        }
        else if (id >= 100 && id < 1000) {
            return '#Order-000' + id
        }
        else if (id >= 1000 && id < 10000) {
            return '#Order-00' + id
        }
        else if (id >= 10000 && id < 100000) {
            return '#Order-0' + id
        }
        else if (id >= 100000) {
            return '#Order-' + id
        }
    }
}