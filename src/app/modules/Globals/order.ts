
export class Orders {
    
    [x: string]: any
    allorders = []
    allItems = []
    allProducts = []
    allOrderAndInvoices = []
    allMinimizedOrders = []
    customerSelected = {}
    allDevices=[]
    gifCard : any
    constructor() {
    }

    setGiftCardValues(gift,amount) {
        this.gifCard = gift
        this.gifCard['amount'] = amount
    }

    getGiftCardValues() {
        return this.gifCard
    }

    setCustomerSelected(cus) {
        this.customerSelected = cus
    }

    getCustomerSelected() {
        return this.customerSelected
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
            this.allItems[index].selectedQuantity = Number(order.selectedQuantity) + 1
            return this.allItems
        }
    }

    removeItem(index) {
        console.log('all items', this.allItems);

        this.allItems.splice(index, 1);
        return this.allItems
    }

    addDevice(device) {  
        let itemExist = false
        for (let i = 0; i < this.allDevices.length; i++) {
            if (this.allDevices[i]._id === device._id) {
                itemExist = true
            }
        }
        if (!itemExist) {
            this.allDevices.push(device)
            return this.allDevices
        }
        else {
            var index = this.allDevices.map(x => {
                return x._id;
            }).indexOf(device._id);
            this.allDevices[index].noOfParts = Number(device.noOfParts + 1)
            return this.allDevices
        }
    }

    removeDeviceItem(index) {
        console.log('all Device items--->', this.allDevices);

        this.allDevices.splice(index, 1);
        return this.allDevices
    }

    getAllOrders() {
        return this.allItems
    }

    getAllDevices() {
        return this.allDevices
    }
    setproducts(pr) {
        this.allProducts = pr
    }

    getAllproducts() {
        return this.allProducts
    }

    minimizeOrder(order) {
        this.allorders.push(order)
        this.allItems = []
        console.log('currently ', this.allorders.length + 'in list and orders are', this.allorders);
        return this.allorders
    }

    retrieveOrder(order) {
        this.allItems = order
        // this.allItems = JSON.parse(JSON.stringify(order))
        // console.log('order is retrieved', this.allItems);
        // let sale:CreateSaleComponent;
        // sale.retrieveOrder(order)
    }

    returnMiniOrders() {
        return this.allMinimizedOrders
    }

    getAllMinimizedOrders(mOrder) {
        this.allMinimizedOrders.push(mOrder)
        this.allItems = []
        return this.allMinimizedOrders
    }

    removeOneOrderFromList(order) {
        var index = this.allMinimizedOrders.map(x => {
            return x.orderId;
        }).indexOf(order.orderId);
        this.allMinimizedOrders.splice(index, 1);
        return this.allMinimizedOrders
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
        // return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    }

    maintainStateOfOrderAndInvoices(arr) {
        this.addOrderAndInvoices = arr
    }

    addOrderAndInvoices(or) {
        this.allOrderAndInvoices = [or, ...this.allOrderAndInvoices ]
    }

    getOrderAndInvoices() {
        return this.allOrderAndInvoices
    }
    
    note=""
    noteUpdate(note){
    this.note=note
    }

    getNote(){
        return this.note
    }

    option=true
    optionUpdate(option){
        this.option=option
    }

    getOption(){
    return this.option
    }

    fullOrderDiscount
    fullOrderDiscountUpdate(val){
    this.fullOrderDiscount=val
    }

    getFullOrderDiscount(){
        return this.fullOrderDiscount
    }

    taxChecked=false
    taxCheckUpdate(val){
        this.taxChecked=val
    }

    getTaxChecked(){
        return  this.taxChecked
    }

}