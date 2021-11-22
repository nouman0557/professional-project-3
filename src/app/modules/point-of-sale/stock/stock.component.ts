import { Component, OnInit, TemplateRef, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    GetAllProductAccountsGQL, SearchSystemSupplierGQL, SupplierGQL,
    CreateSupplierGQL, SupplierInput, RemovedSupplierGQL, RemovedMultiSuppliersGQL,
    SearchSupplierGQL, UpdateSupplierGQL, CheckSupplierEmailAndCompanyPhoneGQL, TaxsGQL, GetProductsAndSearchGQL, FilterType, CreateProductGQL, ProductInput, ProductsBySupplierGQL,
    SearchProductGQL, DeleteProductGQL, GetAllBrandsGQL, BrandInput, CreateBrandGQL, BrandType, GetProductbyIdGQL,
    UserBusinessLocationsGQL, CreatePurchaseOrderGQL, AllowedTransactionStatus, UpdateProductGQL,
    AllowedTransactionPaymentStatus, CreatePurchaseOrderInput, AllowedTransactionType, GetCountriesGQL,
    AllowedOrdertStatus, ImportSearchProductsGQL, GetPurchaseOrdersAndSearchGQL, GetSupplierPurchaseHistoryGQL,
    GetSupplierPurchaseOrdersGQL, GetSupplierPurchasePaymentsGQL, GetSupplierPurchaseBillsGQL,
    PurchaseOrderReceivingGQL, GetAllSupplierRestockGQL, CreateShippingTypeGQL,
    GetAllShippingTypeGQL, AllowedOrderstStatus, ArrivalsFilter,
    Account_Type, ImportSuppliersDataGQL,
    GetAllDeviceModelByBrandGQL, UpdateShippingTypeGQL,
    GetShippingTypeGQL, DeleteShippingTypeGQL, CreateDeviceModelGQL,
    GetAllCompatibleDeviceTagsGQL,
    UniqueSkuNumberForProductGQL,
    UniqueSkUNumberForSupplierGQL,
    GetAllAccountTypeWiseGQL,
    GetProductsforAddBundleProductGQL,
    GenerateSkuNumberGQL,
    CreateChartOfAccountByTypeGQL,
    CompareSupplierWithSystemGQL,
    GetProductAndBundlebySupplierGQL,
    AllowedType, BundleInput,
    GetStatusGQL, GetTaxsByLocationGQL,
    CreateStatusGQL,
    SupplierNetTermRecordGQL,
    SaveManufacturedBundleGQL,
    CreatePurchaseOrderpaymentGQL,
    AllowedPurchaseOrderPaymentMethod,
    CreateManufacturedBundleGQL,
    GetAllOrderStatusGQL,
    OrderStatusUpdateGQL,
    TaxTypeEnum, AddShippingDetailGQL,
    GetPurchaseOrderbyIdGQL,
    AddAdditionalCostGQL,
    SupplierSummaryGQL,
    SupplierPoListGQL,
    Supplier,
    SupplierSummaryType,
    GetTimeZonesGQL,
    CashRegistersOfLocationGQL,
    DeletePaymentGQL,
    PoSupplierOrderNumberGQL,
    PoStatusUpdateGQL,
    PoStatusName,
    SupplierPaymentSettingListGQL,
    SupplierPaymentSettingsGQL,
    PoTransactionType,
    GetCreditLineGQL,
    PoDeleteGQL,
    IsManufactureBunldeProductGQL,
    PoCancelGQL,
    GetRmaOrderGQL,
    RefundPaymentType, CreateRmaOrderGQL,
    GetProductBySupplierGQL,
    TpType,
    UpdateRmaStatusGQL,
    AssignRmaStatus,
    TransactionRmaStatusInput,
    CreatePaymentRefundGQL,
    CreateReceivingRmaGQL,
    ItemReceivingRmaInput,
    ProductTypes, GetSupplierNettermLogsGQL,
    RestoreProductGQL,
    ArchiveToActiveSupplierGQL,
    PermanentDeleteSupplierGQL,
    CreateDeviceTagGQL,
    GetAllAccountTypesGQL,
    CreateSupplierNettermGQL, InputSupplierNetTermPayment,
    AllowedPaymentMethod,
    SupplierNetTerm, CreateSupplierNetTermPaymentGQL,
    SupplierNetTermGQL,
    SuppliersCheckDuplicationDataGQL,
    SuppliersVerificationWithSystemGQL,
    SupplierByIdGQL,
    ImportProductsDataGQL,
    DeleteLogAndUpdateStockGQL,
    PoTransactionFlowGQL,
    CreatePoToRmaGQL,
    GetAllSystemBrandsGQL,
    CreateSystemBrandGQL,
    CreateSystemDeviceGQL,
    GetAllBrandWiseModelsGQL
} from 'src/app/generated/graphql';
import { Papa } from 'ngx-papaparse';
import { ToasterService } from 'src/app/services/toaster/toaster.service'
import { PoOrder } from '../../Globals/po-order';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Orders } from '../../Globals/order';
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { CSVService } from 'src/app/services/csv.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BuybackProgramComponent } from './buyback-program/buyback-program.component';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { StockService } from 'src/app/services/stock/stock.service';
import { SupplierService } from 'src/app/services/stock/supplier.service';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

declare function profilePicture(op1, op2, op3): any
declare function calculateLIsInRow(): any;
const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {
    itemsPerSlide = 4;
    baseUrl = EnvironmentUrl.Images
    // https://apidev.techbar.com/api/pdf?orderId=5ee24d508d080613826bd052
    singleSlideOffset = true;
    displayBuyBackProgram = false;
    allTagsObjects = []
    existingSP = true
    addNewProduct = false
    manageproducts = true
    existingPO = true
    managesuppliers = false
    existingSuppliers = true
    supplierInfo = false
    addEditSupplier = false
    restock = false
    selectRSupplier = false
    selectRType = true
    selectRShipping = false
    selectRItems = false
    poDetails = false
    orderText = "Orders"
    poStatus = false
    spDetails = false
    poReveive = false
    createPO = false
    checkOutsection = false
    stocksection = true
    noMethodSelected = true
    boxCredit = false;
    boxCheck = false;
    boxCash = false;
    boxPaypal = false;
    boxNetterm = false;
    boxStorecredit = false;
    boxCoupons = false;
    boxPayinvoice = false;
    loadexistingPO = true;
    loadexistingSP = true;
    loadexistingSuppliers = true;
    loadrestock = true;
    ifPrintInput = true
    ifPrintPreview = false
    cutomerInfo = false
    createNote = false
    manageCredit = false
    transferCredit = false
    netTermsPayment = false
    ifPOChecked = true
    ifPOUnChecked = false
    refundView = true
    paymentView = false
    userAuthorizationView = false
    sptype = 'Select Type'
    spbrand = 'Select Brand'
    statusFilter = 'Status'
    supplierFilter = 'Suppliers'
    psupplierFilter = 'Filter By Supplier'
    pStockFilter = 'Filter by Stock'
    mappedColumn = 'Select Any'
    stockImport = 'Import Stock'
    changeTax = 'None'
    changeShipping = 'Other'
    selectedTimeZone = 'Select time zone'
    changeTimeAmPm = 'AM'
    changeHour: any
    hoursList = ['01','02','03','04','05','06','07','08','09','10','11','12']
    changeMinute: any
    minutesList = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
    '25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50',
    ,'51','52','53','54','55','56','57','58','59']
    changeCountry = 'Select a country'
    changeCashDrawer = 'Select cash drawer you used to paid'
    changeCLNetTerms = 'Select credit line you used'
    changeCLStoreCredit = 'Select credit line you used'
    inCredit = 'Increase'
    chooseReason = 'Choose Reason'
    changeCurrentStore = 'Choose Store'
    changeDetailtpe = "Select income account details"
    addstockProductForm: any
    addAcountForm: any
    addstockPriceForm: any
    editStockProductForm: any
    addSupplierForm: FormGroup;
    editSupplierForm: any
    addSupplierToList = []
    supplierToDelete = {};
    fieldSearchSupplier: FormControl = new FormControl();
    searchP: FormControl = new FormControl();
    searchPO: FormControl = new FormControl();
    mbpSearch: FormControl = new FormControl();
    rmaSearch: FormControl = new FormControl();
    mappedColumns = ['Item', 'Qty', 'Cost']
    col = []
    columnToMap = []
    selectedExpectedDate = ''
    productCurrentAction = 'Manage Products'
    isOrderStatusBuyback = false
    searchString: string = "product_name,skuNo"
    searchRMA = ''
    @ViewChild('restockSerachPop', { static: true }) template: ElementRef;
    constructor(
        private supplierService: SupplierService,
        private searchSystemSupplier: SearchSystemSupplierGQL,
        private compareSupplierWithSystem: CompareSupplierWithSystemGQL,
        private importSuppliersData: ImportSuppliersDataGQL,
        private CSVService: CSVService,
        private removedMultiSuppliers: RemovedMultiSuppliersGQL,
        private order: Orders,
        private modalService: BsModalService,
        private formbulider: FormBuilder,
        private createSupplierGQL: CreateSupplierGQL,
        private getAllSuppliersGQL: SupplierGQL,
        private removedSupplier: RemovedSupplierGQL,
        private updateSupplier: UpdateSupplierGQL,
        private supplierPhoneAndEmail: CheckSupplierEmailAndCompanyPhoneGQL,
        private searchSupplierQuery: SearchSupplierGQL,
        private taxsGQL: TaxsGQL,
        private getAllProductsGQL: GetProductsAndSearchGQL,
        private createProductGQL: CreateProductGQL,
        private productsBySupplierGQL: ProductsBySupplierGQL,
        private deleteProductGQL: DeleteProductGQL,
        private papa: Papa,
        private brandsGQL: GetAllBrandsGQL,
        private createBrandGQL: CreateBrandGQL,
        private getProductbyIdGQL: GetProductbyIdGQL,
        private UserBusinessLocations: UserBusinessLocationsGQL,
        private PoOrder: PoOrder,
        private createPurchaseOrder: CreatePurchaseOrderGQL,
        private datePipe: DatePipe,
        private getCountriesGQL: GetCountriesGQL,
        private updateProductGQL: UpdateProductGQL,
        private getPurchaseOrders: GetPurchaseOrdersAndSearchGQL,
        private importSearchProducts: ImportSearchProductsGQL,
        private getSupplierPurchaseHistoryGQL: GetSupplierPurchaseHistoryGQL,
        private getSupplierPurchaseOrdersGQL: GetSupplierPurchaseOrdersGQL,
        private getSupplierPurchasePaymentsGQL: GetSupplierPurchasePaymentsGQL,
        private getSupplierPurchaseBillsGQL: GetSupplierPurchaseBillsGQL,
        private updateShippingType: UpdateShippingTypeGQL,
        private getShippingType: GetShippingTypeGQL,
        private deleteShippingType: DeleteShippingTypeGQL,
        private getAllSupplierRestock: GetAllSupplierRestockGQL,
        private createShippingType: CreateShippingTypeGQL,
        private getAllShippingType: GetAllShippingTypeGQL,
        private purchaseOrderReceiving: PurchaseOrderReceivingGQL,
        private getAllAccountsByTypeGQL: GetAllProductAccountsGQL,
        private getDeviceModelGQL: GetAllDeviceModelByBrandGQL,
        private createDeviceModelGQL: CreateDeviceModelGQL,
        private getAllCompatibleDeviceTagsGQL: GetAllCompatibleDeviceTagsGQL,
        private uniqueSkuNumberForProductGQL: UniqueSkuNumberForProductGQL,
        private uniqueSkUNumberForSupplierGQL: UniqueSkUNumberForSupplierGQL,
        private getAllAccountTypeWiseGQL: GetAllAccountTypeWiseGQL,
        private getProductsforAddBundleProductGQL: GetProductsforAddBundleProductGQL,
        private generateSkuNumberGQL: GenerateSkuNumberGQL,
        private getProductAndBundlebySupplier: GetProductAndBundlebySupplierGQL,
        private createChartOfAccountByTypeGQL: CreateChartOfAccountByTypeGQL,
        private getStatus: GetStatusGQL,
        private createStatus: CreateStatusGQL,
        private saveManufacturedBundle: SaveManufacturedBundleGQL,
        private createPurchaseOrderpaymentGQL: CreatePurchaseOrderpaymentGQL,
        private createManufacturedBundle: CreateManufacturedBundleGQL,
        private getAllOrderStatusGQL: GetAllOrderStatusGQL,
        private orderStatusUpdateGQL: OrderStatusUpdateGQL,
        private getTaxsByLocation: GetTaxsByLocationGQL,
        private getPurchaseOrderbyIdGQL: GetPurchaseOrderbyIdGQL,
        private addShippingDetail: AddShippingDetailGQL,
        private addAdditionalCostGQL: AddAdditionalCostGQL,
        private supplierSummaryGQL: SupplierSummaryGQL,
        private supplierPoListGQL: SupplierPoListGQL,
        private getTimeZones: GetTimeZonesGQL,
        private cashRegistersOfLocationGQL: CashRegistersOfLocationGQL,
        private getCreditLineGQL: GetCreditLineGQL,
        private deletePaymentGQL: DeletePaymentGQL,
        private poSupplierOrderNumber: PoSupplierOrderNumberGQL,
        private poStatusUpdateGQL: PoStatusUpdateGQL,
        private supplierPaymentSettingListGQL: SupplierPaymentSettingListGQL,
        private supplierPaymentSettingsGQL: SupplierPaymentSettingsGQL,
        private poDeleteGQL: PoDeleteGQL,
        private isManufactureBunldeProduct: IsManufactureBunldeProductGQL,
        private poCancelGQL: PoCancelGQL,
        private getRMAProductBySupplier: GetProductBySupplierGQL,
        private createRMAOrder: CreateRmaOrderGQL,
        private getRMAOrder: GetRmaOrderGQL,
        private updateRMAStatus: UpdateRmaStatusGQL,
        private createPaymentRefundGQL: CreatePaymentRefundGQL,
        private createReceivingRMA: CreateReceivingRmaGQL,
        private currencyPipe: CurrencyPipe,
        private stockService: StockService,
        private restoreProductGQL: RestoreProductGQL,
        private searcingAndListingSupplier: SearchSupplierGQL,
        private supplierByIdGQL: SupplierByIdGQL,
        private archiveToActiveSupplier: ArchiveToActiveSupplierGQL,
        private permanentDeleteSupplier: PermanentDeleteSupplierGQL,
        private createDeviceTagGQL: CreateDeviceTagGQL,
        private getAllAccountTypesGQL: GetAllAccountTypesGQL,
        private getSupplierNettermLogs: GetSupplierNettermLogsGQL,
        private createSupplierNetterm: CreateSupplierNettermGQL,
        private supplierNetTerm: SupplierNetTermGQL,
        private supplierNetTermRecord: SupplierNetTermRecordGQL,
        private createSupplierNetTermPayment: CreateSupplierNetTermPaymentGQL,
        private suppliersCheckDuplicationData: SuppliersCheckDuplicationDataGQL,
        private SuppliersVerificationWithSystem: SuppliersVerificationWithSystemGQL,
        private importProductsData: ImportProductsDataGQL,
        private cdr: ChangeDetectorRef,
        private removeLogs: DeleteLogAndUpdateStockGQL,
        private poTransactionFlowGQL: PoTransactionFlowGQL,
        private createPoToRmaGQL: CreatePoToRmaGQL,
        private getAllSystemBrands: GetAllSystemBrandsGQL,
        private createSystemBrand: CreateSystemBrandGQL,
        private createSystemDeviceGQL: CreateSystemDeviceGQL,
        private getAllBrandWiseModelsGQL: GetAllBrandWiseModelsGQL,

    ) { }

    transformAmount(element, type) {
        this[type] = this.currencyPipe.transform(this[type], '$');
        element.target.value = this[type];
    }

    ngOnInit() {
        // calculateLIsInRow()
        this.allProducts = this.order.getAllproducts()
        this.getAllProducts()
        this.getAllCountries()
        this.initializeAddStockProduct()
        this.initializeAddStockPrice()
        this.getAllSuppliers()
        this.getAllBrands()
        this.getStores()
        this.getFullOrderTaxs();
        this.getpurchaseOrders()
        this.getAllIncomeAccounts()
        this.getAllTaxs()
        this.getAllSupplierRestockFun()
        // this.getAllShippingTypeFun()
        this.getallStatus()
        this.getAllStatuses()
        this.getTaxsByLocationFun()
        this.getTimeZonesFun()
        this.initializeExtraItemsForm()
        this.initializeAddTrackingFromFun()
        this.getAllAccountType()
        this.searchP.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
            console.log('current search query is ', val);
            this.getAllProducts()
        })
        this.searchPO.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
            console.log('current search query is ', val);
            this.skip = 0;
            this.getpurchaseOrders()
        })
        this.supplierRestockSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
            this.getAllSupplierRestockFun()
        })
        this.mbpSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
            if (this.restockSerachCheck == true) {
                this.modalRef = this.modalService.show(this.template, { class: 'modal-sm ' + 'custModal wd300', backdrop: 'static', keyboard: false });
                return
            }
            if (this.mbpClicked) {
                this.getProductAndBundlebySupplierFun(true, "")
            } else {
                this.getProductAndBundlebySupplierFun(false, this.supplierRestockSelected['_id'])
            }
        })
        this.rmaSearch.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
            this.rmaSearchingLoader = true
            this.getRMAProductBySupplierFun()
        })
        this.fieldSearchSupplier.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(val => {
            this.getAllSuppliers()
        })
    }

    //============================================================== Start Supplier Info Data Session  =================================================================//
    @ViewChild(BuybackProgramComponent, { static: false }) childRef: BuybackProgramComponent;
    supplier = {}
    supplierID
    purchaseHistory = {}
    purchaseOrder = []
    purchasePayment = []
    purchaseBill = []
    supplierInfobtn(supplier) {
        this.existingSuppliers = false;
        this.supplierInfo = true;
        this.supplier = supplier;
        this.supplierID = this.supplier['_id'];
        console.log("this is supplier ID", this.supplierID)
        this.getPurchaseHistory(this.supplierID);
        this.getPurchaseOrder(this.supplierID);
        this.getPurchasePayment(this.supplierID);
        this.getPurchaseBill(this.supplierID);
    }

    timeZones: any
    getTimeZonesFun() {
        this.getTimeZones.watch().valueChanges.subscribe(
            (res) => {
                console.log('getTimeZones res-->', res['data'].getTimeZones);
                this.timeZones = res['data'].getTimeZones
            }, (err) => {
                let message = err.graphQLErrors[0].message
                console.log('getTimeZones err', message);
            }
        )
    }

    changeTimeZoneFun(value) {
        this.selectedTimeZone = value
        this.shippingTypeForm.controls['time_zone'].setValue(value)
    }

    getPurchaseHistory(supplierID) {
        this.getSupplierPurchaseHistoryGQL.watch({
            supplierID: supplierID,
            businessLocation: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                console.log('Purchase History response is', res['data'].GetSupplierPurchaseHistory);
                this.purchaseHistory = res['data'].GetSupplierPurchaseHistory
                console.log('PurchaseHistory Amount is', this.purchaseHistory['totalAmount']);
            }, (err) => {
                console.log('PurchaseHistory error is ', err);
            })
    }

    getPurchaseOrder(supplierID) {
        this.getSupplierPurchaseOrdersGQL.watch({
            supplierID: supplierID,
            businessLocation: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                console.log("Purchase order response is", res['data'].GetSupplierPurchaseOrders)
                this.purchaseOrder = res['data'].GetSupplierPurchaseOrders
                console.log(this.purchaseOrder)
            }, (err) => {
                console.log('Purchase order error is ', err);
            })
    }

    getPurchasePayment(supplierID) {
        this.getSupplierPurchasePaymentsGQL.watch({
            supplierID: supplierID,
            businessLocation: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                console.log("Purchase Payment response is", res['data'].GetSupplierPurchasePayments)
                this.purchasePayment = res['data'].GetSupplierPurchasePayments
            }, (err) => {
                console.log('Purchase Payment error is ', err);
            })
    }

    getPurchaseBill(supplierID) {
        this.getSupplierPurchaseBillsGQL.watch({
            supplierID: supplierID,
            businessLocation: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                console.log("Purchase Bill response is", res['data'].GetSupplierPurchaseBills)
                this.purchaseBill = res['data'].GetSupplierPurchaseBills
            }, (err) => {
                console.log('Purchase Payment error is ', err);
            })
    }



    //============================================================== End Supplier Info Data Session  =================================================================//
    brand = 'Please select Brand'
    allBrands = []
    getAllBrands() {
        this.getAllSystemBrands.watch().valueChanges.subscribe(
            (res) => {
                this.allBrands = res['data'].getAllSystemBrands
                let LastElement = this.allBrands[this.allBrands.length - 1];
                this.allBrands.unshift(LastElement); //add Array at begining
                this.allBrands.pop();
            }, (err) => {
                console.log('brands error', err);
            }
        )
    }

    addBrand(name) {
        this.brandName = name
        this.createBrand(name)
    }

    addProductBrand = (name) => {
        this.createBrand(name) 
    }

    brandName = ''
    createBrand(name) {
        let obj = {
            brand_name: name,
            BusinessLocation: window.localStorage.getItem('location_id'),
        }
        // if (this.brandName == '' || this.brandName == null) {
        //     this.showToaster = false
        //     this.toasterType = 'error'
        //     this.toasterMsg = 'Please Enter Brand Name'
        //     // this.toaster.showError('Brand Name Emty', 'Please Enter Brand Name');
        //     return;
        // } else if (this.allBrands.find(e => e.name === this.brandName)) {
        //     // this.toaster.showInfo('', 'Brand name already exist');
        //     this.showToaster = false
        //     this.toasterType = 'warning'
        //     this.toasterMsg = 'Brand name already exist'
        //     return
        // }
        this.createSystemBrand.mutate({
            input: obj
        }).subscribe(
            (res) => {
                // this.toaster.showSuccess('Sucessfully', 'Brand Created');
                this.showToaster = false
                this.toasterMsg = 'Brand created sucessfully'
                this.toasterType = 'success'
                this.getAllBrands()
                this.brandName = ''
            }, (err) => {
                console.log('error while creating new brand');
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Error while creating new brand'
                // this.toaster.showInfo('Error', 'Creating Brand');
            }
        )
    }

    addProductBrandModel = (name) => {
        this.createModel(name) 
    }

    modelName = ''
    createModel(name) {
        if (this.brandId == '') {
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Please select brand first'
            // this.toaster.showError('Please select brand first', '')
            return
        } 
        // else if (this.modelName == '' || this.modelName == null) {
        //     this.showToaster = false
        //     this.toasterType = 'error'
        //     this.toasterMsg = 'Please Enter Model Name'
        //     // this.toaster.showError('Model Name Emty', 'Please Enter Model Name');
        //     return
        // } else if (this.allModels.find(e => e.name === this.modelName)) {
        //     // this.toaster.showInfo('', 'Model name already exist');
        //     this.showToaster = false
        //     this.toasterMsg = 'Model name already exist'
        //     this.toasterType = 'warning'
        //     this.modelName = ''
        //     return
        // }
        let obj = {
            name: name,//this.modelName,
            BusinessLocation: window.localStorage.getItem('location_id'),
            brand: this.brandId
        }
        this.createDeviceModelGQL.mutate({
            input: obj
        }).subscribe(
            (res) => {
                // this.modelId = res['data'].createDeviceModel._id
                // this.model = res['data'].createDeviceModel.name
                // this.allModels.push(res['data'].createDeviceModel)
                // let LastModel = this.allModels[this.allModels.length - 1];
                // this.allModels.unshift(LastModel); //add Array at begining
                // this.allModels.pop();
                // this.modelName = ''
                // this.toaster.showSuccess('Sucessfully', 'Model Created');
                this.getModels(this.brandId)
                this.showToaster = false
                this.toasterMsg = 'Model successfully created'
                this.toasterType = 'success'
            }, (err) => {
                console.log('error while creating new brand');
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'error while creating new brand'
            }
        )
    }

    applyActiveClass = []
    applyclass(index, Supplier) {
        if (index == this.applyActiveClass[0]) {
            this.applyActiveClass = []
            // this.supplierToDelete = {}
        }
        else {
            this.applyActiveClass = []
            this.applyActiveClass.push(index)
            this.supplierToDelete = Supplier
        }
    }

    applyActiveClassP = []
    applyclassP(index) {
        if (index == this.applyActiveClassP[0]) {
            this.applyActiveClassP = []
            // this.selectedProduct = null
        }
        else {
            this.applyActiveClassP = []
            this.applyActiveClassP.push(index)
        }
    }

    changeValue(type, val) {
        this[type] = val
    }

    iSparentAccount = true
    parentAccount = 'Select Parent Account'
    selectParentAccountForProduct = 'Select Parent Account'
    selectTaxType = 'Select a tax type'
    incomeAccount = 'Please select income account'
    expenseAccount = 'Please select expense account'
    inventoryAccount = 'Please select inventory account'
    changeAccount(type, val, frm, id, controlName) {
        this[type] = val
        this[frm].controls[controlName].setValue(id)
    }

    changeSupplierCountry(country) {
        this.country = country.name
        this.addSupplierForm.controls.Country.setValue(country._id)
        this.countryId = country._id
    }

    getModels(id) {
        this.deviceModelLoading = true
        this.getDeviceModelGQL.watch({
            id: id
        }).valueChanges.subscribe(
            (res) => {
                this.deviceModelLoading = false
                this.allModels = res['data'].getAllDeviceModelByBrand
            }, (err) => {
                this.deviceModelLoading = false
                // this.toaster.showError('Error while fetching brand models', '')
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Error while fetching brand models'
                console.log('model err', err);
            }
        )
    }

    deviceModelLoading = false
    getAllBrandWiseModels(id){
        this.getModels(id)
        this.model = 'Please select model'
        this.modelId = ''
        this.addstockProductForm.controls.DeviceModel.setValue('')
        this.brandId = id
        this.addstockProductForm.controls.Brand.setValue(id)
    }

    changeValueOfBrand(type, val, id) {
        if (id == this.brandId) {
            return
        }
        this.model = 'Please select model'
        this.modelId = ''
        this.addstockProductForm.controls.DeviceModel.setValue('')
        this.getModels(id)
        if (type == 'country') {
            this[type] = val
            this.countryId = id
            return
        }
        this[type] = val
        this.brandId = id
        this.addstockProductForm.controls.Brand.setValue(this.brandId)
    }

    model = 'Please select model'
    modelId = ''
    allModels = []
    changeValueOfModel(type, val, id) {
        this[type] = val
        this.modelId = id
        this.addstockProductForm.controls.DeviceModel.setValue(this.modelId)
    }

    changeProductSelectedModel(id) {
        this.modelId = id
        this.addstockProductForm.controls.DeviceModel.setValue(this.modelId)
    }

    changeValueOfMapColumns(type, val, val1, i) {
        this[type] = val
        this.col[i] = val
        this.columnToMap.push({ c_db: val, c_csv: val1 })
        console.log('lsdjsadjasdj', this.columnToMap);
    }

    doneMapping() {
        this.createPO = true
        for (let i = 0; i < this.dataList.length; i++) {
            let product = {}
            for (let k = 0; k < this.columnToMap.length; k++) {
                product[this.columnToMap[k].c_db] = this.dataList[i][this.columnToMap[k].c_csv]
            }
            for (let j = 0; j < this.importProducts.length; j++) {
                if (this.importProducts[j]['product_name'] == product['Item']) {
                    product['ProductStockPrice'] = []
                    product['selectedQuantity'] = product['Qty']
                    product['product_name'] = product['Item']
                    product['_id'] = this.importProducts[j]['_id']
                    product['alert_quantity'] = this.importProducts[j]['alert_quantity']
                    let PSP = {}
                    PSP['new_default_sell_price'] = 0
                    PSP['default_sell_price'] = product['Cost']
                    product['ProductStockPrice'].push(PSP)
                    this.createPOFunc(product)
                }
            }
        }
        this.existingPO = false
        this.modalRef.hide()
        this.productNotFound = undefined
        this.importProducts = []
        this.length2 = 0
        this.mappedColumns = ['Item', 'Qty', 'Cost']
        // this.toaster.showSuccess('P.O imported successfully', 'P.O import')
        this.showToaster = false
        this.toasterMsg = 'P.O imported successfully'
        this.toasterType = 'success'
    }

    dataList = []
    fields = []
    fileName = ''
    onFileChanged(event) {
        this.fileName = event[0].name
        this.papa.parse(event[0], {
            header: true,
            skipEmptyLines: true,
            complete: (result, file) => {
                console.log(result);
                this.fields = result.meta.fields
                console.log("fields ---->", this.fields);
                this.dataList = result.data;
                this.initializeColumns(result.meta.fields)
            }
        });
    }

    initializeColumns(col) {
        this.columnToMap = []
        for (let i = 0; i < col.length; i++) {
            for (let k = 0; k < this.mappedColumns.length; k++) {
                if (col[i] === this.mappedColumns[k]) {
                    this.columnToMap.push({ c_db: col[i], c_csv: this.mappedColumns[k] })
                    this.col[i] = this.mappedColumns[k]
                }
            }
            if (this.col[i] == undefined) {
                this.col[i] = 'Select Any'
            }
        }
    }

    skipSlide(index) {
        if (this.fields[index] == 'Item') {
            // this.toaster.showError('Field is Must', 'Please Select other one')
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Please Select other one'
            return
        } else {
            console.log('after before', this.fields);
            this.fields.splice(index, 1)
            this.columnToMap.splice(index, 1)
            this.mappedColumns.splice(index, 1)
            this.changeValueOfMapColumns("mappedColumn", this.fields[index], this.fields[index], index)
            console.log('after skip', this.fields);
        }
    }

    supId = ''
    filterBySupplier(type, val, id) {
        this[type] = val
        this.supId = id
        // if (id == '') {
        //     this.getAllProductsGQL.watch({
        //         locationId: window.localStorage.getItem('location_id')
        //     }).valueChanges.subscribe(
        //         (res) => {
        //             this.allProducts = res['data'].products
        //             console.log('all products res', res['data'].products);
        //         }, (err) => {
        //             console.log('all products err', err)
        //         }
        //     )
        // }
        // else {
        //     this.productsBySupplierGQL.watch({
        //         supplierId: id,
        //         stock: this.stock,
        //         locationId: window.localStorage.getItem('location_id')
        //     }).valueChanges.subscribe(
        //         (res) => {
        //             console.log('filter by supplier res', res);
        //             this.allProducts = res['data'].ProductsBySupplier
        //         }, (err) => {
        //             console.log('filter by supplier err', err);
        //         }
        //     )
        // }
    }

    customerInfo(supplier) {
        this.loadSection('S')
        this.existingSuppliers = false;
        this.supplierInfo = true;
        this.supplier = supplier
    }

    stock = ''
    filterByStock(type, val, num) {
        this[type] = val
        this.stock = num
        this.productsBySupplierGQL.watch({
            supplierId: this.supId,
            stock: num,
            locationId: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                console.log('filter by stoc res', res);
                this.allProducts = res['data'].ProductsBySupplier
            }, (err) => {
                console.log('filter by stock err', err);
            }
        )
    }

    modalRef: BsModalRef;
    orders = true
    noOrdersSuppliers = false
    loadSection(val) {
        if (val == 'P' || val == 'S') {
            if (this.poDetails || this.rmaDetailsSession || this.showOrderProcessListingComponent) {
                this.getpurchaseOrders()
                this.existingPO = true
                this.poDetails = false
                this.poStatus = false
                this.orderText = 'ORDERS'
                this.rmaDetailsSession = false
                this.showOrderProcessListingComponent = false
            }
        }
        switch (val) {
            case 'P': {
                this.step = 1
                this.manageproducts = true
                this.managesuppliers = false
                this.restock = false
                break;
            }
            case 'S': {
                this.manageproducts = false
                this.managesuppliers = true
                this.restock = false
                break;
            }
            case 'R': {
                // this.selectOrderProcess = ''
                this.manageproducts = false
                this.managesuppliers = false
                this.restock = true
                this.rmaDetailsSession = false
                if (this.orderText == 'RMA') {
                    this.selectOrderProcess = 'RMA'
                }
                break;
            }
        }
    }

    selectedProduct = {}
    selectProduct(pr, i) {
        this.selectedProduct = pr
        this.applyclassP(i)
    }

    applyABC() {
        calculateLIsInRow()
    }

    productFilter = 'All'
    productTypeFiler = 'AllProducts'
    archiveProducts = false
    changeProductFilter(field, val) {
        this.allProducts = []
        if (this[field] == val && field != 'archiveProducts') {
            this[field] = ''
            this.getAllProducts()
            return
        }
        this[field] = val
        this.getAllProducts()
    }

    resetProductFilter() {
        this.allProducts = []
        this.productFilter = 'All'
        this.productTypeFiler = 'AllProducts'
        this.archiveProducts = false
        this.searchP.setValue('')
        this.getAllProducts()
    }

    allProducts = []
    getAllProducts() {
        this.allProducts = []
        this.loadexistingSP = true
        let obj = {
            locationId: window.localStorage.getItem('location_id'),
            search: this.searchP.value == null ? '' : this.searchP.value,
            limit: 1000,
            skip: 0,
            filterType: FilterType[this.productFilter],
            is_deleted: this.archiveProducts,
            productType: ProductTypes[this.productTypeFiler]
        }
        this.getAllProductsGQL.watch(JSON.parse(JSON.stringify(obj))).valueChanges.subscribe(
            (res) => {
                console.log('all products res', res['data'].getProductsAndSearch);
                this.loadexistingSP = false
                // this.allProducts = res['data'].getProductsAndSearch
                if (this.isProductScrolling) {
                    if (this.allProducts.length == 0) {
                        this.allProducts = JSON.parse(JSON.stringify(res['data'].getProductsAndSearch))
                    }
                    else {
                        this.allProducts = this.allProducts.concat(res['data'].getProductsAndSearch)
                    }
                }
                else {
                    this.allProducts = res['data'].getProductsAndSearch
                }
                this.loadexistingSP = false
                if (this.allProducts == null) {
                    this.allProducts = []
                    return
                }
                for (let i = 0; i < this.allProducts.length; i++) {
                    this.allProducts[i]['cCardFlipProduct'] = false
                    this.allProducts[i]['selected'] = false
                    this.allProducts[i]['bundleDrop'] = false
                    this.allProducts[i]['linkedDevicesOpen'] = false
                }
                calculateLIsInRow()
            }, (err) => {
                console.log('all products err', err)
                this.loadexistingSP = false
            }
        )
    }

    isProductScrolling = false
    ProductSkip = 0;
    ProductLimit = 10;
    onProductScroll() {
        this.isProductScrolling = true
        this.ProductSkip = this.ProductSkip + 10
        this.getAllProducts()
        this.getAllSuppliers()
    }

    allProductSelected() {
        let allSelected = true
        for (let i = 0; i < this.allProducts.length; i++) {
            if (!this.allProducts[i]['selected']) {
                allSelected = false
                break
            }
        }
        return allSelected
    }

    selectedProductsFun(index, event) {
        if (event.target.checked == true) {
            this.allProducts[index]['selected'] = true
        } else {
            this.allProducts[index]['selected'] = false
        }
    }

    selectAllProducts = true
    unselectAllProducts = false
    selectedAllProducts(check) {
        if (check) {
            for (let i = 0; i < this.allProducts.length; i++) {
                this.allProducts[i]['selected'] = true
                this.SelectAllDropProducts = false
                this.selectAllProducts = false
                this.unselectAllProducts = true
            }
        } else {
            for (let i = 0; i < this.allProducts.length; i++) {
                this.allProducts[i]['selected'] = false
                this.SelectAllDropProducts = false
                this.unselectAllProducts = false
                this.selectAllProducts = true
            }
        }
    }

    removeProduct() {
        if (this.poDetails) {
            if (this.isExistingItems) {
                this.orderDetail['TransactionPurchaseLine'].splice(this.index, 1)
                this.modalRef.hide()
                return
            }
            this.extraItems.splice(this.index, 1)
            this.modalRef.hide()
            return
        }
        this.deleteProductGQL.mutate({
            productIds: this.deleteProducts
        }).subscribe(
            (res) => {
                console.log('delete product res', res['data'].deleteProduct);
                this.getAllProducts()
                this.order.setproducts(this.allProducts)
                this.modalRef.hide()
                // this.toaster.showSuccess('Product removed successfully', 'Product delete')
                this.showToaster = false
                this.toasterMsg = 'Product removed successfully'
                this.toasterType = 'success'
            }, (err) => {
                console.log('delete product err', err);
                // this.toaster.showSuccess('Error on deleting product', 'Product delete')
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Error on deleting product'
            }
        )
    }

    ativeProducts = []
    openActiveProModal(template: TemplateRef<any>, cls) {
        this.ativeProducts = []
        for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i]['selected'] == true) {
                this.ativeProducts.push(this.allProducts[i]['_id'])
            }
        }
        if (this.ativeProducts.length != 0) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        } else {
            this.showToaster = false
            this.toasterMsg = 'Please Select Products First'
            this.toasterType = 'error'
        }
    }

    activateProducts() {
        if (this.ativeProducts.length != 0) {
            this.restoreProductGQL.mutate({
                productIds: this.ativeProducts
            }).subscribe(
                (res) => {
                    this.getAllProducts()
                    this.modalRef.hide()
                    this.showToaster = false
                    this.toasterMsg = 'Product active successfully'
                    this.toasterType = 'success'
                }, (err) => {
                    this.showToaster = false
                    this.toasterMsg = err.graphQLErrors[0].message
                    this.toasterType = 'error'
                }
            )
        } else {
            this.showToaster = false
            this.toasterMsg = 'Please Select Products First'
            this.toasterType = 'error'
        }
    }

    exportProduct() {
        let exportProduct = []
        for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i]['selected'] == true) {
                exportProduct.push(this.allProducts[i]['_id'])
            }
        }
        if (exportProduct.length != 0) {
            this.stockService.exportProduct(exportProduct).subscribe(
                (res) => {
                    var blob = new Blob([res], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    if (navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, 'Products.csv');
                    } else {
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = 'Products.csv';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                    window.URL.revokeObjectURL(url);
                    this.showToaster = false
                    this.toasterMsg = exportProduct.length == 1 ? 'Product' + ' exported successfully.' : 'Products' + ' exported successfully.'
                    this.toasterType = 'success'
                }, (err) => {
                    console.log('err while exporting products', err);
                }
            )
        } else {
            // this.toaster.showError('Select Product', 'Please Select Product First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Product First'
            this.toasterType = 'error'
        }
    }

    supplierIds = []
    taxIds = []
    taxPer = 0
    taxDoll = 0
    addSupplierId(type, ev, det, index, ty) {
        if (type === 's') {
            if (ev.target.checked) {
                this.supplierIds.push(det._id)
            }
            else {
                for (let i = 0; i < this.supplierIds.length; i++) {
                    if (det._id == this.supplierIds[i]) {
                        index = i
                    }
                }
                this.supplierIds.splice(index, 1)
            }
        }
        else {
            if (ev.target.checked) {
                this.taxIds.push(det._id)
                if (det.is_percentage) {
                    this.taxPer = this.taxPer + det.amount
                    this.addstockProductForm.controls.sell_price_inc_tax.setValue((this.addstockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.addstockProductForm.value.sell_price)))
                }
                else {
                    this.taxDoll = this.taxDoll + det.amount
                    this.addstockProductForm.controls.sell_price_inc_tax.setValue((this.addstockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.addstockProductForm.value.sell_price)))
                }
            }
            else {
                for (let i = 0; i < this.allTaxes.length; i++) {
                    if (det._id == this.allTaxes[i]._id) {
                        index = i
                    }
                }
                if (this.allTaxes[index].is_percentage) {
                    this.taxPer = this.taxPer - this.allTaxes[index].amount
                    this.addstockProductForm.controls.sell_price_inc_tax.setValue((this.addstockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.addstockProductForm.value.sell_price)))
                }
                else {
                    this.taxDoll = this.taxDoll - this.allTaxes[index].amount
                    this.addstockProductForm.controls.sell_price_inc_tax.setValue((this.addstockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.addstockProductForm.value.sell_price)))
                }
                this.taxIds.splice(index, 1)
            }
        }
        return
    }

    allAccountTypes = []
    getAllAccountType() {
        this.getAllAccountTypesGQL.watch().valueChanges.subscribe(
            (res) => {
                this.allAccountTypes = res['data'].GetAllAccountTypes
            }, (err) => {
                console.log('err while loading acc types', err);
            }
        )
    }

    selectedAccount = 'Please select any account type'
    selectAccountType(acc) {
        this.selectedAccount = acc.title
        this.addAcountForm.controls.account_type_Id.setValue(acc._id)
    }

    initializeAddAccount() {
        this.selectedAccount = 'Please select any account type'
        this.parentAccount = 'Select Parent Account'
        this.addAcountForm = this.formbulider.group({
            account_code: ['', [Validators.required]],
            parent_account_Id: [''],
            is_sub_account: [true],
            account_name: ['', [Validators.required]],
            account_type_Id: ['', [Validators.required]],
            description: [''],
            BusinessLocation: [localStorage.getItem('location_id')]
        });
    }

    get faddAccount() {
        return this.addAcountForm.controls
    }

    subAccount() {
        this.addAcountForm.controls.is_sub_account.setValue(!this.addAcountForm.controls.is_sub_account.value)
    }

    selectParentAccount(acc) {
        this.addAcountForm.controls.parent_account_Id.setValue(acc._id)
        this.parentAccount = acc.account_name
    }

    addAccountSubmitted = false
    addAddAccount() {
        if (this.addAcountForm.controls.is_sub_account.vlaue && this.addAcountForm.controls.parent_account_Id.vlaue == '') {
            this.addAccountSubmitted = true
            return
        }
        else if (this.addAcountForm.invalid) {
            this.addAccountSubmitted = true
            return
        }
        let obj = this.addAcountForm.value
        if (!obj['']) {
            delete obj['parent_account_Id']
        }
        delete obj['is_sub_account']
        obj['Opening_balance'] = Number(obj['Opening_balance'])
        this.createAccountType = this.createAccountType == 'COGS' ? 'Cogs' : this.createAccountType
        this.createChartOfAccountByTypeGQL.mutate({
            account_type: Account_Type[this.createAccountType],
            input: obj
        }).subscribe(
            (res) => {
                this.initializeAddAccount()
                this.allAcounts.push(res['data'].createChartOfAccountByType)
                this.addAccountSubmitted = false
                this.modalRef.hide()
                // this.toaster.showSuccess('Account sucessfully added', '')
                this.showToaster = false
                this.toasterMsg = 'Account sucessfully added'
                this.toasterType = 'success'
            }, (err) => {
                console.log('error while adding account', err);
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'error while adding account'
            }
        )

    }

    incomeAccouns = []
    expenseAccounts = []
    inventoryAccounts = []
    getAllIncomeAccounts() {
        this.getAllAccountsByTypeGQL.watch().valueChanges.subscribe(
            (res) => {
                console.log('product account response is', res['data'].GetAllProductAccounts);
                this.incomeAccouns = res['data'].GetAllProductAccounts.income
                this.expenseAccounts = res['data'].GetAllProductAccounts.expenses
                this.inventoryAccounts = res['data'].GetAllProductAccounts.inventory
            }, (err) => {
                console.log('error while fetching income accounts', err);
                // this.toaster.showError('Income accounts not found', '')
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Income accounts not found'
            }
        )
    }

    allTaxes = []
    getAllTaxs() {
        this.taxsGQL.watch().valueChanges.subscribe(
            (res) => {
                this.allTaxes = res['data'].taxs
                console.log('tax', res['data'])
            }, (err) => {
                console.log('tax err', err);
            }
        )
    }

    ////////////////////// Add Product start from here. ////////////////////////////////

    currentTax = {}
    selectTax(tax) {
        if (tax == 'none') {
            this.currentTax = {}
            this.selectTaxType = 'none'
            this.calculateTax()
            return
        }
        this.currentTax = tax
        this.selectTaxType = tax.name + '(' + tax.amount + '%)'
        this.calculateTax()
    }

    @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
    addStockProductSubmitted = false
    supplierInfoCompleted = false
    //(click)="openModal(open_confirmBundle, 'custModal wd300')"
    selectTab(open_confirmBundle: TemplateRef<any>, cls) {
        this.setPriceFormValidators()
        this.addstockPriceForm.controls.price_without_bundle.setValue(this.totalBundleCost.toFixed(2))
        this.addstockPriceForm.controls.total_cost.setValue(Number(this.totalAvergaeCost).toFixed(2))
        this.calculateStockProductPrice()
        this.calculateBundlPrices()
        if (this.step == 1) {
            this.addStockProductSubmitted = true
            if (this.addstockProductForm.invalid || !this.productSKUUnique) {
                return
            }
            if ((this.addstockProductForm.controls.is_bundle_product.value && this.bundleProducts.length < 2)) {
                this.openModal(open_confirmBundle, cls)
                return
            }
            if (this.linkedServices.length == 0 && this.addstockProductForm.controls.isAddedDeviceModel.value && !this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value) {
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Please select at least one brand and model.'
                return
            }
            if (!this.addstockProductForm.controls.is_product.value || this.addstockProductForm.controls.is_bundle_product.value) {
                let tabId = this.step
                this.step = this.step + 1
                this.staticTabs.tabs[tabId].active = true;
                return
            }
            console.log('form 1 val are', this.addstockProductForm.value);
            let tabId = this.step
            this.step = this.step + 1
            this.staticTabs.tabs[tabId].active = true;
        }
        else if (this.step == 2) {
            if (!this.addstockProductForm.controls.is_product.value || this.addstockProductForm.controls.is_bundle_product.value) {
                this.addStockProduct()
                return
            }
            this.supplierInfoCompleted = true
            if (this.supplierSelectedForAddProduct.length == 0) {
                // this.toaster.showInfo('Please add at least one supplier', '')
                return
            }
            let tabId = this.step
            this.step = this.step + 1
            this.staticTabs.tabs[tabId].active = true;
        }
        else if (this.step == 3) {
            this.addStockProduct()
            return
        }
    }

    skipSupplier() {
        this.supplierInfoCompleted = false
        let tabId = this.step
        this.step = this.step + 1
        this.staticTabs.tabs[tabId].active = true;
    }

    loadPrevTab() {
        if (this.step == 1) {
            return
        }
        else if (this.step == 2) {
            this.step = this.step - 1
            this.staticTabs.tabs[0].active = true;
        }
        else if (this.step == 3) {
            this.step = this.step - 1
            this.staticTabs.tabs[1].active = true;
        }

    }

    step = 1
    onSelect(num: number) {
        this.step = num
        // this.staticTabs.tabs[num].active = true;
    }

    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

    triggerSnapshot(): void {
        this.trigger.next();
    }

    get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    handleInitError(error: WebcamInitError): void {
        console.log('err', error);
        // this.errors.push(error);
    }

    handleImage(webcamImage: WebcamImage): void {
        console.log('received webcam image', webcamImage);
        this.photo = webcamImage['_imageAsDataUrl']
        this.modalService.hide(1)
        // this.pictureTaken.emit(webcamImage);
    }

    photo = ''
    savePhoto() {
        if (this.cameraImg) {
            this.triggerSnapshot()
            return
        }
        this.photo = this.productImage.getAsDataURL()
        this.modalService.hide(1)
    }

    deleteImage() {
        this.productImage.removeImage()
        this.photo = ''
    }

    cahngeProductImage(event) {
        if (event.target.files.length !== 0) {
            let imgData = <File>event.target.files[0]
            if (imgData.type === 'image/png' || imgData.type === 'image/jpg' || imgData.type === 'image/jpeg') {
                let reader = new FileReader()
                reader.readAsDataURL(imgData)
                reader.onload = (event) => {
                    this.productImage.removeImage()
                    this.photo = ''
                    this.productImage = profilePicture('.profile', reader.result, '')
                }
            }
        }
    }

    productSKUUnique = true
    checkProductSKUNumber() {
        if (this.addstockProductForm.controls.sku.value == '') {
            return
        }
        this.uniqueSkuNumberForProductGQL.watch({
            locationId: localStorage.getItem('location_id'),
            sku: this.addstockProductForm.controls.sku.value
        }).valueChanges.subscribe(
            (res) => {
                if (res['data'].uniqueSKUNumberForProduct) {
                    this.productSKUUnique = false
                    return
                }
                this.productSKUUnique = true
            }, (err) => {
                this.productSKUUnique = false
                console.log('error while loading Unique sku', err);
            }
        )
    }

    initializeAddStockProduct() {
        this.addstockProductForm = this.formbulider.group({
            product_name: ['', [Validators.required]],
            is_product: [true, [Validators.required]],
            is_serial_number: [true],
            is_link_to_all_device: [false],
            isAddedDeviceModel: [true],
            // quality: ['', [Validators.required]],
            // color: ['', [Validators.required]],
            is_track_stock: [true],
            sku: ['', [Validators.required]],
            // opening_stock: ['', [Validators.required]],
            ideal_qty: ['', [Validators.required]],
            alert_qty: ['', [Validators.required]],
            Brand: ['', [Validators.required]],
            DeviceModel: ['', [Validators.required]],
            description: [''],
            is_bundle_product: [false, [Validators.required]]
        });
        this.photo = ''
        this.productImage = null
    }

    get faddStockProduct() {
        return this.addstockProductForm.controls
    }

    initializeAddStockPrice() {
        this.addstockPriceForm = this.formbulider.group({
            income_account: ['', Validators.required],
            inventory_account: [''],
            expense_account: [''],
            is_profit_percentage: [false],
            // default_purchase_price: ['', [Validators.required]],
            sell_price: [''],
            sell_price_inc_tax: [''],
            profit_value: [],
            profit_amount: [],
            total_cost: [0],
            percentage_discount: [''],
            price_without_bundle: [''],
            discount_amount: [''],
            average_cost: [0],
            last_cost: ['']
        });
    }

    get faddStockPrice() {
        return this.addstockPriceForm.controls
    }

    generateStoreSKU() {
        this.generateSkuNumberGQL.mutate().subscribe(
            (res) => {
                console.log('sku is', res['data'].generateSKUNumber);
                this.addstockProductForm.controls['sku'].setValue(res['data'].generateSKUNumber)
                this.checkProductSKUNumber()
            }, (err) => {
                console.log('error while generating sku', err);
            }
        )
    }

    serviceBrand = ''
    attachBrandToService(brand) {
        this.brandId = brand['_id']
        this.serviceBrand = brand
        this.getModels(this.brandId)
    }

    serviceModel = ''
    linkedServices = []
    serviceMinPrice = null
    serviceMaxPrice = null
    serviceSubmited = false

    changeServiceModel(model){
        this.serviceModel=model
    }

    addService() {
        this.serviceSubmited = true
        if (this.brand == '' || this.model == '' || this.serviceMinPrice == null || this.serviceMaxPrice == null) {
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Please fill all the fields.'
            return
        }
        let exist = this.linkedServices.filter(el => el.brandId == this.serviceBrand['_id'] && el.modelId == this.serviceModel['_id'])
        if (exist.length > 0) {
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Service already added .'
            return
        }
        let obj = {
            brandId: this.serviceBrand['_id'],
            brandName: this.serviceBrand['brand_name'],
            modelId: this.serviceModel['_id'],
            modelName: this.serviceModel['name'],
            min: Number(this.serviceMinPrice),
            max: Number(this.serviceMaxPrice),
            editService: false,
            itemAttachId: null,
            itemAttached: null,
            addItem: false,
            editItem: false,
        }
        this.linkedServices.push(obj)
        this.isAddModel = true
        this.isNewModel = false
        console.log('service linked', this.linkedServices);
        this.serviceBrand = ''
        this.serviceModel = ''
        this.serviceMinPrice = null
        this.serviceMaxPrice = null
        this.brand = 'Select Brand'
        this.model = 'Select Model'
    }

    openAttachItem(index) {
        this.linkedServices[index]['itemAttachId'] = 'adding'
    }

    attachedItem = null
    linkingItems = []
    getItems(value, index) {
        console.log('value is', value);
        this.getProductsforAddBundleProductGQL.watch({
            brandID: this.linkedServices[index]['brandId'],
            modelID: this.linkedServices[index]['modelId'],
            locationId: localStorage.getItem('location_id'),
            search: value
        }).valueChanges.subscribe(
            (res) => {
                this.linkingItems = res['data'].getProductsforAddBundleProduct
            }, (err) => {
                console.log('Error while loading bundle products', err);
                this.productList = false
            }
        )
    }

    selectItem(index) {
        if(this.linkedServices[index].itemAttached == null ) {
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Please select item first.'
            return
        }
        this.linkedServices[index]['addItem'] = true
        this.linkingItems = []
    }

    editAttachItem(index) {
        this.linkedServices[index]['editItem'] = !this.linkedServices[index]['editItem']
    }

    unlinkDevice() {
        if (this.unlinkService) {
            this.linkedServices.splice(this.unlinkDeviceIndex, 1)
        }
        else {
            this.linkedServices[this.unlinkDeviceIndex]['itemAttachId'] = null
            this.linkedServices[this.unlinkDeviceIndex]['itemAttached'] = null
            this.linkedServices[this.unlinkDeviceIndex]['addItem'] = false
        }
        this.modalRef.hide()
    }

    setLinkDevices() {
        this.addstockProductForm.controls.isAddedDeviceModel.setValue(!this.addstockProductForm.controls.isAddedDeviceModel.value)
    }

    calculateTax() {
        if (!this.isObjectEmpty(this.currentTax)) {
            let taxValue = (Number(this.addstockPriceForm.controls.sell_price.value) * this.currentTax['amount']) / 100
            taxValue = taxValue + Number(this.addstockPriceForm.controls.sell_price.value)
            this.addstockPriceForm.controls.sell_price_inc_tax.setValue(Number(taxValue).toFixed(2))
        }
        else {
            this.addstockPriceForm.controls.sell_price_inc_tax.setValue(Number(this.addstockPriceForm.controls.sell_price.value).toFixed(2))
        }
    }

    calculateBundlPrices() {
        // this.addstockPriceForm.controls.sell_price_inc_tax.setValue(Number(this.addstockPriceForm.controls.sell_price.value).toFixed(2))
        this.calculateTax()
        this.addstockPriceForm.controls.discount_amount.setValue(Number(Number(this.addstockPriceForm.controls.price_without_bundle.value) -
            Number(this.addstockPriceForm.controls.sell_price.value)).toFixed(2))
        this.addstockPriceForm.controls.percentage_discount.setValue(((Number(Number(this.addstockPriceForm.controls.price_without_bundle.value) -
            Number(this.addstockPriceForm.controls.sell_price.value)) * 100) / Number(this.addstockPriceForm.controls.price_without_bundle.value)).toFixed(2))
        if (this.addstockProductForm.controls.is_product.value) {
            this.calculateBundlePrices()
        }
    }

    diplayOptions() {
        if (this.addstockProductForm.controls.is_product.value) {
            if (this.addstockProductForm.controls.is_bundle_product.value) {
                if (this.manufacturedQuantity) {
                    return true
                }
                return false
            }
            if (this.addstockProductForm.controls.is_track_stock.value) {
                return true
            }
            else {
                return false
            }
        }
        return false
    }

    setProfitValues(fel1, fel2, bool) {
        if (bool) {
            this.addstockPriceForm.controls[fel1].setValue(Number(this.addstockPriceForm.controls[fel2].value))
        }
        if (Number(this.addstockPriceForm.controls.average_cost.value) != 0) {
            if (!this.addstockPriceForm.controls.is_profit_percentage.value) {
                let profit = Number(this.addstockPriceForm.controls.average_cost.value) + Number(this.addstockPriceForm.controls.profit_amount.value)
                this.addstockPriceForm.controls.sell_price.setValue(Number(profit).toFixed(2))
            }
            else {
                let profit = (Number(this.addstockPriceForm.controls.profit_value.value) * Number(this.addstockPriceForm.controls.average_cost.value)) / 100
                profit = profit + Number(this.addstockPriceForm.controls.average_cost.value)
                this.addstockPriceForm.controls.sell_price.setValue(Number(profit).toFixed(2))
            }
            this.calculateTax()
        }
    }

    calculatePricesFromSellPrice() {
        this.calculateTax()
        if (Number(this.addstockPriceForm.controls.sell_price.value) == 0) {
            return
        }
        if (Number(this.addstockPriceForm.controls.average_cost.value) != 0) {
            if (!this.addstockPriceForm.controls.is_profit_percentage.value) {
                let profit = (Number(this.addstockPriceForm.controls.sell_price.value) - Number(this.addstockPriceForm.controls.average_cost.value)).toFixed(2)
                this.addstockPriceForm.controls.profit_amount.setValue(Math.round(Number(profit)).toFixed(2))
            }
            else {
                let profit = (Number(this.addstockPriceForm.controls.sell_price.value) - Number(this.addstockPriceForm.controls.average_cost.value)).toFixed(2)
                profit = ((Number(profit) * 100) / Number(this.addstockPriceForm.controls.average_cost.value)).toFixed(2)
                // let profit = (Number(this.addstockPriceForm.controls.average_cost.value) * 100) / Number(this.addstockPriceForm.controls.sell_price.value)
                this.addstockPriceForm.controls.profit_value.setValue(Math.round(Number(profit)).toFixed(2))
            }
            return
        }
        // this.addstockPriceForm.controls.profit_amount.setValue(Math.round(Number(this.addstockPriceForm.controls.sell_price.value)).toFixed(2))
        // this.addstockPriceForm.controls.profit_value.setValue(Math.round(Number(100)).toFixed(2))
        this.addstockPriceForm.controls.average_cost.setValue(Math.round(Number(this.addstockPriceForm.controls.sell_price.value)).toFixed(2))
        this.addstockPriceForm.controls.last_cost.setValue(Math.round(Number(this.addstockPriceForm.controls.sell_price.value)).toFixed(2))
    }

    calculateSalePriceFromLastCost() {
        if (Number(this.addstockPriceForm.controls.sell_price.value) != 0) {
            if (!this.addstockPriceForm.controls.is_profit_percentage.value) {
                let profit = Number(this.addstockPriceForm.controls.sell_price.value) - Number(this.addstockPriceForm.controls.average_cost.value)
                this.addstockPriceForm.controls.profit_amount.setValue(Math.round(Number(profit)).toFixed(2))
                // this.addstockPriceForm.controls.profit_amount.setValue(Number(this.addstockPriceForm.controls.average_cost.value).toFixed(2))
            }
            else {
                let profit = Number(this.addstockPriceForm.controls.sell_price.value) - Number(this.addstockPriceForm.controls.average_cost.value)
                profit = (Number(profit) * 100) / Number(this.addstockPriceForm.controls.average_cost.value)
                // sellPrice = sellPrice + Number(this.addstockPriceForm.controls.average_cost.value)
                this.addstockPriceForm.controls.profit_value.setValue(Math.round(Number(profit)).toFixed(2))
                // this.addstockPriceForm.controls.profit_value.setValue(Number(profit).toFixed(2))
            }
            return
        }
        if (Number(this.addstockPriceForm.controls.profit_amount.value) != 0 || Number(this.addstockPriceForm.controls.profit_value.value) != 0) {
            if (!this.addstockPriceForm.controls.is_profit_percentage.value) {
                let sellPrice = Number(this.addstockPriceForm.controls.profit_amount.value) + Number(this.addstockPriceForm.controls.average_cost.value)
                this.addstockPriceForm.controls.sell_price.setValue(Math.round(Number(sellPrice)).toFixed(2))
                // this.addstockPriceForm.controls.profit_amount.setValue(Number(this.addstockPriceForm.controls.average_cost.value).toFixed(2))
            }
            else {
                let sellPrice = (Number(this.addstockPriceForm.controls.profit_value.value) * Number(this.addstockPriceForm.controls.average_cost.value)) / 100
                sellPrice = Number(sellPrice) + Number(this.addstockPriceForm.controls.average_cost.value)
                // sellPrice = sellPrice + Number(this.addstockPriceForm.controls.average_cost.value)
                this.addstockPriceForm.controls.sell_price.setValue(Math.round(Number(sellPrice)).toFixed(2))
                // this.addstockPriceForm.controls.profit_value.setValue(Number(profit).toFixed(2))
            }
        }
    }

    calculateStockProductPrice() {
        this.calculatePricesFromSellPrice()
        return
        if (this.addstockPriceForm.controls.sell_price.value != '') {
            let pr = 0
            let priceWithTax = 0
            if (this.addstockPriceForm.controls.is_profit_percentage.value) {
                if (this.addstockPriceForm.controls.profit_value.value != '') {
                    pr = (Number(this.addstockPriceForm.controls.sell_price.value) + (Number(this.addstockPriceForm.controls.sell_price.value) * Number(this.addstockPriceForm.controls.profit_value.value)) / 100)
                    // let val = (Number(this.addstockPriceForm.controls.sell_price.value) * Number(this.addstockPriceForm.controls.profit_value.value)) / 100
                    this.addstockPriceForm.controls.profit_amount.setValue(Number(this.addstockPriceForm.controls.profit_value.value))
                }
            }
            else {
                if (this.addstockPriceForm.controls.profit_amount.value != '') {
                    pr = (Number(this.addstockPriceForm.controls.sell_price.value) + Number(this.addstockPriceForm.controls.profit_amount.value))
                    // let val = (Number(this.addstockPriceForm.controls.profit_amount.value) * 100) / Number(this.addstockPriceForm.controls.sell_price.value)
                    this.addstockPriceForm.controls.profit_value.setValue(Number(this.addstockPriceForm.controls.profit_amount.value))
                }
            }
            if (pr == 0) {
                pr = Number(this.addstockPriceForm.controls.sell_price.value)
            }
            if (!this.isObjectEmpty(this.currentTax)) {
                priceWithTax = (Number(pr) * this.currentTax['amount']) / 100
            }
            pr = pr + priceWithTax
            this.addstockPriceForm.controls.sell_price_inc_tax.setValue(pr.toFixed(2))
        }
    }

    calcuatePriceFromSellPriceIncTax() {
        if (this.addstockPriceForm.controls.sell_price.value != '') {
            let taxAmount = 0
            let profit = 0
            if (!this.isObjectEmpty(this.currentTax)) {
                taxAmount = (this.currentTax['amount'] * this.addstockPriceForm.controls.sell_price_inc_tax.value) / 100
            }
            profit = Number(this.addstockPriceForm.controls.sell_price_inc_tax.value) - taxAmount - Number(this.addstockPriceForm.controls.sell_price.value)
            if (this.addstockPriceForm.controls.is_profit_percentage.value) {
                this.addstockPriceForm.controls.profit_amount.setValue(Number((profit * 100) / Number(this.addstockPriceForm.controls.sell_price.value)).toFixed(2))
                this.addstockPriceForm.controls.profit_value.setValue(Number((profit * 100) / Number(this.addstockPriceForm.controls.sell_price.value)).toFixed(2))
                return
            }
            this.addstockPriceForm.controls.profit_amount.setValue(Number(profit).toFixed(2))
            this.addstockPriceForm.controls.profit_value.setValue(Number(profit).toFixed(2))
        }
    }

    calculateBundlePrices() {
        if (Number(this.addstockPriceForm.controls.sell_price.value) == 0) {
            return
        }
        this.calculateTax()
        if (this.addstockProductForm.controls.is_product.value) {
            if (Number(this.addstockPriceForm.controls.total_cost.value) == 0) {
                return
            }
            if (!this.addstockPriceForm.controls.is_profit_percentage.value) {
                let profitBy = (Number(this.addstockPriceForm.controls.sell_price.value) - Number(this.addstockPriceForm.controls.total_cost.value)).toFixed(2)
                this.addstockPriceForm.controls.profit_amount.setValue(profitBy)
            }
            else {
                let profitBy = Number(this.addstockPriceForm.controls.sell_price.value) - Number(this.addstockPriceForm.controls.total_cost.value)
                profitBy = profitBy / Number(this.addstockPriceForm.controls.total_cost.value)
                profitBy = profitBy * 100
                this.addstockPriceForm.controls.profit_value.setValue(Number(profitBy).toFixed(2))
            }
        }
    }

    calculateBundlePricesFromProfit() {
        if (this.addstockProductForm.controls.is_product.value) {
            if (Number(this.addstockPriceForm.controls.total_cost.value) == 0 || Number(this.addstockPriceForm.controls.sell_price.value) == 0) {
                return
            }
            if (!this.addstockPriceForm.controls.is_profit_percentage.value) {
                if (Number(this.addstockPriceForm.controls.profit_amount.value) == 0) {
                    return
                }
                let sellPrice = (Number(this.addstockPriceForm.controls.profit_amount.value) + Number(this.addstockPriceForm.controls.total_cost.value)).toFixed(2)
                this.addstockPriceForm.controls.sell_price.setValue(Number(sellPrice).toFixed(2))
            }
            else {
                if (Number(this.addstockPriceForm.controls.profit_value.value) == 0) {
                    return
                }
                let sellPrice = Number(this.addstockPriceForm.controls.profit_value.value) * Number(this.addstockPriceForm.controls.total_cost.value)
                sellPrice = sellPrice / 100
                sellPrice = sellPrice + Number(this.addstockPriceForm.controls.total_cost.value)
                this.addstockPriceForm.controls.sell_price.setValue(Number(sellPrice).toFixed(2))
            }
        }
        this.calculateBundlePrices()
        this.calculateBundlPrices()
    }

    calculateAverageCost() {
        if (!this.isEditProductForm) {
            this.addstockPriceForm.controls.average_cost.setValue(Number(this.addstockPriceForm.controls.last_cost.value))
            this.calculateSalePriceFromLastCost()
            return
        }
        let avg = (Number(this.addstockPriceForm.controls.last_cost.value) + Number(this.addstockPriceForm.controls.average_cost.value)) / 2
        this.addstockPriceForm.controls.average_cost.setValue(Number(avg.toFixed(2)))
        this.calculateSalePriceFromLastCost()
    }

    setFormValues(form, fel, val) {
        // if(fel == 'is_product') {
        //     this.brand = 'Select Brand'
        //     this.model = 'Select Model'
        // }
        this[form].controls[fel].setValue(val)
        this.updateReactiveFormValidations()
        if (fel == 'is_profit_percentage' && !this.addstockProductForm.controls.is_bundle_product.value) {
            let fel1 = this.addstockPriceForm.controls.is_profit_percentage.value == true ? 'profit_value' : 'profit_amount'
            let fel2 = this.addstockPriceForm.controls.is_profit_percentage.value == false ? 'profit_value' : 'profit_amount'
            this.setProfitValues(fel1, fel2, true)
        }
        if (fel == 'is_profit_percentage' && this.addstockProductForm.controls.is_bundle_product.value) {
            this.calculateBundlePrices()
        }
        // if (fel == 'is_product' && !val) {
        //     this.bundleProducts = []
        //     this.recalculateBundleCost(0, false)
        // }
    }

    setFormValuesForBundleService(form, fel, val) {
        this[form].controls[fel].setValue(val)
    }

    updateReactiveFormValidations() {
        if (this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value && this.addstockProductForm.controls.is_track_stock.value) {
            this.setValidator()
            return
        }
        else {
            if (this.addstockProductForm.controls.is_product.value && this.addstockProductForm.controls.is_bundle_product.value && this.manufacturedQuantity) {
                this.setValidator()
                return
            }
            this.removeValidator()
        }
    }

    setValidator() {
        // this.addstockProductForm.controls['opening_stock'].setValidators([Validators.required])
        // this.addstockProductForm.controls['opening_stock'].updateValueAndValidity()
        this.addstockProductForm.controls['ideal_qty'].setValidators([Validators.required])
        this.addstockProductForm.controls['ideal_qty'].updateValueAndValidity()
        this.addstockProductForm.controls['alert_qty'].setValidators([Validators.required])
        this.addstockProductForm.controls['alert_qty'].updateValueAndValidity()
        // if (this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value) {
            this.addstockProductForm.controls['Brand'].setValidators([Validators.required])
            this.addstockProductForm.controls['Brand'].updateValueAndValidity()
            this.addstockProductForm.controls['DeviceModel'].setValidators([Validators.required])
            this.addstockProductForm.controls['DeviceModel'].updateValueAndValidity()
        // }
        // else if (!this.addstockProductForm.controls.is_product.value || this.addstockProductForm.controls.is_bundle_product.value) {
        //     this.addstockProductForm.controls['Brand'].setValidators(null)
        //     this.addstockProductForm.controls['Brand'].updateValueAndValidity()
        //     this.addstockProductForm.controls['DeviceModel'].setValidators(null)
        //     this.addstockProductForm.controls['DeviceModel'].updateValueAndValidity()
        // }
    }

    removeValidator() {
        // this.addstockProductForm.controls['opening_stock'].setValidators(null)
        // this.addstockProductForm.controls['opening_stock'].updateValueAndValidity()
        this.addstockProductForm.controls['ideal_qty'].setValidators(null)
        this.addstockProductForm.controls['ideal_qty'].updateValueAndValidity()
        this.addstockProductForm.controls['alert_qty'].setValidators(null)
        this.addstockProductForm.controls['alert_qty'].updateValueAndValidity()
        this.addstockProductForm.controls['Brand'].setValidators(null)
        this.addstockProductForm.controls['Brand'].updateValueAndValidity()
        this.addstockProductForm.controls['DeviceModel'].setValidators(null)
        this.addstockProductForm.controls['DeviceModel'].updateValueAndValidity()
    }

    setPriceFormValidators() {
        if (this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value) {
            this.addstockPriceForm.controls['sell_price'].setValidators([Validators.required])
            this.addstockPriceForm.controls['sell_price'].updateValueAndValidity()
            this.addstockPriceForm.controls['sell_price_inc_tax'].setValidators([Validators.required])
            this.addstockPriceForm.controls['sell_price_inc_tax'].updateValueAndValidity()
            this.addstockPriceForm.controls['inventory_account'].setValidators([Validators.required])
            this.addstockPriceForm.controls['inventory_account'].updateValueAndValidity()
            this.addstockPriceForm.controls['expense_account'].setValidators([Validators.required])
            this.addstockPriceForm.controls['expense_account'].updateValueAndValidity()
            // this.addstockPriceForm.controls['profit_value'].setValidators([Validators.required])
            // this.addstockPriceForm.controls['profit_value'].updateValueAndValidity()
            // this.addstockPriceForm.controls['profit_amount'].setValidators([Validators.required])
            // this.addstockPriceForm.controls['profit_amount'].updateValueAndValidity()
        }
        if (!this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value) {
            this.addstockPriceForm.controls['expense_account'].setValidators(null)
            this.addstockPriceForm.controls['expense_account'].updateValueAndValidity()
            this.addstockPriceForm.controls['profit_value'].setValidators(null)
            this.addstockPriceForm.controls['profit_value'].updateValueAndValidity()
            this.addstockPriceForm.controls['profit_amount'].setValidators(null)
            this.addstockPriceForm.controls['profit_amount'].updateValueAndValidity()
        }
        if (this.addstockProductForm.controls.is_bundle_product.value) {
            this.addstockPriceForm.controls['sell_price'].setValidators([Validators.required])
            this.addstockPriceForm.controls['sell_price'].updateValueAndValidity()
            this.addstockPriceForm.controls['expense_account'].setValidators(null)
            this.addstockPriceForm.controls['expense_account'].updateValueAndValidity()
            this.addstockPriceForm.controls['price_without_bundle'].setValidators([Validators.required])
            this.addstockPriceForm.controls['price_without_bundle'].updateValueAndValidity()
            this.addstockPriceForm.controls['discount_amount'].setValidators([Validators.required])
            this.addstockPriceForm.controls['discount_amount'].updateValueAndValidity()
            this.addstockPriceForm.controls['percentage_discount'].setValidators([Validators.required])
            this.addstockPriceForm.controls['percentage_discount'].updateValueAndValidity()
            // this.addstockPriceForm.controls['profit_value'].setValidators([Validators.required])
            // this.addstockPriceForm.controls['profit_value'].updateValueAndValidity()
            // this.addstockPriceForm.controls['profit_amount'].setValidators([Validators.required])
            // this.addstockPriceForm.controls['profit_amount'].updateValueAndValidity()
            this.addstockPriceForm.controls['total_cost'].setValidators([Validators.required])
            this.addstockPriceForm.controls['total_cost'].updateValueAndValidity()
        }
    }

    productList = false
    productToFetch = ''
    allSearchedProducts = []
    searchExistingProduct(event) {
        if (this.brandId == '' || this.modelId == '') {
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Please select brand and model first.'
            return
        }
        this.productToFetch = event
        if (event.length < 1) {
            this.productList = false
            return
        }
        this.getProductsforAddBundleProductGQL.watch({
            is_service: !this.addstockProductForm.controls.is_product.value,
            locationId: localStorage.getItem('location_id'),
            search: event,
            brandID: this.brandId,
            modelID: this.modelId
        }).valueChanges.subscribe(
            (res) => {
                this.productList = true
                this.allSearchedProducts = res['data'].getProductsforAddBundleProduct
                console.log('Bundle products loaded', res['data'].getProductsforAddBundleProduct);
            }, (err) => {
                console.log('Error while loading bundle products', err);
                this.productList = false
            }
        )
    }

    bundleProducts = []
    manufacturedQuantity = false
    totalBundleCost = 0
    totalAvergaeCost = 0
    totalQuantity = 0
    qty = ''
    avgCost = ''
    cost = ''
    currentP = {}
    seletBundleProduct(pro) {
        this.productToFetch = pro['product_name']
        this.currentP = pro
        this.productList = false
        this.cost = pro['sell_price']
        this.avgCost = pro['ProductStockPrice'][0]['average_cost']
        this.qty = JSON.stringify(1)
        this.addProductToBundle()
    }

    setManufacturedQuantity(bool) {
        this.manufacturedQuantity = bool
        this.updateReactiveFormValidations()
    }

    isInvalidBundle = false
    addProductToBundle() {
        if (this.isObjectEmpty(this.currentP) || this.qty == '' || this.cost == '') {
            this.isInvalidBundle = true
            return
        }
        this.isInvalidBundle = false
        // if (this.currentP['ProductStockPrice'][0]['qty_available'] < Number(this.qty) && this.manufacturedQuantity && this.currentP['is_product']) {
        //     this.toaster.showError('Quantitiy availble is not enough', '')
        //     return
        // }
        for (let i = 0; i < this.bundleProducts.length; i++) {
            if (this.bundleProducts[i]['bundleProductID'] == this.currentP['_id']) {
                this.bundleProducts[i]['quantity'] = this.bundleProducts[i]['quantity'] + Number(this.qty)
                this.productToFetch = ''
                this.qty = ''
                this.avgCost = ''
                this.cost = ''
                this.recalculateBundleCost(0, false)
                this.currentP = {}
                this.productList = false
                // this.toaster.showInfo('Item already added in bundle', 'Quantity updated')
                this.showToaster = false
                this.toasterMsg = 'Item already added in bundle'
                this.toasterType = 'warning'
                return
            }
        }
        this.bundleProducts.push({
            bundleProductID: this.currentP['_id'], name: this.currentP['product_name'], quantity: Number(this.qty), selling_price: Number(this.cost),
            availble_qty: this.currentP['ProductStockPrice'][0]['qty_available'], product: this.currentP['is_product'], avgCost: this.currentP['ProductStockPrice'][0]['average_cost']
        })
        this.productToFetch = ''
        this.qty = ''
        this.avgCost = ''
        this.cost = ''
        this.recalculateBundleCost(0, false)
        this.currentP = {}
        this.productList = false
    }

    recalculateBundleCost(index, bool) {
        // if (bool) {
        //     if (this.bundleProducts[index].availble_qty < Number(this.bundleProducts[index].quantity) && this.manufacturedQuantity && this.bundleProducts[index].product) {
        //         this.toaster.showInfo('Total quantitiy availble is ' + this.bundleProducts[index].availble_qty, '')
        //         this.bundleProducts[index].quantity = this.bundleProducts[index].availble_qty
        //         // return
        //     }
        // }
        this.totalBundleCost = 0
        this.totalAvergaeCost = 0
        this.totalQuantity = 0
        for (let i = 0; i < this.bundleProducts.length; i++) {
            this.totalBundleCost = this.totalBundleCost + (this.bundleProducts[i].selling_price * this.bundleProducts[i].quantity)
            this.totalQuantity = this.totalQuantity + Number(this.bundleProducts[i].quantity)
            if (this.bundleProducts[i].product) {
                this.totalAvergaeCost = this.totalAvergaeCost + (this.bundleProducts[i].avgCost * this.bundleProducts[i].quantity)
            }
        }
        this.totalAvergaeCost = this.totalAvergaeCost == 0 ? 0 : Number(this.totalAvergaeCost.toFixed(2))
        this.totalBundleCost = Number(this.totalBundleCost.toFixed(2))
    }

    deleteBundleProduct(index) {
        this.bundleProducts.splice(index, 1)
        this.recalculateBundleCost(0, false)
    }

    public items = [];
    compatibleDevicesList = false
    compatibleDeviceToFetch = []
    getAllCompatibleDevices(name) {
        this.getAllCompatibleDeviceTagsGQL.watch({
            search: name
        }).valueChanges.subscribe(
            (res) => {
                this.items = [];
                for (let i = 0; i < res['data'].searchDeviceTags.length; i++) {
                    this.items.push({ display: res['data'].searchDeviceTags[i].name, value: i + 1 })
                }
                console.log('items are', this.items);
            }, (err) => {
                console.log('no device tag err', err);
            }
        )
    }

    addNewComDev(event) {
        let found = false
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].display == event.display) {
                found = true
            }
        }
        if (found) {
            return
        }
        this.createDeviceTagGQL.mutate({
            tag: event.display,
            tag_version: ''
        }).subscribe(
            (res) => {
                // this.items.push(res['data'].createDeviceTag)
                this.items.push({ display: event.display, value: event.value })
                this.showToaster = false
                this.toasterMsg = 'Device Added Successfully'
                this.toasterType = 'success'
            }, (err) => {
                console.log('error while adding new comp dev', err);
                this.showToaster = false
                this.toasterMsg = err.graphQLErrors[0].message
                this.toasterType = 'error'
            }
        )
        // console.log('com dev are', this.compatibleDeviceToFetch);
    }

    displayAllSuppliers(val) {
        this.showSearchedSupplierList = val
    }

    suppliers = []
    showSearchedSupplierList = false
    searchSupplierForAddProduct = ''
    searchBusinesswiseSupplier(event) {
        if (event.length < 1) {
            return
        }
        this.searchSupplierQuery.watch({
            search: event,
            active: 'active',
            is_verify_supplier: false,
            unlink_product: false,
            location_id: localStorage.getItem('location_id'),
            limit: 1000000,
            skip: 0,
        }).valueChanges.subscribe(
            (res) => {
                this.showSearchedSupplierList = true
                console.log('supplir search response is', res['data'].searchSupplier);
                this.suppliers = JSON.parse(JSON.stringify(res['data'].searchSupplier))
            }, (err) => {
                console.log('supplier search error is ', err);
            }
        )
    }

    currentlySupplierSelected = {}
    currentlySupplierSelectedSKU = ''
    selecteSupplier(sup) {
        this.searchSupplierForAddProduct = sup.supplier_company
        this.currentlySupplierSelected = sup
        this.showSearchedSupplierList = false
    }

    supplierSelectedForAddProduct = []
    isSameSKU = false
    invalidSupplier = false
    currentStock = ''
    addingSupplierInStock = false
    addSelectedSupplier(template: TemplateRef<any>, cls) {
        this.addingSupplierInStock = true
        if (this.isObjectEmpty(this.currentlySupplierSelected)) {
            this.currentlySupplierSelected['_id'] = null
        }
        if (this.currentlySupplierSelectedSKU == '') {
            this.invalidSupplier = true
            this.addingSupplierInStock = false
            return
        }
        for (let i = 0; i < this.supplierSelectedForAddProduct.length; i++) {
            if (this.supplierSelectedForAddProduct[i]['_id'] == this.currentlySupplierSelected['_id'] && this.supplierSelectedForAddProduct[i]['SKU'] == this.currentlySupplierSelectedSKU) {
                this.isSameSKU = true
                this.addingSupplierInStock = false
                return
            }
        }
        this.invalidSupplier = false
        this.isSameSKU = false
        this.uniqueSkUNumberForSupplierGQL.watch({
            locationId: localStorage.getItem('location_id'),
            sku_number: this.currentlySupplierSelectedSKU,
            supplier_id: this.currentlySupplierSelected['_id']
        }).valueChanges.subscribe(
            (res) => {
                if (!res['data'].uniqueSkUNumberForSupplier) {
                    this.supplierSelectedForAddProduct.push({
                        name: this.currentlySupplierSelected['supplier_company'], _id: this.currentlySupplierSelected['_id'],
                        SKU: this.currentlySupplierSelectedSKU, current_stock: Number(this.currentStock)
                    })
                    this.searchSupplierForAddProduct = ''
                    this.currentlySupplierSelected = {}
                    this.currentlySupplierSelectedSKU = ''
                    this.currentStock = ''
                    this.showSearchedSupplierList = false
                    this.addingSupplierInStock = false
                    return
                }
                this.addingSupplierInStock = false
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while adding addingSupplierInStock', err);
                this.addingSupplierInStock = false
            }
        )
    }

    useSupplierSKUWithNew() {
        this.supplierSelectedForAddProduct.push({
            name: this.currentlySupplierSelected['supplier_company'], _id: this.currentlySupplierSelected['_id'],
            SKU: this.currentlySupplierSelectedSKU, current_stock: Number(this.currentStock)
        })
        this.searchSupplierForAddProduct = ''
        this.currentlySupplierSelected = {}
        this.currentlySupplierSelectedSKU = ''
        this.currentStock = ''
        this.showSearchedSupplierList = false
        this.modalRef.hide()
    }

    setSupplierIndexes(index, prop) {
        if (prop == 'up') {
            if (index == 0) {
                return
            }
            let next = this.supplierSelectedForAddProduct[index - 1]
            let curr = this.supplierSelectedForAddProduct[index]
            this.supplierSelectedForAddProduct[index - 1] = curr
            this.supplierSelectedForAddProduct[index] = next
            return
        }
        if (index == this.supplierSelectedForAddProduct.length - 1) {
            return
        }
        let next = this.supplierSelectedForAddProduct[index + 1]
        let curr = this.supplierSelectedForAddProduct[index]
        this.supplierSelectedForAddProduct[index + 1] = curr
        this.supplierSelectedForAddProduct[index] = next
    }

    removeSupplierFromList() {
        this.supplierSelectedForAddProduct.splice(this.currentIndexOfSupplier, 1)
    }

    incomeList = false
    COGSList = false
    inventoryList = false
    allAcounts = []
    incomeAccSearch = ''
    inventoryAccSearch = ''
    cogsAccSearch = ''
    getAccountDetails(val, type) {
        this.getAllAccountTypeWiseGQL.watch({
            search: val,
            type: type
        }).valueChanges.subscribe(
            (res) => {
                this.allAcounts = []
                if (type == 'Income') {
                    this.incomeList = true
                    this.inventoryList = false
                    this.COGSList = false
                }
                else if (type == 'COGS') {
                    this.COGSList = true
                    this.incomeList = false
                    this.inventoryList = false
                }
                else {
                    this.inventoryList = true
                    this.COGSList = false
                    this.incomeList = false
                }
                this.allAcounts = res['data'].GetAllAccountTypeWise
                console.log('accounts detail are', this.allAcounts);
            }, (err) => {
                console.log('err while loading accounts', err);
                this.allAcounts = []
            }
        )
    }

    setAccountDetail(field, value) {
        if (field == 'income_account') {
            this.addstockPriceForm.controls.income_account.setValue(value._id)
            this.incomeAccSearch = value.account_name
            this.incomeList = false
        }
        else if (field == 'inventory_account') {
            this.addstockPriceForm.controls.inventory_account.setValue(value._id)
            this.inventoryAccSearch = value.account_name
            this.inventoryList = false
        }
        else {
            this.addstockPriceForm.controls.expense_account.setValue(value._id)
            this.cogsAccSearch = value.account_name
            this.COGSList = false
        }
    }

    setProductFinalObject() {
        return new Promise(resolve => {
            console.log('linked services', this.linkedServices);
            let services = []
            for (let index = 0; index < this.linkedServices.length; index++) {
                let obj = {
                    ServiceBrand: this.linkedServices[index]['brandId'],
                    ServiceDeviceModel: this.linkedServices[index]['modelId'],
                    service_max_price: Number(this.linkedServices[index]['max']),
                    service_min_price: Number(this.linkedServices[index]['min']),
                    ServiceItem: this.linkedServices[index]['itemAttached'] != null ? this.linkedServices[index]['itemAttached']['_id'] : null
                }
                services.push(obj)
            }
            let productObj = {}
            let allTags = [];
            let compDevices = []
            let supp = []
            let bundle = []
            productObj = this.addstockProductForm.value
            productObj['Brand'] = this.brandId
            productObj['DeviceModel'] = this.modelId
            services = !productObj['isAddedDeviceModel'] ? [] : services
            productObj['servicesBrandModels'] = services
            for (let i = 0; i < this.allTagsObjects.length; i++) {
                allTags.push(this.allTagsObjects[i].name)
            }
            for (let i = 0; i < this.compatibleDeviceToFetch.length; i++) {
                compDevices.push(this.compatibleDeviceToFetch[i].display)
            }
            for (let i = 0; i < this.supplierSelectedForAddProduct.length; i++) {
                supp.push({ supplier_id: this.supplierSelectedForAddProduct[i]._id, sku_number: this.supplierSelectedForAddProduct[i].SKU, current_stock: Number(this.supplierSelectedForAddProduct[i]['current_stock']) })
            }
            for (let i = 0; i < this.bundleProducts.length; i++) {
                bundle.push({
                    bundleProductID: this.bundleProducts[i]['bundleProductID'], quantity: Number(this.bundleProducts[i]['quantity'])
                    , selling_price: Number(this.bundleProducts[i]['selling_price']), avg_cost: Number(this.bundleProducts[i]['avgCost'])
                })
            }
            productObj['tags'] = allTags
            productObj['compatilable_devices'] = compDevices
            productObj['image'] = this.photo
            productObj['ideal_qty'] = Number(productObj['ideal_qty'])
            productObj['alert_qty'] = Number(productObj['alert_qty'])
            productObj['ProductStockPrice'] = this.addstockPriceForm.value
            productObj['ProductStockPrice']['sell_price'] = Number(productObj['ProductStockPrice']['sell_price'])
            productObj['ProductStockPrice']['sell_price_inc_tax'] = Number(productObj['ProductStockPrice']['sell_price_inc_tax'])
            productObj['ProductStockPrice']['profit_value'] = Number(productObj['ProductStockPrice']['profit_value'])
            productObj['ProductStockPrice']['profit_amount'] = Number(productObj['ProductStockPrice']['profit_amount'])
            productObj['ProductStockPrice']['last_cost'] = Number(productObj['ProductStockPrice']['last_cost'])
            productObj['ProductStockPrice']['average_cost'] = Number(productObj['ProductStockPrice']['average_cost'])
            productObj['ProductStockPrice']['percentage_discount'] = Number(productObj['ProductStockPrice']['percentage_discount'])
            productObj['ProductStockPrice']['discount_amount'] = Number(productObj['ProductStockPrice']['discount_amount'])
            productObj['ProductStockPrice']['total_cost'] = Number(productObj['ProductStockPrice']['total_cost'])
            productObj['ProductStockPrice']['price_without_bundle'] = Number(productObj['ProductStockPrice']['price_without_bundle'])
            productObj['ProductStockPrice']['SellTax'] = this.currentTax['_id']
            productObj['Suppliers'] = supp
            productObj['bundle_products'] = bundle
            productObj['is_manufactured_qty'] = this.manufacturedQuantity
            productObj['total_selling_price'] = Number(this.totalBundleCost)
            productObj['total_avg_cost'] = Number(this.totalAvergaeCost)
            productObj['BusinessLocation'] = localStorage.getItem('location_id')
            if (!this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value) {
                // delete productObj['opening_stock']
                delete productObj['ideal_qty']
                delete productObj['alert_qty']
                delete productObj['Brand']
                delete productObj['DeviceModel']
                delete productObj['is_track_stock']
                delete productObj['is_manufactured_qty']
                delete productObj['total_selling_price']
                delete productObj['total_avg_cost']
                delete productObj['bundle_products']
                delete productObj['Suppliers']
                delete productObj['ProductStockPrice']['inventory_account']
                delete productObj['ProductStockPrice']['expense_account']
                delete productObj['ProductStockPrice']['profit_value']
                delete productObj['ProductStockPrice']['profit_amount']
                delete productObj['ProductStockPrice']['last_cost']
                delete productObj['ProductStockPrice']['average_cost']
                delete productObj['ProductStockPrice']['discount_amount']
                delete productObj['ProductStockPrice']['price_without_bundle']
                delete productObj['ProductStockPrice']['percentage_discount']
                delete productObj['ProductStockPrice']['total_cost']
                delete productObj['ProductStockPrice']['is_profit_percentage']
            }
            else if (this.addstockProductForm.controls.is_product.value && !this.addstockProductForm.controls.is_bundle_product.value) {
                delete productObj['is_manufactured_qty']
                delete productObj['total_selling_price']
                delete productObj['total_avg_cost']
                delete productObj['bundle_products']
                delete productObj['ProductStockPrice']['discount_amount']
                delete productObj['ProductStockPrice']['price_without_bundle']
                delete productObj['ProductStockPrice']['percentage_discount']
                delete productObj['ProductStockPrice']['total_cost']
                delete productObj['ProductStockPrice']['is_profit_percentage']
            }
            else if (this.addstockProductForm.controls.is_bundle_product.value && !this.manufacturedQuantity) {
                // delete productObj['opening_stock']
                delete productObj['ideal_qty']
                delete productObj['alert_qty']
                delete productObj['Suppliers']
                delete productObj['ProductStockPrice']['inventory_account']
                delete productObj['ProductStockPrice']['expense_account']
                delete productObj['ProductStockPrice']['last_cost']
                delete productObj['ProductStockPrice']['average_cost']
            }
            else if (this.addstockProductForm.controls.is_bundle_product.value && this.manufacturedQuantity) {
                delete productObj['Suppliers']
                delete productObj['ProductStockPrice']['inventory_account']
                delete productObj['ProductStockPrice']['expense_account']
                delete productObj['ProductStockPrice']['last_cost']
                delete productObj['ProductStockPrice']['average_cost']
            }
            console.log('stock producrt is', productObj);
            resolve(productObj)
        })
    }

    submitted = false
    productPriceSubmitted = false
    isSerialNumer = false
    hasPhysicalStock = true
    profit_percentcent = false
    brandId = ''
    async addStockProduct() {
        if (this.addstockPriceForm.invalid) {
            this.productPriceSubmitted = true
            return
        }
        let product = await this.setProductFinalObject()
        product = this.cleanObject(product)
        if (this.isEditProductForm) {
            this.updateProduct(product)
            return
        }
        this.createProductGQL.mutate({
            input: product
        }).subscribe(
            (res) => {
                console.log('add product res', res);
                this.brandId = ''
                this.modelId = ''
                this.taxIds = []
                this.allTagsObjects = []
                this.cancel('addNewProduct', 'existingSP')
                this.addStockProductSubmitted = false
                this.supplierInfoCompleted = false
                this.productPriceSubmitted = false
                this.model = 'Please select model'
                this.brand = 'Please select Brand'
                this.bundleProducts = []
                this.compatibleDeviceToFetch = []
                this.bundleProducts = []
                this.supplierSelectedForAddProduct = []
                this.step = 1
                this.selectTaxType = 'Select a tax type'
                this.totalAvergaeCost = 0
                this.totalBundleCost = 0
                this.totalQuantity = 0
                this.incomeAccSearch = null
                this.cogsAccSearch = null
                this.inventoryAccSearch = null
                this.getAllProducts()
                this.initializeAddStockProduct()
                this.initializeAddStockPrice()
                this.photo = ''
                this.productImage = null
                // this.toaster.showSuccess('Product Added Successfully', 'Product Added')
                this.showToaster = false
                this.toasterMsg = 'Product Added Successfully'
                this.toasterType = 'success'
            }, (err) => {
                console.log('err while adding product', err);
                // this.toaster.showError('Something went wrong', 'Error')
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Something went wrong, Please try again.'
            }
        )

    }

    /////////////////////////////  Add Product end here //////////////////////////////

    ////////////////////////////   Edit Product start from here //////////////////

    productToUpdate = {}
    isEditProductForm = false
    editProduct(product) {
        this.linkedServices = []
        this.isEditProductForm = true
        this.productToUpdate = product
        console.log('product is', product);
        this.addstockProductForm.controls.product_name.setValue(product['product_name'])
        this.addstockProductForm.controls.Brand.setValue(product['Brand'] == null ? null : product['Brand']['_id'])
        this.addstockProductForm.controls.DeviceModel.setValue(product['DeviceModel'] == null ? null : product['DeviceModel']['_id'])
        this.addstockProductForm.controls.isAddedDeviceModel.setValue(product['isAddedDeviceModel'])
        this.addstockProductForm.controls.is_product.setValue(product['is_product'])
        this.addstockProductForm.controls.is_serial_number.setValue(product['is_serial_number'])
        this.addstockProductForm.controls.is_track_stock.setValue(product['is_track_stock'])
        this.addstockProductForm.controls.sku.setValue(product['sku'])
        // this.addstockProductForm.controls.opening_stock.setValue(product['openingStock'])
        this.addstockProductForm.controls.ideal_qty.setValue(product['ideal_qty'])
        this.addstockProductForm.controls.alert_qty.setValue(product['alert_qty'])
        this.addstockProductForm.controls.description.setValue(product['description'])
        this.addstockProductForm.controls.is_bundle_product.setValue(product['is_bundle_product'])
        this.brandId = product['Brand'] == null ? null : product['Brand']['_id']
        this.modelId = product['DeviceModel'] == null ? null : product['DeviceModel']['_id']
        this.brand = product['Brand'] == null ? 'Please select brand' : product['Brand']['brand_name']
        this.model = product['DeviceModel'] == null ? 'Please select model' : product['DeviceModel']['name']
        // if (product['Brand'] != null) {
        //     this.addstockProductForm.controls.Brand.setValue(product['Brand'])
        //     // this.brand = product['Brand']['name']
        // }
        // else {
        //     this.addstockProductForm.controls.Brand.setValue('')
        // }
        // if (product['DeviceModel'] != null) {
        //     this.addstockProductForm.controls.DeviceModel.setValue(product['DeviceModel'])
        //     // this.model = product['DeviceModel']['name']
        // }
        // else {
        //     this.addstockProductForm.controls.DeviceModel.setValue('')
        // }
        this.photo = product['image'] == null || product['image'] == '' ? '' : EnvironmentUrl.Images + product['image']
        console.log('form 1 values are', this.addstockProductForm.value);
        this.addstockPriceForm.controls.is_profit_percentage.setValue(product['ProductStockPrice'][0]['is_profit_percentage'] == null ? false : product['ProductStockPrice'][0]['is_profit_percentage'])
        this.addstockPriceForm.controls.sell_price.setValue(product['ProductStockPrice'][0]['default_sell_price'])
        this.addstockPriceForm.controls.sell_price_inc_tax.setValue(product['ProductStockPrice'][0]['sell_price_inc_tax'])
        this.addstockPriceForm.controls.profit_value.setValue(product['ProductStockPrice'][0]['profit_value'])
        this.addstockPriceForm.controls.profit_amount.setValue(product['ProductStockPrice'][0]['profit_amount'])
        this.addstockPriceForm.controls.total_cost.setValue(product['ProductStockPrice'][0]['total_cost'])
        this.addstockPriceForm.controls.percentage_discount.setValue(product['ProductStockPrice'][0]['percentage_discount'])
        this.addstockPriceForm.controls.price_without_bundle.setValue(product['ProductStockPrice'][0]['price_without_bundle'])
        this.addstockPriceForm.controls.discount_amount.setValue(product['ProductStockPrice'][0]['discount_amount'])
        this.addstockPriceForm.controls.average_cost.setValue(product['ProductStockPrice'][0]['average_cost'])
        this.addstockPriceForm.controls.last_cost.setValue(product['ProductStockPrice'][0]['last_cost'])
        for (let i = 0; i < product['compatilable_devices'].length; i++) {
            this.compatibleDeviceToFetch.push({ display: product['compatilable_devices'][i], value: i + 1 })
        }
        // brandId: this.serviceBrand['_id'],
        //     brandName: this.serviceBrand['name'],
        //     modelId: this.serviceModel['_id'],
        //     modelName: this.serviceModel['name'],
        //     min: Number(this.serviceMinPrice),
        //     max: Number(this.serviceMaxPrice),
        //     editService: false,
        //     itemAttachId: null,
        //     itemAttached: null,
        //     addItem: false,
        //     editItem: false,
        for (let index = 0; index < product['servicesBrandModel'].length; index++) {
            let obj = {
                brandId: product['servicesBrandModel'][index]['ServiceBrand']['_id'],
                brandName: product['servicesBrandModel'][index]['ServiceBrand']['brand_name'],
                serviceBrand: product['servicesBrandModel'][index]['ServiceBrand'],
                serviceModel: product['servicesBrandModel'][index]['ServiceDeviceModel'],
                modelId: product['servicesBrandModel'][index]['ServiceDeviceModel']['_id'],
                modelName: product['servicesBrandModel'][index]['ServiceDeviceModel']['name'],
                min: product['servicesBrandModel'][index]['service_min_price'],
                max: product['servicesBrandModel'][index]['service_max_price'],
                itemAttachId: product['servicesBrandModel'][index]['ServiceItem'] == null ? null : product['servicesBrandModel'][index]['ServiceItem']['_id'],
                itemAttached: product['servicesBrandModel'][index]['ServiceItem'] == null ? null : product['servicesBrandModel'][index]['ServiceItem'],
                addItem: product['servicesBrandModel'][index]['ServiceItem'] == null ? false : true,
                editItem: false
            }
            this.linkedServices.push(obj)
        }
        if (product['ProductStockPrice'][0]['income_account'] != null) {
            this.addstockPriceForm.controls.income_account.setValue(product['ProductStockPrice'][0]['income_account']['_id'])
            this.incomeAccSearch = product['ProductStockPrice'][0]['income_account']['account_name']
        }
        if (product['ProductStockPrice'][0]['expense_account'] != null) {
            this.addstockPriceForm.controls.expense_account.setValue(product['ProductStockPrice'][0]['expense_account']['_id'])
            this.cogsAccSearch = product['ProductStockPrice'][0]['expense_account']['account_name']
        }
        if (product['ProductStockPrice'][0]['inventory_account'] != null) {
            this.addstockPriceForm.controls.inventory_account.setValue(product['ProductStockPrice'][0]['inventory_account']['_id'])
            this.inventoryAccSearch = product['ProductStockPrice'][0]['inventory_account']['account_name']
        }
        console.log('form 2 values are', this.addstockPriceForm.value);
        if (product['is_bundle_product']) {
            this.bundleProducts = []
            this.totalQuantity = 0
            this.manufacturedQuantity = product['bundle_products']['is_manufactured_qty']
            for (let i = 0; i < product['bundle_products']['bundleProduct'].length; i++) {
                this.totalQuantity = this.totalQuantity + product['bundle_products']['bundleProduct'][i]['quantity']
                this.bundleProducts.push({
                    bundleProductID: product['bundle_products']['bundleProduct'][i]['bundleProductID']['_id'], name: product['bundle_products']['bundleProduct'][i]['bundleProductID']['product_name'],
                    quantity: Number(product['bundle_products']['bundleProduct'][i]['quantity']), selling_price: Number(product['bundle_products']['bundleProduct'][i]['selling_price']),
                    availble_qty: product['bundle_products']['bundleProduct'][i]['bundleProductID']['ProductStockPrice'][0]['qty_available'], product: product['bundle_products']['bundleProduct'][i]['bundleProductID']['is_product'], avgCost: product['bundle_products']['bundleProduct'][i]['bundleProductID']['ProductStockPrice'][0]['average_cost']
                })
            }
            this.totalBundleCost = product['bundle_products']['total_selling_price']
            this.totalAvergaeCost = product['bundle_products']['total_avg_cost']
            console.log('bundle p', this.bundleProducts);
        }
        this.allTagsObjects = []
        if (product['tags'] != null) {
            for (let i = 0; i < product['tags'].length; i++) {
                this.allTagsObjects.push({ name: product['tags'][i], id: i + 1 })
            }
        }
        if (product['Suppliers'] != null) {
            for (let i = 0; i < product['Suppliers'].length; i++) {
                this.supplierSelectedForAddProduct.push({
                    name: product['Suppliers'][i]['supplier_id'] == null ? 'Unknown' : product['Suppliers'][i]['supplier_id']['supplier_company'],
                    _id: product['Suppliers'][i]['supplier_id'] == null ? null : product['Suppliers'][i]['supplier_id']['_id'],
                    SKU: product['Suppliers'][i]['sku_number'], current_stock: Number(product['Suppliers'][i]['current_stock'])
                })
            }
        }
        if (product['ProductStockPrice'][0]['SellTax'] != null) {
            this.currentTax = product['ProductStockPrice'][0]['SellTax']
            this.selectTaxType = product['ProductStockPrice'][0]['SellTax'].name + '(' + product['ProductStockPrice'][0]['SellTax'].amount + '%)'
            this.calculateStockProductPrice()
        } else {
            this.currentTax = {}
            this.selectTaxType = 'none'
            this.calculateStockProductPrice()
        }
        this.getAllCompatibleDevices('')
        this.updateReactiveFormValidations()
        this.setPriceFormValidators()
        this.productCurrentAction = 'Item Details'
        this.existingSP = false
        this.addNewProduct = true
    }

    updateProduct(obj) {
        this.updateProductGQL.mutate({
            id: this.productToUpdate['_id'],
            input: obj
        }).subscribe(
            (res) => {
                if (res['data'].updateProduct) {
                    this.isEditProductForm = false
                    this.cancel('addNewProduct', 'existingSP')
                    this.getAllProducts()
                }
            }, (err) => {

            }
        )
    }

    ////////////////////////////   Edit Product ends here //////////////////

    allSuppliers = []
    initializeEditStockProduct(data) {
        console.log('data to edit p', data);
        for (let i = 0; i < data.ProductStockPrice[0].SellTax.length; i++) {
            console.log('sell tax', data.ProductStockPrice[0].SellTax);
            for (let j = 0; j < this.allTaxes.length; j++) {
                console.log('sell tax con', data.ProductStockPrice[0].SellTax[i] + '}  ' + this.allTaxes[j]._id);
                if (data.ProductStockPrice[0].SellTax[i] == this.allTaxes[j]._id) {
                    if (this.allTaxes[j].is_percentage) {
                        this.taxPer = this.allTaxes[j].amount
                    }
                    else {
                        this.taxDoll = this.allTaxes[j].amount
                    }
                }
            }
        }
        this.selectedProduct = data
        this.brand = data.Brand.name
        this.model = data.DeviceModel.name
        this.brandId = data.Brand._id
        this.modelId = data.DeviceModel._id
        this.isSerialNumer = data.is_serial_number
        this.hasPhysicalStock = data.enable_stock
        this.allTagsObjects = data.Tag
        this.incomeAccount = data.income_account['account_name']
        this.expenseAccount = data.expense_account['account_name']
        this.inventoryAccount = data.inventory_account['account_name']
        this.supplierIds = this.setSupplierAndTaxIds(data.Supplier, 's')
        this.taxIds = this.setSupplierAndTaxIds(data.ProductStockPrice[0].SellTax, 't')
        this.editStockProductForm = this.formbulider.group({
            product_name: [data.product_name, [Validators.required]],
            Brand: [''],
            income_account: [data.income_account['_id'], Validators.required],
            inventory_account: [data.inventory_account['_id'], Validators.required],
            expense_account: [data.expense_account['_id'], Validators.required],
            alert_quantity: [data.alert_quantity],
            default_purchase_price: [data.ProductStockPrice[0].default_purchase_price, [Validators.required]],
            default_sell_price: [data.ProductStockPrice[0].default_sell_price, Validators.required],
            sell_price_inc_tax: [data.ProductStockPrice[0].sell_price_inc_tax, [Validators.required]],
            description: [data.description, [Validators.required]],
            profit_percent: [data.ProductStockPrice[0].profit_percent],
            profit_amount: [(Number(data.ProductStockPrice[0].default_purchase_price) * Number(data.ProductStockPrice[0].profit_percent)) / 100],
            // opening_stock: [data.opening_stock],
            barcode: [data.barcode]
        });
    }

    get fEditStockProduct() {
        return this.editStockProductForm.controls
    }

    setSupplierAndTaxIds(data, ty) {
        let arr = []
        if (ty == 's') {
            for (let i = 0; i < data.length; i++) {
                arr.push(data[i]._id)
            }
            console.log('kdsjfskjf', arr);
            return arr
        }
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i])
        }
        console.log('kdsjfskjf', arr);
        return arr

    }

    showDetail(id, ty) {
        if (ty == 's') {
            for (let i = 0; i < this.supplierIds.length; i++) {
                if (this.supplierIds[i] == id) {
                    return true
                }
            }
            return false
        }
        for (let i = 0; i < this.taxIds.length; i++) {
            if (this.taxIds[i] == id) {
                return true
            }
        }
        return false
    } addAdditionalCostGQLaddAdditionalCostGQL

    updateEditProductFields(num) {
        switch (num) {
            case 1: {
                this.editStockProductForm.controls.profit_percent.setValue((this.editStockProductForm.value.default_sell_price - this.editStockProductForm.value.default_purchase_price) * 100 / this.editStockProductForm.value.default_purchase_price)
                this.editStockProductForm.controls.profit_amount.setValue(this.editStockProductForm.value.default_sell_price - this.editStockProductForm.value.default_purchase_price)
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
                break;
            }
            case 2: {
                this.editStockProductForm.controls.default_sell_price.setValue((this.editStockProductForm.value.profit_percent * this.editStockProductForm.value.default_purchase_price) / 100 + Number(this.editStockProductForm.value.default_purchase_price))
                this.editStockProductForm.controls.profit_amount.setValue(this.editStockProductForm.value.default_sell_price - this.editStockProductForm.value.default_purchase_price)
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
                break;
            }
            case 3: {
                this.editStockProductForm.controls.profit_percent.setValue(this.editStockProductForm.value.profit_amount * 100 / this.editStockProductForm.value.default_purchase_price)
                this.editStockProductForm.controls.default_sell_price.setValue(Number(this.editStockProductForm.value.default_purchase_price) + Number(this.editStockProductForm.value.profit_amount))
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
                break;
            }
        }
    }

    reCalTax(ev, det, index) {
        if (ev.target.checked) {
            this.taxIds.push(det._id)
            if (det.is_percentage) {
                this.taxPer = this.taxPer + det.amount
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
            }
            else {
                this.taxDoll = this.taxDoll + det.amount
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
            }
        }
        else {
            for (let i = 0; i < this.allTaxes.length; i++) {
                if (det._id == this.allTaxes[i]._id) {
                    index = i
                    if (this.allTaxes[index].is_percentage) {
                        this.taxPer = this.allTaxes[i].amount
                    }
                    else {
                        this.taxDoll = this.allTaxes[i].amount
                    }
                }
            }
            if (this.allTaxes[index].is_percentage) {
                this.taxPer = this.taxPer - this.allTaxes[index].amount
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
            }
            else {
                this.taxDoll = this.taxDoll - this.allTaxes[index].amount
                this.editStockProductForm.controls.sell_price_inc_tax.setValue((this.editStockProductForm.value.default_purchase_price * this.taxPer) / 100 + (Number(this.taxDoll) + Number(this.editStockProductForm.value.default_sell_price)))
            }
            this.taxIds.splice(index, 1)
        }
        return
    }

    updateStockProduct() {
        if (this.editStockProductForm.invalid || this.brandId == '' || this.modelId == '') {
            this.submitted = true
            // this.toaster.showError('Please fill all the requied fields', '')
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = 'Please fill all the requied fields'
            return;
        }
        this.submitted = true
        for (let i = 0; i < this.allTagsObjects.length; i++) {
            // this.allTags.push(this.allTagsObjects[i].name)
        }
        let obj = JSON.parse(JSON.stringify(this.editStockProductForm.value))
        obj['enable_stock'] = this.hasPhysicalStock
        obj['alert_quantity'] = this.hasPhysicalStock ? obj['alert_quantity'] : '0'
        // obj['opening_stock'] = this.hasPhysicalStock ? Number(obj['opening_stock']) : null
        obj['is_serial_number'] = this.isSerialNumer
        obj['Brand'] = this.brandId
        obj['DeviceModel'] = this.modelId
        obj['supplier_ids'] = this.supplierIds
        obj['SellTax'] = this.taxIds
        // obj['Tags'] = this.allTags
        obj['BusinessLocation'] = window.localStorage.getItem('location_id')
        obj['dpp_inc_tax'] = obj['default_purchase_price']
        // obj['income_account'] = this.incomeAccount
        obj['default_sell_price'] = obj['default_sell_price'].toString()
        obj['sell_price_inc_tax'] = obj['sell_price_inc_tax'].toString()
        obj['profit_percent'] = obj['profit_percent'].toString()
        obj['profit_amount'] = obj['profit_amount'].toString()
        let fObject: ProductInput = JSON.parse(JSON.stringify(obj))
        fObject = this.cleanObject(fObject)
        console.log('final edit product is', fObject);
        console.log('selectedProduct is', this.selectedProduct['_id']);
        this.updateProductGQL.mutate({
            id: this.selectedProduct['_id'],
            input: fObject
        }).subscribe(
            (res) => {
                console.log('product updated', res['data']);
                if (res['data'].updateProduct) {
                    var index = this.allProducts.map(x => {
                        return x._id;
                    }).indexOf(this.selectedProduct['_id']);
                    this.getProductbyIdGQL.watch({
                        id: this.selectedProduct['_id'],
                        locationId: window.localStorage.getItem('location_id')
                    }).valueChanges.subscribe(
                        (getPRes) => {
                            console.log('update product res', getPRes['data'].getProductbyID);
                            this.getAllProducts()
                            this.order.setproducts(this.allProducts)
                            console.log('update all product', this.allProducts);
                            this.brandId = ''
                            this.supplierIds = []
                            this.taxIds = []
                            // this.allTags = []
                            this.allTagsObjects = []
                            this.modalRef.hide()
                            // this.toaster.showSuccess('Product Updated Successfully', 'Product Updated')
                            this.showToaster = false
                            this.toasterMsg = 'Product Updated Successfully'
                            this.toasterType = 'success'
                        }, (getPErr) => {
                            console.log('update product err', getPErr);
                        }
                    )
                }
            }, (err) => {
                console.log('update p err', err);
                // this.toaster.showError('Error while updating product', '')
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Error while updating product'
            }
        )
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    allCountries = []
    country = 'Choose a country'
    countryId = ''
    isBuyback = true
    initialize_addSupplier() {
        this.compareSupplierCheck = 'Add'
        this.country = 'Choose a country'
        this.countryId = ''
        this.SupplierPhoneError = false
        this.supplierEmailError = false
        this.checksearchSup = true
        this.submittedSupplier = false
        this.UpdateCreateSupplierData = []
        this.addSupplierForm = this.formbulider.group({
            supplier_company: ['', [Validators.required]],
            supplier_company_phone: ['', [Validators.required]],
            // Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
            // supplier_company_email: ['', Validators.required],
            supplier_company_email: ['', [Validators.required,
            Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            address_1: ['', Validators.required],
            address_2: [''],
            website: ['', Validators.required],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip_code: [, [Validators.required]],
            supplier_first_name: [""],
            supplier_last_name: [""],
            supplier_mobile: [''],
            // , [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]
            // supplier_email: [""],
            supplier_email: ['', [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            supplier_phone: [''],
            Country: [''],
            is_verify_supplier: [true],
            is_buyback: [this.isBuyback],
            BusinessLocation: window.localStorage.getItem('location_id'),
        });
    }

    getAllCountries() {
        this.supplierEmailError = false
        this.getCountriesGQL.watch().valueChanges.subscribe(
            (res) => {
                this.allCountries = res['data'].countries
            }, (err) => {
                console.log('err in countries');
            }
        )
    }
    get faddSupplier() {
        return this.addSupplierForm.controls
    }

    isBuybackupdate(value) {
        this.isBuyback = value
    }

    editSupplierDataBtn(sup) {
        this.addEditSupplier = true
        this.cutomerInfo = false
        this.SupplierPhoneError = false
        this.supplierEmailError = false
        this.checksearchSup = true
        this.country = 'Choose a country'
        this.countryId = ''
        this.compareSupplierCheck = 'Edit'
        this.submittedSupplier = false
        this.initialize_editSupplier(sup)
    }

    addSupplierDataBtn() {
        this.compareSupplierCheck = 'Add'
        this.country = 'Choose a country'
        this.countryId = ''
        this.displayBuyBackProgram = false
        this.addEditSupplier = true
        this.existingSuppliers = false
        this.SupplierPhoneError = false
        this.supplierEmailError = false
        this.checksearchSup = true
        this.submittedSupplier = false
        this.initialize_addSupplier()
    }

    submittedSupplier = false
    addsupplierLoader = false
    compareSupplierCheck = 'Add'
    addsupplier(template: TemplateRef<any>, cls) {
        this.addSupplierForm.controls['is_buyback'].setValue(this.isBuyback)
        if (this.addSupplierForm.invalid || this.SupplierPhoneError || this.supplierEmailError || this.countryId == '') {
            this.submittedSupplier = true
            return;
        }
        this.submittedSupplier = false
        this.addsupplierLoader = true
        console.log('add supplier form is', this.addSupplierForm.value);
        let myInput = JSON.parse(JSON.stringify(this.addSupplierForm.value))
        myInput['Country'] = this.countryId
        if (myInput['address_2'] == null) {
            myInput['address_2'] = ""
        }
        this.UpdateCreateSupplierData = JSON.parse(JSON.stringify(myInput));
        this.UpdateCreateSupplierData['is_verify_supplier'] = false
        delete myInput['is_verify_supplier']
        delete myInput['BusinessLocation']
        if (this.compareSupplierCheck == 'Edit') {
            if (this.verifiedSuppDataFun(myInput)) {
                this.addEditSupplier = false
                this.existingSuppliers = true
                this.addsupplierLoader = false
                return
            }
        }
        this.compareSupplierWithSystem.watch({
            input: myInput
        }).valueChanges.subscribe(
            (res) => {
                console.log(' res', res['data'].compareSupplierWithSystem);
                let returnVal = JSON.parse(JSON.stringify(res['data'].compareSupplierWithSystem));
                if (returnVal == null) {
                    this.createSupplierMutation(this.UpdateCreateSupplierData, '')
                } else {
                    this.addsupplierLoader = false
                    this.bindSupplierData(returnVal)
                    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
                }
                console.log(this.selectOrderProcess)
                // this.nextToRestockSupp()

            }, (err) => {
                this.addsupplierLoader = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            })

    }

    compareSupplierCountry = ''
    bindSupplierData(sup) {
        this.compareSupplierCountry = sup.Country == null ? this.country : sup.Country['name']
        this.compareSupplierData['supplier_company'] = sup['supplier_company'] == null ? "" : sup['supplier_company']
        this.compareSupplierData['supplier_company_phone'] = sup['supplier_company_phone'] == null ? "" : sup['supplier_company_phone']
        this.compareSupplierData['supplier_company_email'] = sup['supplier_company_email'] == null ? "" : sup['supplier_company_email']
        this.compareSupplierData['address_1'] = sup['address_1'] == null ? "" : sup['address_1']
        this.compareSupplierData['address_2'] = sup['address_2'] == null ? "" : sup['address_2']
        this.compareSupplierData['website'] = sup['website'] == null ? "" : sup['website']
        this.compareSupplierData['city'] = sup['city'] == null ? "" : sup['city']
        this.compareSupplierData['state'] = sup['state'] == null ? "" : sup['state']
        this.compareSupplierData['zip_code'] = sup['zip_code'] == null ? "" : sup['zip_code']
        this.compareSupplierData['Country'] = sup.Country == null ? this.UpdateCreateSupplierData['Country'] : sup.Country['_id']
        this.compareSupplierData['supplier_first_name'] = this.UpdateCreateSupplierData['supplier_first_name'] == null ? "" : this.UpdateCreateSupplierData['supplier_first_name']
        this.compareSupplierData['supplier_last_name'] = this.UpdateCreateSupplierData['supplier_last_name'] == null ? "" : this.UpdateCreateSupplierData['supplier_last_name']
        this.compareSupplierData['supplier_mobile'] = this.UpdateCreateSupplierData['supplier_mobile'] == null ? "" : this.UpdateCreateSupplierData['supplier_mobile']
        this.compareSupplierData['supplier_email'] = this.UpdateCreateSupplierData['supplier_email'] == null ? "" : this.UpdateCreateSupplierData['supplier_email']
        this.compareSupplierData['supplier_phone'] = this.UpdateCreateSupplierData['supplier_phone'] == null ? "" : this.UpdateCreateSupplierData['supplier_phone']
        this.compareSupplierData['is_verify_supplier'] = true
        this.compareSupplierData['is_buyback'] = this.UpdateCreateSupplierData['is_buyback'] == null ? true : this.UpdateCreateSupplierData['is_buyback']
        this.compareSupplierData['BusinessLocation'] = window.localStorage.getItem('location_id')
    }

    editSubmittedSupplier = false
    editsupplierData: FormGroup;
    compareSupplierData = {}
    UpdateCreateSupplierData = {}
    editsupplier(template: TemplateRef<any>, cls, myInput) {
        // this.editSupplierForm.controls['Country'].setValue(this.countryId)
        if (this.verifiedSuppDataFun(myInput)) {
            this.modalRef.hide()
            return
        }
        this.compareSupplierWithSystem.watch({
            input: myInput
        }).valueChanges.subscribe(
            (res) => {
                this.addsupplierLoader = false
                console.log(' res', res['data'].compareSupplierWithSystem);
                let returnValue = JSON.parse(JSON.stringify(res['data'].compareSupplierWithSystem));
                if (returnValue == null) {
                    this.createSupplierMutation(this.UpdateCreateSupplierData, '')
                } else {
                    this.bindSupplierData(returnValue)
                    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
                }
            }, (err) => {
                this.addsupplierLoader = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            })
    }

    dataVerificationLoader = false
    createSupplierMutation(supplier, hideCheck) {
        this.dataVerificationLoader = true
        if (this.compareSupplierCheck == 'Edit') {
            this.updateSupplierMutation(supplier, hideCheck)
            return
        }
        this.createSupplierGQL.mutate({
            input: supplier
        }).subscribe(
            (res) => {
                if (hideCheck == 'hide') {
                    this.modalRef.hide();
                }
                this.addsupplierLoader = false
                this.dataVerificationLoader = false
                console.log('supplier res', res['data'].createSupplier);
                this.getAllSuppliers()
                this.getAllSupplierRestockFun()
                this.countryId = ''
                this.country = 'Choose a country'
                this.submittedSupplier = false
                this.initialize_addSupplier()
                this.UpdateCreateSupplierData = []
                this.compareSupplierData = {}
                this.addEditSupplier = false
                this.existingSuppliers = true
                if (this.addSupplierForProduct == true) {
                    this.loadSection('P')
                    this.addSupplierForProduct = false
                }
                this.showToaster = false
                this.toasterMsg = 'Supplier created successfully'
                this.toasterType = 'success'
            }, (err) => {
                this.addsupplierLoader = false
                // this.toaster.showError('Something went wrong while add supplier', 'Add Supplier')
                this.showToaster = false
                this.toasterMsg = err.message
                this.toasterType = 'error'
                this.dataVerificationLoader = false
                console.log('supplier err', err);
            })
    }

    updateSupplierMutation(supplier, hideCheck) {
        this.updateSupplier.mutate({
            id: this.editsupplierData['_id'],
            input: supplier
        }).subscribe(
            (res) => {
                this.getAllProducts()
                if (hideCheck == 'hide') {
                    this.modalRef.hide();
                }
                this.addsupplierLoader = false
                this.dataVerificationLoader = false
                this.editSubmittedSupplier = false
                this.getAllSupplierRestockFun()
                this.getAllSuppliers()
                this.initialize_addSupplier()
                this.UpdateCreateSupplierData = {}
                this.compareSupplierData = {}
                this.addEditSupplier = false
                this.existingSuppliers = true
                // this.toaster.showSuccess('Supplier updated successfully', 'Update Supplier')
                this.showToaster = false
                this.toasterMsg = 'Supplier updated successfully'
                this.toasterType = 'success'
            }, (err) => {
                this.addsupplierLoader = false
                this.dataVerificationLoader = false
                console.log('supplier err', err);
                // this.toaster.showError('Something went wrong while updating supplier', 'Update Supplier')
                this.showToaster = false
                this.toasterMsg = err.message
                this.toasterType = 'error'
            })
    }

    cleanObject(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
        return obj
    }

    isObjectEmpty(Obj) {
        for (var key in Obj) {
            if (Obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    supplierPhoneMessage = 'Phone Number is Required'
    SupplierPhoneError = false
    verifySupplierPhone(val) {
        let phone = ''
        if (val == "Add") {
            phone = this.addSupplierForm.controls.supplier_company_phone.value
        } else {
            phone = this.addSupplierForm.controls.supplier_company_phone.value
        }
        if (phone == '') {
            this.supplierPhoneMessage = 'Phone Number is Required'
            this.SupplierPhoneError = true
        }
        else {
            this.supplierPhoneAndEmail.watch({
                supplierField: phone,
                type: 'phone'
            }).valueChanges.subscribe(
                (res) => {
                    console.log('Phone ver res', res);
                    if (res['data'].checkSupplierEmailAndCompanyPhone) {
                        this.SupplierPhoneError = false
                    }
                    else {
                        this.SupplierPhoneError = true
                        this.supplierPhoneMessage = 'Phone Number is already exists'
                    }

                }, (err) => {
                    console.log('email ver err', err);
                })
            this.SupplierPhoneError = false
        }

    }

    supplierEmailMessage = ''
    supplierEmailError = false
    verifySupplierEmail(val) {
        let email = ''
        if (val == "Add") {
            email = this.addSupplierForm.controls.supplier_email.value
        } else {
            email = this.addSupplierForm.controls.supplier_email.value
        }
        if (email !== '') {
            let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            let isEmail = reg.test(email);
            if (isEmail) {
                this.supplierPhoneAndEmail.watch({
                    supplierField: email,
                    type: 'email'
                }).valueChanges.subscribe(
                    (res) => {
                        console.log('Email ver res', res);
                        if (!res['data'].checkSupplierEmailAndCompanyPhone) {
                            this.supplierEmailError = true
                            this.supplierEmailMessage = 'Email already exists'
                        } else {
                            this.supplierEmailError = false
                        }
                    }, (err) => {
                        console.log('email ver err', err);
                    }
                )
            }
            else {
                this.supplierEmailError = true
                this.supplierEmailMessage = 'Invalid Email'
            }
        }
        else {
            this.supplierEmailError = false
        }
    }

    searcingAndListingSuppliers(input: any) {
        return this.searcingAndListingSupplier.watch({
            search: input.search,
            location_id: input.location_id,
            active: input.active,
            is_verify_supplier: input.is_verify_supplier,
            unlink_product: input.unlink_product,
            limit: input.limit,
            skip: input.skip
        }).valueChanges.subscribe(
            (res) => {
                console.log('searchSupplier res', res['data'].searchSupplier);
                let returnVal = res['data'].searchSupplier
            }, (err) => {
                console.log('searchSupplier err', err);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )
    }

    isVerifySupplierFun() {
        this.suppSkip = 0;
        this.suppLimit = 20;
        this.isVerifySupplier = !this.isVerifySupplier
        this.fieldSearchSupplier.setValue("")
        this.addSupplierToList = []
        this.getAllSuppliers()
    }

    unlinkProductFun() {
        this.suppSkip = 0;
        this.suppLimit = 20;
        this.unlinkProduct = !this.unlinkProduct
        this.fieldSearchSupplier.setValue("")
        this.addSupplierToList = []
        this.getAllSuppliers()
    }
    getActiveSuppliers() {
        this.activeArchived = 'active'
        this.suppSkip = 0;
        this.suppLimit = 20;
        this.fieldSearchSupplier.setValue("")
        this.addSupplierToList = []
        this.isVerifySupplier = false
        this.unlinkProduct = false
        this.selectAllSupp = true
        this.unselectAllSupp = false
        this.SelectAllDrop = false
        this.supplierSettingsOpen = false
        this.getAllSuppliers()
    }
    getArchivedSuppliers() {
        this.activeArchived = 'archive'
        this.fieldSearchSupplier.setValue("")
        this.suppSkip = 0;
        this.suppLimit = 20;
        this.addSupplierToList = []
        this.isVerifySupplier = false
        this.unlinkProduct = false
        this.selectAllSupp = true
        this.unselectAllSupp = false
        this.SelectAllDrop = false
        this.supplierSettingsOpen = false
        this.getAllSuppliers()
    }

    activeArchived = 'active'
    isVerifySupplier = false
    unlinkProduct = false
    getAllSuppliers() {
        this.supplierLoader = true
        this.searcingAndListingSupplier.watch({
            search: this.fieldSearchSupplier.value == null ? "" : this.fieldSearchSupplier.value,
            active: this.activeArchived,
            is_verify_supplier: this.isVerifySupplier,
            unlink_product: this.unlinkProduct,
            location_id: window.localStorage.getItem('location_id'),
            limit: this.suppLimit,
            skip: this.suppSkip,
        }).valueChanges.subscribe(
            (res) => {
                this.supplierLoader = false
                console.log('get all suppliers res--->', res['data'].searchSupplier);
                if (this.isSuppScrolling) {
                    if (this.addSupplierToList.length == 0) {
                        this.addSupplierToList = JSON.parse(JSON.stringify(res['data'].searchSupplier))
                    }
                    else {
                        this.addSupplierToList = this.addSupplierToList.concat(res['data'].searchSupplier)
                    }
                }
                else {
                    this.addSupplierToList = res['data'].searchSupplier
                }
                this.suppliers = this.addSupplierToList
                // this.addSupplierToList = res['data'].suppliers;
                if (this.addSupplierToList != null) {
                    for (let i = 0; i < this.addSupplierToList.length; i++) {
                        this.addSupplierToList[i]['cCardFlipSupp'] = false
                        this.addSupplierToList[i]['supplierWebOpen'] = false
                        this.addSupplierToList[i]['supplierEmailOpen'] = false
                        this.addSupplierToList[i]['supplierPhoneOpen'] = false
                        this.addSupplierToList[i]['selected'] = false
                    }
                }
                this.loadexistingSuppliers = false
            }, (err) => {
                this.supplierLoader = false
                console.log('get all suppliers err', err);
                this.loadexistingSuppliers = false
            }
        )
    }

    supplierPhoneOpen = false;
    opensupplierPhone(index) {
        this.hideSupplierPop()
        this.addSupplierToList[index]['supplierPhoneOpen'] = !this.addSupplierToList[index]['supplierPhoneOpen']
    }
    closesupplierPhone(index) {
        this.addSupplierToList[index]['supplierPhoneOpen'] = false
    }

    supplierEmailOpen = false;
    opensupplierEmail(index) {
        this.hideSupplierPop()
        this.addSupplierToList[index]['supplierEmailOpen'] = !this.addSupplierToList[index]['supplierEmailOpen']
    }
    closesupplierEmail(index) {
        this.addSupplierToList[index]['supplierEmailOpen'] = false
    }

    supplierWebOpen = false;
    opensupplierWeb(index) {
        this.hideSupplierPop()
        this.addSupplierToList[index]['supplierWebOpen'] = !this.addSupplierToList[index]['supplierWebOpen']
    }
    closesupplierWeb(index) {
        this.addSupplierToList[index]['supplierWebOpen'] = false
    }


    isSuppScrolling = false
    suppSkip = 0;
    suppLimit = 100;
    onSuppScroll() {
        this.isSuppScrolling = true
        this.suppSkip = this.suppSkip + 10
        this.getAllSuppliers()
    }

    hideSupplierPop() {
        this.SelectAllDrop = false
        this.supplierSettingsOpen = false
        for (let i = 0; i < this.addSupplierToList.length; i++) {
            this.addSupplierToList[i]['supplierWebOpen'] = false
            this.addSupplierToList[i]['supplierEmailOpen'] = false
            this.addSupplierToList[i]['supplierPhoneOpen'] = false
        }

    }

    selectedSuppliersFun(item, event) {
        let index = item.id
        if (event.target.checked == true) {
            this.addSupplierToList[index]['selected'] = true
        } else {
            this.addSupplierToList[index]['selected'] = false
        }
        this.isAllSupplierSelected()
    }

    isAllSupplierSelected() {
        let allSelected = true
        for (let i = 0; i < this.addSupplierToList.length; i++) {
            if (!this.addSupplierToList[i]['selected']) {
                allSelected = false
                break
            }
        }
        if (allSelected) {
            this.selectAllSupp = false
            this.unselectAllSupp = true
            this.SelectAllDrop = false
        }
        else {
            this.selectAllSupp = true
            this.unselectAllSupp = false
            this.SelectAllDrop = false
        }
    }

    selectAllSupp = true
    unselectAllSupp = false
    selectedAllSuppliers(check) {
        if (check) {
            for (let i = 0; i < this.addSupplierToList.length; i++) {
                this.addSupplierToList[i]['selected'] = true
                this.selectAllSupp = false
                this.unselectAllSupp = true
                this.SelectAllDrop = false
            }
        } else {
            for (let i = 0; i < this.addSupplierToList.length; i++) {
                this.addSupplierToList[i]['selected'] = false
                this.selectAllSupp = true
                this.unselectAllSupp = false
                this.SelectAllDrop = false
            }
        }
    }

    verifiedSuppData = {}
    verifiedSuppDataFun(sup) {
        let verified = true
        if (this.verifiedSuppData['supplier_company'] != sup['supplier_company']) { verified = false }
        if (this.verifiedSuppData['supplier_company_phone'] != sup['supplier_company_phone']) { verified = false }
        if (this.verifiedSuppData['supplier_company_email'] != sup['supplier_company_email']) { verified = false }
        if (this.verifiedSuppData['address_1'] != sup['address_1']) { verified = false }
        if (this.verifiedSuppData['address_2'] != sup['address_2']) { verified = false }
        if (this.verifiedSuppData['website'] != sup['website']) { verified = false }
        if (this.verifiedSuppData['city'] != sup['city']) { verified = false }
        if (this.verifiedSuppData['state'] != sup['state']) { verified = false }
        if (this.verifiedSuppData['zip_code'] != sup['zip_code']) { verified = false }
        if (this.verifiedSuppData['Country'] != sup['Country']) { verified = false }
        if (this.verifiedSuppData['supplier_first_name'] != sup['supplier_first_name']) { verified = false }
        if (this.verifiedSuppData['supplier_last_name'] != sup['supplier_last_name']) { verified = false }
        if (this.verifiedSuppData['supplier_mobile'] != sup['supplier_mobile']) { verified = false }
        if (this.verifiedSuppData['supplier_email'] != sup['supplier_email']) { verified = false }
        if (this.verifiedSuppData['supplier_phone'] != sup['supplier_phone']) { verified = false }
        if (this.verifiedSuppData['is_buyback'] != sup['is_buyback']) { verified = false }
        return verified
    }

    initializeAddSupplier(sup) {
        this.UpdateCreateSupplierData = []
        this.searchSSData = []
        this.supplierEmailError = false
        this.SupplierPhoneError = false
        this.country = sup.Country == null ? "Choose a country" : sup.Country['name']
        this.countryId = sup.Country == null ? "" : sup.Country['_id']
        this.addSupplierForm = this.formbulider.group({
            supplier_company: [sup.supplier_company, [Validators.required]],
            supplier_company_phone: [sup.supplier_company_phone, [Validators.required]],
            //  [sup.supplier_company_phone],
            // supplier_company_email: [sup.supplier_company_email, Validators.required],
            supplier_company_email: [sup.supplier_company_email, [Validators.required,
            Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            address_1: [sup.address_1, Validators.required],
            address_2: [sup.address_2],
            website: [sup.website, [Validators.required]],
            city: [sup.city, [Validators.required]],
            state: [sup.state, [Validators.required]],
            zip_code: [sup.zip_code, [Validators.required]],
            supplier_first_name: [sup.supplier_first_name],
            supplier_last_name: [sup.supplier_last_name],
            supplier_mobile: [sup.supplier_mobile],
            // supplier_mobile: [sup.supplier_mobile],
            // supplier_email: [sup.supplier_email],
            supplier_email: [sup.supplier_email, [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            supplier_phone: [sup.supplier_phone],
            // supplier_phone: [sup.supplier_phone],
            is_verify_supplier: [true],
            is_buyback: [sup.is_buyback],
            Country: [this.countryId, [Validators.required]],
            BusinessLocation: window.localStorage.getItem('location_id'),
        });
        this.verifiedSuppData['supplier_company'] = sup['supplier_company']
        this.verifiedSuppData['supplier_company_phone'] = sup['supplier_company_phone']
        this.verifiedSuppData['supplier_company_email'] = sup['supplier_company_email']
        this.verifiedSuppData['address_1'] = sup['address_1']
        this.verifiedSuppData['address_2'] = sup['address_2']
        this.verifiedSuppData['website'] = sup['website']
        this.verifiedSuppData['city'] = sup['city']
        this.verifiedSuppData['state'] = sup['state']
        this.verifiedSuppData['zip_code'] = sup['zip_code']
        this.verifiedSuppData['Country'] = this.countryId
        this.verifiedSuppData['supplier_first_name'] = sup['supplier_first_name']
        this.verifiedSuppData['supplier_last_name'] = sup['supplier_last_name']
        this.verifiedSuppData['supplier_mobile'] = sup['supplier_mobile']
        this.verifiedSuppData['supplier_email'] = sup['supplier_email']
        this.verifiedSuppData['supplier_phone'] = sup['supplier_phone']
        console.log('The verifiedSuppData-->' + this.verifiedSuppData);

    }

    searchSSData = []
    searchSystemSupplierFun(val) {
        this.searchSystemSupplier.watch({
            search: val
        }).valueChanges.subscribe(
            (res) => {
                console.log('search System Supplier res', res['data'].searchSystemSupplier);
                this.searchSSData = res['data'].searchSystemSupplier
            }, (err) => {
                let message = err.graphQLErrors[0].message
                console.log('search System Supplier err', message);
            }
        )
    }

    emptySearchSSData() {
        this.searchSSData = []
    }

    closeSupModel() {
        this.initialize_addSupplier()
        this.supplierIds = []
        this.submittedSupplier = false
        this.modalRef.hide();
        this.searchSSData = []
    }

    initialize_editSupplier(sup) {
        this.searchSSData = []
        this.isBuyback = sup.is_buyback
        this.UpdateCreateSupplierData = []
        this.supplierEmailError = false
        this.SupplierPhoneError = false
        this.editsupplierData = sup
        this.country = sup.Country == null ? "Choose a country" : sup.Country['name']
        this.countryId = sup.Country == null ? "" : sup.Country['_id']
        this.addSupplierForm = this.formbulider.group({
            supplier_company: [sup.supplier_company, [Validators.required]],
            supplier_company_phone: [sup.supplier_company_phone, [Validators.required]],
            // supplier_company_phone: [sup.supplier_company_phone],
            // supplier_company_email: [sup.supplier_company_email, Validators.required],
            supplier_company_email: [sup.supplier_company_email, [Validators.required,
            Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            address_1: [sup.address_1, Validators.required],
            address_2: [sup.address_2],
            website: [sup.website, [Validators.required]],
            city: [sup.city, [Validators.required]],
            state: [sup.state, [Validators.required]],
            zip_code: [sup.zip_code, [Validators.required]],
            supplier_first_name: [sup.supplier_first_name],
            supplier_last_name: [sup.supplier_last_name],
            supplier_mobile: [sup.supplier_mobile],
            // supplier_mobile: [sup.supplier_mobile],
            // supplier_email: [sup.supplier_email],
            supplier_email: [sup.supplier_email, [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            supplier_phone: [sup.supplier_phone],
            // supplier_phone: [sup.supplier_phone],
            Country: [this.countryId, [Validators.required]],
            is_verify_supplier: [sup.is_verify_supplier],
            is_buyback: [sup.is_buyback],
            BusinessLocation: window.localStorage.getItem('location_id'),
        });
        this.verifiedSuppData['supplier_company'] = sup['supplier_company']
        this.verifiedSuppData['supplier_company_phone'] = sup['supplier_company_phone']
        this.verifiedSuppData['supplier_company_email'] = sup['supplier_company_email']
        this.verifiedSuppData['address_1'] = sup['address_1']
        this.verifiedSuppData['address_2'] = sup['address_2']
        this.verifiedSuppData['website'] = sup['website']
        this.verifiedSuppData['city'] = sup['city']
        this.verifiedSuppData['state'] = sup['state']
        this.verifiedSuppData['zip_code'] = sup['zip_code']
        this.verifiedSuppData['Country'] = this.countryId
        this.verifiedSuppData['supplier_first_name'] = sup['supplier_first_name']
        this.verifiedSuppData['supplier_last_name'] = sup['supplier_last_name']
        this.verifiedSuppData['supplier_mobile'] = sup['supplier_mobile']
        this.verifiedSuppData['supplier_email'] = sup['supplier_email']
        this.verifiedSuppData['supplier_phone'] = sup['supplier_phone']
        this.verifiedSuppData['is_buyback'] = sup['is_buyback']
        console.log('The verifiedSuppData-->' + this.verifiedSuppData);
    }

    get feditSupplier() {
        return this.editSupplierForm.controls
    }

    deleteSuppLoader = false
    deleteSupplier() {
        this.deleteSuppLoader = true
        this.removedSupplier.mutate({
            id: this.currentSupplier['_id']
        }).subscribe(
            (res) => {
                this.deleteSuppLoader = false
                this.getAllSuppliers()
                this.getAllSupplierRestockFun()
                this.existingSuppliers = true
                this.cutomerInfo = false
                this.modalRef.hide()
            }, (err) => {
                this.deleteSuppLoader = false
                console.log('remove customer err', err);
            })
    }

    supplierLoader = false
    fsearchSupplier() {
        this.supplierLoader = true
        let location_id = window.localStorage.getItem('location_id')
        if (this.fieldSearchSupplier.value === '') {
            this.getAllSuppliers()
        } else {
            this.searchSupplierQuery.watch({
                search: this.fieldSearchSupplier.value,
                active: '',
                is_verify_supplier: true,
                unlink_product: false,
                location_id: location_id,
                skip: 0,
                limit: 100000
            }).valueChanges.subscribe(
                (res) => {
                    this.supplierLoader = false
                    console.log('supplir search response is', res['data'].searchSupplier);
                    this.addSupplierToList = JSON.parse(JSON.stringify(res['data'].searchSupplier))
                    console.log('searchSupplier is', this.addSupplierToList);
                }, (err) => {
                    this.supplierLoader = false
                    console.log('supplier search error is ', err);
                })
        }
    }

    index: any
    isExistingItems = false
    openRemoveProductModel(template: TemplateRef<any>, cls, ind, item) {
        this.isExistingItems = item
        this.index = ind
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    openModal(template: TemplateRef<any>, cls) {
        this.fileName = ''
        this.fileNameSupplier = ''
        this.userPwd = ''
        this.userEmail = ''
        if (cls === 'box-removecustomer' && this.isObjectEmpty(this.selectedProduct)) {
            // this.toaster.showError('Please select product first', 'Product delete')
            this.showToaster = false
            this.toasterMsg = 'Please select product first'
            this.toasterType = 'error'
            return
        }
        this.totalAmountToRefund()
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    unlinkDeviceIndex = null
    unlinkService = null
    openUnLinkDeviceModal(template: TemplateRef<any>, cls, index, unlinkService) {
        this.unlinkDeviceIndex = index
        this.unlinkService = unlinkService
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    currentIndexOfSupplier: any
    openRemoveSupplierModal(template: TemplateRef<any>, cls, Supplier) {
        this.supplierToDelete = Supplier
        this.currentIndexOfSupplier = Supplier
        if (cls === 'box-removecustomer' && this.isObjectEmpty(this.supplierToDelete)) {
            // this.toaster.showError('Please select supplier first', 'Supplier delete')
            this.showToaster = false
            this.toasterType = 'error'
            this.toasterMsg = ''
            return
        }
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    checksearchSup = false
    openEditSupplierModal(template: TemplateRef<any>, cls, sup) {
        this.SupplierPhoneError = false
        this.supplierEmailError = false
        this.checksearchSup = true
        this.country = 'Choose a country'
        this.countryId = ''
        this.initialize_editSupplier(sup)
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    openAddSupModal(template: TemplateRef<any>, cls) {
        // open_addSupplier, 'box-add-supplier'
        this.SupplierPhoneError = false
        this.supplierEmailError = false
        this.country = 'Choose a country'
        this.countryId = ''
        this.initialize_addSupplier()
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    addSupplierForProduct = false
    openAddSupplierForProduct() {
        this.step = 1
        this.initialize_addSupplier()
        this.addEditSupplier = true
        this.existingSuppliers = false
        this.compareSupplierCheck = 'Add'
        this.country = 'Choose a country'
        this.countryId = ''
        this.SupplierPhoneError = false
        this.supplierEmailError = false
        this.checksearchSup = true
        this.submittedSupplier = false
        this.addSupplierForProduct = true

        this.loadSection('S')
        this.addSupplierForProduct = true
    }

    backToProduct() {
        this.addSupplierForProduct = false
        this.loadSection('P')
    }

    openEditProductModal(template: TemplateRef<any>, cls, pr) {
        this.selectedProduct = pr
        this.initializeEditStockProduct(pr)
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    openDeleteProductModal(template: TemplateRef<any>, cls, pr) {
        this.selectedProduct = pr
        this.deleteProducts = []
        this.deleteProducts.push(pr['_id'])
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    itemToRemoveFromOrder: any
    removeItemModel(template: TemplateRef<any>, cls, index) {
        this.itemToRemoveFromOrder = index
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    model_Compare(template: TemplateRef<any>, cls) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    isScrollable = false
    downcart() {
        this.isScrollable = !this.isScrollable
    }

    closeModel() {
        this.initialize_addSupplier()
        this.initializeAddStockProduct()
        this.allTaxes = []
        this.allTagsObjects = []
        this.supplierIds = []
        this.taxIds = []
        this.taxPer = 0
        this.taxDoll = 0
        this.submittedSupplier = false
        this.submitted = false
        this.mappedColumns = ['Item', 'Qty', 'Cost']
        this.modalRef.hide();
    }

    closeModalOnly() {
        this.modalRef.hide();
    }

    btnspDetails() {
        this.existingSP = false
        this.spDetails = true
    }

    btnpoDetails() {
        this.poStatus = false
        this.poDetails = true
        this.orderText = "P.O."
    }

    btnpoReveive() {
        this.existingPO = false
        this.poReveive = true
    }

    btnpoBilling() {
        this.stocksection = false
        this.checkOutsection = true
    }

    btncreatePO() {
        this.existingPO = false
        this.createPO = true
    }
    back(val, val1) {
        this[val] = false
        this[val1] = true
    }



    cancel(val, val1) {
        this.orderText = 'Orders'
        if (val1 == 'loadStoreCredit') {
            this.manageCredit = true
            this.cutomerInfo = false
            this.netTermsPayment = false
            this.createNote = false
            return
        }
        if (val1 == 'loadStoreTransCredit') {
            this.transferCredit = true
            this.cutomerInfo = false
            this.manageCredit = false
            this.netTermsPayment = false
            this.createNote = false
            return
        }
        if (val == 'relaodBuyBackComponent') {
            this.showOrderStatusComponent = false;
            this.showOrderProcessListingComponent = false;
            this.displayBuyBackProgram = false
            this.existingPO = false
            this.currentOrderId = val1
            //this.loadSection('R')
            setTimeout(() => {
                this.showOrderStatusComponent = true;
                this.showOrderProcessListingComponent = true;
            }, 1)
            return
        }
        if (val1 === 'orderStatusCompleted') {
            this.applyActiveFilter('completed')
        }
        if (val === "orderStatusActive" || val1 === 'orderStatusActive') {
            this.applyActiveFilter('active')
        }
        if (val == 'selectRShipping') {
            this.disgardproductsRestock()
        }
        if (val1 == 'addNewProduct') {
            this.productCurrentAction = 'Item Details'
        }
        if (val == 'poStatus') {
            this.restock = true
            this.poDetails = false
            this.selectRItems = false
            this.selectRType = true
            this.rmaDetailsSession = false
            this.transactionIdRMA = ''
            this.disgardRMA()
        }
        else if (val1 == 'existingSP') {
            this.searchSupplierForAddProduct = ''
            this.currentlySupplierSelectedSKU = ''
            this.productCurrentAction = 'Manage Products'
            this.addStockProductSubmitted = false
            this.supplierInfoCompleted = false
            this.productPriceSubmitted = false
            this.initializeAddStockPrice()
            this.initializeAddStockProduct()
            this.disgardRMA()
            this.serviceModel = ''
            this.serviceMinPrice = null
            this.serviceMaxPrice = null
            this.serviceBrand = ''
            this.brandId = ''
            this.modelId = ''
            this.linkedServices = []
            this.taxIds = []
            this.allTagsObjects = []
            this.addNewProduct = false
            this.existingSP = true
            this.addStockProductSubmitted = false
            this.supplierInfoCompleted = false
            this.productPriceSubmitted = false
            this.model = 'Please select model'
            this.brand = 'Please select Brand'
            this.bundleProducts = []
            this.compatibleDeviceToFetch = []
            this.bundleProducts = []
            this.supplierSelectedForAddProduct = []
            this.step = 1
            this.totalQuantity = 0
            this.totalAvergaeCost = 0
            this.totalBundleCost = 0
            this.selectTaxType = 'Select a tax type'
            this.incomeAccSearch = null
            this.cogsAccSearch = null
            this.incomeAccSearch = null
            this.showSearchedSupplierList = false
            this.isEditProductForm = false
        }
        this.existingPO = true
        this.step = 1
        this[val] = false
        this[val1] = true
        this.poReceivingData = []
        this.purchaseNotes = ''
        this.purchaseReveiveBy = ''
        this.purchaseReveiveDate = ''
        this.purchaseAddCost = ''
        this.reveiveNotes = ''
        this.displayBuyBackProgram = false
        this.showOrderStatusComponent = false
        this.showOrderProcessListingComponent = false
        if (this.addProductFromExtraItem) {
            this.addProductFromExtraItem = false
            this.purchaseOrderDetail(this.orderDetail)
        }
    }

    opensupplierInfo() {
        this.supplierInfo = !this.supplierInfo;
        console.log('sup info', this.supplierInfo);
    }


    paymentCompletebtn() {
        this.stocksection = true;
        this.existingPO = true;
        this.createPO = false;
        this.checkOutsection = false;
    }

    changePay(type) {
        this.revertBalance()
        this.noMethodSelected = false
        this.boxCredit = false;
        this.boxCheck = false;
        this.boxCash = false;
        this.boxPaypal = false;
        this.boxNetterm = false;
        this.boxStorecredit = false;
        this.boxCoupons = false;
        this.boxPayinvoice = false;
        this[type] = true;
    }

    closeInvoiceModel() {
        this.modalService.hide(1)
    }

    allStores = []
    getStores() {
        this.UserBusinessLocations.watch({
        }
        ).valueChanges.subscribe((response) => {
            this.allStores = response['data'].userBusinessLocations
        },
            (err) => {
                console.log('Error from GQL', err)
            }
        )
    }

    chooseStore = localStorage.getItem('storeName');
    storeId = localStorage.getItem('location_id')
    changeStore(val) {
        let location_id = localStorage.getItem('location_id')
        if (val._id != location_id) {
            this.storeId = val._id
            this.chooseStore = val.address_1
        }
    }

    fullOrderDetail = {}
    supplierSelected = {}
    selectSupplierId: string
    selectSupplier(selectSupplier) {
        if (this.createPO == false) {
            return
        }
        this.supplierSelected = selectSupplier
        // this.toaster.showSuccess('Supplier Selected Successfully', 'Supplier Selected')
        this.showToaster = false
        this.toasterMsg = 'Supplier Selected Successfully'
        this.toasterType = 'success'
        this.selectSupplierId = selectSupplier['_id']

    }

    deleteSelectedCustomer() {
        this.supplierSelected = {}
    }

    importPoStock(val) {
        if (val == 'Products') {
            for (let i = 0; i < this.allProducts.length; i++) {
                this.createPOFunc(this.allProducts[i])
            }
        } else if (val == 'Almost out of stock') {

        } else {

        }
        this.stockImport = val

    }

    currentPoOrder = []
    createPOFunc(order) {
        if (this.createPO == false) {
            return
        }
        order['item_dis'] = 0
        order['dis_price'] = 0
        order['device'] = []
        order['ProductStockPrice'][0]['itemTaxe'] = 0
        order['selectedDevicesInfo'] = []
        if (order.selectedQuantity == undefined) {
            order['selectedQuantity'] = 1
        }
        order['dis_percentage'] = 0;
        order['ProductStockPrice'][0]['new_default_sell_price'] = 0
        let totalPrice = Number(order['ProductStockPrice'][0]['default_sell_price']) * Number(order['selectedQuantity'])
        order['ProductStockPrice'][0]['total_price'] = Number(totalPrice)
        if (order.alert_quantity != null || 0) {
            this.currentPoOrder = this.PoOrder.addOrder(order);
        }
        console.log('Current PO Order--->', this.currentPoOrder)
        this.calculateSubtotalPO()
    }

    tempOrder = []
    openRemoveProductModal(template: TemplateRef<any>, cls, order: any) {
        this.tempOrder = order
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
    }

    removePoProduct() {
        const index = this.currentPoOrder.indexOf(this.tempOrder, 0);
        if (index > -1) {
            this.currentPoOrder[index].selectedQuantity = 1
            this.currentPoOrder = this.PoOrder.removeItem(index)
            if (this.currentPoOrder.length != 0) {
                this.calculateSubtotalPO()
            } else {
                this.fullOrderDetail = {}
                this.PoOrder.allItems = []
                this.currentPoOrder = []
                this.supplierSelected = {}
                this.subTotal = 0;
                this.grandTotal = 0;
                this.additionalCost = undefined
                this.addtax = 0
                this.taxChecked = false
                this.selectedStartDate = ''
                this.selectedExpectedDate = ''
                this.userAmount = ''
                this.poOrderNote = ''
            }
            this.modalRef.hide();
        }
        console.log('Current PO Order After Deleting -->', this.currentPoOrder)
    }

    subTotal: number = 0
    grandTotal: number = 0
    additionalCost
    tax: number = 100
    addtax: number = 0
    taxChecked = false
    calculateSubtotalPO() {
        this.subTotal = 0;
        for (let i = 0; i < this.currentPoOrder.length; i++) {
            if (this.currentPoOrder[i]['ProductStockPrice'][0].new_default_sell_price == 0) {
                let price = Number(this.currentPoOrder[i]['ProductStockPrice'][0].default_sell_price) * Number(this.currentPoOrder[i].selectedQuantity)
                this.currentPoOrder[i]['ProductStockPrice'][0].total_price = price
                this.subTotal = Number(price) + Number(this.subTotal)
            } else {
                let price = Number(this.currentPoOrder[i]['ProductStockPrice'][0].new_default_sell_price) * Number(this.currentPoOrder[i].selectedQuantity)
                this.currentPoOrder[i]['ProductStockPrice'][0].total_price = price
                this.subTotal = Number(price) + Number(this.subTotal)
            }
        }
        this.calculateTotalPO()
    }

    calculateTotalPO() {
        this.grandTotal = 0
        if (this.additionalCost == undefined) {
            this.grandTotal = Number(this.subTotal) + Number(this.addtax)
        } else {
            this.grandTotal = Number(this.subTotal) + Number(this.additionalCost) + Number(this.addtax)
        }
    }

    updateDefaultPrice(event, order) {
        let price = event.target.value
        order.ProductStockPrice[0].new_default_sell_price = price
        this.calculateSubtotalPO()
    }

    taxWithPoOrder(event) {
        if (this.fullordertax[0]['is_percentage'] == true) {
            this.addtax = (this.subTotal * this.percentage) / 100
        } else {
            this.addtax = this.percentage
        }
        if (event.target.checked == true) {
            this.taxChecked = true
            this.addtax = this.tax
        } else {
            this.taxChecked = false
            this.addtax = 0
        }
        this.calculateSubtotalPO()
    }

    AdditionalCostWithPoOrder(event) {
        this.additionalCost = event.target.value
        this.calculateSubtotalPO()
    }

    updateQuantity(event, order) {
        let quantity = event.target.value
        order.selectedQuantity = quantity
        this.calculateSubtotalPO()
    }

    discardOrder() {
        this.fullOrderDetail = {}
        let lenth = this.currentPoOrder.length
        for (let i = 0; i < lenth; i++) {
            this.currentPoOrder[0].selectedQuantity = 1
            this.currentPoOrder = this.PoOrder.removeItem(0)
        }
        this.PoOrder.allItems = []
        this.currentPoOrder = []
        this.supplierSelected = {}
        this.subTotal = 0;
        this.grandTotal = 0;
        this.additionalCost = undefined
        this.addtax = 0
        this.taxChecked = false
        this.selectedStartDate = ''
        this.selectedExpectedDate = ''
        this.userAmount = ''
        this.existingPO = true
        this.createPO = false
        this.poOrderNote = ''
        this.modalRef.hide()
    }

    poOrderNote = ''
    option = true
    orderPoNow() {
        if (this.isObjectEmpty(this.supplierSelected)) {
            // this.toaster.showError('Select Supplier', 'Please Select Supplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Supplier First'
            this.toasterType = 'error'
        } else if (this.selectedStartDate == '') {
            // this.toaster.showError('Select Date', 'Please Select Date First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Date First'
            this.toasterType = 'error'
        } else {
            this.fullOrderDetail = {}
            this.stocksection = false
            this.checkOutsection = true
            this.fullOrderDetail['transaction_status'] = AllowedTransactionStatus.Invoice
            this.prepareData()
            this.prepareTaxData()
            console.log('checkout order details are', this.fullOrderDetail);
        }
    }

    orderId = ''
    savePoOrder() {
        if (this.isObjectEmpty(this.supplierSelected)) {
            // this.toaster.showError('Select Supplier', 'Please Select Supplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Supplier First'
            this.toasterType = 'error'
        } else if (this.selectedStartDate == '') {
            // this.toaster.showError('Select Date', 'Please Select Date First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Date First'
            this.toasterType = 'error'
        } else {
            this.fullOrderDetail = {}
            this.fullOrderDetail['transaction_status'] = AllowedTransactionStatus.Minimize
            this.fullOrderDetail['transaction_payment_status'] = AllowedTransactionPaymentStatus.None
            this.prepareData()
            this.prepareTaxData()
            console.log('save order details are', this.fullOrderDetail);
            let fOrder: CreatePurchaseOrderInput = JSON.parse(JSON.stringify(this.fullOrderDetail))
            this.createPurchaseOrder.mutate({
                input: fOrder
            }).subscribe(
                (res) => {
                    console.log('create sale save order res', res);
                    this.orderId = res['data'].createPurchaseOrder._id
                    let lenth = this.currentPoOrder.length
                    for (let i = 0; i < lenth; i++) {
                        this.currentPoOrder[0].selectedQuantity = 1
                        this.currentPoOrder = this.PoOrder.removeItem(0)
                    }
                    this.PoOrder.allItems = []
                    this.currentPoOrder = []
                    this.supplierSelected = {}
                    this.subTotal = 0;
                    this.grandTotal = 0;
                    this.additionalCost = undefined
                    this.addtax = 0
                    this.taxChecked = false
                    this.selectedStartDate = ''
                    this.selectedExpectedDate = ''
                    this.userAmount = ''
                    this.poOrderNote = ''
                }, (err) => {
                    console.log('create sale save order error', err);
                }
            )
            this.modalRef.hide()
        }
    }

    selectedStartDate = '';
    prepareData() {
        let date = this.datePipe.transform(this.selectedStartDate, 'yyyy-MM-dd');
        this.fullOrderDetail['transaction_type'] = AllowedTransactionType.Purchase
        this.fullOrderDetail['transaction_date'] = date
        this.fullOrderDetail['total_amount'] = Number(this.subTotal)
        this.fullOrderDetail['BusinessLocation'] = window.localStorage.getItem('location_id')
        this.fullOrderDetail['TransactionPurchaseLines'] = this.transactionPurchaseLines()
        this.fullOrderDetail['Supplier'] = this.supplierSelected['_id']
        this.fullOrderDetail['final_total'] = Number(this.grandTotal)
        this.fullOrderDetail['shipping_charges'] = Number(this.additionalCost == null || undefined ? 0 : this.additionalCost)
        if (this.poOrderNote == '') {
            this.poOrderNote = "Notes:"
        }
        this.fullOrderDetail['staff_note'] = this.poOrderNote
        this.fullOrderDetail['order_status'] = AllowedOrdertStatus.Draft
    }

    transactionPurchaseLines() {
        let arr = []
        for (let i = 0; i < this.currentPoOrder.length; i++) {
            let obj = {}
            obj['Product'] = this.currentPoOrder[i]._id
            obj['quantity'] = Number(this.currentPoOrder[i].selectedQuantity)
            obj['product_purchase_price'] = String(this.currentPoOrder[i].ProductStockPrice[0].default_sell_price)
            obj['final_purchase_price'] = String(this.currentPoOrder[i].ProductStockPrice[0].new_default_sell_price)
            obj['total_amount'] = Number(this.currentPoOrder[i].ProductStockPrice[0].total_price)
            obj['in_stock'] = Number(this.currentPoOrder[i].alert_quantity)
            arr.push(obj)
        }
        console.log('finally items are--->', arr);
        return arr
    }

    prepareTaxData() {
        this.fullOrderDetail['Tax'] = this.fullordertax[0]['_id']
        let taxType
        if (this.fullordertax[0]['is_percentage'] == true) {
            taxType = '%'
        } else {
            taxType = '$'
        }
        this.fullOrderDetail['tax_type'] = taxType
        this.fullOrderDetail['tax_amount'] = parseFloat(this.addtax.toString())

    }

    userAmount = ''
    payLoader = false
    // pay() {
    //     this.payLoader = true
    //     let userAmount = Number(this.userAmount)
    //     let amountLeft = Number(this.grandTotal) - Number(this.userAmount)
    //     this.fullOrderDetail['TransactionPaymentLine'] = {
    //         amount: userAmount,
    //         method: 'cash'
    //     }
    //     if (amountLeft <= 0) {
    //         this.fullOrderDetail['transaction_payment_status'] = AllowedTransactionPaymentStatus.Paid
    //     }
    //     else if (Number(userAmount) == 0) {
    //         this.fullOrderDetail['transaction_payment_status'] = AllowedTransactionPaymentStatus.Due
    //     }
    //     else {
    //         this.fullOrderDetail['transaction_payment_status'] = AllowedTransactionPaymentStatus.Partial
    //     }
    //     let fOrder: CreatePurchaseOrderInput = JSON.parse(JSON.stringify(this.fullOrderDetail))
    //     this.createPurchaseOrder.mutate({
    //         input: fOrder
    //     }).subscribe(
    //         (res) => {
    //             this.purchaseOrders = []
    //             this.getpurchaseOrders()
    //             this.payLoader = false
    //             this.toaster.showSuccess('Create P.O Successfully', 'Create P.O')
    //             let lenth = this.currentPoOrder.length
    //             for (let i = 0; i < lenth; i++) {
    //                 this.currentPoOrder[0].selectedQuantity = 1
    //                 this.currentPoOrder = this.PoOrder.removeItem(0)
    //             }
    //             this.supplierSelected = {}
    //             this.subTotal = 0;
    //             this.grandTotal = 0;
    //             this.additionalCost = undefined
    //             this.addtax = 0
    //             this.taxChecked = false
    //             this.stocksection = true;
    //             this.existingPO = true;
    //             this.createPO = false;
    //             this.checkOutsection = false;
    //             this.selectedStartDate = ''
    //             this.selectedExpectedDate = ''
    //             this.userAmount = ''
    //             this.poOrderNote = ''
    //         }, (err) => {
    //             console.log('final create sale error', err);
    //             this.payLoader = false
    //             this.toaster.showError('Create P.O', 'P.O not created')
    //         }
    //     )
    //     console.log('final checout order is', fOrder);
    // }

    fullordertax = []
    percentage = 0
    getFullOrderTaxs() {
        this.taxsGQL.watch({
            search: this.searchP.value
        }).valueChanges.subscribe(
            (res) => {
                this.fullordertax = JSON.parse(JSON.stringify(res['data']['taxs']))
                if (this.fullordertax.length != 0) {
                    this.percentage = this.fullordertax[0]['amount']
                }
                if (this.fullordertax == null) {
                    let obj = {}
                    obj['amount'] = "5"
                    obj['is_percentage'] = true
                    obj['is_tax_group'] = false
                    obj['name'] = "sale"
                    obj['__typename'] = "Tax"
                    obj['_id'] = "5e9478edf35f0c69f69deb1b"
                    this.fullordertax.push(obj)
                    this.percentage = this.fullordertax[0]['amount']
                }
                console.log('fullordertax---->', this.fullordertax);
            }, (err) => {
                console.log('GQL Error', err);
            }
        )
    }

    getAllPoOrders() {
        this.currentPoOrder = this.PoOrder.getAllOrders()
    }


    //==============================================================Display PO Session Purchase Orders=====================================================================//

    limit: number = 10
    skip: number = 0
    purchaseOrders = []
    onScroll() {
        // console.log('scrolling');

        // this.skip = this.skip + 10
        // this.getpurchaseOrders()
    }
    orderFilterType = 'All'
    supIdForPur = ''
    filterForPur = ''
    toDate = ''
    fromDate = ''
    poOrderSkip = 0
    activeOrder = 'active'
    supplierToFilter = []
    statusesToFilter = []
    getpurchaseOrders() {
        this.loadexistingPO = true
        this.purchaseOrders = []
        let getpurchaseOrdersInputs = {}
        getpurchaseOrdersInputs['limit'] = 1000
        getpurchaseOrdersInputs['skip'] = 0
        getpurchaseOrdersInputs['active'] = this.activeOrder
        getpurchaseOrdersInputs['startDate'] = this.fromDate == '' ? null : this.fromDate
        getpurchaseOrdersInputs['endDate'] = this.toDate == '' ? null : this.toDate
        getpurchaseOrdersInputs['supplierId'] = this.supplierForFilter.length == 0 ? null : this.supplierForFilter
        getpurchaseOrdersInputs['orderStatus'] = this.statusForFilter.length == 0 ? null : this.statusForFilter
        getpurchaseOrdersInputs['search'] = this.searchPO.value == null ? '' : this.searchPO.value
        getpurchaseOrdersInputs['BusinessLocation'] = window.localStorage.getItem('location_id')
        getpurchaseOrdersInputs['orderType'] = PoTransactionType[this.orderFilterType]
        // getpurchaseOrdersInputs['filterType'] = FilterType[this.mbpFilterType]
        if (this.arrivalsFilters != '') {
            getpurchaseOrdersInputs['arrivals'] = ArrivalsFilter[this.arrivalsFilters]
        }
        getpurchaseOrdersInputs = this.cleanObject(getpurchaseOrdersInputs)
        this.getPurchaseOrders.watch({
            input: getpurchaseOrdersInputs
        }).valueChanges.subscribe(
            (res) => {
                this.purchaseOrders = res['data'].getPurchaseOrdersAndSearch['transaction']
                this.supplierToFilter = res['data'].getPurchaseOrdersAndSearch['suppliers']
                this.statusesToFilter = res['data'].getPurchaseOrdersAndSearch['available_status']
                this.loadexistingPO = false
                console.log('Purchase Orders And Search res', res['data'].getPurchaseOrdersAndSearch);
            }, (err) => {
                this.arrivalsFilters = ''
                console.log('Purchase Orders And Searcherr', err);
                this.loadexistingPO = false
            }
        )
    }

    clearAllPOFilters() {
        this.fromDate = ''
        this.toDate = ''
        this.arrivalsFilters = ''
        this.supplierForFilter = []
        this.statusForFilter = []
        this.searchPO.setValue(null)
        this.orderFilterType = 'All'
        this.getpurchaseOrders()
    }

    copyText(str) {
        this.stockService.copyText(str)
    }

    ordertypeFilter(value) {
        this.orderFilterType = value
        this.getpurchaseOrders()
    }

    allPOCheked(values: any) {
        if (values.target.checked == true) {
            for (let i = 0; i < this.purchaseOrders.length; i++) {
                this.purchaseOrders[i]['checked'] = true
                this.ifPOUnChecked = true
            }
        } else {
            for (let i = 0; i < this.purchaseOrders.length; i++) {
                this.purchaseOrders[i]['checked'] = false
                this.ifPOUnChecked = false
            }
        }
    }

    isAllPOChecked() {
        if (this.purchaseOrders.length > 1) {
            let check = true
            for (let i = 0; i < this.purchaseOrders.length; i++) {
                if (!this.purchaseOrders[i]['checked']) {
                    return false
                }
            }
            return check
        }
        return false
    }
    selectedOrder = []
    isAnyPOChecked() {
        this.selectedOrder = []
        if (this.purchaseOrders.length > 0) {
            let check = false
            for (let i = 0; i < this.purchaseOrders.length; i++) {
                if (this.purchaseOrders[i]['checked']) {
                    this.selectedOrder.push(this.purchaseOrders[i])
                }
            }
            if (this.selectedOrder.length > 0) {
                return true
            } else {
                return check
            }
        }
        return false
    }

    addPOToExport(values: any, pOrder) {
        if (values.target.checked == true) {
            var index = this.purchaseOrders.map(x => {
                return x._id;
            }).indexOf(pOrder['_id']);
            this.purchaseOrders[index]['checked'] = true
        } else {
            var index = this.purchaseOrders.map(x => {
                return x._id;
            }).indexOf(pOrder['_id']);
            this.purchaseOrders[index]['checked'] = false
        }
    }

    exportPurchaseOrders() {
        let exportPO = []
        for (let i = 0; i < this.purchaseOrders.length; i++) {
            let PO = {}
            if (this.purchaseOrders[i]['checked']) {
                PO['Type'] = this.purchaseOrders[i]['transaction_type']
                PO['Transaction Date'] = this.purchaseOrders[i]['transaction_date']
                PO['Supplier Comapany'] = this.purchaseOrders[i]['Supplier']['supplier_company']
                PO['Total'] = this.purchaseOrders[i]['total_amount']
                exportPO.push(PO)
            }
        }
        if (exportPO.length != 0) {
            this.CSVService.saveAsCSVFile(exportPO, 'ExportProduts');
        } else {
            // this.toaster.showError('Select Product', 'Please Select Product First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Product First'
            this.toasterType = 'error'
        }
    }

    applyActiveFilter(str) {
        this.arrivalsFilters = ''
        this.activeOrder = str
        this.getpurchaseOrders()
    }

    arrivalsFilters = ''
    applyActiveFilters(value) {
        this.arrivalsFilters = value
        this.getpurchaseOrders()
    }

    applyCompletedFilters(value) {
        this.arrivalsFilters = value
        this.getpurchaseOrders()
    }

    allStatusses = []
    getAllStatuses() {
        this.getAllOrderStatusGQL.watch().valueChanges.subscribe(
            (res) => {
                this.allStatusses = res['data'].GetAllOrderStatus
                console.log('all statuses are', res['data'].GetAllOrderStatus);
            }, (err) => {
                console.log('error while loading stauses', err);
            }
        )
    }

    changeOrderStatus(status, id) {
        let obj = status
        delete obj['__typename']
        obj['status_type'] = AllowedType.PurchaseOrder
        obj['businessLocation'] = localStorage.getItem('location_id')
        this.orderStatusUpdateGQL.mutate({
            orderID: id,
            status_Input: obj
        }).subscribe(
            (res) => {
                this.getpurchaseOrders()
                // this.toaster.showSuccess('Status updated successfully', '')
                this.showToaster = false
                this.toasterMsg = 'Status updated successfully'
                this.toasterType = 'success'
                // this.modalRef.hide()
            }, (err) => {
                console.log('error while updating PO status', err);
                this.showToaster = false
                this.toasterMsg = 'Error while updating PO status'
                this.toasterType = 'error'

            }
        )
    }

    updatePOStatus(value) {
        let status = PoStatusName.Delivered
        if (value == 'Canceled') {
            status = PoStatusName.Canceled
        }
        this.poStatusUpdateGQL.mutate({
            orderID: this.orderDetail['_id'],
            status_type: status
        }).subscribe(
            (res) => {
                if (value == 'Canceled') {
                    this.modalRef.hide()
                }
                this.orderDetail['dynamic_status'] = res['data'].POStatusUpdate.dynamic_status
                this.orderDetail['dynamic_status_list'] = res['data'].POStatusUpdate.dynamic_status_list
                var index = this.purchaseOrders.map(x => {
                    return x._id;
                }).indexOf(this.orderDetail['_id']);
                this.purchaseOrders[index]['dynamic_status'] = res['data'].POStatusUpdate.dynamic_status
                this.purchaseOrders[index]['dynamic_status_list'] = res['data'].POStatusUpdate.dynamic_status_list
            }, (err) => {
                console.log('error while updating status', err);
            }
        )
    }

    supplierForFilter = []
    selectSupplierToFilter(event, supp) {
        if (event.target.checked) {
            this.supplierForFilter.push(supp._id)
        }
        else {
            for (let i = 0; i < this.supplierForFilter.length; i++) {
                if (this.supplierForFilter[i] == supp._id) {
                    this.supplierForFilter.splice(i, 1)
                    return
                }
            }
        }
    }

    returnSelectedSuppliers(id) {
        let found = this.supplierForFilter.find(element => element == id);
        return found == undefined ? false : true
    }

    statusForFilter = []
    selectStatusToFilter(event, status) {
        if (event.target.checked) {
            this.statusForFilter.push(status)
        }
        else {
            for (let i = 0; i < this.statusForFilter.length; i++) {
                if (this.statusForFilter[i] == status) {
                    this.statusForFilter.splice(i, 1)
                    return
                }
            }
        }
    }

    returnSelectedStatuses(status) {
        let found = this.statusForFilter.find(element => element == status);
        return found == undefined ? false : true
    }

    applyFilterOnPOOrders() {
        console.log('from date', this.fromDate.toString());
        console.log('to date', this.toDate.toString());
        this.getpurchaseOrders()
        this.modalRef.hide()
    }

    filterBySupplierForPur(val, id) {
        this.supplierFilter = val
        if (this.supplierFilter == 'All Suppliers') {
            this.supIdForPur = ''
        } else {
            this.supIdForPur = id
        }
        this.loadexistingPO = true
        this.getpurchaseOrders()
    }

    statusFilterFun(val) {
        this.statusFilter = val
        if (this.statusFilter == 'All Status') {
            this.filterForPur = ''
        } else {
            this.filterForPur = val
        }
        this.loadexistingPO = true
        this.getpurchaseOrders()
    }

    poFlowByCheckout(order) {
        this.poTransactionFlowGQL.mutate({
            orderID: order['_id']
        }).subscribe(
            (res) => {
                this.orderDetail = res['data'].POTransactionFlow
            }, (err) => {
                console.log('error while loading order', err);
            }
        )
    }

    resetFields() {
        this.amountInCash = ''
        this.amountInCreditCard = ''
        this.creditCardNo = ''
        this.amountInchecque = ''
        this.bankAccNo = ''
        this.checkqueNo = ''
        this.amountInPaypalTransaction = ''
        this.paypalTransactionID = ''
        this.paypalAccount = ''
        this.amountInPaypalInvoice = ''
        this.paypalInvoiceNo = ''
        this.amountInNetTerm = ''
        this.amountInStoreCredit = ''
    }

    orderDetail = {}
    addCost = 0
    showOrderStatusComponent = false
    showOrderProcessListingComponent = false
    purchaseOrderDetail(poOrder) {
        this.addExtraSubmitted = false
        this.currentOrderId = poOrder['_id']
        // let supplierID = poOrder['Supplier']._id
        if (poOrder['transaction_type'] == "rma") {
            this.orderDetail = poOrder
            this.getOrderByID()
            this.rmaDetailFun(poOrder)
            return
        }
        if (poOrder['transaction_type'] == 'buyback') {

            this.showOrderStatusComponent = true;
            this.showOrderProcessListingComponent = true;
            this.existingPO = false
            this.manageproducts = false
            this.poDetails = false
            this.managesuppliers = false
            this.displayBuyBackProgram = false
            this.orderText = 'Buy Back'

            this.selectRType = false
            this.noOrdersSuppliers = false
            this.restock = true

            if (poOrder['order_status'] == "draft") {
                this.displayBuyBackProgram = true
                this.showOrderStatusComponent = true;
                this.showOrderProcessListingComponent = false;
            }
            return

        }
        this.totalPaymentPayed = []
        if (poOrder['dynamic_status'].status_name == 'Draft' || poOrder['dynamic_status'].status_name == 'Partial Payment') {
            this.supplierRestockSelected['_id'] = poOrder['Supplier'] == null ? null : poOrder['Supplier']._id
            this.sprOrderID = poOrder._id
            this.existingPO = false
            this.restock = true
            this.poStatus = true
            this.poDetails = false
            this.orderText = 'P.O.'
            this.selectRItems = true
            this.orderDetail = poOrder
            this.getOrderByID()
            this.loadDraftOrder()
        } else {
            this.trakingNo = false
            this.trackingNumberEdit = false
            this.addTrackingSubmitted = false
            this.initializeAddTrackingFrom(this.currentOrderId)
            this.existingPO = false
            this.loadSection('R')
            this.restock = false
            this.poStatus = true
            this.poDetails = true
            this.orderText = "P.O."
            this.orderDetail = poOrder
            this.getOrderByID()
            // this.getProductBySupplierForExtra()
            this.addCost = Number(this.orderDetail['final_total']) - (Number(this.orderDetail['tax_amount']) + Number(this.orderDetail['total_amount']))
        }
    }

    loadDraftOrder() {
        this.supplierRestockSelected['_id'] = this.orderDetail['Supplier'] == null ? null : this.orderDetail['Supplier']._id
        this.sprOrderID = this.orderDetail['_id']
        this.loadSection('R')
        this.selectRSupplier = false
        this.selectRShipping = false
        this.selectRItems = true
        this.selectRType = false
        this.getProductForRestockDraft(this.orderDetail['Supplier'] == null ? null : this.orderDetail['Supplier']._id)
    }

    loadOrderToPayMore = false
    isReloadingPayment = false
    recordMorePayments() {
        this.loadOrderToPayMore = true
        this.isReloadingPayment = true
        this.supplierRestockSelected['_id'] = this.orderDetail['Supplier']._id
        this.sprOrderID = this.orderDetail['_id']
        this.stocksection = false
        this.checkOutsection = true
        this.getAllCashRegisterarOfLocation()
        this.getAllCreditLines()
        this.getProductForRestockDraft(this.orderDetail['Supplier']._id)
    }

    disableAnyButton() {
        this.currentOrderId = ''
    }

    //============================================================== Start Purchase Order Receiving Session =================================================================//


    setDynamicClasses(sta) {
        if (this.orderDetail['dynamic_status_list'] != null) {
            for (let i = 0; i < this.orderDetail['dynamic_status_list'].length; i++) {
                if (sta == this.orderDetail['dynamic_status_list'][i]['status_name'] && this.orderDetail['dynamic_status']['status_name'] == sta) {
                    return false
                }
                if (sta == this.orderDetail['dynamic_status_list'][i]['status_name']) {
                    return true
                }
            }
            return null
        }
    }

    loadOrder = true
    searchPODetailString: string = 'stock_sku_number'
    searchPODetail = ''
    recLogs = []
    getOrderByID() {
        this.loadOrder = true
        this.getPurchaseOrderbyIdGQL.watch({
            orderID: this.orderDetail['_id']
        }).valueChanges.subscribe(
            (res) => {
                this.orderDetail = res['data'].getPurchaseOrderbyID
                // if (this.orderDetail['dynamic_status'].status_name == 'Partially Received') {
                //     this.orderDetail['is_extra_items'] = false
                //     this.orderDetail['is_missing_items'] =  false
                // }
                this.itemsInOrder()
                this.addPrice = this.orderDetail['received_additional_cost']
                this.orderNumber = this.orderDetail['supplier_order_number']
                this.rmaSupNumber = this.orderDetail['supplier_rma_number']
                this.recLogs = this.orderDetail['ReceivingLogs']
                this.loadOrder = false
                for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
                    this.orderDetail['TransactionPurchaseLine'][i]['editExtra'] = false
                }
                console.log('order detail is', this.orderDetail);
            }, (err) => {
                console.log('err is ', err);
                this.existingPO = true
                this.poDetails = false
                this.orderText = "Orders"
            }
        )
    }

    searchExtraProduct = ''
    existingProducts = []
    getProductBySupplierForExtra() {
        this.getRMAProductBySupplier.watch({
            input: {
                locationId: window.localStorage.getItem('location_id'),
                search: this.searchExtraProduct,
                supllierId: this.orderDetail['Supplier']['supplier_company'] == 'Unknown Supplier' ? null : this.orderDetail['Supplier']['_id'],
                orderId: this.orderDetail['_id']
            }
        }).valueChanges.subscribe(
            (res) => {
                this.extraItemList = true
                this.existingProducts = res['data'].getProductBySupplier
                if (this.searchExtraProduct == '') {
                    this.extraItemList = false
                }
            }, (err) => {
                console.log('err while searching for extra products', err);
            }
        )
    }


    backToMainScreen(template: TemplateRef<any>, cls) {
        for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
            if (this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity != null && Number(this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity) != 0 || this.extraItems.length != 0) {
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
                return
            }
        }
        this.finishLaterOrder()
    }

    finishLaterOrder() {
        this.extraItems = []
        this.existingPO = true
        this.restock = false
        this.poStatus = false
        this.manageproducts = true
        this.existingSP = true
        this.poDetails = false
        this.selectRType = true
        this.orderText = 'Orders'
        this.selectRSupplier = false
        this.selectRShipping = false
        this.selectRItems = false
        this.orderDetail = {}
        this.disgardproductsRestock()
        this.getpurchaseOrders()
    }

    async saveChanges(bool) {
        if (!bool) {
            this.modalRef.hide()
            this.extraItems = []
            this.finishLaterOrder()
            return
        }
        if (this.isOrderCompletelyRecieved()) {
            let update = await this.updateRecieveOrder('Completed', 'completed')
        }
        else {
            let update = await this.updateRecieveOrder('Partially Received', 'save')
        }
        this.modalRef.hide()
        this.finishLaterOrder()

    }

    totalItemsInOrder = 0
    itemsInOrder() {
        this.totalItemsInOrder = 0
        for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
            this.totalItemsInOrder = this.totalItemsInOrder + this.orderDetail['TransactionPurchaseLine'][i].quantity
        }
    }

    allItemRec = false
    allItemRecieve() {
        this.allItemRec = true
        for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
            this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity = Number(this.orderDetail['TransactionPurchaseLine'][i].quantity) - Number(this.orderDetail['TransactionPurchaseLine'][i].receive_quantity)
            if (this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity < 0) {
                this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity = 0
            }
        }
    }

    paymentBtn = false
    showPaymentBtn() {
        this.paymentBtn = !this.paymentBtn
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    isOrderCompletelyRecieved(): boolean {
        if (this.orderDetail['TransactionPurchaseLine'] == undefined) {
            return false
        }
        let orderRecProperly = true
        for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
            if (Number(this.orderDetail['TransactionPurchaseLine'][i].quantity) != Number(this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity) + this.orderDetail['TransactionPurchaseLine'][i].receive_quantity || this.orderDetail['TransactionPurchaseLine'][i]['is_extra_item']) {
                this.allItemRec = false
                orderRecProperly = false
                break
            }
        }
        if (this.orderDetail['remaining_amount'] != 0) {
            this.allItemRec = false
            orderRecProperly = false
        }
        if (this.extraItems.length != 0) {
            this.allItemRec = false
            orderRecProperly = false
        }
        return orderRecProperly
    }

    // verifyQuantity(index) {
    //     if (Number(this.orderDetail['TransactionPurchaseLine'][index].receiving_quantity) > (this.orderDetail['TransactionPurchaseLine'][index].quantity - this.orderDetail['TransactionPurchaseLine'][index].receive_quantity)) {
    //         this.orderDetail['TransactionPurchaseLine'][index].receiving_quantity = Number(this.orderDetail['TransactionPurchaseLine'][index].quantity - this.orderDetail['TransactionPurchaseLine'][index].receive_quantity)
    //         // this.toaster.showInfo('You can not recieve additional quantity', '')
    //         this.showToaster = false
    //         this.toasterMsg = 'You can not recieve additional quantity'
    //         this.toasterType = 'warning'
    //     }
    // }

    extraItemsForm: any
    initializeExtraItemsForm() {
        this.extraItemsForm = this.formbulider.group({
            _id: [''],
            Product: ['', [Validators.required]],
            sku_numbner: [, [Validators.required]],
            product_cost_price: [, [Validators.required]],
            receive_quantity: [, [Validators.required]]
        });
    }

    get faddExtraItem() {
        return this.extraItemsForm.controls;
    }

    addExtraSubmitted = false
    extraItems = []
    addExtraItem() {
        this.extraItemsForm.controls.Product.setValue(this.searchExtraProduct)
        if (this.extraItemsForm.invalid) {
            this.addExtraSubmitted = true
            return
        }
        let item = this.extraItemsForm.value
        for (let i = 0; i < this.extraItems.length; i++) {
            if (this.extraItems[i]._id == item._id  && this.extraItems[i]._id != '' && this.extraItems[i].sku_numbner == item.sku_numbner )  {
                this.extraItems[i].receive_quantity = Number(this.extraItems[i].receive_quantity) + Number(item.receive_quantity)
                this.searchExtraProduct = ''
                this.initializeExtraItemsForm()
                this.extraItemList = false
                this.updateExtraItems(i)
                return
            }
        }
        item['product_cost_price'] = Number(item['product_cost_price'])
        item['receive_quantity'] = Number(item['receive_quantity'])
        item['total_amount'] = Number(item['product_cost_price']) * Number(item['receive_quantity'])
        item['editExtra'] = false
        this.extraItems.push(item)
        this.searchExtraProduct = ''
        this.initializeExtraItemsForm()
        this.extraItemList = false
    }

    showExtraItemList(bool) {
        this.extraItemList = bool
    }

    addProductFromExtraItem = false
    addProduct() {
        this.addProductFromExtraItem = true
        this.poDetails = false
        this.poStatus = false
        this.addNewProductBtn()
        this.manageproducts = true
        this.addNewProduct = true
        this.existingPO = true

    }

    extraItemList = false
    addExistingExtraItems(pro) {
        this.searchExtraProduct = pro['product_name']
        this.extraItemsForm.controls._id.setValue(pro['_id'])
        this.extraItemsForm.controls.Product.setValue(pro['product_name'])
        this.extraItemsForm.controls.sku_numbner.setValue(pro['Suppliers'][0].sku_number)
        this.extraItemsForm.controls.product_cost_price.setValue(pro['sell_price_inc_tax'])
        this.extraItemsForm.controls.receive_quantity.setValue(1)
        this.extraItemList = false
    }

    editExtra = false
    editExtraItems(index) {
        this.extraItems[index]['editExtra'] = true
        // this.editExtra = true
    }

    editExtraItemAfterRec(index) {
        this.orderDetail['TransactionPurchaseLine'][index]['editExtra'] = true
    }

    updateExtraItemAfterRec(index) {
        this.orderDetail['TransactionPurchaseLine'][index]['product_cost_price'] = Number(this.orderDetail['TransactionPurchaseLine'][index]['product_cost_price'])
        this.orderDetail['TransactionPurchaseLine'][index]['total_amount'] =
            Number(this.orderDetail['TransactionPurchaseLine'][index]['product_cost_price']) *
            Number(this.orderDetail['TransactionPurchaseLine'][index]['receive_quantity'])
        this.orderDetail['TransactionPurchaseLine'][index]['editExtra'] = false
    }

    updateExtraItems(index) {
        this.extraItems[index]['total_amount'] = this.extraItems[index]['product_cost_price'] * this.extraItems[index]['receive_quantity']
        this.extraItems[index]['editExtra'] = false
        // this.editExtra = false
    }

    recieveOrder(bool) {
        console.log('order is', this.orderDetail);
        let orderRecProperly = true
        for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
            if (this.orderDetail['TransactionPurchaseLine'][i].quantity != (this.orderDetail['TransactionPurchaseLine'][i].receive_quantity + Number(this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity))) {
                orderRecProperly = false
                break
            }
        }
        if (!orderRecProperly) {
            let status = bool ? 'Partially Received' : 'Contact'
            var index = this.allStatusses.map(x => {
                return x.status_name;
            }).indexOf(status);
            this.statusPO = this.allStatusses[index]
            delete this.statusPO['__typename']
            // this.updateRecieveOrder()
            // this.modalRef = this.modalService.show(inComplete, { class: 'modal-sm ' + 'custModal wd300', backdrop: 'static', keyboard: false });
            return
        }
        var index = this.allStatusses.map(x => {
            return x.status_name;
        }).indexOf('Completed');
        this.statusPO = this.allStatusses[index]
        delete this.statusPO['__typename']
        // this.updateRecieveOrder()
        // this.modalRef = this.modalService.show(complete, { class: 'modal-sm ' + 'custModal wd300', backdrop: 'static', keyboard: false });
    }

    recieveOrderSubmitAsIs(cap) {
        this.updateRecieveOrder('Partially Received', cap)
    }

    openRemoveLogModel(template: TemplateRef<any>, cls, log) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        this.log = log
    }

    log = {}
    removeLog() {
        this.removeLogs.mutate({
            location_id: localStorage.getItem('location_id'),
            logID: this.log['_id'],
            orderID: this.orderDetail['_id']
        }).subscribe(
            (res) => {
                this.orderDetail = res['data'].deleteLogAndUpdateStock
                this.itemsInOrder()
                this.addPrice = this.orderDetail['received_additional_cost']
                this.orderNumber = this.orderDetail['supplier_order_number']
                this.rmaSupNumber = this.orderDetail['supplier_rma_number']
                this.recLogs = this.orderDetail['ReceivingLogs']
                this.loadOrder = false
                this.modalRef.hide()
            }, (err) => {
                this.showToaster = false
                this.toasterMsg = err.graphQLErrors[0].message
                this.toasterType = 'error'
            }
        )
    }

    statusPO = {}
    setPOStatus(sta) {
        //allStatusses
        var index = this.allStatusses.map(x => {
            return x.status_name;
        }).indexOf(sta);
        this.statusPO = this.allStatusses[index]
        delete this.statusPO['__typename']
        // this.updateRecieveOrder()
    }

    addPrice = ''
    recordAdditionalPayment() {
        if (this.addPrice == '') {
            return
        }
        else if (Number(this.addPrice) <= this.orderDetail['received_additional_cost']) {
            return
        }
        this.addAdditionalCostGQL.mutate({
            amount: Number(this.addPrice),
            orderID: this.orderDetail['_id']
        }).subscribe(
            (res) => {
                console.log('Payment recorded', res['data'].addAdditionalCost);
                let items = JSON.parse(JSON.stringify(this.orderDetail['TransactionPurchaseLine']))
                this.orderDetail = res['data'].addAdditionalCost
                this.orderDetail['TransactionPurchaseLine'] = items
                this.showToaster = false
                this.toasterMsg = 'Additional payment recorded suceessfully'
                this.toasterType = 'success'
            }, (err) => {
                console.log('err while recording payment', err);
            }
        )
    }

    totalAmount = 0
    directPay = false
    directPayType = ''
    orderStatusState = {}
    async orderRepay(str) {
        let itemRec = false
        if (this.extraItems.length != 0) {
            itemRec = true
        }
        else {
            for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
                if (Number(this.orderDetail['TransactionPurchaseLine'][i].receiving_quantity) > 0) {
                    itemRec = true
                    break
                }
            }
        }
        if (itemRec) {
            let updated = await this.updateRecieveOrder('Partially Received', 'save')
            if (!updated) {
                this.showToaster = false
                this.toasterMsg = 'Order not updated'
                this.toasterType = 'error'
                return
            }
        }
        this.orderStatusState = this.orderDetail
        this.directPay = true
        this.directPayType = str
        this.sprOrderID = this.orderDetail['_id']
        this.stocksection = false
        this.sprTDate = this.orderDetail['transaction_date']
        this.checkOutsection = true
        this.productsRestock = this.orderDetail['TransactionPurchaseLine']
        this.supplierRestockSelected = this.orderDetail['Supplier']
        this.sprRef = this.orderDetail['transaction_keeping_unit']
        this.sprSubTotal = this.orderDetail['sub_total_amount']
        this.discountOnOrder = this.orderDetail['discount_amount']
        this.sprTax = this.orderDetail['tax_amount']
        this.sprTaxValue = this.orderDetail['tax_value']
        this.sprGrandTotal = Number(this.orderDetail['total_amount'].toFixed(2))
        this.priorPayment = Number(this.orderDetail['total_amount'].toFixed(2)) - Number(this.orderDetail['remaining_amount'].toFixed(2))
        this.shipTypeSelected = this.orderDetail['ShippingType']
        this.totalPaymentPayed = this.orderDetail['TransactionPayment']
    }

    createDirectRMA() {
        this.loadOrder = true
        this.createPoToRmaGQL.mutate({
            transactionId: this.orderDetail['_id']
        }).subscribe(
            (res) => {
                this.orderDetail = res['data'].CreatePOToRMA
                this.poDetails = false
                this.rmaDetailsSession = true
                this.purchaseOrderDetail(this.orderDetail)
                this.getpurchaseOrders()
            }, (err) => {
                console.log('error while generating rma', err);
                this.loadOrder = false
                this.showToaster = false
                this.toasterMsg = err.graphQLErrors[0].message
                this.toasterType = 'error'
            }
        )
        // this.selectOrderProcess = 'RMA'
        // this.supplierRestockSelected = this.orderDetail['Supplier']
        // this.poStatus = false
        // this.existingPO = true
        // this.poDetails = false
        // this.selectRType = false
        // this.restock = true
        // this.rmaDetailsSession = true
        // this.rmaReturnProducts = []
        // this.getRMAProductBySupplierFun()
    }

    isReceiveRefund = false
    openReceiveRefundModel(template: TemplateRef<any>, cls) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        this.totalAmountToRefund()
        this.isReceiveRefund = true
    }

    receiveRefund() {
        let obj = {}
        obj['amount'] = Number(this.totalRefund)
        obj['refundDate'] = this.refundDate
        obj['transactionID'] = this.orderDetail['_id']
        this.createPaymentRefundGQL.mutate(
            {
                input: obj
            }).subscribe(
                (res) => {
                    if (res['data'].createPaymentRefund) {
                        this.showToaster = false
                        this.toasterMsg = 'Fund recieved suceessfully'
                        this.toasterType = 'success'
                        this.modalRef.hide()
                        this.purchaseOrderDetail(this.orderDetail)
                        // this.cancel('poStatus', 'existingPO')
                        this.getpurchaseOrders()
                    }
                }, (err) => {
                    console.log('error while refunf', err);
                    this.showToaster = false
                    this.toasterMsg = err.graphQLErrors[0].message
                    this.toasterType = 'error'
                }
            )
    }

    totalRefund = 0
    totalAmountToRefund() {
        this.totalRefund = 0
        if (this.orderDetail['TransactionPurchaseLine'] == undefined) {
            return
        }
        for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
            if (this.orderDetail['TransactionPurchaseLine'][i].quantity > this.orderDetail['TransactionPurchaseLine'][i].receive_quantity) {
                let missing = this.orderDetail['TransactionPurchaseLine'][i].quantity - this.orderDetail['TransactionPurchaseLine'][i].receive_quantity
                let total = missing * this.orderDetail['TransactionPurchaseLine'][i].product_cost_price
                this.totalRefund = this.totalRefund + total
            }
        }
        console.log('refund amount', this.totalRefund);

    }

    updateRecieveOrder(str, cap) {
        return new Promise(
            resolve => {
                let obj = {}
                obj['transaction_type'] = AllowedTransactionType.Purchase
                obj['transaction_status'] = AllowedTransactionStatus.Invoice
                obj['order_status'] = AllowedOrdertStatus.Received
                var index = this.allStatusses.map(x => {
                    return x.status_name;
                }).indexOf(str);
                this.statusPO = this.allStatusses[index]
                delete this.statusPO['__typename']
                obj['dynamic_status_input'] = this.statusPO
                obj['sub_total_amount'] = this.orderDetail['sub_total_amount']
                obj['Tax'] = this.orderDetail['Tax'] == null ? null : this.orderDetail['Tax']['_id']
                obj['tax_amount'] = this.orderDetail['tax_amount']
                obj['tax_value'] = this.orderDetail['tax_value']
                obj['shipping_company_name'] = this.orderDetail['shipping_company_name']
                obj['shipping_tracking_no'] = this.orderDetail['shipping_tracking_no']
                obj['shipping_estimated_days'] = this.orderDetail['shipping_estimated_days']
                obj['ShippingType'] = this.orderDetail['ShippingType'] != null ? this.orderDetail['ShippingType']['_id'] : null
                obj['total_amount'] = this.orderDetail['total_amount']
                obj['Supplier'] = this.orderDetail['Supplier']['_id']
                obj['transaction_keeping_unit'] = this.orderDetail['transaction_keeping_unit']
                obj['received_note'] = this.orderDetail['received_note']
                obj['BusinessLocation'] = localStorage.getItem('location_id')
                let arr = []
                for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
                    let objPur = {}
                    objPur['Product'] = this.orderDetail['TransactionPurchaseLine'][i]['Product']['_id']
                    objPur['sku_numbner'] = this.orderDetail['TransactionPurchaseLine'][i]['stock_sku_number']
                    objPur['quantity'] = this.orderDetail['TransactionPurchaseLine'][i]['quantity']
                    objPur['product_cost_price'] = this.orderDetail['TransactionPurchaseLine'][i]['product_cost_price']
                    objPur['receive_quantity'] = this.orderDetail['TransactionPurchaseLine'][i]['receive_quantity']
                    objPur['receiving_quantity'] = Number(this.orderDetail['TransactionPurchaseLine'][i]['receiving_quantity'])
                    objPur['sub_total'] = this.orderDetail['TransactionPurchaseLine'][i]['product_cost_price'] * this.orderDetail['TransactionPurchaseLine'][i]['quantity']
                    objPur['total_amount'] = this.orderDetail['TransactionPurchaseLine'][i]['product_cost_price'] * this.orderDetail['TransactionPurchaseLine'][i]['quantity']
                    arr.push(objPur)
                }
                obj['TransactionPurchaseLines'] = arr
                let totalExtraItems = []
                for (let i = 0; i < this.extraItems.length; i++) {
                    let curr = {}
                    this.extraItems[i]['product_cost_price'] = Number(this.extraItems[i]['product_cost_price'])
                    this.extraItems[i]['receive_quantity'] = Number(this.extraItems[i]['receive_quantity'])
                    curr = JSON.parse(JSON.stringify(this.extraItems[i]))
                    if (this.extraItems[i]['_id'] != '') {
                        curr['Product'] = this.extraItems[i]['_id']
                    }
                    delete curr['_id']
                    delete curr['editExtra']
                    totalExtraItems.push(curr)
                }
                console.log('final recieving object is', obj);
                this.purchaseOrderReceiving.mutate({
                    transactionId: this.orderDetail['_id'],
                    input: JSON.parse(JSON.stringify(obj)),
                    extra_Items: totalExtraItems,
                    btnCaption: cap
                }).subscribe(
                    (res) => {
                        if (res['data'].purchaseOrderReceiving != null) {
                            // this.toaster.showSuccess('P.O recieved suceessfully', '')
                            this.showToaster = false
                            this.toasterMsg = 'P.O recieved suceessfully'
                            this.toasterType = 'success'
                            this.extraItems = []
                            this.getAllProducts()
                            if (cap == 'finish later') {
                                resolve(true)
                                this.finishLaterOrder()
                                return
                            }
                            this.orderDetail = res['data'].purchaseOrderReceiving
                            this.recLogs = this.orderDetail['ReceivingLogs']
                            for (let i = 0; i < this.orderDetail['TransactionPurchaseLine'].length; i++) {
                                this.orderDetail['TransactionPurchaseLine'][i]['editExtra'] = false
                            }
                            // this.purchaseOrderDetail(this.orderDetail)
                            resolve(true)
                            // this.existingPO = true
                            // this.poDetails = false
                            // this.orderText = 'Orders'
                            this.extraItems = []
                            // this.cancel('poStatus', 'existingPO')
                            // this.getpurchaseOrders()
                        }
                    }, (err) => {
                        console.log('error while recieving P.O', err);
                        resolve(false)
                    }
                )
            })
    }

    poReveiveOrder = []
    poOrderNum = ''
    receive_quantity
    itemReveived = 0
    totalItems = 0
    poReveiveFun(poOrder) {
        this.poReceivingData = poOrder
        this.existingPO = false
        this.poReveive = true
        this.itemReveived = 0
        this.totalItems = 0
        this.poOrderNum = poOrder.invoice_no
        this.poReveiveOrder = poOrder.TransactionPurchaseLine
        this.purchaseReveiveBy = this.poReceivingData['receivedBy']
        if (this.poReceivingData['receivedDate'] != null) {
            this.purchaseReveiveDate = new Date(this.poReceivingData['receivedDate'])
        }
        this.purchaseAddCost = this.poReceivingData['received_additional_cost']
        this.reveiveNotes = this.poReceivingData['receivedNote']
        for (let i = 0; i < this.poReveiveOrder.length; i++) {
            this.totalItems = Number(this.totalItems) + Number(this.poReveiveOrder[i]['quantity'])
            if (this.poReveiveOrder[i]['receive_quantity'] == null) {
                this.poReveiveOrder[i]['receive_quantity'] = 0
            }
            this.itemReveived = Number(this.itemReveived) + Number(this.poReveiveOrder[i]['receive_quantity'])

        }
        console.log("The poReveiveOrder---->", this.poReveiveOrder);
    }

    updatePurchaseQuantity(quantity, orignalQuantity, product) {
        let num = Number(quantity)
        if (num <= orignalQuantity) {
            this.itemReveived = 0
            for (let i = 0; i < this.poReveiveOrder.length; i++) {
                this.itemReveived = Number(this.itemReveived) + Number(this.poReveiveOrder[i]['receive_quantity'])
            }
        } else {
            // this.toaster.showError('Invalid Quantity', 'Please Enter Correct Quantity')
            this.showToaster = false
            this.toasterMsg = 'Invalid Quantity'
            this.toasterType = 'error'
            product.receive_quantity = 0
        }
        console.log("The poReveiveOrder---->", this.poReveiveOrder);

    }

    poReceivingData = []
    returnPOReceiving = false
    purchaseNotes
    purchaseReveiveBy
    purchaseReveiveDate
    purchaseAddCost
    reveiveNotes
    purchaseOrderReceivingDone() {
        this.loadexistingPO = true
        if (this.purchaseReveiveDate == undefined || "") {
            // this.toaster.showError('Please Select Reveive Date ', 'Select Reveive Date')
            this.showToaster = false
            this.toasterMsg = 'Please Select Reveive Date'
            this.toasterType = 'error'
            return
        }
        if (this.purchaseReveiveBy == undefined) {
            // this.toaster.showError('Please Enter Reveiver Name', 'Enter Reveiver Name')
            this.showToaster = false
            this.toasterMsg = 'Please Enter Reveiver Name'
            this.toasterType = 'error'
            return
        }
        let prDate = this.datePipe.transform(this.purchaseReveiveDate, 'yyyy-MM-dd');
        let tType: AllowedTransactionType = AllowedTransactionType.Purchase
        let tPymentStatus: AllowedTransactionPaymentStatus = AllowedTransactionPaymentStatus.Paid
        let tStatus: AllowedTransactionStatus = AllowedTransactionStatus.Invoice
        //Disscusassss This Status 
        let orderStatus: AllowedOrdertStatus = AllowedOrdertStatus.Received

        let pOReceivingLines = []
        for (let i = 0; i < this.poReveiveOrder.length; i++) {
            let poRecTP = {}
            poRecTP['Product'] = this.poReveiveOrder[i].Product['_id']
            poRecTP['quantity'] = Number(this.poReveiveOrder[i]['quantity']) == null ? "" : Number(this.poReveiveOrder[i]['quantity'])
            poRecTP['receive_quantity'] = Number(this.poReveiveOrder[i]['receive_quantity']) == null ? "" : Number(this.poReveiveOrder[i]['receive_quantity'])
            poRecTP['product_purchase_price'] = String(this.poReveiveOrder[i]['product_purchase_price'] == null ? "" : this.poReveiveOrder[i]['product_purchase_price'])
            poRecTP['final_purchase_price'] = this.poReveiveOrder[i]['final_purchase_price'] == null ? "" : this.poReveiveOrder[i]['final_purchase_price']
            poRecTP['in_stock'] = Number(this.poReveiveOrder[i]['in_stock']) == null ? "" : Number(this.poReveiveOrder[i]['in_stock'])
            poRecTP['total_amount'] = Number(this.poReveiveOrder[i]['total_amount'] == null ? "" : this.poReveiveOrder[i]['total_amount'])
            pOReceivingLines.push(poRecTP)
        }
        console.log("The PO Receiving Lines ---->", pOReceivingLines);

        // this.purchaseOrderReceiving.mutate({
        //     transactionId: this.poReceivingData['_id'],
        //     input: {
        //         TransactionPurchaseLines: pOReceivingLines,
        //         transaction_type: tType,
        //         transaction_status: tStatus,
        //         // transaction_payment_status: tPymentStatus,
        //         order_status: orderStatus,
        //         transaction_date: this.poReceivingData['transaction_date'] == null ? "" : this.poReceivingData['transaction_date'],
        //         total_amount: Number(this.poReceivingData['total_amount']) == null ? 0 : Number(this.poReceivingData['total_amount']),
        //         // final_total: Number(this.poReceivingData['final_total']) == null ? 0 : Number(this.poReceivingData['final_total']),
        //         // staff_note: this.poReceivingData['staff_note'] == null ? "" : this.poReceivingData['staff_note'],
        //         Supplier: this.poReceivingData['Supplier']._id,
        //         // receivedNote: this.reveiveNotes,
        //         // received_additional_cost: Number(this.purchaseAddCost) == null ? 0 : Number(this.purchaseAddCost),
        //         // receivedBy: this.purchaseReveiveBy,
        //         // receivedDate: prDate,
        //         // BusinessLocation: window.localStorage.getItem('location_id'),
        //     }
        // }).subscribe(
        //     (res) => {
        //         this.loadexistingPO = false
        //         console.log('purchaseOrderReceivingDone res', res);
        //         this.returnPOReceiving = res['data'].purchaseOrderReceiving
        //         if (this.returnPOReceiving == true) {
        //             this.toaster.showSuccess('Purchase Order Receiving Done Successfully', 'Receiving P.O')
        //             this.cancel('poReveive', 'existingPO')
        //             this.getpurchaseOrders()
        //         } else {
        //             this.toaster.showError('Purchase Order Receiving Not Update', 'Receiving P.O')
        //         }
        //         this.poReceivingData = []
        //         this.purchaseNotes = ''
        //         this.purchaseReveiveBy = ''
        //         this.purchaseReveiveDate = ''
        //         this.purchaseAddCost = ''
        //         this.reveiveNotes = ''
        //     }, (err) => {
        //         console.log('purchaseOrderReceivingDone err', err);
        //         this.toaster.showError('Purchase Order Receiving Error', 'Receiving P.O Error')
        //         this.loadexistingPO = false
        //     }
        // )
    }

    //============================================================== End Purchase Order Receiving Session =================================================================//

    checkFileProdusts() {
        this.productNotFoundLoader = true
        let productNames = []
        this.productNotFound = undefined
        this.importProducts = []
        this.length2 = 0
        this.modalRef.hide()
        for (let i = 0; i < this.dataList.length; i++) {
            let obj = {}
            for (let k = 0; k < this.columnToMap.length; k++) {
                obj[this.columnToMap[k].c_db] = this.dataList[i][this.columnToMap[k].c_csv]
            }
            productNames.push(obj['Item'])

        }
        console.log('productNames---->', productNames)
        this.productNamesCheck(productNames)

    }

    productNotFound = undefined
    importProducts
    length2 = 0
    productNotFoundLoader = false
    productNamesCheck(productNames) {
        let length1 = productNames.length
        this.importSearchProducts.watch({
            search: productNames,
            locationId: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe((response) => {
            let data = JSON.parse(JSON.stringify(response['data'].importSearchProducts))
            this.importProducts = data
            this.length2 = data.length
            this.productNotFound = length1 - this.length2
            this.productNotFoundLoader = false
            console.log('Product Not Found--->', this.productNotFound)
        },
            (err) => {
                console.log('Error from GQL', err)
                this.productNotFoundLoader = false
            }
        )

    }

    currentOrderId = ''
    model_Document(template: TemplateRef<any>, cls, order) {
        this.currentOrderId = order['_id']
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
    }

    sprTransactionHours = ''
    sprTransactionMinutes = ''
    sprTransactionAmPm = ''

    isManufactureBunlde = false
    isManufactureBunldeProductFun() {
        this.isManufactureBunldeProduct.watch({
            location_id: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                console.log('isManufactureBunlde res', res['data'].isManufactureBunldeProduct);
                this.isManufactureBunlde = res['data'].isManufactureBunldeProduct
            }, (err) => {
                let message = err.graphQLErrors[0].message
                console.log('isManufactureBunlde err', message);
            }
        )
    }

    createPOFilter(filter) {
        this.POfilter = filter
    }

    searchCreatePO = ''
    POfilter = 'all'
    searchPOString: string = 'product_name,sku'
    getProductForRestockDraft(supplierID) {
        this.mbpLoader = true
        this.getProductAndBundlebySupplier.watch({
            input: {
                is_bundle_product: false,
                locationId: window.localStorage.getItem('location_id'),
                search: "",
                supllierId: supplierID,
                limit: 10000,
                skip: 0,
                filterType: FilterType.All,
                transactionId: this.currentOrderId
            }
        }).valueChanges.subscribe(
            (res) => {
                if(res['data'].getProductAndBundlebySupplier == null) {
                    return
                }
                this.restockSerachCheck = false
                this.loadOrderToPayMore = false
                this.mbpGrandTotal = 0
                this.mbpLoader = false
                let data = res['data'].getProductAndBundlebySupplier
                this.supplierRestockSelected = res['data'].getProductAndBundlebySupplier['Transaction']['Supplier']
                this.totalAmount = res['data'].getProductAndBundlebySupplier.Transaction.total_amount
                this.priorPayment = res['data'].getProductAndBundlebySupplier.Transaction.total_amount - res['data'].getProductAndBundlebySupplier.Transaction.remaining_amount
                this.sprRef = res['data'].getProductAndBundlebySupplier.Transaction.transaction_keeping_unit
                this.totalPaymentPayed = res['data'].getProductAndBundlebySupplier.Transaction.TransactionPayment
                this.discountOnOrder = res['data'].getProductAndBundlebySupplier.Transaction.discount_amount
                this.productsRestock = data.ProductList
                let otherData = data.Transaction
                this.changeHour = otherData['transaction_hours']
                this.changeMinute = otherData['transaction_minutes']
                this.changeTimeAmPm = otherData['transaction_am_pm']
                this.sprDiscountAmount = otherData['discount_amount']
                this.sprDiscountValue = otherData['discount_value']
                this.sprDiscountType = otherData['is_discount_percentage'] == true ? '%' : '$'
                this.sprNote = otherData['additional_notes']
                this.sprNoteOption = otherData['is_private']
                let myDate1 = this.datePipe.transform(otherData['transaction_date']);
                this.sprTDate = myDate1
                let myDate2 = this.datePipe.transform(otherData['arrival_Date']);
                this.sprADate = myDate2
                if (otherData['ShippingType'] != null) {
                    this.getShippingTypeFun(otherData['ShippingType']._id, otherData['shipping_amount'])
                } else {
                    this.changeShipping = 'Other'
                    this.shipTypeSelected['shipment_name'] = 'Other'
                    this.shipTypeSelected['shipment_price'] = otherData['shipping_amount']
                    this.shipTypeSelectedFun(this.shipTypeSelected)
                }
                for (let t = 0; t < this.PurchaseTaxData.length; t++) {
                    if (otherData['Tax'] != null) {
                        if (this.PurchaseTaxData[t]['_id'] == otherData['Tax']._id) {
                            this.selectedTaxforRestock = this.PurchaseTaxData[t]
                        }
                    } else {
                        this.changeTax = 'None'
                        this.selectedTaxforRestock = []
                    }
                }
                for (let i = 0; i < this.productsRestock.length; i++) {
                    this.productsRestock[i]['quantity'] = 0
                    this.productsRestock[i]['total'] = 0
                    for (let j = 0; j < this.productsRestock[i]['Suppliers'].length; j++) {
                        this.productsRestock[i]['Suppliers'][j]['supTotal'] = Number(this.productsRestock[i]['Suppliers'][j]['ordered_qty']) * Number(this.productsRestock[i]['Suppliers'][j]['price_purchase'])
                        this.productsRestock[i]['Suppliers'][j]['quantityInput'] = false
                        if (this.productsRestock[i]['Suppliers'][j]['incoming_item'] == 0) {
                            this.productsRestock[i]['Suppliers'][j]['alreadyOrder'] = false
                        } else {
                            this.productsRestock[i]['Suppliers'][j]['alreadyOrder'] = true
                        }
                    }

                }
                this.calculateProductRestocktotal()
                console.log('Product And Bundleby Supplier res', this.productsRestock);
            }, (err) => {
                this.mbpLoader = false
                this.loadOrderToPayMore = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            }
        )
    }

    //=================================================Start Status Session =========================================//
    newStatusText = ""
    newStatusColor = 'green'
    changeStatus(value, color) {
        // this.toaster.showSuccess('Status Updated Successfully', 'Status Updated')
        this.showToaster = false
        this.toasterMsg = 'Status Updated Successfully'
        this.toasterType = 'success'
        //   let statusInput:any
        //   let obj={}
        //   obj['status_name']=value
        //   obj['businessLocation']=window.localStorage.getItem('location_id')
        //   obj['status_background_color']=color
        //   obj['status_font_color']=color
        //   obj['status_type']=AllowedType.Document,
        //   statusInput=obj
        //   this.clientDocumentStatus.mutate({
        //     client_id: "",//this.clientSelected['_id'],
        //     document_id: this.modelDocument['document_id'],
        //     input:statusInput
        //   }).subscribe(
        //     (res) => {
        //         console.log('clientDocumentStatus res', res);
        //         let returnVal = res['data'].clientDocumentStatus
        //         if(returnVal){
        //         this.modelDocument['document_status']['status_name']=value
        //         this.modelDocument['document_status']['status_background_color']=color
        //         this.toaster.showSuccess('Status Updated Successfully', 'Status Updated')
        //       }else{
        //         this.toaster.showError('Status Not Updated Please Try Again','Status Not Update')
        //       }
        //     }, (err) => {
        //         console.log('clientDocumentStatus err', err);
        //     }
        // )
        this.modalRef.hide()
    }

    createNewStatusColor(color) {
        this.newStatusColor = color
    }

    statusLoader = false
    createNewStatus() {
        this.statusLoader = true
        if (this.newStatusText == "") {
            // this.toaster.showError('Please Enter Status Name First', 'Status Name')
            this.showToaster = false
            this.toasterMsg = 'Please Enter Status Name First'
            this.toasterType = 'error'
            this.statusLoader = false
            return
        }
        let statusInput: any
        let obj = {}
        obj['status_name'] = this.newStatusText
        obj['businessLocation'] = window.localStorage.getItem('location_id')
        obj['status_background_color'] = this.newStatusColor
        obj['status_font_color'] = this.newStatusColor
        obj['status_type'] = AllowedType.Document,
            statusInput = obj
        this.createStatus.mutate({
            input: statusInput
        }).subscribe(
            (res) => {
                this.statusLoader = false
                console.log('createStatus res', res);
                let returnVal = res['data'].createStatus
                this.newStatusText = ""
                this.newStatusColor = 'green'
                this.beforeClick = true
                this.afterClick = false
                this.getallStatus()
            }, (err) => {
                this.beforeClick = true
                this.afterClick = false
                this.statusLoader = false
                // this.toaster.showError('Something went wrong. Try again', '')
                this.showToaster = false
                this.toasterType = 'error'
                this.toasterMsg = 'Something went wrong, Please try again.'
                console.log('createStatus err', err);
            }
        )
    }

    allStatusData = []
    getallStatus() {
        this.getStatus.watch({
            status_type: AllowedType.PurchaseOrder
        }).valueChanges.subscribe(
            (res) => {
                console.log('allStatusData res', res);
                this.allStatusData = res['data'].getStatus
            }, (err) => {
                console.log('allStatusData err', err);
            }
        )
    }

    beforeClick = true
    afterClick = false
    loadaddLabel() {
        this.beforeClick = false
        this.afterClick = true
    }

    loaddoneLabel() {
        this.beforeClick = true
        this.afterClick = false
    }

    //================================================= End Status Session =========================================//

    CCardFlip = false

    flipCardBack() {
        this.CCardFlip = true
    }

    flipCardFront() {
        this.CCardFlip = false
    }

    addNewProductBtn() {
        this.getAllCompatibleDevices('')
        this.productCurrentAction = 'Item Details'
        this.existingSP = false
        this.addNewProduct = true
    }

    nextBtnSupp() {
        this.selectRSupplier = false
        this.selectRShipping = true
    }
    nextBtnSupplier() {
        this.selectRSupplier = true
        this.selectRType = false
    }
    preBtnSupplier() {
        this.selectRSupplier = false
        this.selectRType = true
    }
    preBtnSupp() {
        this.selectRItems = false
        this.selectRShipping = true
    }

    calculatePODate() {
        this.sprTDate = new Date();
        this.changeHour = this.sprTDate.getHours()
        this.changeMinute = this.sprTDate.getMinutes()
        this.changeTimeAmPm = this.changeHour >= 12 ? 'PM' : 'AM';
        this.changeHour = this.changeHour % 12;
        this.changeHour = this.changeHour ? this.changeHour : 12;
    }

    nextBtnShipping() {
        if (this.isObjectEmpty(this.shipTypeSelected)) {
            // this.toaster.showError('Please Select Shipping Method First', 'Select Shipping')
            this.showToaster = false
            this.toasterMsg = 'Please Select Shipping Method First'
            this.toasterType = 'error'
            return
        }
        this.calculatePODate()
        this.selectRShipping = false
        this.selectRItems = true
        this.calculateProductRestocktotal()
    }

    skipNextBtnShipping() {
        this.shipTypeSelected = {}
        this.shipTypeSelected['shipment_name'] = 'Other'
        this.shipTypeSelected['shipment_price'] = 0
        this.changeShipping = 'Other'
        this.selectRShipping = false
        this.selectRItems = true
        this.calculatePODate()
        this.calculateProductRestocktotal()

    }

    checkOutBackbtn() {
        this.disgardproductsRestock()
        this.checkOutsection = false
    }

    backBtnTemp() {
        this.resetFields()
        if (this.directPay) {
            this.orderDetail = this.orderStatusState
            this.checkOutsection = false
            this.stocksection = true
            this.directPay = false
            return
        }
        if (this.priorPayment > 0) {
            this.purchaseOrderDetail(this.curentOrder)
            this.checkOutsection = false
            this.stocksection = true
            return
        }
        if (this.isReloadingPayment) {
            this.isReloadingPayment = false
            this.checkOutsection = false
            this.stocksection = true
            this.selectRType = true
            return
        }
        this.productsRestock = this.restockProducts
        this.restockProducts = []
        this.selectRItems = true
        this.stocksection = true
        this.checkOutsection = false
    }

    cancelBtnShipping() {
        this.selectRItems = false
        this.selectRSupplier = true
    }
    cancelBtnBundelOrder() {
        this.selectRItems = false
        this.selectRType = true
    }
    openBundle(index) {
        let bool = !this.allProducts[index]['bundleDrop']
        for (let i = 0; i < this.allProducts.length; i++) {
            this.allProducts[i]['bundleDrop'] = false
        }
        this.allProducts[index]['bundleDrop'] = bool
    }

    openCatDetail(index) {
        // for (let i = 0; i < this.allProducts.length; i++) {
        //     this.allProducts[i]['catdetailBtn'] = false
        // }
        this.allProducts[index]['cCardFlipProduct'] = true
    }

    closeCatDetail(index) {
        this.allProducts[index]['cCardFlipProduct'] = false

    }

    supcatdetailBtn = true;
    supcatdetailBox = false;
    supopenCatDetail(index) {
        // for (let i = 0; i < this.addSupplierToList.length; i++) {
        //     this.addSupplierToList[i]['cCardFlipSupp'] = false
        // }
        this.addSupplierToList[index]['cCardFlipSupp'] = true
    }

    supcloseCatDetail(index) {
        this.addSupplierToList[index]['cCardFlipSupp'] = false
    }

    openRemoveProduct(template: TemplateRef<any>, cls) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    openRemoveSupplier(template: TemplateRef<any>, cls) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    currentImg = true
    defaultImg = false
    cameraImg = false
    browserImg = false

    changeTab(type) {
        this.currentImg = false;
        this.defaultImg = false;
        this.cameraImg = false;
        this.browserImg = false
        this[type] = true;
    }

    productImage: any
    model_ProfilePhoto(template: TemplateRef<any>, cls, photo) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls });
        this.productImage = profilePicture('.profile', photo, '')
        // this.img = profilePicture('.profile', '', '')
    }

    createAccountType = ''
    model_inventoryAccount(template: TemplateRef<any>, cls, acc) {
        this.createAccountType = acc
        this.initializeAddAccount()
        this.getAccountDetails('', acc)
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    model_verifySuppAddress(template: TemplateRef<any>, cls) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    closePopup() {
        this.modalRef.hide();
        this.initializeAddAccount()
        this.addAccountSubmitted = false
        // this.modalService.hide(1)
    }

    changeBundleSetting = false

    changeBundleYes = false
    changeBundleNo = true

    changeTypeProduct = true
    changeTypeService = false

    changeTrackYes = false
    changeTrackNo = true

    changeBundleTrackYes = false
    changeBundleTrackNo = true

    changeProfitDollar = true
    changeProfitPercent = false

    changeVal(val, val1) {
        this[val] = true
        this[val1] = false
        if (val == 'changeBundleYes') {
            this.changeBundleSetting = true
        }
        if (val == 'changeBundleNo') {
            this.changeBundleSetting = false
        }

    }

    //============================================ Start Export/Delete /Archive Supliers and Products==============================================
    activeSupliers = []
    openActiveSupModal(template: TemplateRef<any>, cls) {
        this.activeSupliers = []
        for (let i = 0; i < this.addSupplierToList.length; i++) {
            if (this.addSupplierToList[i]['selected'] == true) {
                this.activeSupliers.push(this.addSupplierToList[i]['_id'])
            }
        }
        if (this.activeSupliers.length != 0) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        } else {
            // this.toaster.showError('Select Suplier', 'Please Select Suplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Suplier First'
            this.toasterType = 'error'
        }
    }

    archiveToActiveSupplierFun() {
        this.archiveToActiveSupplier.mutate({
            id: this.activeSupliers
        }).subscribe(
            (res) => {
                console.log('archiveToActiveSupplier res', res['data'].archiveToActiveSupplier);
                let returnVal = res['data'].archiveToActiveSupplier
                if (returnVal) {
                    this.showToaster = false
                    this.toasterMsg = 'Supplier Successfully'
                    this.toasterType = 'success'
                    this.supplierSettingsOpen = false
                    this.addSupplierToList = []
                    this.fieldSearchSupplier.setValue("")
                    this.getAllSuppliers()
                    this.getAllSupplierRestockFun()

                }
            }, (err) => {
                // let message=err.graphQLErrors[0].message
                console.log('archiveToActiveSupplier err', err);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )
    }

    permanentDeleteSupliers = []
    openPermanentDeleteSuppModal(template: TemplateRef<any>, cls) {
        this.permanentDeleteSupliers = []
        for (let i = 0; i < this.addSupplierToList.length; i++) {
            if (this.addSupplierToList[i]['selected'] == true) {
                this.permanentDeleteSupliers.push(this.addSupplierToList[i]['_id'])
            }
        }
        if (this.permanentDeleteSupliers.length != 0) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        } else {
            // this.toaster.showError('Select Suplier', 'Please Select Suplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Suplier First'
            this.toasterType = 'error'
        }
    }

    PermanentDeleteSupplierFun() {
        this.permanentDeleteSupplier.mutate({
            id: this.permanentDeleteSupliers
        }).subscribe(
            (res) => {
                console.log('permanentDeleteSupplier res', res['data'].permanentDeleteSupplier);
                let returnVal = res['data'].permanentDeleteSupplier
                if (returnVal) {
                    this.showToaster = false
                    this.toasterMsg = 'Supplier(s) Successfully Deleted'
                    this.toasterType = 'success'
                    this.supplierSettingsOpen = false
                    this.fieldSearchSupplier.setValue("")
                    this.addSupplierToList = []
                    this.getAllSuppliers()
                    this.getAllSupplierRestockFun()

                }
            }, (err) => {
                // let message=err.graphQLErrors[0].message
                console.log('permanentDeleteSupplier err', err);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )
    }

    deleteSupliers = []
    openDeleteAllSupModal(template: TemplateRef<any>, cls) {
        this.deleteSupliers = []
        for (let i = 0; i < this.addSupplierToList.length; i++) {
            if (this.addSupplierToList[i]['selected'] == true) {
                this.deleteSupliers.push(this.addSupplierToList[i]['_id'])
            }
        }
        if (this.deleteSupliers.length != 0) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        } else {
            // this.toaster.showError('Select Suplier', 'Please Select Suplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Suplier First'
            this.toasterType = 'error'
        }
    }

    deleteMultiSupliers() {
        this.deleteSuppLoader = true
        if (this.deleteSupliers.length != 0) {
            this.removedMultiSuppliers.mutate({
                id: this.deleteSupliers
            }).subscribe(
                (res) => {
                    this.modalRef.hide()
                    this.deleteSuppLoader = false
                    console.log(' res', res['data'].removedMultiSuppliers);
                    let returnVal = res['data'].removedMultiSuppliers
                    if (returnVal) {
                        // this.toaster.showSuccess('Supliers Delete Successfully', '')
                        this.showToaster = false
                        this.toasterMsg = 'Supliers Archive Successfully'
                        this.toasterType = 'success'
                        this.supplierSettingsOpen = false
                        this.fieldSearchSupplier.setValue("")
                        this.addSupplierToList = []
                        this.getAllSuppliers()
                        this.getAllSupplierRestockFun()
                    }
                }, (err) => {
                    this.deleteSuppLoader = false
                    let message = err.graphQLErrors[0].message
                    console.log(' err', message);
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                }
            )
        } else {
            this.supplierLoader = false
            // this.toaster.showError('Select Suplier', 'Please Select Suplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Suplier First'
            this.toasterType = 'error'
        }
    }

    deleteProducts = []
    openDeleteAllProModal(template: TemplateRef<any>, cls) {
        for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i]['selected'] && (this.allProducts[i]['max_bundle'] != 0 || this.allProducts[i]['ProductStockPrice'][0].qty_available > 0)) {
                this.showToaster = false
                this.toasterMsg = 'Product with stock cannot be archived'
                this.toasterType = 'error'
                return
            }
        }
        this.deleteProducts = []
        for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i]['selected'] == true) {
                this.deleteProducts.push(this.allProducts[i]['_id'])
            }
        }
        if (this.deleteProducts.length != 0) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        } else {
            // this.toaster.showError('Select Products', 'Please Select Products First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Products First'
            this.toasterType = 'error'
        }
    }

    //============================================ End Export/Delete Supliers and Products==============================================//

    //=========================================== Get All Taxes =======================================//
    PurchaseTaxData = []
    getTaxsByLocationFun() {
        this.getTaxsByLocation.watch({
            location_id: window.localStorage.getItem('location_id'),
            taxType: TaxTypeEnum.PurchaseTax
        }).valueChanges.subscribe(
            (res) => {
                console.log('PurchaseTaxData res', res['data'].getTaxsByLocation);
                this.PurchaseTaxData = res['data'].getTaxsByLocation
            }, (err) => {
                let message = err.graphQLErrors[0].message
                console.log('PurchaseTaxData err', message);
            }
        )
    }

    //======================================== Start Restock  ==================================================================//

    supplierRestockData = []
    supplierRestockSearch: FormControl = new FormControl()
    supplierRestockLoader = false
    supplierRestockSelected = {}
    getAllSupplierRestockFun() {
        this.supplierRestockLoader = true
        this.getAllSupplierRestock.watch({
            search: this.supplierRestockSearch.value == null ? "" : this.supplierRestockSearch.value,
            location_id: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                this.supplierRestockLoader = false
                console.log(' res', res['data'].getAllSupplierRestock);
                this.supplierRestockData = res['data'].getAllSupplierRestock
            }, (err) => {
                this.supplierRestockLoader = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            }
        )
    }

    backFromSupplierSection() {
        this.supplierRestockSearch.setValue('')
        this.cancel('selectRSupplier', 'selectRType')
    }

    selectOrderProcess = ''
    selectOrderProcessFun(value) {
        this.selectOrderProcess = value
    }

    mbpClicked = false
    supplierRestockSelectedFun(supplier) {
        this.mbpClicked = false
        this.sprOrderID = ''
        this.supplierRestockSelected = supplier
    }

    restockSuppMBPSelectedFun() {
        this.mbpClicked = true
        this.supplierRestockSelected = {}
    }

    orderDoubleClick(orderProcess) {
        //Buyback
        this.selectOrderProcess = orderProcess
        if (orderProcess === 'BP') {
            this.orderText = "Buy Back"
            this.displayBuyBackProgram = true
            this.selectRType = false
            this.noOrdersSuppliers = false
            this.selectRSupplier = false
            this.currentOrderId = ''
        }

    }

    nextToRestockSupp() {
        this.priorPayment = 0
        if (this.selectOrderProcess == '') {
            // this.toaster.showError('Please Select Process First', 'Select Process')
            this.showToaster = false
            this.toasterMsg = 'Please Select Process First'
            this.toasterType = 'error'
            return
        }
        if (this.selectOrderProcess === 'BP') {
            this.orderText = "Buy Back"
            this.displayBuyBackProgram = true
            this.selectRType = false
            this.noOrdersSuppliers = false
            this.selectRSupplier = false
            this.currentOrderId = ''
        } else if (this.selectOrderProcess === 'RMA') {
            this.selectRType = false
            this.noOrdersSuppliers = false
            this.selectRSupplier = true
            this.isManufactureBunlde = false
            this.orderText = "RMA"
        }
        else {
            this.isManufactureBunldeProductFun()
            this.selectRType = false
            this.supplierRestockSelected = {}
            this.noOrdersSuppliers = false
            this.selectRSupplier = true
            this.orderText = "P.O."
            this.orderDetail = {}
        }
    }

    backToProcess() {
        this.noOrdersSuppliers = false
        this.selectRType = true
        this.selectRSupplier = false
    }

    changeCalueRestock(skip) {
        if (this.isObjectEmpty(this.supplierRestockSelected) && !this.mbpClicked && !skip) {
            this.showToaster = false
            this.toasterMsg = 'Please Select Supplier First'
            this.toasterType = 'error'
            return
        }
        this.showToaster = true
        this.shipTypeSelected = []
        if (this.mbpClicked) {
            this.getProductAndBundlebySupplierFun(true, "")
            this.selectRShipping = false
            this.selectRItems = true
            this.selectRSupplier = false
        } else {
            if (this.selectOrderProcess === 'RMA') {
                this.rmaReturnProducts = []
                this.getRMAProductBySupplierFun()
            } else {
                this.getAllShippingTypeFun()
                if (skip) {
                    this.supplierRestockSelected = {}
                    this.getProductAndBundlebySupplierFun(false, null)
                    return
                }
                this.getProductAndBundlebySupplierFun(false, this.supplierRestockSelected['_id'])
            }
        }
    }

    backStepRestock() {
        this.sprDateError = false
        this.sprPurchaseHourError = false
        this.selectedShipAmount = 0
        this.shipTypeSelected = {}
        this.changeShipping = 'Other'
        if (this.mbpClicked) {
            this.selectRShipping = false
            this.selectRType = false
            this.selectRSupplier = true
            this.selectRItems = false
        } else {
            this.selectRItems = false
            this.selectRType = false
            this.selectRSupplier = false
            this.selectRShipping = true
        }
    }

    shippingTypeData: any
    getShippingTypeFun(id, newCharges) {
        this.shipTypeLoader = true
        this.getShippingType.watch({
            id: id
        }).valueChanges.subscribe(
            (res) => {
                this.shipTypeLoader = false
                console.log(' res', res['data'].getShippingType);
                let data = res['data'].getShippingType
                data['shipment_price'] = newCharges != '' ? newCharges : data['shipment_price']
                this.shipTypeSelectedFun(res['data'].getShippingType)
            }, (err) => {
                this.shipTypeLoader = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            }
        )
    }

    shipTypeLoader0 = false
    shippingTypeData2 = []
    // supplierID: this.currentSupplier['_id']
    getAllShippingTypeFun() {
        this.shipTypeLoader0 = true
        this.getAllShippingType.watch({
            location_id: window.localStorage.getItem('location_id'),
            skip: this.shipTypeSkip,
            limit: this.shipTypeLimit,
            supplierID: this.isObjectEmpty(this.supplierRestockSelected) ? null : this.supplierRestockSelected['_id']
        }).valueChanges.subscribe(
            (res) => {
                this.shippingTypeData = []
                this.shippingTypeData2 = []
                this.shipTypeLoader0 = false
                let other = {}
                other['shipment_name'] = 'Other'
                other['shipment_price'] = Number(0)
                this.shippingTypeData2[0] = other
                let result = res['data'].getAllShippingType
                this.shippingTypeData = result
                for (let i = 0; i < result.length; i++) {
                    this.shippingTypeData2.push(result[i])
                }
                console.log('All Shipping Type ------->', this.shippingTypeData);
            }, (err) => {
                this.shipTypeLoader0 = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            }
        )
    }

    supllierShippingType=[]
    getSupllierShippingType() {
        this.shipTypeLoader0 = true
        this.getAllShippingType.watch({
            location_id: window.localStorage.getItem('location_id'),
            skip: this.shipTypeSkip,
            limit: this.shipTypeLimit,
            supplierID: this.currentSupplier['_id']
        }).valueChanges.subscribe(
            (res) => {
                this.supllierShippingType = []
                this.shipTypeLoader0 = false
                if(res['data'].getAllShippingType){
                    this.supllierShippingType=res['data'].getAllShippingType
                }
                console.log('All Shipping Type For Supplier------->', this.supllierShippingType);
            }, (err) => {
                this.shipTypeLoader0 = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            }
        )
    }


    shipTypeSkip = 0;
    shipTypeLimit = 10000;
    shipTypeScrolling = false
    shipTypeScroll() {
        this.isProductScrolling = true
        this.shipTypeSkip = this.shipTypeSkip + 10
        this.getAllShippingTypeFun()
    }

    shippingTypeForm: any
    shipTypeSubmitted = false
    initializeShipTypForm() {
        this.update = "Add"
        this.shipTypeIcon = ''
        this.shipTypeErrorMessage = ''
        this.shipTypeSubmitted = false
        this.changeHour = '00'
        this.changeMinute = '00'
        this.selectedTimeZone = 'Select time zone'
        this.shippingTypeForm = this.formbulider.group({
            shipment_name: ['', [Validators.required]],
            shipment_price: [],
            delivery_time_days: [null],
            threshold: [null],
            icon: [null],
            hours: [null],
            minutes: [null],
            am_pm: [null],
            time_zone: [null],
            tracking_url: [],
            BusinessLocation: [window.localStorage.getItem('location_id'), [Validators.required]]
        }
        );
    }

    get fShippingTypeForm() {
        return this.shippingTypeForm.controls;
    }

    shipTypeLoader = false
    shipTypeErrorMessage = ''
    shipTypeCreateFun() {
        this.shippingTypeForm.controls['icon'].setValue(this.shipTypeIcon)
        this.shippingTypeForm.controls['am_pm'].setValue(this.changeTimeAmPm)
        // if (this.changeHour != '00') {
            this.shippingTypeForm.controls['hours'].setValue(this.changeHour)
        // }
        this.shippingTypeForm.controls['minutes'].setValue(this.changeMinute)
        if (this.shippingTypeForm.invalid) {
            this.shipTypeSubmitted = true
            return;
        } else {
            let shipTypeFormData = JSON.parse(JSON.stringify(this.shippingTypeForm.value))
            shipTypeFormData['shipment_price'] = parseFloat(shipTypeFormData['shipment_price'])
            shipTypeFormData['threshold'] = Number(shipTypeFormData['threshold'])
            shipTypeFormData['supplierId'] = this.isObjectEmpty(this.supplierRestockSelected) ? null : this.supplierRestockSelected['_id']
            if(this.isObjectEmpty(shipTypeFormData['supplierId'])){
                shipTypeFormData['supplierId']=this.currentSupplier['_id']
            }
            if (this.update == "Update") {
                this.updateShippingTypeFun(shipTypeFormData)
                return
            }
            this.shipTypeLoader = true
            this.createShippingType.mutate({
                input: shipTypeFormData
            }).subscribe(
                (res) => {
                    this.shipTypeLoader = false
                    this.shipTypeSubmitted = false
                    this.modalService.hide(1)
                    this.initializeShipTypForm()
                    this.getAllShippingTypeFun()
                    this.getSupllierShippingType()
                    console.log('createShippingType res', res['data'].createShippingType);
                    let returnVal = res['data'].createShippingType
                    this.changeHour = '00'
                    this.changeMinute = '00'
                    if (returnVal) {
                        // this.toaster.showSuccess('Shipping type add successfully', 'Shipping Type')
                        // this.showToaster = false
                        // this.toasterMsg = 'Shipping type added successfully'
                        // this.toasterType = 'success'
                    } else {
                        // this.toaster.showError('Something Went Wrong.', 'Try Again')
                        this.showToaster = false
                        this.toasterMsg = 'Something went wrong, Please try again.'
                        this.toasterType = 'error'
                    }
                }, (err) => {
                    this.shipTypeLoader = false
                    this.shipTypeSubmitted = false
                    console.log('cashRegister err', err);
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                    this.shipTypeErrorMessage = err.graphQLErrors[0].message

                })
        }
    }

    closeShipTypeModel() {
        this.shipTypeSubmitted = false
        this.modalService.hide(1);
        this.initializeShipTypForm()
    }

    update = "Add"
    model_addShipType(template: TemplateRef<any>, cls) {
        this.initializeShipTypForm()
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    model_addSupplierShipType(template: TemplateRef<any>, cls) {
        this.supplierRestockSelected={}
        this.initializeShipTypForm()
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    model_UpdateShipType(template: TemplateRef<any>, cls, shipType) {
        this.update = "Update"
        this.initializeUpdateShipTypeForm(shipType)
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        this.selectRShipping = true
        this.selectRItems = false
    }

    model_UpdateSupplierShipType(template: TemplateRef<any>, cls, shipType) {
        this.update = "Update"
        this.supplierRestockSelected={}
        this.initializeUpdateShipTypeForm(shipType)
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    model_deleteSupplierShipType(template: TemplateRef<any>, cls, shipType) {
        this.selectedShipTypeId = shipType._id
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    model_deleteShipType(template: TemplateRef<any>, cls, shipType) {
        this.selectedShipTypeId = shipType._id
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        this.selectRShipping = true
        this.selectRItems = false
    }

    shipTypeErrorMessageFun() {
        this.shipTypeErrorMessage = ''
    }

    selectedShipTypeId = ''
    initializeUpdateShipTypeForm(shipType) {
        this.update = "Update"
        this.shipTypeIcon = shipType.icon
        this.shipTypeErrorMessage = ''
        this.selectedShipTypeId = shipType._id
        this.shipTypeSubmitted = false
        this.changeHour = shipType.hours
        this.changeMinute = shipType.minutes
        this.changeTimeAmPm = shipType.am_pm == undefined || shipType.am_pm == null ? 'AM' : shipType.am_pm
        this.selectedTimeZone = shipType.time_zone == undefined || shipType.time_zone == null ? 'Select time zone' : shipType.time_zone
        this.shippingTypeForm = this.formbulider.group({
            shipment_name: [shipType.shipment_name, [Validators.required]],
            shipment_price: [shipType.shipment_price],
            delivery_time_days: [shipType.delivery_time_days],
            threshold: [shipType.threshold],
            icon: [shipType.icon],
            hours: [shipType.hours],
            minutes: [shipType.minutes],
            am_pm: [shipType.am_pm],
            time_zone: [shipType.time_zone],
            tracking_url: [shipType.tracking_url],
            BusinessLocation: [window.localStorage.getItem('location_id'), [Validators.required]]
        }
        );
    }

    updateShippingTypeFun(shipTypeFormData) {
        this.shipTypeLoader = true
        this.updateShippingType.mutate({
            id: this.selectedShipTypeId,
            input: shipTypeFormData
        }).subscribe(
            (res) => {
                this.shipTypeLoader = false
                this.shipTypeSubmitted = false
                this.modalService.hide(1)
                this.initializeShipTypForm()
                console.log('updateShippingType res', res['data'].updateShippingType);
                let returnVal = res['data'].updateShippingType
                this.getAllShippingTypeFun()
                this.getSupllierShippingType()
                this.changeHour = '00'
                this.changeMinute = '00'
                if (returnVal) {
                    // this.toaster.showSuccess('Shipping Type Updated Successfully', '')
                    // this.showToaster = false
                    // this.toasterMsg = 'Shipping Type Updated Successfully'
                    // this.toasterType = 'success'
                } else {
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                }
            }, (err) => {
                this.shipTypeLoader = false
                this.shipTypeSubmitted = false
                this.shipTypeErrorMessage = err.graphQLErrors[0].message
                console.log('updateShippingType err', err);
                // this.toaster.showError('Something Went Wrong.', 'Try Again')
                this.showToaster = false
                this.toasterMsg = 'Something went wrong, Please try again.'
                this.toasterType = 'error'
            })
    }

    deleteShippingTypeFun() {
        this.modalService.hide(1)
        this.shipTypeLoader0 = true
        this.deleteShippingType.mutate({
            id: this.selectedShipTypeId
        }).subscribe(
            (res) => {
                this.shipTypeLoader0 = false
                console.log('deleteShippingType res', res['data'].deleteShippingType);
                let returnVal = res['data'].deleteShippingType
                if (returnVal) {
                    this.getAllShippingTypeFun()
                    // this.toaster.showSuccess('Shipping Type Delete Successfully', '')
                    this.showToaster = false
                    this.toasterMsg = 'Shipping Type Delete Successfully'
                    this.toasterType = 'success'
                } else {
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                }
            }, (err) => {
                this.shipTypeLoader0 = false
                let message = err.graphQLErrors[0].message
                // this.toaster.showError('Something Went Wrong.', 'Try Again')
                this.showToaster = false
                this.toasterMsg = 'Something went wrong, Please try again.'
                this.toasterType = 'error'
                console.log('deleteShippingType err', message);
            }
        )
    }

    shipTypeIcon = ''
    selectShipTypeIcon(value) {
        this.shipTypeIcon = value
    }

    shipTypeSelected = {}
    shipTypeSelectedFun(shipType) {
        // if(shipType['shipment_name'] != 'Other'){
        this.shipTypeSelected = shipType
        this.changeShipping = shipType.shipment_name
        this.selectedShipAmount = this.shipTypeSelected['shipment_price']
        this.sprGrandTotalFun()
        // } else{
        //     this.shipTypeSelected={}
        //     this.shipTypeSelected['shipment_name'] = 'Other'
        //     this.shipTypeSelected['shipment_price'] =Number(0)
        //     this.changeShipping = 'Other'
        //     this.selectedShipAmount =0
        // }
    }

    sprShipmentFeeChange(value) {
        if ((this.shipTypeSelected['shipment_price']) == Number(value)) {
            return
        }
        while (value.charAt(0) === '$') {
            value = value.substr(1);
        }
        let num = Number(value)
        if (Number.isNaN(num)) {
            num = 0
            this.shipTypeSelected['shipment_price'] = 0
            this.selectedShipAmount = 0
        }
        this.shipTypeSelected = {}
        this.shipTypeSelected['shipment_name'] = 'Other'
        this.shipTypeSelected['shipment_price'] = num
        this.selectedShipAmount = num
        this.changeShipping = 'Other'
        this.sprGrandTotalFun()
    }

    mbpSkip = 0;
    mbpLimit = 10000;
    mbpScrolling = false
    mbpScroll() {
        this.mbpScrolling = true
        this.mbpSkip = this.mbpSkip + 10
        this.getProductAndBundlebySupplierFun(true, "")
    }

    quantityInput(index) {
        this.productsRestock[index]['quantityInput'] = true
    }

    doneQuantityInput(index, val) {
        if (val == '') {
            this.productsRestock[index]['quantityInput'] = false
            return
        }
        let value = Number(val)
        if (value > this.productsRestock[index]['max_bundle']) {
            // this.toaster.showError('Value you enter grater then Max value.', 'Try other value')
            value = Number(this.productsRestock[index]['max_bundle'])
            //return
        }
        // this.productsRestock[index]['newQuantity'] = Number(this.productsRestock[index]['newQuantity']) + value
        this.productsRestock[index]['newQuantity'] = value
        this.productsRestock[index]['total'] = Number(this.productsRestock[index]['newQuantity']) * Number(this.productsRestock[index]['ProductStockPrice'][0]['default_sell_price'])
        this.productsRestock[index]['quantityInput'] = false
        this.calculateMbptotal()
    }

    quantityInputSpr(index, index2) {
        this.productsRestock[index]['Suppliers'][index2]['quantityInput'] = true
    }

    doneSprQuantityInput(index, index2, val) {
        if (val == '') {
            this.productsRestock[index]['Suppliers'][index2]['quantityInput'] = false
            return
        }
        let value = Number(val)
        // this.tempProductsRestockIndex = []
        // this.tempProductsRestockIndex.push(index)
        // this.tempProductsRestockIndex.push(index2)
        // if (this.productsRestock[index]['Suppliers'][index2]['alreadyOrder'] == true) {
        //     this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        //     return
        // },template: TemplateRef<any>, cls
        this.productsRestock[index]['Suppliers'][index2]['alreadyOrder'] == false
        this.productsRestock[index]['Suppliers'][index2]['ordered_qty'] = value
        this.productsRestock[index]['Suppliers'][index2]['supTotal'] = Number(this.productsRestock[index]['Suppliers'][index2]['ordered_qty']) * Number(this.productsRestock[index]['ProductStockPrice'][0]['default_sell_price'])
        this.productsRestock[index]['Suppliers'][index2]['quantityInput'] = false
        this.calculateProductRestocktotal()
    }

    mbpFilterType = 'All'
    productsRestock: any
    mbpLoader = false
    mbpGrandTotal = 0
    sprGrandTotal = 0
    sprSubTotal = 0
    sprNote = ''
    sprNoteOption = true
    sprOrderID = ''
    sprTax: number = 0
    productsRestockOrderDetail = {}
    restockSerachCheck = false
    getProductAndBundlebySupplierFun(isBundle, SupplierID) {
        this.mbpLoader = true
        this.supplierRestockLoader = true
        this.getProductAndBundlebySupplier.watch({
            input: {
                is_bundle_product: isBundle,
                locationId: window.localStorage.getItem('location_id'),
                search: this.mbpSearch.value == null ? "" : this.mbpSearch.value,
                supllierId: SupplierID,
                limit: this.mbpLimit,
                skip: this.mbpSkip,
                filterType: FilterType[this.mbpFilterType]
            }
        }).valueChanges.subscribe(
            (res) => {
                this.productsRestock = []
                this.restockSerachCheck = false
                this.mbpGrandTotal = 0
                this.mbpLoader = false
                let data = res['data'].getProductAndBundlebySupplier
                console.log('getProductAndBundlebySupplier', data);
                if (data != null) {
                    this.productsRestock = data.ProductList
                    if (this.isObjectEmpty(this.productsRestock)) {
                        this.supplierRestockLoader = false
                        this.showToaster = false
                        this.toasterMsg = 'This supplier does not have an SKU linked to a product'
                        this.toasterType = 'error'
                        return
                    }
                    this.supplierRestockLoader = false
                    if (isBundle) {
                        for (let i = 0; i < this.productsRestock.length; i++) {
                            this.productsRestock[i]['newQuantity'] = this.productsRestock[i]['ProductStockPrice'][0].bundle_order_qty
                            this.productsRestock[i]['total'] = 0
                            this.productsRestock[i]['quantityInput'] = false
                            this.productsRestock[i]['total'] = Number(this.productsRestock[i]['newQuantity']) * Number(this.productsRestock[i]['ProductStockPrice'][0]['default_sell_price'])

                        }
                        this.calculateMbptotal()
                    } else {
                        if (!this.selectRItems) {
                            this.selectRSupplier = false
                            this.selectRShipping = true
                        }
                        if (!this.isObjectEmpty(this.productsRestock)) {
                            for (let i = 0; i < this.productsRestock.length; i++) {
                                this.productsRestock[i]['quantity'] = 0
                                this.productsRestock[i]['total'] = 0
                                for (let j = 0; j < this.productsRestock[i]['Suppliers'].length; j++) {
                                    this.productsRestock[i]['Suppliers'][j]['supTotal'] = 0
                                    this.productsRestock[i]['Suppliers'][j]['quantityInput'] = false

                                    if (this.productsRestock[i]['Suppliers'][j]['incoming_item'] == 0) {
                                        this.productsRestock[i]['Suppliers'][j]['alreadyOrder'] = false
                                    } else {
                                        this.productsRestock[i]['Suppliers'][j]['alreadyOrder'] = true
                                    }

                                }
                            }
                            this.calculateProductRestocktotal()
                        }
                    }
                } else {
                    this.supplierRestockLoader = false
                    this.showToaster = false
                    this.toasterMsg = 'This supplier does not have an SKU linked to a product'
                    this.toasterType = 'error'
                }
                console.log('Product And Bundleby Supplier res', this.productsRestock);
            }, (err) => {
                this.supplierRestockLoader = false
                this.mbpLoader = false
                let message = err.graphQLErrors[0].message
                console.log(' err', message);
            }
        )
    }

    restockSerachCheckFun() {
        this.modalRef.hide();
        if (this.mbpClicked) {
            this.getProductAndBundlebySupplierFun(true, "")
        } else {
            this.getProductAndBundlebySupplierFun(false, this.supplierRestockSelected['_id'])
        }
    }

    productsRestockFilter(val) {
        this.mbpFilterType = val
        if (this.mbpClicked) {
            this.getProductAndBundlebySupplierFun(true, "")
        } else {
            this.getProductAndBundlebySupplierFun(false, this.supplierRestockSelected['_id'])
        }
    }

    alreadyOrderFun() {
        this.modalRef.hide()
        let temp: any
        this.productsRestock[this.tempProductsRestockIndex[0]]['Suppliers'][this.tempProductsRestockIndex[1]]['alreadyOrder'] = false
        this.productRestockPluse(this.tempProductsRestockIndex[0], this.tempProductsRestockIndex[1], temp, '')
    }

    tempProductsRestockIndex = []
    productRestockPluse(index, index2, template: TemplateRef<any>, cls) {
        this.restockSerachCheck = true
        this.tempProductsRestockIndex = []
        this.tempProductsRestockIndex.push(index)
        this.tempProductsRestockIndex.push(index2)
        if (this.productsRestock[index]['Suppliers'][index2]['alreadyOrder'] == true) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            return
        }
        this.productsRestock[index]['Suppliers'][index2]['ordered_qty'] = Number(this.productsRestock[index]['Suppliers'][index2]['ordered_qty']) + 1
        this.productsRestock[index]['Suppliers'][index2]['supTotal'] = Number(this.productsRestock[index]['Suppliers'][index2]['ordered_qty']) * Number(this.productsRestock[index]['Suppliers'][index2]['price_purchase'])
        this.calculateProductRestocktotal()
    }

    updateTotalUnitCostChange(index, index2) {
        this.productsRestock[index]['Suppliers'][index2]['supTotal'] = Number(this.productsRestock[index]['Suppliers'][index2]['ordered_qty']) * Number(this.productsRestock[index]['Suppliers'][index2]['price_purchase'])
        this.productsRestock[index]['sell_price_inc_tax'] = Number(this.productsRestock[index]['Suppliers'][index2]['price_purchase'])
        this.productsRestock[index]['ProductStockPrice'][0]['default_sell_price'] = Number(this.productsRestock[index]['Suppliers'][index2]['price_purchase'])
        this.productsRestock[index]['Suppliers'][index2]['price_purchase'] = Number(this.productsRestock[index]['Suppliers'][index2]['price_purchase'])
        this.calculateProductRestocktotal()
    }

    productRestockMiuns(index, index2) {
        if (this.productsRestock[index]['Suppliers'][index2]['ordered_qty'] == 0) {
            this.productsRestock[index]['Suppliers'][index2]['supTotal'] = 0
            return
        }

        this.productsRestock[index]['Suppliers'][index2]['ordered_qty'] = Number(this.productsRestock[index]['Suppliers'][index2]['ordered_qty']) - 1
        this.productsRestock[index]['Suppliers'][index2]['supTotal'] = Number(this.productsRestock[index]['Suppliers'][index2]['ordered_qty']) * Number(this.productsRestock[index]['Suppliers'][index2]['price_purchase'])
        this.calculateProductRestocktotal()
    }

    calculateProductRestocktotal() {
        if (this.isObjectEmpty(this.productsRestock)) {
            return
        }
        this.sprGrandTotal = 0
        this.sprSubTotal = 0
        for (let i = 0; i < this.productsRestock.length; i++) {
            this.productsRestock[i]['quantity'] = 0
            this.productsRestock[i]['total'] = 0
            for (let j = 0; j < this.productsRestock[i]['Suppliers'].length; j++) {
                this.productsRestock[i]['quantity'] = Number(this.productsRestock[i]['quantity']) + Number(this.productsRestock[i]['Suppliers'][j]['ordered_qty'])
                this.productsRestock[i]['total'] = Number(this.productsRestock[i]['total']) + Number(this.productsRestock[i]['Suppliers'][j]['supTotal'])
            }
            this.sprSubTotal = Number(this.sprSubTotal) + Number(this.productsRestock[i]['total'])
        }
        this.sprTaxCalculation(this.selectedTaxforRestock)
        this.sprDiscountFun()
        this.sprGrandTotalFun()

    }

    recalculatePurchaseTax() {
        if (!this.isObjectEmpty(this.selectedTaxforRestock)) {
            this.sprTax = 0
            let taxa: number = 0
            this.percentage = Number(this.selectedTaxforRestock['amount'])
            if (this.selectedTaxforRestock['is_percentage']) {
                taxa = (this.sprGrandTotal * this.percentage) / 100
                this.sprTaxValue = this.percentage
                this.changeTax = this.selectedTaxforRestock['name'] + ':(' + this.percentage + '%' + ')'
            } else {
                taxa = this.percentage
                this.changeTax = this.selectedTaxforRestock['name'] + ':(' + '$' + this.percentage + ')'
                this.sprTaxValue = this.percentage
            }
            this.sprTax = taxa
        }
        else {
            this.changeTax = 'None'
            this.sprTax = 0
        }
        this.sprGrandTotal = Number(this.sprGrandTotal) + Number(this.sprTax)
    }

    selectedShipAmount
    sprGrandTotalFun() {
        let shipThreshold = this.shipTypeSelected['threshold'] == undefined || this.shipTypeSelected['threshold'] == null ? 100000000 : Number(this.shipTypeSelected['threshold'])
        if (Number(this.sprSubTotal) >= shipThreshold) {
            this.selectedShipAmount = 0
        } else {
            this.selectedShipAmount = this.shipTypeSelected['shipment_price'] == NaN || this.shipTypeSelected['shipment_price'] == null ? 0 : Number(this.shipTypeSelected['shipment_price'])
        }
        this.sprGrandTotal = Number(this.sprSubTotal) + this.selectedShipAmount
        this.sprGrandTotal = this.sprGrandTotal - this.sprDiscountAmount
        this.recalculatePurchaseTax()
        if (this.directPay) {
            this.sprGrandTotal = this.totalAmount
            // this.directPay = false
        }
    }

    changeSprDiscountVal(value) {
        if (value == '$') {
            this.changestoreCredit = true
            this.nostoreCreditSett = false
            this.sprDiscountType = '$'
        } else {
            this.changestoreCredit = false
            this.nostoreCreditSett = true
            this.sprDiscountType = '%'
        }
        this.sprDiscountFun()
    }

    sprDiscountValue = 0
    sprDiscountAmount = 0
    sprDiscountType = '%'

    sprDiscountFun() {
        if (this.sprDiscountType == '%') {
            if (this.sprDiscountValue > 100) {
                this.sprDiscountValue = 100
            }
            let amount = (this.sprSubTotal * this.sprDiscountValue) / 100

            if (amount > this.sprSubTotal) {
                this.sprDiscountAmount = this.sprSubTotal
                this.sprDiscountValue = this.sprSubTotal

            } else {
                this.sprDiscountAmount = Number(amount)
            }
        } else {
            if (this.sprDiscountValue > this.sprSubTotal) {
                this.sprDiscountAmount = this.sprSubTotal
                this.sprDiscountValue = this.sprSubTotal
            } else {
                this.sprDiscountAmount = Number(this.sprDiscountValue)
            }
        }
        this.sprGrandTotalFun()
    }

    sprTaxChecked = false
    sprTaxValue: number = 0
    selectedTaxforRestock = {}
    sprTaxCalculation(tax) {
        if (tax != 'None') {
            if (!this.isObjectEmpty(tax)) {
                this.selectedTaxforRestock = tax
                this.changeTax = tax.name
                this.sprTax = 0
                let taxa: number = 0
                this.percentage = Number(tax['amount'])
                if (tax['is_percentage'] == true) {
                    taxa = (this.sprGrandTotal * this.percentage) / 100
                    this.sprTaxValue = this.percentage
                    this.changeTax = tax.name + ':(' + this.percentage + '%' + ')'
                } else {
                    taxa = this.percentage
                    this.changeTax = tax.name + ':(' + '$' + this.percentage + ')'
                    this.sprTaxValue = this.percentage
                }
                this.sprTax = taxa
                this.sprGrandTotalFun()
            }
        } else {
            this.selectedTaxforRestock = null
            this.changeTax = 'None'
            this.sprTax = 0
            this.sprGrandTotalFun()
        }
    }

    mbpPluse(index) {
        if (this.productsRestock[index]['newQuantity'] == this.productsRestock[index]['max_bundle']) {
            return
        }
        this.restockSerachCheck = true
        this.productsRestock[index]['newQuantity'] = Number(this.productsRestock[index]['newQuantity']) + Number(1)
        this.productsRestock[index]['total'] = Number(this.productsRestock[index]['newQuantity']) * Number(this.productsRestock[index]['ProductStockPrice'][0]['default_sell_price'])
        this.calculateMbptotal()
    }

    mbpMiuns(index) {
        if (this.productsRestock[index]['newQuantity'] == 0) {
            this.productsRestock[index]['total'] = 0
            return
        }
        this.productsRestock[index]['newQuantity'] = Number(this.productsRestock[index]['newQuantity']) - Number(1)
        this.productsRestock[index]['total'] = Number(this.productsRestock[index]['newQuantity']) * Number(this.productsRestock[index]['ProductStockPrice'][0]['default_sell_price'])

        this.calculateMbptotal()
    }

    calculateMbptotal() {
        if (this.isObjectEmpty(this.productsRestock)) {
            return
        }
        this.mbpGrandTotal = 0;
        for (let i = 0; i < this.productsRestock.length; i++) {
            this.mbpGrandTotal = Number(this.mbpGrandTotal) + Number(this.productsRestock[i]['total'])
        }
    }

    saveMbpInCart(create) {
        this.mbpLoader = true
        let mbpData = []
        for (let i = 0; i < this.productsRestock.length; i++) {
            let mainObj = {}
            mainObj['product_id'] = this.productsRestock[i]._id
            mainObj['in_stock'] = parseFloat(this.productsRestock[i]['ProductStockPrice'][0].qty_available.toString())
            mainObj['unit_cost'] = parseFloat(this.productsRestock[i]['ProductStockPrice'][0].default_sell_price.toString())
            mainObj['order_qty'] = this.productsRestock[i].newQuantity
            mainObj['total'] = parseFloat(this.productsRestock[i].total.toString())
            mbpData.push(mainObj)
        }
        if (!create) {
            this.saveManufacturedBundle.mutate({
                input: mbpData
            }).subscribe(
                (res) => {
                    this.mbpLoader = false
                    let returnVal = res['data'].saveManufacturedBundle
                    if (returnVal) {
                        this.getAllProducts()
                        this.loadSection('P')
                        this.selectRItems = false
                        this.selectRSupplier = true
                        // this.toaster.showSuccess('Save order in cart successfully', 'Order Save')
                        this.showToaster = false
                        this.toasterMsg = 'Save order in cart successfully'
                        this.toasterType = 'success'
                    } else {
                        // this.toaster.showError('Something Went Wrong.', 'Try Again')
                        this.showToaster = false
                        this.toasterMsg = 'msg'
                        this.toasterType = 'Something Went Wrong'
                    }
                }, (err) => {
                    this.mbpLoader = false
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                    console.log('create spr order error', err);
                }
            )
        } else {
            this.createManufacturedBundle.mutate({
                input: mbpData
            }).subscribe(
                (res) => {
                    this.mbpLoader = false
                    let returnVal = res['data'].createManufacturedBundle
                    if (returnVal) {
                        this.getAllProducts()
                        this.loadSection('P')
                        this.selectRItems = false
                        this.selectRSupplier = true
                        // this.toaster.showSuccess('Create order in cart successfully', 'Create Order')
                        this.showToaster = false
                        this.toasterMsg = 'Create order in cart successfully'
                        this.toasterType = 'success'
                    } else {
                        // this.toaster.showError('Something Went Wrong.', 'Try Again')
                        this.showToaster = false
                        this.toasterMsg = 'Something went wrong, Please try again.'
                        this.toasterType = 'error'
                    }
                }, (err) => {
                    this.mbpLoader = false
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                    console.log('create spr order error', err);
                }
            )
        }
    }

    openModalFinishLater(template: TemplateRef<any>, cls) {
        if (this.isObjectEmpty(this.productsRestock)) {
            this.productsRestock = this.restockProducts
            this.showToaster = false
            this.toasterMsg = 'Please Select Any Quantity First'
            this.toasterType = 'error'
            return
        }
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });

    }

    sprRef = ''
    discountOnOrder = 0
    restockProducts: any
    sprDateError = false
    sprPurchaseHourError = false
    saveSprInCart(bool, notesCheck) {
        let tempArray: any
        if (bool == true) {
            this.restockProducts = []
            for (let i = 0; i < this.productsRestock.length; i++) {
                if (this.productsRestock[i].total != 0) {
                    this.restockProducts.push(this.productsRestock[i]);
                }
            }
            tempArray = this.productsRestock
            this.productsRestock = this.restockProducts
            this.restockProducts = tempArray
        }
        if (this.isObjectEmpty(this.productsRestock)) {
            this.productsRestock = this.restockProducts
            // this.toaster.showError('Please Select Any Quantity First', 'Select Quantity')
            this.showToaster = false
            this.toasterMsg = 'Please Select Any Quantity First'
            this.toasterType = 'error'
            return
        }
        if (this.sprTDate == null || this.sprTDate == "") {
            this.sprDateError = true
            if (this.changeHour == '00') {
                this.sprPurchaseHourError = true
            }
            return
        }
        if (this.changeHour == '00') {
            this.sprPurchaseHourError = true
            return
        }

        this.orderStatusToSave = bool ? AllowedOrdertStatus.Draft : AllowedOrdertStatus.Ordered
        this.orderTransactionStatus = bool ? AllowedTransactionStatus.Draft : AllowedTransactionStatus.Order
        if (this.sprOrderID != '') {
            this.updatePOOrder()
            if (!notesCheck) {
                this.disgardproductsRestock()
            }
            if (notesCheck) {
                this.productsRestock = tempArray
                this.getpurchaseOrders()
            }
            // this.toaster.showSuccess('Create order in cart successfully', 'Order Save')
            this.showToaster = false
            this.toasterMsg = 'Create order in cart successfully'
            this.toasterType = 'success'
            return
        }
        if (!notesCheck) { this.mbpLoader = true }
        this.productsRestockOrderDetail = {}
        this.prepareSprData()
        this.SprPrepareTaxData()
        console.log('save order details are', this.productsRestockOrderDetail);
        let fOrder: CreatePurchaseOrderInput = JSON.parse(JSON.stringify(this.productsRestockOrderDetail))
        this.createPurchaseOrder.mutate({
            input: fOrder
        }).subscribe(
            (res) => {
                this.mbpLoader = false
                this.supplierRestockSelected = res['data'].createPurchaseOrder.Supplier
                this.sprOrderID = res['data'].createPurchaseOrder._id
                this.sprRef = res['data'].createPurchaseOrder.transaction_keeping_unit
                this.curentOrder = res['data'].createPurchaseOrder
                if (bool) {
                    if (!notesCheck) {
                        this.disgardproductsRestock()
                    }
                    if (notesCheck) {
                        this.getpurchaseOrders()
                        this.productsRestock = tempArray
                    }
                    // this.toaster.showSuccess('Save order in cart successfully', 'Order Save')
                    this.sprNote = ''
                    this.sprDiscountValue = 0
                    this.changeTax = 'None'
                    this.selectedTaxforRestock = {}
                    this.showToaster = false
                    this.toasterMsg = 'Order saved successfully'
                    this.toasterType = 'success'
                }
            }, (err) => {
                this.mbpLoader = false
                // this.toaster.showError('Something Went Wrong.', 'Try Again')
                this.showToaster = false
                this.toasterMsg = 'Something went wrong, Please try again.'
                this.toasterType = 'error'
                console.log('create spr order error', err);
            }
        )
    }

    //second case Order ,draft
    orderStatusToSave = AllowedOrdertStatus.Draft
    orderTransactionStatus = AllowedTransactionStatus.Draft
    sprADate: any
    sprTDate: any
    todayDate = new Date();

    sprDateErrorFun() {
        this.sprDateError = false
    }

    sprPurchaseHourErrorFun() {
        this.sprPurchaseHourError = false
    }

    plusDate() {
        let days = 0
        if (!this.isObjectEmpty(this.shipTypeSelected)) {
            days = Number(this.shipTypeSelected['delivery_time_days'])
        }
        let date = new Date(this.sprTDate);
        date.setDate(date.getDate() + days);
        this.sprADate = date
    }

    prepareSprData() {
        let zero = '0'
        let currentDate: number = Date.now();
        this.discountOnOrder = parseFloat(this.sprDiscountAmount.toString())
        this.productsRestockOrderDetail['transaction_status'] = this.orderTransactionStatus
        this.productsRestockOrderDetail['transaction_type'] = AllowedTransactionType.Purchase
        this.productsRestockOrderDetail['order_status'] = this.orderStatusToSave
        this.productsRestockOrderDetail['transaction_date'] = this.sprTDate == null ? "" : this.sprTDate
        this.productsRestockOrderDetail['arrival_Date'] = this.sprADate == null ? "" : this.sprADate
        this.productsRestockOrderDetail['transaction_hours'] = String(this.changeHour)
        this.productsRestockOrderDetail['transaction_minutes'] = String(this.changeMinute)
        this.productsRestockOrderDetail['transaction_am_pm'] = this.changeTimeAmPm
        this.productsRestockOrderDetail['discount_amount'] = Number(this.sprDiscountAmount.toString())
        this.productsRestockOrderDetail['discount_value'] = Number(this.sprDiscountValue.toString())
        this.productsRestockOrderDetail['is_discount_percentage'] = this.sprDiscountType == '%' ? true : false
        this.productsRestockOrderDetail['total_amount'] = parseFloat(this.sprGrandTotal.toFixed(2))
        this.sprGrandTotal = parseFloat(this.sprGrandTotal.toFixed(2))
        this.productsRestockOrderDetail['sub_total_amount'] = parseFloat(this.sprSubTotal.toFixed(2))
        this.productsRestockOrderDetail['shipping_amount'] = parseFloat(this.selectedShipAmount.toString())
        this.productsRestockOrderDetail['BusinessLocation'] = window.localStorage.getItem('location_id')
        this.productsRestockOrderDetail['TransactionPurchaseLines'] = this.SprTransactionPurchaseLines()
        this.productsRestockOrderDetail['Supplier'] = this.supplierRestockSelected == null ? null : this.supplierRestockSelected['_id']
        this.productsRestockOrderDetail['ShippingType'] = this.shipTypeSelected['_id'] == undefined ||
            this.shipTypeSelected['_id'] == null ? null : this.shipTypeSelected['_id']
        this.productsRestockOrderDetail['is_private'] = this.sprNoteOption
        this.productsRestockOrderDetail['additional_notes'] = this.sprNote
    }

    SprTransactionPurchaseLines() {
        let arr = []
        let zero = '0'
        console.log('products', this.productsRestock);

        for (let i = 0; i < this.productsRestock.length; i++) {
            let mainObj = {}
            mainObj['Product'] = this.productsRestock[i]._id
            mainObj['skuProductDetail'] = []
            for (let j = 0; j < this.productsRestock[i]['Suppliers'].length; j++) {
                if (this.productsRestock[i]['Suppliers'][j]['ordered_qty'] == 0) {
                    continue
                }
                let obj = {}
                obj['sku_numbner'] = this.productsRestock[i]['Suppliers'][j].sku_number
                obj['quantity'] = this.productsRestock[i]['Suppliers'][j].ordered_qty
                obj['in_stock'] = 0
                obj['product_cost_price'] = parseFloat(this.productsRestock[i]['Suppliers'][j]['price_purchase'].toString())
                obj['sub_total'] = parseFloat(this.productsRestock[i]['Suppliers'][j].supTotal.toString())
                // obj['Tax']=''
                obj['tax_amount'] = parseFloat(zero.toString())
                obj['tax_value'] = parseFloat(zero.toString())
                obj['is_tax_percentage'] = true
                obj['is_discount_percentage'] = true
                obj['discount_amount'] = parseFloat(zero.toString())
                obj['discount_value'] = parseFloat(zero.toString())
                obj['total_amount'] = parseFloat(this.productsRestock[i]['Suppliers'][j].supTotal.toString())
                mainObj['skuProductDetail'].push(obj)
            }
            arr.push(mainObj)
        }
        console.log('finally items are--->', arr);
        return arr
    }

    SprPrepareTaxData() {
        if (!this.isObjectEmpty(this.selectedTaxforRestock)) {
            this.productsRestockOrderDetail['Tax'] = this.selectedTaxforRestock['_id']
            let taxType
            if (this.selectedTaxforRestock['is_percentage'] == true) {
                this.productsRestockOrderDetail['is_tax_percentage'] = true
                taxType = '%'
            } else {
                this.productsRestockOrderDetail['is_tax_percentage'] = false
                taxType = '$'
            }
            // this.productsRestockOrderDetail['tax_type'] = taxType
            this.productsRestockOrderDetail['tax_amount'] = parseFloat(this.sprTax.toString())
            this.productsRestockOrderDetail['tax_value'] = parseFloat(this.sprTaxValue.toString())
        } else {
            let zero = 0
            this.productsRestockOrderDetail['Tax'] = null
            this.productsRestockOrderDetail['is_tax_percentage'] = true
            this.productsRestockOrderDetail['tax_amount'] = parseFloat(zero.toString())
            this.productsRestockOrderDetail['tax_value'] = parseFloat(zero.toString())
        }
    }

    curentOrder = {}
    updatePOOrder() {
        this.productsRestockOrderDetail = {}
        this.prepareSprData()
        this.SprPrepareTaxData()
        console.log('save order details are', this.productsRestockOrderDetail);
        let fOrder: CreatePurchaseOrderInput = JSON.parse(JSON.stringify(this.productsRestockOrderDetail))
        this.createPurchaseOrder.mutate({
            input: fOrder,
            transactionId: this.sprOrderID
        }).subscribe(
            (res) => {
                this.mbpLoader = false
                this.supplierRestockSelected = res['data'].createPurchaseOrder.Supplier
                this.curentOrder = res['data'].createPurchaseOrder
                this.sprOrderID = res['data'].createPurchaseOrder._id
                this.sprRef = res['data'].createPurchaseOrder.transaction_keeping_unit
            }, (err) => {
                // this.toaster.showError('Something Went Wrong.', 'Try Again')
                this.showToaster = false
                this.toasterMsg = 'Something went wrong, Please try again.'
                this.toasterType = 'error'
                console.log('update spr order error', err);
            }
        )
    }

    disgardproductsRestock() {
        if (this.directPay) {
            this.checkOutsection = false
            this.stocksection = true
            // this.cancel('poStatus', 'existingPO')
            this.extraItems = []
            if (this.directPayType == 'addCost') {
                this.purchaseOrderDetail(this.orderDetail)
                this.directPay = false
                this.directPayType = ''
                return
            }
            this.directPayType = ''
            this.poFlowByCheckout(this.orderDetail)
            this.directPay = false
            return
        }
        this.getpurchaseOrders()
        this.selectRItems = false
        this.selectRType = true
        this.selectRSupplier = false
        this.mbpFilterType = 'All'
        this.shipTypeSelected = {}
        this.supplierRestockSelected = {}
        this.mbpLoader = false
        this.mbpGrandTotal = 0
        this.sprGrandTotal = 0
        this.sprSubTotal = 0
        this.sprNote = ''
        this.sprRef = ''
        this.sprOrderID = ''
        this.sprTax = 0
        this.changeTax = 'None'
        this.orderText = 'Orders'
        this.selectedTaxforRestock = {}
        this.sprTaxValue = 0
        this.sprNoteOption = true
        this.stocksection = true
        this.existingPO = true
        this.poStatus = false
        this.poDetails = false
        this.checkOutsection = false
        this.restockProducts = []
        this.selectedShipAmount = 0
        this.sprADate = ''
        this.sprTDate = ''
        this.sprDiscountValue = 0
        this.sprDiscountAmount = 0
        this.sprDiscountType = '%'
        this.changeTimeAmPm = 'AM'
        this.changeHour = '00'
        this.changeMinute = '00'
        this.selectOrderProcess = ''
    }

    proceesToPayment() {
        this.getAllCashRegisterarOfLocation()
        this.getAllCreditLines()
        this.restockProducts = []
        for (let i = 0; i < this.productsRestock.length; i++) {
            if (this.productsRestock[i].total != 0) {
                this.restockProducts.push(this.productsRestock[i]);
            }
        }
        this.paymentDate = this.sprTDate;
        let tempArray = this.productsRestock
        this.productsRestock = this.restockProducts
        console.log('product', this.productsRestock);
        this.restockProducts = tempArray
        if (this.isObjectEmpty(this.productsRestock)) {
            this.productsRestock = this.restockProducts
            // this.toaster.showError('Please Select Any Quantity First', 'Select Quantity')
            this.showToaster = false
            this.toasterMsg = 'Please Select Any Quantity First'
            this.toasterType = 'error'
            return
        }
        if (this.sprTDate == null || this.sprTDate == "") {
            this.sprDateError = true
            if (this.changeHour == '00') {
                this.sprPurchaseHourError = true
            }
            return
        }
        if (this.changeHour == '00') {
            this.sprPurchaseHourError = true
            return
        }
        if (this.sprOrderID == '') {
            this.saveSprInCart(false, false)
        }
        else {
            this.orderStatusToSave = AllowedOrdertStatus.Ordered
            this.orderTransactionStatus = AllowedTransactionStatus.Order
            this.updatePOOrder()
        }
        this.selectRItems = false
        this.stocksection = false
        this.checkOutsection = true
    }

    cashRegisterars = []
    getAllCashRegisterarOfLocation() {
        this.cashRegistersOfLocationGQL.watch({
            ID: localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                this.cashRegisterars = res['data'].cashRegistersOfLocation
                console.log('cash registerars', res['data'].cashRegistersOfLocation);
            }, (err) => {
                console.log('err while loading cash registerar', err);
            }
        )
    }

    creditLines = []
    getAllCreditLines() {
        this.getCreditLineGQL.watch().valueChanges.subscribe(
            (res) => {
                this.creditLines = res['data'].getCreditLine
                console.log('credit line', res['data'].getCreditLine);
            }, (err) => {
                console.log('error while loading credit lines', err);
            }
        )
    }

    isMethodAllowed(method) {
        if (this.supplierRestockSelected['payment_settings'] != null) {
            let methodAllowed = false
            for (let i = 0; i < this.supplierRestockSelected['payment_settings'].length; i++) {
                if (this.supplierRestockSelected['payment_settings'][i]['paymentType']['name'] == method && this.supplierRestockSelected['payment_settings'][i].isActive) {
                    methodAllowed = true
                }
            }
            return methodAllowed
        }
    }

    cashReg = ''
    cashRegId = ''
    selectCashRegisterar(reg) {
        this.changeCashDrawer = reg.name
        this.cashRegId = reg._id
        this.cashReg = reg
    }

    checkRealizedDate(date) {
        console.log('reaized...............');
        this.paymentDate = date
        // var d1 = new Date(this.sprTDate);
        var d1 = new Date();
        var d2 = new Date(this.paymentDate);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        console.log('d1 is ', d1);
        console.log('d2 is ', d2);

        if (d1 < d2) {
            this.showToaster = false
            this.toasterMsg = 'Realized date cannot be the future date'
            this.toasterType = 'error'
            this.paymentDate = ''
        }
    }

    totalPaymentPayed = []
    paymentDate = ''
    creditLineName = 'Please select any credit line'
    creditLineID = ''
    paymentProcessing = false
    pay(template: TemplateRef<any>, cls) {
        this.paymentProcessing = true
        this.priorPayment = this.priorPayment - Number(this.tempVal)
        this.tempVal = 0
        if (this.boxCash) {
            console.log('supplier is', this.supplierRestockSelected);
            this.payBycash(template, cls)
        }
        else if (this.boxCredit) {
            this.payByCreditCard(template, cls)
        }
        else if (this.boxCheck) {
            this.payByChecque(template, cls)
        }
        else if (this.boxPaypal) {
            this.payByPaypal(template, cls)
        }
        else if (this.boxPayinvoice) {
            this.payByPaypalInvoice(template, cls)
        }
        else if (this.boxNetterm) {
            this.paypaNetTerm(template, cls)
        }
        else if (this.boxStorecredit) {
            this.paypaStoreCredit(template, cls)
        }
    }

    changeCreditLine(credit) {
        this.creditLineName = credit.credit_line
        this.creditLineID = credit._id
    }

    tempVal = 0
    tempField = ''
    changeBalanceOnFicusout(val) {
        return
        this.priorPayment = this.priorPayment - Number(this.tempVal)
        this.tempVal = Number(this[val])
        this.tempField = val
        this.priorPayment = this.priorPayment + Number(this.tempVal)
    }

    revertBalance() {
        this[this.tempField] = ''
        this.priorPayment = this.priorPayment - Number(this.tempVal)
        this.tempVal = 0
    }

    priorPayment = 0
    amountInCash = ''
    payBycash(template: TemplateRef<any>, cls) {
        if (this.amountInCash == '' || Number(this.amountInCash) <= 0 || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.isObjectEmpty(this.cashReg)) {
            // this.toaster.showError('Please select cash registerar first', '')
            this.showToaster = false
            this.toasterMsg = 'Please select cash registerar first'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (Number(this.cashReg['closing_amount']) < Number(this.amountInCash)) {
            this.showToaster = false
            this.toasterMsg = 'Not enough amount in drawer'
            this.toasterType = 'error'
            // this.toaster.showError('Not enough amount in drawer', '')
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInCash) < 0) {
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'warning'
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['cashRegisterId'] = this.cashReg['_id']
        obj['amount'] = Number(this.amountInCash)
        obj['paid_on'] = this.paymentDate
        obj['method'] = AllowedPurchaseOrderPaymentMethod.Cash
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInCash)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.sprGrandTotal = 0
                    this.paymentProcessing = false
                    this.paymentDate = ''
                    // this.directPayType = ''
                    this.totalPaymentPayed = []
                    this.amountInCash = ''
                    this.getAllProducts()
                    return
                }
                // this.directPayType = ''
                this.paymentProcessing = false
                this.paymentDate = ''
                this.amountInCash = ''
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while paying', err);
                this.paymentProcessing = false
                // this.toaster.showInfo('Amount entered is greater than balance', '')
                this.showToaster = false
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'warning'
            }
        )
    }

    amountInCreditCard = ''
    creditCardNo = ''
    payByCreditCard(template: TemplateRef<any>, cls) {
        if (this.amountInCreditCard == '' || Number(this.amountInCreditCard) <= 0 || this.creditCardNo == '' || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInCreditCard) < 0) {
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'warning'
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['amount'] = Number(this.amountInCreditCard)
        obj['method'] = AllowedPurchaseOrderPaymentMethod.CreditCard
        obj['paid_on'] = this.paymentDate
        obj['card_number'] = this.creditCardNo
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInCreditCard)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.sprGrandTotal = 0
                    this.totalPaymentPayed = []
                    this.paymentDate = ''
                    this.amountInCreditCard = ''
                    // this.directPayType = ''
                    this.creditCardNo = ''
                    this.paymentProcessing = false
                    this.getAllProducts()
                    return
                }
                this.amountInCreditCard = ''
                // this.directPayType = ''
                this.paymentDate = ''
                this.paymentProcessing = false
                this.creditCardNo = ''
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                this.paymentProcessing = false
                console.log('err while paying', err);
                this.showToaster = false
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'error'
            }
        )
    }

    amountInchecque = ''
    bankAccNo = ''
    checkqueNo = ''
    payByChecque(template: TemplateRef<any>, cls) {
        if (this.amountInchecque == '' || Number(this.amountInchecque) <= 0 || this.checkqueNo == '' || this.bankAccNo == '' || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInchecque) < 0) {
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'warning'
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['amount'] = Number(this.amountInchecque)
        obj['cheque_number'] = this.checkqueNo
        obj['paid_on'] = this.paymentDate
        obj['method'] = AllowedPurchaseOrderPaymentMethod.Cheque
        obj['bank_account_number'] = this.bankAccNo
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInchecque)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.sprGrandTotal = 0
                    this.paymentDate = ''
                    // this.directPayType = ''
                    this.totalPaymentPayed = []
                    this.amountInchecque = ''
                    this.paymentProcessing = false
                    this.bankAccNo = ''
                    this.checkqueNo = ''
                    this.getAllProducts()
                    return
                }
                this.amountInchecque = ''
                // this.directPayType = ''
                this.paymentDate = ''
                this.bankAccNo = ''
                this.paymentProcessing = false
                this.checkqueNo = ''
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while paying', err);
                this.paymentProcessing = false
                this.showToaster = false
                this.bankAccNo = ''
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'error'
            }
        )
    }

    amountInPaypalTransaction = ''
    paypalTransactionID = ''
    paypalAccount = ''
    payByPaypal(template: TemplateRef<any>, cls) {
        if (this.amountInPaypalTransaction == '' || Number(this.amountInPaypalTransaction) <= 0 || this.paypalTransactionID == '' || this.paypalAccount == '' || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInPaypalTransaction) < 0) {
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'warning'
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['amount'] = Number(this.amountInPaypalTransaction)
        obj['paypal_transaction_id'] = this.paypalTransactionID
        obj['paid_on'] = this.paymentDate
        obj['paypal_account'] = this.paypalAccount
        obj['method'] = AllowedPurchaseOrderPaymentMethod.Paypal
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInPaypalTransaction)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.sprGrandTotal = 0
                    this.totalPaymentPayed = []
                    // this.directPayType = ''
                    this.paymentDate = ''
                    this.paymentProcessing = false
                    this.amountInPaypalTransaction = ''
                    this.paypalTransactionID = ''
                    this.paypalAccount = ''
                    this.getAllProducts()
                    return
                }
                this.paypalAccount = ''
                this.paymentProcessing = false
                this.paymentDate = ''
                // this.directPayType = ''
                this.amountInPaypalTransaction = ''
                this.paypalTransactionID = ''
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while paying', err);
                this.paymentProcessing = false
                this.showToaster = false
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'error'
            }
        )
    }

    amountInPaypalInvoice = ''
    paypalInvoiceNo = ''
    payByPaypalInvoice(template: TemplateRef<any>, cls) {
        if (this.amountInPaypalInvoice == '' || Number(this.amountInPaypalInvoice) <= 0 || this.paypalInvoiceNo == '' || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInPaypalInvoice) < 0) {
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'warning'
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['amount'] = Number(this.amountInPaypalInvoice)
        obj['invoice_number'] = this.paypalInvoiceNo
        obj['paid_on'] = this.paymentDate
        obj['method'] = AllowedPurchaseOrderPaymentMethod.PaypalInvoice
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInPaypalInvoice)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.sprGrandTotal = 0
                    this.totalPaymentPayed = []
                    this.paymentProcessing = false
                    // this.directPayType = ''
                    this.paymentDate = ''
                    this.amountInPaypalInvoice = ''
                    this.paypalInvoiceNo = ''
                    this.getAllProducts()
                    return
                }
                this.paymentDate = ''
                this.amountInPaypalInvoice = ''
                // this.directPayType = ''
                this.paypalInvoiceNo = ''
                this.paymentProcessing = false
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while paying', err);
                this.paymentProcessing = false
                this.showToaster = false
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'error'
            }
        )
    }

    amountInNetTerm = ''
    paypaNetTerm(template: TemplateRef<any>, cls) {
        if (Number(this.amountInNetTerm) <= 0 || this.creditLineID == '' || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInNetTerm) < 0) {
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['amount'] = Number(this.amountInNetTerm)
        obj['method'] = AllowedPurchaseOrderPaymentMethod.NetTerm
        obj['creditLineId'] = this.creditLineID
        obj['paid_on'] = this.paymentDate
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInNetTerm)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.paymentProcessing = false
                    this.sprGrandTotal = 0
                    this.totalPaymentPayed = []
                    // this.directPayType = ''
                    this.amountInNetTerm = ''
                    this.creditLineName = ''
                    this.creditLineID = ''
                    this.paymentDate = ''
                    this.getAllProducts()
                    return
                }
                this.amountInNetTerm = ''
                this.creditLineName = ''
                this.creditLineID = ''
                // this.directPayType = ''
                this.paymentDate = ''
                this.paymentProcessing = false
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while paying', err);
                this.paymentProcessing = false
                this.showToaster = false
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'error'
            }
        )
    }

    amountInStoreCredit = ''
    paypaStoreCredit(template: TemplateRef<any>, cls) {
        if (Number(this.amountInStoreCredit) <= 0 || this.creditLineID == '' || this.paymentDate == '') {
            this.showToaster = false
            this.toasterMsg = 'Please fill all the fields'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        if (this.sprGrandTotal - Number(this.amountInStoreCredit) < 0) {
            // this.toaster.showInfo('Amount entered is greater than balance', '')
            this.showToaster = false
            this.toasterMsg = 'Amount entered is greater than balance'
            this.toasterType = 'error'
            this.paymentProcessing = false
            return
        }
        let obj = {}
        obj['transactionId'] = this.sprOrderID
        obj['amount'] = Number(this.amountInStoreCredit)
        obj['method'] = AllowedPurchaseOrderPaymentMethod.StoreCredit
        obj['creditLineId'] = this.creditLineID
        obj['paid_on'] = this.paymentDate
        if (this.directPayType == 'addCost') {
            obj['typeOfPayment'] = TpType.AdditionalCost
        }
        else if (this.directPayType == 'extra') {
            obj['typeOfPayment'] = TpType.ExtraItem
        }
        else {
            obj['typeOfPayment'] = TpType.OrderPayment
        }
        obj['BusinessLocation'] = localStorage.getItem('location_id')
        this.createPurchaseOrderpaymentGQL.mutate({
            input: JSON.parse(JSON.stringify(obj))
        }).subscribe(
            (res) => {
                this.totalPaymentPayed = res['data'].createPurchaseOrderpayment
                this.priorPayment = this.priorPayment + Number(this.amountInStoreCredit)
                this.orderDetail['dynamic_status'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status']
                this.orderDetail['dynamic_status_list'] = res['data'].createPurchaseOrderpayment[0]['Transaction']['dynamic_status_list']
                // this.sprGrandTotal = this.sprGrandTotal - this.priorPayment
                if (this.sprGrandTotal - this.priorPayment <= 0) {
                    this.disgardproductsRestock()
                    this.priorPayment = 0
                    this.sprGrandTotal = 0
                    this.totalPaymentPayed = []
                    this.amountInStoreCredit = ''
                    this.paymentProcessing = false
                    this.creditLineID = ''
                    this.creditLineName = ''
                    // this.directPayType = ''
                    this.paymentDate = ''
                    this.getAllProducts()
                    return
                }
                this.creditLineName = ''
                this.amountInStoreCredit = ''
                // this.directPayType = ''
                this.creditLineID = ''
                this.paymentProcessing = false
                this.paymentDate = ''
                this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
            }, (err) => {
                console.log('err while paying', err);
                this.paymentProcessing = false
                this.showToaster = false
                this.toasterMsg = err['message'].substr(15)
                this.toasterType = 'error'
            }
        )
    }

    recordAnotherPayments(bool) {
        if (bool) {
            // this.directPayType = ''
            this.modalRef.hide()
            return
        }
        this.priorPayment = 0
        this.sprGrandTotal = 0
        this.paymentProcessing = false
        this.paymentDate = ''
        this.totalPaymentPayed = []
        this.disgardproductsRestock()
        // this.directPayType = ''
        this.modalRef.hide()
        this.changePay('noMethodSelected')
    }

    delPay: any
    openDeletePaymentPopup(template: TemplateRef<any>, cls, pay) {
        console.log('pay is', pay);

        this.delPay = pay
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    deletePayment() {
        this.deletePaymentGQL.mutate({
            paymentId: this.delPay['_id'],
            transactionId: this.sprOrderID
        }).subscribe(
            (res) => {
                if (res['data'].deletePayment) {
                    this.priorPayment = this.priorPayment - this.delPay['amount']
                    var index = this.totalPaymentPayed.map(x => {
                        return x._id;
                    }).indexOf(this.delPay['_id']);
                    this.totalPaymentPayed.splice(index, 1)
                    // this.toaster.showSuccess('Payment successfully deleted', '')
                    this.showToaster = false
                    this.toasterMsg = 'Payment successfully deleted'
                    this.toasterType = 'success'
                    this.modalRef.hide()
                }
            }, (err) => {
                console.log('error while deleting payment', err);
                this.showToaster = false
                this.toasterMsg = 'Error while paying deleting payment'
                this.toasterType = 'error'
                this.modalRef.hide()
            }
        )
    }

    //======================================== End  Restock  ==============================================================//

    UrlOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
            || charCode == 126 || charCode == 95 || charCode == 46 || charCode == 45) {
            return true;
        }
        return false;
    }

    //======================================== Start Imort and Export Suppliers  ==============================================================//
    openModalImportModel(template: TemplateRef<any>, cls) {
        this.fileName = ''
        this.fileNameSupplier = ''
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    importText = 'Supplier(s)'
    openImportModal(template: TemplateRef<any>, cls, value) {
        this.fileName = ''
        this.fileNameSupplier = ''
        this.supplierSettingsOpen = false
        this.importText = value
        this.dataListSupplier = []
        this.fieldsSupplier = []
        this.columnToMapSupplier = []
        this.colSupplier = []
        this.productSettingsOpen = false
        this.mappedColumnsSupplier = []
        this.suppFileFieldsName = []
        this.showImportToaster = true
        this.count = 0
        if (this.importText == 'Supplier(s)') {
            this.mappedColumnsSupplier = ['Supplier Company', 'Supplier Company Email', 'Supplier Company Phone', 'Website', 'Address 1', 'Address 2', 'Country',
                'City', 'State', 'Zip Code', 'Supplier First Name', 'Supplier Mobile',
                'Supplier Email', 'Supplier Phone']
        } else {
            this.mappedColumnsSupplier = [
                'Product Name', 'SKU', 'Ideal Qty', 'Alert Qty', 'Sell Price', 'Average Cost', 'Brand',
                'Device Model', 'Description', 'Tags', 'Compatilable Devices', 'Is Product', 'Is Track Stock', 'Is Serial Number']
        }
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    exportSupliers() {
        let exportSupliers = []
        for (let i = 0; i < this.addSupplierToList.length; i++) {
            let sup = {}
            if (this.addSupplierToList[i]['selected'] == true) {
                // sup['ID'] = this.addSupplierToList[i]['supplier_keeping_unit'] 
                sup['Supplier Company'] = this.addSupplierToList[i]['supplier_company']
                sup['Supplier Company Phone'] = this.addSupplierToList[i]['supplier_company_phone']
                sup['Supplier Company Email'] = this.addSupplierToList[i]['supplier_company_email']
                sup['Website'] = this.addSupplierToList[i]['website']
                sup['Address 1'] = this.addSupplierToList[i]['address_1']
                sup['Address 2'] = this.addSupplierToList[i]['address_2']
                sup['Country'] = this.addSupplierToList[i]['Country'] == null ? " " : this.addSupplierToList[i]['Country'].name
                sup['City'] = this.addSupplierToList[i]['city']
                sup['State'] = this.addSupplierToList[i]['state']
                sup['Zip Code'] = this.addSupplierToList[i]['zip_code']
                sup['Supplier First Name'] = this.addSupplierToList[i]['supplier_first_name']
                sup['Supplier Mobile'] = this.addSupplierToList[i]['supplier_mobile']
                sup['Supplier Email'] = this.addSupplierToList[i]['supplier_email']
                sup['Supplier Phone'] = this.addSupplierToList[i]['supplier_phone']
                // sup['Status'] = ""
                exportSupliers.push(sup)
            }
        }
        if (exportSupliers.length != 0) {
            let todayDate = new Date()
            let value = this.datePipe.transform(todayDate, 'mediumDate');
            let month = value.substring(0, 3)
            let date = value.substring(4, 6)
            let year = value.substring(7, 12)
            value = month + '_' + date + '_' + year
            this.CSVService.saveAsCSVFile(exportSupliers, 'Supplier_List_' + value + '_');
            this.showToaster = false
            this.toasterMsg = 'Your Supplier(s) has been exported'
            this.toasterType = 'success'
            this.supplierSettingsOpen = false
        } else {
            // this.toaster.showError('Select Suplier', 'Please Select Suplier First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Suplier First'
            this.toasterType = 'error'
        }
    }

    mappedColumnsSupplier = ['Supplier Company', 'Supplier Company Email', 'Supplier Company Phone', 'Website', 'Address 1', 'Address 2', 'Country',
        'City', 'State', 'Zip Code', 'Supplier First Name', 'Supplier Mobile',
        'Supplier Email', 'Supplier Phone']
    dataListSupplier = []
    fieldsSupplier = []
    fileNameSupplier = ''
    suppFileFieldsName: any
    onFileChangedSupplier(event) {
        this.fileNameSupplier = event[0].name
        this.papa.parse(event[0], {
            header: true,
            skipEmptyLines: true,
            complete: (result, file) => {
                console.log('Field Names', result);
                this.suppFileFieldsName = result.meta.fields
                // this.fieldsSupplier = result.meta.fields
                // console.log("fields ---->", this.fieldsSupplier);
                this.dataListSupplier = result.data;
                console.log("dataListSupplier ---->", this.dataListSupplier);
                for (let i = 0; i < this.suppFileFieldsName.length; i++) {
                    let obj = {}
                    for (let k = 0; k < this.mappedColumnsSupplier.length; k++) {
                        if (this.mappedColumnsSupplier[k] == this.suppFileFieldsName[i]) {
                            obj['name'] = this.suppFileFieldsName[i]
                            obj['nameForShowData'] = this.suppFileFieldsName[i]
                            obj['selectionBox'] = false
                            obj['selectedBox'] = true
                            obj['notMapped'] = false
                            obj['skip'] = false
                            this.fieldsSupplier.push(obj)
                        }
                    }
                    if (this.isObjectEmpty(obj)) {
                        obj['name'] = ''
                        obj['csvName'] = this.suppFileFieldsName[i]
                        obj['selectionBox'] = true
                        obj['selectedBox'] = false
                        obj['notMapped'] = true
                        obj['skip'] = false
                        this.fieldsSupplier.push(obj)
                    }
                }
                this.initializeColumnsSupplier(result.meta.fields)
            }
        });
    }

    columnToMapSupplier = []
    colSupplier = []
    initializeColumnsSupplier(col) {
        this.columnToMapSupplier = []
        for (let i = 0; i < col.length; i++) {
            for (let k = 0; k < this.mappedColumnsSupplier.length; k++) {
                if (col[i] === this.mappedColumnsSupplier[k]) {
                    this.columnToMapSupplier.push(
                        {
                            c_db: col[i],
                            c_csv: this.mappedColumnsSupplier[k]
                        }
                    )
                    this.colSupplier[i] = this.mappedColumnsSupplier[k]
                }

            }
            if (this.colSupplier[i] == undefined || this.colSupplier[i] == '') {
                this.colSupplier[i] = 'Make A selection'
            }
        }
    }

    showImportToaster = true
    closeImportToaster() {
        this.showImportToaster = true
    }

    skipSlideSupplier(index) {
        if (this.importText == 'Supplier(s)') {
            if (this.fieldsSupplier[index].name == 'Supplier Company' || this.fieldsSupplier[index].name == 'Supplier Company Email' || this.fieldsSupplier[index].name == 'Supplier Company Phone'
                || this.fieldsSupplier[index].name == 'Address 1' || this.fieldsSupplier[index].name == 'Website'
                || this.fieldsSupplier[index].name == 'Country' || this.fieldsSupplier[index].name == 'Zip Code' || this.fieldsSupplier[index].name == 'City' || this.fieldsSupplier[index].name == 'State') {
                this.showImportToaster = false
                this.toasterMsg = 'This field is must for add supplier'
                this.toasterType = 'error'
                return
            } else {
                this.fieldsSupplier[index]['skip'] = true
                this.fieldsSupplier[index]['name'] = ''
                this.fieldsSupplier[index]['notMapped'] = true
                this.colSupplier[index] = 'Make A selection'
            }
        } else {
            if (this.fieldsSupplier[index].name == 'Product Name' || this.fieldsSupplier[index].name == 'Average Cost' || this.fieldsSupplier[index].name == 'SKU' || this.fieldsSupplier[index].name == 'Ideal Qty'
                || this.fieldsSupplier[index].name == 'Alert Qty' || this.fieldsSupplier[index].name == 'Sell Price' || this.fieldsSupplier[index].name == 'Is Product') {
                this.showImportToaster = false
                this.toasterMsg = 'This field is must for add product'
                this.toasterType = 'error'
                return
            } else {
                this.fieldsSupplier[index]['skip'] = true
                this.fieldsSupplier[index]['name'] = ''
                this.fieldsSupplier[index]['notMapped'] = true
                this.colSupplier[index] = 'Make A selection'
            }
        }
    }

    changeColItemName(value, i) {
        var index = this.fieldsSupplier.map(x => {
            return x.name;
        }).indexOf(value);
        if (index != -1) {
            this.showImportToaster = false
            this.toasterMsg = 'This field is already selected'
            this.toasterType = 'error'
            return
        }
        this.colSupplier[i] = value
        this.newColName = value
    }

    newColName = ''
    changeValueOfMapColumnsSupplier(type, i) {
        if (this.newColName == '') {
            this.fieldsSupplier[i].selectionBox = false
            this.fieldsSupplier[i].selectedBox = true
            return
        }
        this[type] = this.newColName
        this.colSupplier[i] = this.newColName
        this.fieldsSupplier[i].selectionBox = false
        this.fieldsSupplier[i].selectedBox = true
        this.fieldsSupplier[i]['skip'] = false
        this.fieldsSupplier[i]['name'] = this.newColName
        this.columnToMapSupplier.push(
            { c_db: this.newColName, c_csv: this.fieldsSupplier[i]['csvName'] }
        )
        this.newColName = ''
    }

    saveUnkownCol(i) {
        if (this.newColName == "") {
            this.showImportToaster = false
            this.toasterMsg = 'Please select field first'
            this.toasterType = 'error'
            return
        }
        var index = this.fieldsSupplier.map(x => {
            return x.name;
        }).indexOf(this.newColName);
        if (index != -1) {
            this.showImportToaster = false
            this.toasterMsg = 'This field is already selected'
            this.toasterType = 'error'
            return
        }
        this.fieldsSupplier[i].selectionBox = false
        this.fieldsSupplier[i].selectedBox = true
        this.fieldsSupplier[i]['skip'] = false
        this.fieldsSupplier[i]['notMapped'] = false
        this.fieldsSupplier[i]['name'] = this.newColName
        this.columnToMapSupplier.push(
            { c_db: this.newColName, c_csv: this.fieldsSupplier[i]['csvName'] }
        )
        this.newColName = ''
    }

    saveEditedCol(i) {
        this.fieldsSupplier[i].selectionBox = false
        this.fieldsSupplier[i].selectedBox = true
        this.fieldsSupplier[i]['skip'] = false
        this.fieldsSupplier[i]['name'] = this.newColName
    }

    importSupllierData = []
    suppliersInvalid = 0
    alreadyExistSuppliers = 0
    newlyAddedSuppliers = 0
    importSupplierData = []
    dataVerifyBox = true
    suppliersCheckDuplicationDataFun(importSuppliers) {
        this.suggestedSupplierArray = []
        this.givenSupplierArray = []
        this.importSupplierData = []
        this.dataVerifyBox = true
        this.alreadyExistSuppliers = 0
        this.newlyAddedSuppliers = 0
        this.suppliersInvalid = 0
        console.log("import Supplier Data ---->", importSuppliers)
        this.suppliersCheckDuplicationData.watch({
            input: importSuppliers
        }).valueChanges.subscribe(
            (res) => {
                let importData = res['data'].suppliersCheckDuplicationData
                console.log("suppliersCheckDuplicationData  ---->", importData);
                if (!this.isObjectEmpty(importData.alreadyExistSuppliers)) {
                    this.alreadyExistSuppliers = importData.alreadyExistSuppliers.length
                }
                if (!this.isObjectEmpty(importData.suppliersInvalidData)) {
                    this.suppliersInvalid = importData.suppliersInvalidData.length
                }
                if (!this.isObjectEmpty(importData.newlyAddedSuppliers)) {
                    for (let i = 0; i < importData.newlyAddedSuppliers.length; i++) {
                        delete importData.newlyAddedSuppliers[i]['__typename']
                        this.importSupplierData.push(importData.newlyAddedSuppliers[i])
                    }
                }
                console.log("importSupplierData  ---->", this.importSupplierData);
                if (!this.isObjectEmpty(this.importSupplierData)) {
                    this.SuppliersVerificationWithSystemtFun()
                } else {
                    this.dataVerifyBox = false
                }
                this.importSupplierLoader = false
                this.importSupllierData = []
            }, (err) => {
                console.log('GQL err', err);
                this.importSupplierLoader = false
                this.modalRef.hide()
                this.importSupllierData = []
                this.showToaster = false
                this.toasterMsg = 'Supplier Not import, Please try again.'
                this.toasterType = 'error'
            }
        )
    }

    sentSupplierForImport = []
    postVerifySuppForImport = []
    noPostVerificationSuppliers = []
    SuppliersVerificationWithSystemtFun() {
        this.importSupplierLoader = true
        this.sentSupplierForImport = []
        this.postVerifySuppForImport = []
        this.noPostVerificationSuppliers = []
        this.SuppliersVerificationWithSystem.watch({
            input: this.importSupplierData
        }).valueChanges.subscribe(
            (res) => {
                this.importSupplierLoader = false
                console.log('SuppliersVerificationWithSystem--> res', res['data'].SuppliersVerificationWithSystem);
                let returnVal = res['data'].SuppliersVerificationWithSystem
                if (returnVal != null) {
                    for (let i = 0; i < returnVal.length; i++) {
                        if (this.isObjectEmpty(returnVal[i]['postVerifyData'])) {
                            delete returnVal[i]['supplier']['__typename']
                            returnVal[i]['supplier']['BusinessLocation'] = window.localStorage.getItem('location_id')
                            this.noPostVerificationSuppliers.push(returnVal[i]['supplier'])
                        }
                        if (!this.isObjectEmpty(returnVal[i]['postVerifyData'])) {
                            delete returnVal[i]['supplier']['__typename']
                            returnVal[i]['supplier']['BusinessLocation'] = window.localStorage.getItem('location_id')
                            returnVal[i]['supplier']['selected'] = ''
                            this.sentSupplierForImport.push(returnVal[i]['supplier'])

                            delete returnVal[i]['postVerifyData'][0]['__typename']
                            returnVal[i]['postVerifyData'][0]['BusinessLocation'] = window.localStorage.getItem('location_id')
                            returnVal[i]['postVerifyData'][0]['selected'] = ''
                            let Country = returnVal[i]['postVerifyData'][0]['Country'].name
                            delete returnVal[i]['postVerifyData'][0]['Country']
                            let supp = JSON.parse(JSON.stringify(returnVal[i]['postVerifyData'][0]))
                            supp['Country'] = Country//returnVal[i]['postVerifyData'][0]['Country'].name
                            this.postVerifySuppForImport.push(supp)
                        }
                    }
                    if (this.isObjectEmpty(this.postVerifySuppForImport)) {
                        this.createImportSuppliers(false)
                        return
                    }
                    console.log('sentSupplierForImport-->', this.sentSupplierForImport)
                    console.log('postVerifySuppForImport-->', this.postVerifySuppForImport)
                }
            }, (err) => {
                this.importSupplierLoader = false
                console.log(' err', err);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )
    }

    count = 0
    nextSupplierForCompare(count) {
        this.count = count + 1
    }

    backSupplierForCompare(count) {
        this.count = count - 1
    }

    suggestedSupplierArray = []
    suggestedSupplierArrayFun(supp) {
        this.postVerifyToaster = true
        let val = this.suggestedSupplierArray.filter((item) => {
            return JSON.stringify(item) == JSON.stringify(supp);
        })
        if (this.isObjectEmpty(val)) {
            delete supp['__typename']
            supp['BusinessLocation'] = window.localStorage.getItem('location_id')
            supp['index'] = this.count
            supp['selected'] = 'sugg'
            // supp['Country']=supp['Country'].name
            this.suggestedSupplierArray.push(supp)
            for (let i = 0; i < this.givenSupplierArray.length; i++) {
                if (Number(this.givenSupplierArray[i]['index']) == Number(this.count)) {
                    this.givenSupplierArray.splice(i, 1);
                }
            }
        }
        this.sentSupplierForImport[this.count].selected = ''
        //  if(this.postVerifySuppForImport.length!=this.count+1){
        //   this.nextSupplierForCompare(this.count)
        //   }    
    }

    givenSupplierArray = []
    givenSupplierArrayFun(supp) {
        this.postVerifyToaster = true
        let val = this.givenSupplierArray.filter((item) => {
            return JSON.stringify(item) == JSON.stringify(supp);
        })
        if (this.isObjectEmpty(val)) {
            delete supp['__typename']
            supp['BusinessLocation'] = window.localStorage.getItem('location_id')
            supp['index'] = this.count
            supp['selected'] = 'given'
            this.givenSupplierArray.push(supp)
            for (let i = 0; i < this.suggestedSupplierArray.length; i++) {
                if (Number(this.suggestedSupplierArray[i]['index']) == Number(this.count)) {
                    this.suggestedSupplierArray.splice(i, 1);
                }
            }
        }
        this.postVerifySuppForImport[this.count].selected = ''
        // if(this.postVerifySuppForImport.length!=this.count+1){
        // this.nextSupplierForCompare(this.count)
        // }
    }

    postVerifyToaster = true
    closePostToaster() {
        this.postVerifyToaster = true
    }

    createImportSuppliers(check) {
        let results = this.suggestedSupplierArray.concat(this.givenSupplierArray)
        if (check) {
            if (this.isObjectEmpty(results) || this.postVerifySuppForImport.length != results.length) {
                this.postVerifyToaster = false
                this.toasterMsg = 'Please select one option! "Information You Entered or Verified Information"'
                this.toasterType = 'error'
                return
            }
            for (let i = 0; i < results.length; i++) {
                delete results[i]['index']
                delete results[i]['selected']
            }
        }
        results = this.noPostVerificationSuppliers.concat(results)
        this.importSupplierLoader = true
        this.importSuppliersData.mutate({
            input: results
        }).subscribe(
            (res) => {
                this.importSupplierLoader = false
                console.log('importSuppliersData res--->', res['data'].importSuppliersData);
                let importData = res['data'].importSuppliersData
                if (importData != null) {
                    this.dataVerifyBox = false
                    if (!this.isObjectEmpty(importData.newlyAddedSuppliers)) {
                        this.newlyAddedSuppliers = importData.newlyAddedSuppliers.length
                    }
                }
            }, (err) => {
                this.importSupplierLoader = false
                // let message=err.graphQLErrors[0].message
                console.log('importSuppliersData err', err);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )

    }

    closeImportModel() {
        if (this.importText == 'Supplier(s)') {
            if (!this.isObjectEmpty(this.importSupplierData)) {
                this.showToaster = false
                this.toasterMsg = 'Your supplier(s) has been imported'
                this.toasterType = 'success'
                this.getAllSuppliers()
                this.getAllSupplierRestockFun()
            }
        } else {
            if (this.newlyAddedProducts != 0) {
                this.showToaster = false
                this.toasterMsg = 'Your product(s) has been imported'
                this.toasterType = 'success'
                this.getAllProducts()
            }
        }

        this.modalRef.hide()
    }

    closeModelSuppImported(template: TemplateRef<any>, cls) {
        this.modalRef.hide()
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });

    }

    importSupplierLoader = true
    doneMappingSupplier() {
        this.modalRef.hide()
        this.importSupplierLoader = true
        for (let i = 0; i < this.dataListSupplier.length; i++) {
            let supplier0 = {}
            for (let k = 0; k < this.columnToMapSupplier.length; k++) {
                supplier0[this.columnToMapSupplier[k].c_db] = this.dataListSupplier[i][this.columnToMapSupplier[k].c_csv]
            }
            let Supplier = {}
            Supplier['supplier_company'] = supplier0['Supplier Company'] == undefined ? "" : supplier0['Supplier Company']
            Supplier['supplier_company_phone'] = supplier0['Supplier Company Phone'] == undefined ? "" : supplier0['Supplier Company Phone']
            Supplier['supplier_company_email'] = supplier0['Supplier Company Email'] == undefined ? "" : supplier0['Supplier Company Email']
            Supplier['website'] = supplier0['Website'] == undefined ? "" : supplier0['Website']
            Supplier['address_1'] = supplier0['Address 1'] == undefined ? "" : supplier0['Address 1']
            Supplier['address_2'] = supplier0['Address 2'] == undefined ? "" : supplier0['Address 2']
            Supplier['Country'] = supplier0['Country'] == undefined ? "" : supplier0['Country']
            Supplier['city'] = supplier0['City'] == undefined ? "" : supplier0['City']
            Supplier['state'] = supplier0['State'] == undefined ? "" : supplier0['State']
            Supplier['zip_code'] = supplier0['Zip Code'] == undefined ? "" : supplier0['Zip Code']
            Supplier['supplier_first_name'] = supplier0['Supplier First Name'] == undefined ? "" : supplier0['Supplier First Name']
            Supplier['supplier_last_name'] = supplier0['Supplier Last Name'] == undefined ? "" : supplier0['Supplier Last Name']
            Supplier['supplier_mobile'] = supplier0['Supplier Mobile'] == undefined ? "" : supplier0['Supplier Mobile']
            Supplier['supplier_email'] = supplier0['Supplier Email'] == undefined ? "" : supplier0['Supplier Email']
            Supplier['supplier_phone'] = supplier0['Supplier Phone'] == undefined ? "" : supplier0['Supplier Phone']
            Supplier['is_verify_supplier'] = false
            Supplier['is_buyback'] = true
            Supplier['BusinessLocation'] = window.localStorage.getItem('location_id')
            this.importSupllierData.push(Supplier);
        }
        console.log('importSupllierData ---Final-->', this.importSupllierData)
        this.suppliersCheckDuplicationDataFun(this.importSupllierData)

    }

    importProductsDataArray = []
    doneMappingProducts() {
        this.importProductsDataArray = []
        this.modalRef.hide()
        this.importSupplierLoader = true
        for (let i = 0; i < this.dataListSupplier.length; i++) {
            let product = {}
            for (let k = 0; k < this.columnToMapSupplier.length; k++) {
                product[this.columnToMapSupplier[k].c_db] = this.dataListSupplier[i][this.columnToMapSupplier[k].c_csv]
            }
            let prod = {}
            let tags = []
            let devices = []
            let isProduct = true
            let isTrack = true
            let isSerial = true
            if (product['Is Product'] != undefined) {
                isProduct = product['Is Product'] == 'Yes' ? true : false
            }
            if (product['Is Track Stock'] != undefined) {
                isTrack = product['Is Track Stock'] == 'Yes' ? true : false
            }
            if (product['Is Serial Number'] != undefined) {
                isSerial = product['Is Serial Number'] == 'Yes' ? true : false
            }
            prod['is_product'] = isProduct
            prod['is_track_stock'] = isTrack
            prod['is_serial_number'] = isSerial
            prod['product_name'] = product['Product Name'] == undefined ? "" : product['Product Name']
            prod['sku'] = product['SKU'] == undefined ? "" : product['SKU']
            prod['ideal_qty'] = Number(product['Ideal Qty'] == undefined ? 0 : product['Ideal Qty'])
            prod['alert_qty'] = Number(product['Alert Qty'] == undefined ? 0 : product['Alert Qty'])
            prod['sell_price'] = parseFloat(product['Sell Price'] == undefined ? 0 : product['Sell Price'])
            prod['average_cost'] = parseFloat(product['Average Cost'] == undefined ? 0 : product['Average Cost'])
            prod['Brand'] = product['Brand'] == undefined ? "" : product['Brand']
            prod['DeviceModel'] = product['Device Model'] == undefined ? "" : product['Device Model']
            prod['description'] = product['Description'] == undefined ? "" : product['Description']
            prod['BusinessLocation'] = window.localStorage.getItem('location_id')
            if (product['Tags'] != undefined) {
                tags = product['Tags'].split(",")
            }
            if (product['Compatilable Devices'] != undefined) {
                devices = product['Compatilable Devices'].split(",")
            }
            prod['tags'] = tags
            prod['compatilable_devices'] = devices
            this.importProductsDataArray.push(prod);
        }
        this.importProductsFun(this.importProductsDataArray)

    }

    productsInvalidData = 0
    newlyAddedProducts = 0
    alreadyExistProducts = 0
    importProductsFun(importProductsData) {
        console.log('importProductsData for API-->', importProductsData);
        this.importSupplierLoader = true
        this.productsInvalidData = 0
        this.newlyAddedProducts = 0
        this.alreadyExistProducts = 0
        this.importProductsData.mutate({
            input: importProductsData
        }).subscribe(
            (res) => {
                this.importSupplierLoader = false
                console.log('importProductsData res', res['data'].importProductsData);
                let importData = res['data'].importProductsData
                if (!this.isObjectEmpty(importData.productsInvalidData)) {
                    this.productsInvalidData = importData.productsInvalidData.length
                }
                if (!this.isObjectEmpty(importData.newlyAddedProducts)) {
                    this.newlyAddedProducts = importData.newlyAddedProducts.length
                }
                if (!this.isObjectEmpty(importData.alreadyExistProducts)) {
                    this.alreadyExistProducts = importData.alreadyExistProducts.length
                }
            }, (err) => {
                this.importSupplierLoader = false
                console.log(' err', err);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )
    }

    selectedBox = true
    selectionBox = false
    editCol(i) {
        this.fieldsSupplier[i]['selectedBox'] = false
        this.fieldsSupplier[i]['selectionBox'] = true
    }

    skipEditedCol(i) {
        this.fieldsSupplier[i].selectionBox = false
        this.fieldsSupplier[i].selectedBox = true
    }

    //======================================== End Imort/Export Suppliers  ==============================================================//

    //======================================== Start Track number into purchase order  ==============================================================//

    addTrackingSubmitted = false
    addTrackingLoader = false
    addTrackingNumber(check) {
        if (this.addTrackingForm.invalid) {
            this.addTrackingSubmitted = true;
            return;
        }
        else {
            if (check == 'Edit') {
                this.onTransitShipingNumLoader = true
            }
            this.addTrackingSubmitted = false
            let addTrackingFormData = JSON.parse(JSON.stringify(this.addTrackingForm.value))
            this.addShippingDetail.mutate({
                orderID: this.currentOrderId,
                company_name: addTrackingFormData.company_name,
                tracking_number: addTrackingFormData.tracking_number,
                estimated_days: addTrackingFormData.estimated_days
            }).subscribe(
                (res) => {
                    console.log(' res', res['data'].AddShippingDetail);
                    this.orderDetail['dynamic_status'] = res['data'].AddShippingDetail['dynamic_status']
                    this.orderDetail['dynamic_status_list'] = res['data'].AddShippingDetail['dynamic_status_list']
                    this.orderDetail['shipping_tracking_no'] = res['data'].AddShippingDetail['shipping_tracking_no']
                    this.orderDetail['shipping_company_name'] = res['data'].AddShippingDetail['shipping_company_name']
                    this.orderDetail['shipping_estimated_days'] = res['data'].AddShippingDetail['shipping_estimated_days']
                    if (this.trakingNo) {
                        // this.toaster.showSuccess('Add Tracking Number Successfully', 'Tracking Number')
                        this.trakingNo = false
                        this.showToaster = false
                        this.toasterMsg = 'Add Tracking Number Successfully'
                        this.toasterType = 'success'
                    }
                    if (check == 'Edit') {
                        this.initializeAddTrackingFrom('')
                        this.trackingNumberEdit = false
                        this.onTransitShipingNumLoader = false
                    }
                    // purchaseOrders
                    var index = this.purchaseOrders.map(x => {
                        return x._id;
                    }).indexOf(this.currentOrderId);
                    this.purchaseOrders[index]['dynamic_status'] = res['data'].AddShippingDetail['dynamic_status']
                    this.purchaseOrders[index]['dynamic_status_list'] = res['data'].AddShippingDetail['dynamic_status_list']
                    this.purchaseOrders[index]['shipping_tracking_no'] = res['data'].AddShippingDetail['shipping_tracking_no']
                    this.purchaseOrders[index]['shipping_company_name'] = res['data'].AddShippingDetail['shipping_company_name']
                    this.purchaseOrders[index]['shipping_estimated_days'] = res['data'].AddShippingDetail['shipping_estimated_days']
                    this.addTrackingLoader = false
                }, (err) => {
                    this.addTrackingLoader = false
                    this.onTransitShipingNumLoader = false
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                    let message = err.graphQLErrors[0].message
                    console.log('AddShippingDetail GraphQL err', message);
                }
            )
        }


    }

    initializeAddTrackingFromFun() {
        this.addTrackingSubmitted = false;
        this.addTrackingForm = this.formbulider.group({
            orderID: ['', Validators.required],
            company_name: ['', Validators.required],
            tracking_number: ['', Validators.required],
            estimated_days: [new Date(), Validators.required],
        });
    }

    addTrackingForm: any
    initializeAddTrackingFrom(orderID) {
        this.addTrackingSubmitted = false;
        this.addTrackingForm = this.formbulider.group({
            orderID: [orderID, Validators.required],
            company_name: [this.orderDetail['ShippingType'] != null ? this.orderDetail['ShippingType']['tracking_url'] : '', [Validators.required, Validators.pattern(reg)]],
            tracking_number: ['', Validators.required],
            estimated_days: [new Date(), Validators.required],
        });
        if (this.trakingNo) {
            var index = this.orderDetail['dynamic_status_list'].map(x => {
                return x.status_name;
            }).indexOf('On Transit');
            if (index == -1) {
                return
            }
            this.orderDetail['dynamic_status_list'].splice(index, 1)
            this.orderDetail['dynamic_status']['status_name'] = 'Paid'
            this.trakingNo = true
            return
        }
        this.trackingNumberEdit = false
    }

    trakingNo = false
    addTrakingNumber() {
        console.log('current order detail', this.orderDetail);
        this.trakingNo = true
        this.trackingNumberEdit = true
        this.initializeAddTrackingFrom(this.orderDetail['_id'])
        this.orderDetail['dynamic_status_list'].push({
            status_background_color: "#fcaa3d",
            status_font_color: "#fff",
            status_icon: null,
            status_name: "On Transit"
        }
        )
        this.orderDetail['dynamic_status']['status_name'] = 'On Transit'
    }

    trackingNumberEdit = false
    onTransitShipingNumLoader = false
    initializeUpdateTrackingFrom(order) {
        this.addTrackingForm = this.formbulider.group({
            orderID: [order['_id'], Validators.required],
            company_name: [order['shipping_company_name'], [Validators.required , Validators.pattern(reg)]],
            tracking_number: [order['shipping_tracking_no'], Validators.required],
            estimated_days: [new Date(order['shipping_estimated_days']), Validators.required],
        });
        this.trackingNumberEdit = true
    }

    get fAddTrackingForm() {
        return this.addTrackingForm.controls
    }

    closeAddTrakingPopup() {
        this.initializeAddTrackingFrom('')
        this.modalRef.hide()
    }

    openNewWindow(link,trackingNumber) {
        let linkToOpen = ''
        if(link.slice(-1) == '/') {
            linkToOpen = link + trackingNumber
        }
        else {
            linkToOpen = link + '/' + trackingNumber
        }
        var win = window.open(linkToOpen, '_blank');
        win.focus();
    }

    //======================================== End Track number into purchase order  ==============================================================//

    //======================================== Start Print Label  ==============================================================//

    printLabelProduct = []
    openPrintLabelModal(template: TemplateRef<any>, cls) {
        this.printLabelProduct = []
        for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i]['selected'] == true) {
                let data = {}
                data['product_name'] = this.allProducts[i]['product_name']
                data['sku'] = this.allProducts[i]['sku']
                data['sell_price'] = this.allProducts[i]['sell_price']
                data['printLabelQuantityInput'] = false
                data['quantity'] = 0
                this.printLabelProduct.push(data)
            }
        }
        if (this.printLabelProduct.length != 0) {
            this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
        } else {
            // this.toaster.showError('Select Products', 'Please Select Products First')
            this.showToaster = false
            this.toasterMsg = 'Please Select Products First'
            this.toasterType = 'error'
        }
    }

    printLabelPluse(index) {
        this.printLabelProduct[index]['quantity'] = Number(this.printLabelProduct[index]['quantity']) + 1
    }

    printLabelMiuns(index) {
        this.printLabelProduct[index]['quantity'] = Number(this.printLabelProduct[index]['quantity']) - 1
    }

    printLabelQuantityInput(index) {
        this.printLabelProduct[index]['printLabelQuantityInput'] = true
    }

    donePrintLabelQuantity(index, val) {
        if (val == '') {
            this.printLabelProduct[index]['printLabelQuantityInput'] = false
            return
        }
        let value = Number(val)
        this.printLabelProduct[index]['quantity'] = value
        this.printLabelProduct[index]['printLabelQuantityInput'] = false
    }

    closePrintLabelPopup() {
        this.modalRef.hide();
    }

    openPrintPreview() {
        this.ifPrintInput = false
        this.ifPrintPreview = true
    }

    backPrintPreview() {
        this.ifPrintPreview = false
        this.ifPrintInput = true
    }

    counter(i: number) {
        return new Array(i);
    }

    printPreview() {
        window.print()
        this.ifPrintInput = true
        this.ifPrintPreview = false
        // const printContent = document.getElementById("test1");
        // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        // WindowPrt.document.write(printContent.innerHTML);
        // WindowPrt.document.close();
        // WindowPrt.focus();
        // WindowPrt.print();
        // return
        // let data = document.getElementsByClassName("labelPrintPreview")[0].innerHTML;
        // window.open("data:text/html," + encodeURIComponent(data), "_blank");
        // return
        // let newWindow = window.open("data:text/html," + encodeURIComponent(data), "_blank");
        // console.log('data is', data);
        // newWindow.focus();
    }

    // ==== Manage Supplier Detail====== //

    currentSupplier: Supplier
    supplierPaymentMethods = []
    supplierInfoDetail(supplier) {
        this.currentSupplier = supplier
        this.getSupplierById(supplier['_id'])
        this.getSupplierPaymentMethods(supplier['_id'])
        this.getSupplierSummary(supplier['_id'])
        this.getSupplierNettermLogsFun(supplier['_id'])
        this.getNettermOrders(supplier['_id'])
        this.suppNetTermPaymentLogs(supplier['_id'])
        this.netTermsinitializeFrom()
        this.getSupplierOrders()
        this.getSupplierRMAOrders()
        this.getSupplierBBOrders()
        this.getSupplierCreditLog()
        this.getSupllierShippingType()
        console.log('supplier is ', supplier);
        this.existingSuppliers = false
        this.cutomerInfo = true
        this.createNote = false
        this.transferCredit = false
        this.manageCredit = false
        this.netTermsPayment = false
    }

    selectedSupplierForDetail: {}
    getSupplierById(supplierId) {
        this.supplierService.getSupplierById(supplierId, window.localStorage.getItem('location_id'))
            .valueChanges.subscribe(
                (res) => {
                    this.selectedSupplierForDetail = res['data'].supplierById
                    this.currentSupplier = JSON.parse(JSON.stringify(res['data'].supplierById))
                    console.log(res['data'].supplierById)
                }, (err) => {
                    console.log(err.message)
                }
            )
    }

    showStoreCredit(supplierId) {
        this.showOrderProcessListingComponent = false
        this.showOrderStatusComponent = false
        this.existingSuppliers = false
        this.existingPO = true
        this.managesuppliers = true
        this.cutomerInfo = true
        this.supplierService.getSupplierById(supplierId, window.localStorage.getItem('location_id'))
            .valueChanges.subscribe(
                (res) => {

                    this.currentSupplier = res['data'].supplierById
                    this.supplierInfoDetail(res['data'].supplierById)

                    this.cutomerInfo = true
                    setTimeout(() => {
                        let storeCredit: HTMLElement = document.getElementById("store-credit-link") as HTMLElement
                        storeCredit.click()
                    }, 1000)


                }, (err) => {
                    console.log(err.message)
                }
            )
    }

    summaryDetail: SupplierSummaryType = null
    getSupplierSummary(id) {
        this.supplierSummaryGQL.watch({
            supplier_id: id
        }).valueChanges.subscribe(
            (res) => {
                let result = res['data'].supplierSummary
                if (result != null) {
                    this.summaryDetail = result
                }
                console.log('suppier summary is', res['data'].supplierSummary);
            }, (err) => {
                console.log('err while loading supplier summary', err);
            }
        )
    }
    supplierCreditLogs: any
    refreshCreditLogList: boolean = false
    getSupplierCreditLog() {
        this.supplierService.supplierTransferCreditlogs(this.currentSupplier['_id'], window.localStorage.getItem('location_id'), 100, 0)
            .valueChanges.subscribe(
                (res) => {
                    this.supplierCreditLogs = res['data'].getSupplierTransferCreditlogs
                    console.log(res)
                }, (err) => {
                    console.log(err)
                }
            )
    }
    onCreditLogChange() {
        this.refreshCreditLogList = true
        setTimeout(() => { this.refreshCreditLogList = false }, 1)
    }

    getSupplierPaymentMethods(id) {
        this.supplierPaymentSettingListGQL.watch({
            supplier_id: id
        }).valueChanges.subscribe(
            (res) => {
                this.supplierPaymentMethods = res['data'].supplierPaymentSettingList.payment_settings
            }, (err) => {
                console.log('error while loading payment list', err);
            }
        )
    }

    updateSupplierPaymentMethod(method, bool) {
        this.supplierPaymentSettingsGQL.mutate({
            is_active: bool,
            payment_id: method['paymentType']['_id'],
            supplier_id: this.currentSupplier['_id']
        }).subscribe(
            (res) => {
                this.supplierPaymentMethods = res['data'].SupplierPaymentSettings.payment_settings
                // this.toaster.showSuccess('Supplier method updated successfully', '')
                this.showToaster = false
                this.toasterMsg = 'Supplier method updated successfully'
                this.toasterType = 'success'
            }, (err) => {
                console.log('error while updating payment method', err);
            }
        )
    }

    //////  Supplier wise PO List Filters starts from here ////////////

    supplierActivePO = 'active'
    supplierActiveOrders(str) {
        this.supplierActivePO = str
        this.getSupplierOrders()
    }

    supplierArrivalsFilters = ''
    supplierArrivalFilters(value) {
        this.supplierToDate = ''
        this.supplierFromDate = ''
        this.supplierArrivalsFilters = value
        this.getSupplierOrders()
    }

    supplierDateRangeFilter() {
        this.getSupplierOrders()
        this.modalRef.hide()
    }

    supplierOrder = false
    openOrderDetail(order) {
        this.supplierOrder = true
        this.purchaseOrderDetail(order)
    }

    closeSupplierOrder() {
        this.supplierOrder = true
        this.existingPO = true
        this.managesuppliers = true
        this.poStatus = false
        this.showOrderStatusComponent = false
        this.restock = false
        this.poDetails = false
        this.getpurchaseOrders()
    }

    supplierToDate = ''
    supplierFromDate = ''
    serachSupplierPO(event) {
        this.supplierPOSearch = event
        this.getSupplierOrders()
    }

    clearSupplierFilters(type) {
        if (type == 'PO') {
            this.statusForSupplierPO = []
            this.supplierActivePO = 'active'
            this.supplierArrivalsFilters = ''
            this.supplierPOSearch = ''
            this.supplierToDate = ''
            this.supplierFromDate = ''
            this.getSupplierOrders()
        }
        else if (type == 'RMA') {
            this.supplierActiveRMA = 'active'
            this.supplierRMAArrivalsFilters = ''
            this.supplierRMAToDate = ''
            this.supplierRMAFromDate = ''
            this.statusForSupplierRMA = []
            this.supplierRMASearch = ''
            this.getSupplierRMAOrders()
        }
        else if (type == 'BB') {
            this.supplierActiveBB = 'active'
            this.supplierBBArrivalsFilters = ''
            this.supplierBBToDate = ''
            this.supplierBBFromDate = ''
            this.statusForSupplierBB = []
            this.supplierBBSearch = ''
            this.getSupplierBBOrders()
        }

    }

    supplierOrders = []
    supplierLoaderPO = false
    supplierPOSearch = ''
    allowedStatusesPO = []
    getSupplierOrders() {
        let obj = {
            supplier_id: this.currentSupplier['_id'],
            limit: 1000,
            location_id: localStorage.getItem('location_id'),
            orderStatus: this.statusForSupplierPO.length == 0 ? null : this.statusForSupplierPO,
            skip: 0
        }
        obj['active'] = this.supplierActivePO
        obj['transactiontype'] = AllowedTransactionType.Purchase
        obj['search'] = this.supplierPOSearch
        obj['startDate'] = this.supplierFromDate == '' ? null : this.supplierFromDate
        obj['endDate'] = this.supplierToDate == '' ? null : this.supplierToDate
        if (this.supplierArrivalsFilters != '') {
            obj['arrivals'] = ArrivalsFilter[this.supplierArrivalsFilters]
        }
        obj = this.cleanObject(obj)
        this.supplierLoaderPO = true
        this.supplierPoListGQL.watch(
            {
                input: JSON.parse(JSON.stringify(obj))
            }).valueChanges.subscribe(
                (res) => {
                    console.log('supplier orders are', res['data'].supplierPOList);
                    this.supplierLoaderPO = false
                    let returnVal = res['data'].supplierPOList
                    if (returnVal != null) {
                        this.supplierOrders = res['data'].supplierPOList.transaction
                        this.allowedStatusesPO = res['data'].supplierPOList.available_status
                    }
                }, (err) => {
                    console.log('err while loading supplier orders', err);
                    this.supplierLoaderPO = false
                }
            )
    }

    returnSelectedStatusesForSupplier(status) {
        let found = this.statusForSupplierPO.find(element => element == status);
        return found == undefined ? false : true
    }

    statusForSupplierPO = []
    selectStatusToFilterSupplierPO(event, status) {
        if (event.target.checked) {
            this.statusForSupplierPO.push(status)
        }
        else {
            for (let i = 0; i < this.statusForSupplierPO.length; i++) {
                if (this.statusForSupplierPO[i] == status) {
                    this.statusForSupplierPO.splice(i, 1)
                    return
                }
            }
        }
    }

    //////  Supplier wise PO List Filters ends here ////////////

    ///// Supplier wise RMA List starts from here /////////////////

    supplierActiveRMA = 'active'
    supplierActiveRMAOrders(str) {
        this.supplierActiveRMA = str
        this.getSupplierRMAOrders()
    }

    supplierRMAArrivalsFilters = ''
    supplierRMAArrivalFilters(value) {
        this.supplierRMAToDate = ''
        this.supplierRMAFromDate = ''
        this.supplierRMAArrivalsFilters = value
        this.getSupplierRMAOrders()
    }

    supplierRMADateRangeFilter() {
        this.getSupplierRMAOrders()
        this.modalRef.hide()
    }

    supplierRMAToDate = ''
    supplierRMAFromDate = ''
    serachSupplierRMA(event) {
        this.supplierRMASearch = event
        this.getSupplierRMAOrders()
    }

    supplierRMAOrders = []
    supplierLoaderRMA = false
    supplierRMASearch = ''
    allowedStatusesRMA = []
    getSupplierRMAOrders() {
        let obj = {
            supplier_id: this.currentSupplier['_id'],
            limit: 1000,
            location_id: localStorage.getItem('location_id'),
            orderStatus: this.statusForSupplierRMA.length == 0 ? null : this.statusForSupplierRMA,
            skip: 0
        }
        obj['active'] = this.supplierActiveRMA
        obj['transactiontype'] = AllowedTransactionType.Rma
        obj['search'] = this.supplierRMASearch
        obj['startDate'] = this.supplierRMAFromDate == '' ? null : this.supplierRMAFromDate
        obj['endDate'] = this.supplierRMAToDate == '' ? null : this.supplierRMAToDate
        if (this.supplierRMAArrivalsFilters != '') {
            obj['arrivals'] = ArrivalsFilter[this.supplierRMAArrivalsFilters]
        }
        obj = this.cleanObject(obj)
        this.supplierLoaderRMA = true
        this.supplierPoListGQL.watch(
            {
                input: JSON.parse(JSON.stringify(obj))
            }).valueChanges.subscribe(
                (res) => {
                    console.log('supplier orders are', res['data'].supplierPOList);
                    this.supplierLoaderRMA = false
                    let returnVal = res['data'].supplierPOList
                    if (returnVal != null) {
                        this.supplierRMAOrders = res['data'].supplierPOList.transaction
                        this.allowedStatusesRMA = res['data'].supplierPOList.available_status
                    }
                }, (err) => {
                    console.log('err while loading supplier orders', err);
                    this.supplierLoaderRMA = false
                }
            )
    }

    returnSelectedStatusesForSupplierRMA(status) {
        let found = this.statusForSupplierRMA.find(element => element == status);
        return found == undefined ? false : true
    }

    statusForSupplierRMA = []
    selectStatusToFilterSupplierRMA(event, status) {
        if (event.target.checked) {
            this.statusForSupplierRMA.push(status)
        }
        else {
            for (let i = 0; i < this.statusForSupplierRMA.length; i++) {
                if (this.statusForSupplierRMA[i] == status) {
                    this.statusForSupplierRMA.splice(i, 1)
                    return
                }
            }
        }
    }

    //////// Supplier wise RMA List ends here ////////////////////

    //////// Supplier wise BuyBack List starts from here ///////
    changeSupplierIsBuyBack(supplier, isBuyBack) {
        this.supplierLoaderBB = true
        this.stockService.changesupplierBuyBackStatus(supplier['_id'], isBuyBack)
            .subscribe(
                (res) => {
                    supplier.is_buyback = isBuyBack
                    supplier = this.supplierRestockData
                    this.supplierRestockData = null
                    this.supplierLoaderBB = false

                    setTimeout(() => { this.supplierRestockData = supplier });

                }, (err) => {
                    this.supplierLoaderBB = false
                    this.showToaster = false
                    this.toasterMsg = err.message
                    this.toasterType = 'error'
                    // this.showToaster('Something went wrong, Please try again.', 'error')
                })
    }

    supplierActiveBB = 'active'
    supplierActiveBBOrders(str) {
        this.supplierActiveBB = str
        this.getSupplierBBOrders()
    }

    supplierBBArrivalsFilters = ''
    supplierBBArrivalFilters(value) {
        this.supplierBBToDate = ''
        this.supplierBBFromDate = ''
        this.supplierBBArrivalsFilters = value
        this.getSupplierBBOrders()
    }

    supplierBBDateRangeFilter() {
        this.getSupplierBBOrders()
        this.modalRef.hide()
    }

    supplierBBToDate = ''
    supplierBBFromDate = ''
    serachSupplierBB(event) {
        this.supplierBBSearch = event
        this.getSupplierBBOrders()
    }

    supplierBBOrders = []
    supplierLoaderBB = false
    supplierBBSearch = ''
    allowedStatusesBB = []
    getSupplierBBOrders() {
        let obj = {
            supplier_id: this.currentSupplier['_id'],
            limit: 1000,
            location_id: localStorage.getItem('location_id'),
            orderStatus: this.statusForSupplierBB.length == 0 ? null : this.statusForSupplierBB,
            skip: 0
        }
        obj['active'] = this.supplierActiveBB
        obj['transactiontype'] = AllowedTransactionType.Buyback
        obj['search'] = this.supplierBBSearch
        obj['startDate'] = this.supplierBBFromDate == '' ? null : this.supplierBBFromDate
        obj['endDate'] = this.supplierBBToDate == '' ? null : this.supplierBBToDate
        if (this.supplierBBArrivalsFilters != '') {
            obj['arrivals'] = ArrivalsFilter[this.supplierBBArrivalsFilters]
        }
        obj = this.cleanObject(obj)
        this.supplierLoaderBB = true
        this.supplierPoListGQL.watch(
            {
                input: JSON.parse(JSON.stringify(obj))
            }).valueChanges.subscribe(
                (res) => {
                    console.log('supplier orders are', res['data'].supplierPOList);
                    this.supplierLoaderBB = false
                    let returnVal = res['data'].supplierPOList
                    if (returnVal != null) {
                        this.supplierBBOrders = res['data'].supplierPOList.transaction
                        this.allowedStatusesBB = res['data'].supplierPOList.available_status
                    }
                }, (err) => {
                    console.log('err while loading supplier orders', err);
                    this.supplierLoaderBB = false
                }
            )
    }

    returnSelectedStatusesForSupplierBB(status) {
        let found = this.statusForSupplierBB.find(element => element == status);
        return found == undefined ? false : true
    }

    statusForSupplierBB = []
    selectStatusToFilterSupplierBB(event, status) {
        if (event.target.checked) {
            this.statusForSupplierBB.push(status)
        }
        else {
            for (let i = 0; i < this.statusForSupplierBB.length; i++) {
                if (this.statusForSupplierBB[i] == status) {
                    this.statusForSupplierBB.splice(i, 1)
                    return
                }
            }
        }
    }

    /////////// Supplier wise BuyBack List ends here ////////////

    BackBtn(val, val1) {
        this[val] = false
        this[val1] = true
    }

    //========================= G.Setting ==Variable====================// 
    showSetting(val, val1) {
        this[val] = true
        this[val1] = false
    }

    subSettingPOS = false
    POS = false
    noCCSett = true
    noCashSett = true
    noChecqueSett = true
    noPaypalSett = true
    noNetTermsSett = true
    nostoreCreditSett = true
    noCouponsSett = true
    noPayInvoiceSett = true
    notwillioIntSett = true
    nopayPalIntSett = true
    notbrainTreeIntSett = true
    //////////////////////////
    creditCardSetting = false
    cashSetting = false
    checqueSetting = false
    PaypalSetting = false
    netTermsSetting = false
    storeCreditSetting = false
    couponsSetting = false
    PayInvoiceSetting = false
    twillioIntSetting = false
    payPalIntSetting = false
    brainTreeIntSetting = false
    //////////////////////
    changeCreditCard = false
    changeCash = false
    changeChecque = false
    changePaypal = false
    changenetTerms = false
    changestoreCredit = false
    changeCoupons = false
    changePayInvoice = false
    changetwillioInt = false
    changepayPalInt = false
    changebrainTreeInt = false

    //////////===========Custom TOSTER=====================//////////
    hideToster = false
    showToster = false
    closetoster() {
        this.hideToster = true
    }
    opentoster() {
        this.showToster = true
    }

    openCheckout() {
        this.stocksection = false
        this.checkOutsection = true
    }
    ///////==========Order List Status=======///////

    orderRecordPayment() {
        this.stocksection = false
        this.checkOutsection = true
    }
    openCurrentStatus() {
        this.existingPO = false
        this.poStatus = true
    }
    openRecevieOrder() {
        this.poStatus = false
        this.poDetails = true
        this.orderText = "P.O."
    }

    //===================poSupplierOrderNumber =================================//
    orderNumber = ''
    orderNumberLoader = false
    poSupplierOrderNumberFun(order) {
        if (this.orderNumber == '' || this.orderNumber == null) {
            return
        }
        this.orderNumberLoader = true
        this.poSupplierOrderNumber.mutate({
            orderID: order['_id'],
            order_number: this.orderNumber
        }).subscribe(
            (res) => {
                this.orderNumberLoader = false
                let returnVal = res['data'].POSupplierOrderNumber
                if (returnVal != null) {
                    this.orderDetail['supplier_order_number'] = this.orderNumber
                    // this.toaster.showSuccess('Supplier’s order number added successfully.', 'Order Number')
                    this.showToaster = false
                    this.toasterMsg = 'Supplier’s order number added successfully.'
                    this.toasterType = 'success'
                } else {
                    // this.toaster.showError('Something Went Wrong.', 'Try Again')
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong, Please try again.'
                    this.toasterType = 'error'
                }
            }, (err) => {
                this.orderNumberLoader = false
                let message = err.graphQLErrors[0].message
                // this.toaster.showError('Something Went Wrong.', 'Try Again')
                this.showToaster = false
                this.toasterMsg = 'Something went wrong, Please try again.'
                this.toasterType = 'error'
                console.log('POSupplierOrderNumber err', message);
            }
        )
    }

    //============================= poSupplierOrderNumber ======================//


    //============================= P.O Statuses starts from here ASAD ======================//

    deltePO() {
        this.poDeleteGQL.mutate({
            orderID: this.orderDetail['_id']
        }).subscribe(
            (res) => {
                if (res['data'].PODelete) {
                    this.showToaster = false
                    this.toasterMsg = 'PO successfully deleted'
                    this.toasterType = 'success'
                    this.poStatus = false
                    this.existingPO = true
                    this.restock = true
                    this.selectRItems = false
                    this.selectRType = true
                    this.sprNote = ''
                    this.sprDiscountValue = 0
                    this.mbpGrandTotal = 0
                    this.sprGrandTotal = 0
                    this.sprSubTotal = 0
                    this.sprNote = ''
                    this.sprNoteOption = true
                    this.sprOrderID = ''
                    this.sprTax = 0
                    this.productsRestockOrderDetail = {}
                    this.restockSerachCheck = false
                    this.getpurchaseOrders()
                    this.modalRef.hide()
                }
            }, (err) => {
                console.log('error while deleting po', err);
                this.showToaster = false
                this.toasterMsg = err.graphQLErrors[0].message
                this.toasterType = 'error'
            }
        )
    }

    downloadPO(type) {
        this.selectedOrder = []
        this.selectedOrder.push(this.orderDetail)
        this.stockService.printAndExportOrders(this.selectedOrder, true, type)
        this.modalRef.hide()
    }

    storeCreditSelected = false
    changePaymentReturnMethod(bool) {
        this.storeCreditSelected = bool
    }

    openRefundNextView() {
        this.cancelPOSubmitted = true
        if (this.refundDate == null) {
            // this.showToaster = false
            // this.toasterMsg = 'Please select refund date'
            // this.toasterType = 'error'
            return
        }
        if (this.isReceiveRefund) {
            this.receiveRefund()
            return
        }
        this.cancelPOSubmitted = false
        if (this.storeCreditSelected) {
            this.refundView = false
            this.userAuthorizationView = true
            return
        }
        this.refundView = false
        this.paymentView = true
    }

    backToPrev(val, val1) {
        this[val] = false
        this[val1] = true
    }

    backtoPaymentView() {
        if (this.storeCreditSelected) {
            this.userAuthorizationView = false
            this.refundView = true
            return
        }
        this.userAuthorizationView = false
        this.paymentView = true
    }

    cancelPOSubmitted = false
    methodToRefund: any
    refundDate: any
    userEmail = ''
    userPwd = ''
    userNotValid = false
    userMsg = ''
    cancelPO() {
        this.cancelPOSubmitted = true
        if (this.userEmail == '' || this.userPwd == '') {
            // this.showToaster = false
            // this.toasterMsg = 'Please fill all fields'
            // this.toasterType = 'error'
            return
        }
        this.cancelPOSubmitted = false
        this.poCancelGQL.mutate({
            orderID: this.orderDetail['_id'],
            refund_payment_type: this.storeCreditSelected ? RefundPaymentType.StoreCredit : RefundPaymentType.OriginalMethod,
            refund_amount: this.storeCreditSelected ? Number(this.totalRefund) : 0,
            password: this.userPwd,
            refund_date: this.refundDate,
            username: this.userEmail
        }).subscribe(
            (res) => {
                if (res['data'].POCancel) {
                    this.showToaster = false
                    this.toasterMsg = 'PO cancelled successfully'
                    this.toasterType = 'success'
                    this.modalRef.hide()
                    this.refundDate = null
                    this.userAuthorizationView = false
                    this.refundView = true
                    this.userNotValid = false
                    this.userEmail = ''
                    this.userPwd = ''
                    this.getpurchaseOrders()
                    this.getAllProducts()
                    this.cancel('poStatus', 'existingPO')
                    return
                }
                this.showToaster = false
                this.toasterMsg = 'Something went wrong while deleting PO'
                this.toasterType = 'error'
            }, (err) => {
                this.showImportToaster = false
                this.toasterMsg = err.graphQLErrors[0].message
                this.toasterType = 'error'
                this.userNotValid = true
                // this.showToaster = false
                // this.toasterMsg = err.graphQLErrors[0].message
                // this.toasterType = 'error'
                this.userMsg = err.graphQLErrors[0].message
                console.log('error while deleting po', err);
            }
        )
    }



    //============================= P.O Statuses ends here ASAD ======================//

    loadStoreCredit() {
        this.manageCredit = true
        this.cutomerInfo = false
        this.netTermsPayment = false
        this.createNote = false
    }
    loadStoreTransCredit() {
        this.transferCredit = true
        this.cutomerInfo = false
        this.manageCredit = false
        this.netTermsPayment = false
        this.createNote = false
    }

    showToaster = true
    toasterMsg = 'no msg'
    toasterType = 'error'
    closeToaster() {
        this.showToaster = true
    }

    ////================ Cancel PO Functions ===================/////
    closerefundView() {
        this.isReceiveRefund = false
        this.modalRef.hide();
    }

    openpaymentView() {
        this.paymentView = true
        this.refundView = false
    }

    openuserAuthorizationView() {
        this.userAuthorizationView = true
        this.refundView = false
    }
    openUserAuthorization() {
        this.userAuthorizationView = true
        this.paymentView = false
    }
    backtoRefundView() {
        this.refundView = true
        this.paymentView = false
    }
    doneCanelProcess() {
        this.modalRef.hide();
    }

    backtoRefundViewFromAutho() {
        this.refundView = true
        this.userAuthorizationView = false
    }
    addFieldBoxBrand = false
    addBtnBoxBrand = true
    addBtnBoxModel = true
    addFieldBoxModel = false
    showAddFieldBrand() {
        this.addFieldBoxBrand = true
        this.addBtnBoxBrand = false
    }

    showAddFieldModel() {
        this.addBtnBoxModel = false
        this.addFieldBoxModel = true
    }

    importPODrop = false;
    openimportPO() {
        this.importPODrop = !this.importPODrop;
    }
    SelectAllDrop = false;
    openSelectAll() {
        this.SelectAllDrop = !this.SelectAllDrop;
    }
    SelectAllDropProducts = false;
    openSelectAllProducts() {
        this.productSettingsOpen = false
        this.SelectAllDropProducts = !this.SelectAllDropProducts;
    }

    supplierSettingsOpen = false;
    openSupplierSettings() {
        this.supplierSettingsOpen = !this.supplierSettingsOpen;
    }
    productSettingsOpen = false;
    openProductSettings(bool) {
        if (bool) {
            this.productSettingsOpen = !this.productSettingsOpen;
            this.SelectAllDropProducts = false
            return
        }
        this.productSettingsOpen = bool;
        this.SelectAllDropProducts = false
    }

    linkedDevicesOpen = false;
    openlinkedDevices(index) {
        for (let i = 0; i < this.allProducts.length; i++) {
            if (i != index) {
                this.allProducts[i].linkedDevicesOpen = false
            }
        }
        this.allProducts[index].linkedDevicesOpen = !this.allProducts[index].linkedDevicesOpen
        // this.linkedDevicesOpen = !this.linkedDevicesOpen;
    }
    closelinkedDevices() {
        this.linkedDevicesOpen = false
    }
    closeMBProduct() {
        // this.linkedDevicesOpen = false
    }

    //============================== RMA Start ================================================//

    rmaLimit = 10000
    rmaSkip = 0
    rmaProductData: any
    rmaReturnProducts = []
    showRMAProductList = false
    rmaSearchingLoader = false
    getRMAProductBySupplierFun() {
        this.supplierRestockLoader = true
        this.getRMAProductBySupplier.watch({
            input: {
                locationId: window.localStorage.getItem('location_id'),
                search: this.rmaSearch.value == null ? "" : this.rmaSearch.value,
                supllierId: this.supplierRestockSelected['_id'],
                limit: this.rmaLimit,
                skip: this.rmaSkip,
            }
        }).valueChanges.subscribe(
            (res) => {
                this.supplierRestockLoader = false
                this.rmaSearchingLoader = false
                console.log('getRMAProductBySupplier res', res['data'].getProductBySupplier);
                this.rmaProductData = res['data'].getProductBySupplier
                if (!this.isObjectEmpty(this.rmaProductData)) {
                    this.selectRSupplier = false
                    this.selectRShipping = false
                    this.selectRItems = true
                } else {
                    this.showToaster = false
                    this.toasterMsg = 'This supplier does not have an SKU linked to a product'
                    this.toasterType = 'error'
                    return
                }
            }, (err) => {
                this.supplierRestockLoader = false
                this.rmaSearchingLoader = false
                let message = err.graphQLErrors[0].message
                console.log('getRMAProductBySupplier err', message);
            }
        )
    }

    displayRMAProducts(value) {
        this.showRMAProductList = value

    }

    rmaQuantityInput(index) {
        this.rmaReturnProducts[index]['quantityInput'] = true
    }

    rmaMiuns(index) {
        if (this.rmaReturnProducts[index]['quantity'] == 0) {
            this.rmaReturnProducts[index]['total'] = 0
            return
        }
        this.rmaReturnProducts[index]['quantity'] = Number(this.rmaReturnProducts[index]['quantity']) - 1
        this.rmaReturnProducts[index]['total'] = Number(this.rmaReturnProducts[index]['quantity']) * Number(this.rmaReturnProducts[index]['average_cost'])
        this.calculateRMATotal()
    }

    rmaPluse(index) {
        if (Number(this.rmaReturnProducts[index]['quantity']) >= Number(this.rmaReturnProducts[index]['ProductStockPrice'][0].qty_available)) {
            this.showToaster = false
            this.toasterMsg = 'Available quantity is' + ' ' + this.rmaReturnProducts[index]['ProductStockPrice'][0].qty_available
            this.toasterType = 'error'
            return
        }
        this.rmaReturnProducts[index]['quantity'] = Number(this.rmaReturnProducts[index]['quantity']) + 1
        this.rmaReturnProducts[index]['total'] = Number(this.rmaReturnProducts[index]['quantity']) * Number(this.rmaReturnProducts[index]['average_cost'])
        this.calculateRMATotal()
    }

    doneRMAQuantityInput(index, value) {
        let num = Number(value)
        if (num < 0) {
            this.rmaReturnProducts[index]['quantity'] = 0
            return
        }
        if (num >= Number(this.rmaReturnProducts[index]['ProductStockPrice'][0].qty_available)) {
            num = Number(this.rmaReturnProducts[index]['ProductStockPrice'][0].qty_available)
            this.showToaster = false
            this.toasterMsg = 'Available quantity is' + ' ' + this.rmaReturnProducts[index]['ProductStockPrice'][0].qty_available
            this.toasterType = 'error'
        }
        this.returnItemRMA = this.returnItemRMA + 1
        this.rmaReturnProducts[index]['quantity'] = Number(num)
        this.rmaReturnProducts[index]['total'] = Number(this.rmaReturnProducts[index]['quantity']) * Number(this.rmaReturnProducts[index]['average_cost'])
        this.rmaReturnProducts[index]['quantityInput'] = false
        this.calculateRMATotal()
    }

    changeRMAcost(index) {
        this.rmaReturnProducts[index]['total'] = Number(this.rmaReturnProducts[index]['quantity']) * Number(this.rmaReturnProducts[index]['average_cost'])
        this.calculateRMATotal()
    }

    estimatedPayOutRMA = 0
    rmaDate = new Date();
    calculateRMATotal() {
        this.estimatedPayOutRMA = 0
        this.returnItemRMA = 0
        for (let i = 0; i < this.rmaReturnProducts.length; i++) {
            this.estimatedPayOutRMA = Number(this.rmaReturnProducts[i]['total']) + Number(this.estimatedPayOutRMA)
            this.returnItemRMA = this.returnItemRMA + Number(this.rmaReturnProducts[i]['quantity'])
        }
    }

    deleteItemFromRMA() {
        if (this.rmaDeleteProductIndex == -1) {
            return
        }
        this.rmaReturnProducts.splice(this.rmaDeleteProductIndex, 1);
        this.calculateRMATotal()
    }

    rmaDeleteProductIndex = -1
    openRMADeleteModal(template: TemplateRef<any>, cls, index) {
        this.rmaDeleteProductIndex = index
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }

    closeRMADeleteModel() {
        this.modalRef.hide()
    }

    selectRMAProduct(product) {
        if (product['ProductStockPrice'][0].qty_available < 1) {
            this.showToaster = false
            this.toasterMsg = 'Product available quantity is zero'
            this.toasterType = 'error'
            return
        }
        product['quantityInput'] = false
        product['quantity'] = 1
        product['total'] = Number(product.average_cost)
        var index = this.rmaReturnProducts.map(x => {
            return x.Suppliers[0].sku_number;
        }).indexOf(product['Suppliers'][0].sku_number);
        if (index != -1) {
            if (Number(this.rmaReturnProducts[index]['quantity']) >= Number(product['ProductStockPrice'][0].qty_available)) {
                this.showToaster = false
                this.toasterMsg = 'Available quantity is' + ' ' + this.rmaReturnProducts[index]['ProductStockPrice'][0].qty_available
                this.toasterType = 'error'
                return
            }
            // this.rmaReturnProducts[index]['quantity'] = this.rmaReturnProducts[index]['quantity'] + 1
            this.showRMAProductList = false
            this.rmaPluse(index)
            return
        }
        this.returnItemRMA = this.returnItemRMA + 1
        this.rmaReturnProducts.push(JSON.parse(JSON.stringify(product)))
        // this.rmaReturnProducts.push(product)
        this.showRMAProductList = false
        this.calculateRMATotal()

    }

    rmaDateError = false
    transactionIdRMA = ''
    rmaLoader = false
    createRMAOrderFun(status, check) {
        if (this.isObjectEmpty(this.rmaReturnProducts)) {
            this.showToaster = false
            this.toasterMsg = 'Please add product first'
            this.toasterType = 'error'
            return
        }
        let rmaTrans = []
        for (let i = 0; i < this.rmaReturnProducts.length; i++) {
            let product = {}
            product['Product'] = this.rmaReturnProducts[i]['_id']
            product['skuNo'] = this.rmaReturnProducts[i]['Suppliers'][0]['sku_number']
            product['rma_quantity'] = Number(this.rmaReturnProducts[i]['quantity'])
            product['productCostPrice'] = parseFloat(this.rmaReturnProducts[i]['average_cost'].toString())
            product['sub_total'] = parseFloat(this.rmaReturnProducts[i]['total'])
            product['totalAmount'] = parseFloat(this.rmaReturnProducts[i]['total'])
            if (this.rmaReturnProducts[i]['quantity'] != 0) {
                rmaTrans.push(product)
            }
        }
        if (this.isObjectEmpty(rmaTrans)) {
            this.showToaster = false
            this.toasterMsg = 'Please add quantity first'
            this.toasterType = 'error'
            return
        }
        let transactionStatus: any
        let orderStatus: any
        if (status != 'submit') {
            transactionStatus = AllowedTransactionStatus.Draft
            orderStatus = AllowedOrdertStatus.Draft
        } else {
            transactionStatus = AllowedTransactionStatus.Order
            orderStatus = AllowedOrdertStatus.Ordered
        }
        this.rmaLoader = true
        this.createRMAOrder.mutate({
            transactionId: this.transactionIdRMA == null || this.transactionIdRMA == undefined ? "" : this.transactionIdRMA,
            input: {
                transaction_type: AllowedTransactionType.Rma,
                transaction_status: transactionStatus,
                order_status: orderStatus,
                transaction_date: this.rmaDate,
                sub_total_amount: parseFloat(this.estimatedPayOutRMA.toString()),
                total_amount: parseFloat(this.estimatedPayOutRMA.toString()),
                Supplier: this.supplierRestockSelected['_id'],
                TransactionRMA: rmaTrans,
                BusinessLocation: window.localStorage.getItem('location_id')
            }
        }).subscribe(
            (res) => {
                this.rmaLoader = false
                console.log('createRMAOrder res', res['data'].createRMAOrder);
                let returnVal = res['data'].createRMAOrder
                if (returnVal != null) {
                    if (status == 'submit') {
                        this.currentOrderId = returnVal['_id']
                        this.orderDetail['_id'] = returnVal['_id']
                        let supplier = {}
                        supplier['_id'] = this.supplierRestockSelected['_id']
                        supplier['supplier_company'] = this.supplierRestockSelected['supplier_company']
                        this.orderDetail['Supplier'] = supplier
                        let status = {}
                        status['status_background_color'] = "#774bd0"
                        status['status_font_color'] = "#fff"
                        status['status_icon'] = null
                        status['status_name'] = "Submitted"
                        status['__typename'] = "TPstatus"
                        this.orderDetail['dynamic_status'] = status
                        this.disgardRMA()
                        this.getpurchaseOrders()
                        this.getOrderByID()
                        this.rmaDetailFun(this.orderDetail)

                        return
                        //    this.purchaseOrderDetail(pOrder)
                    } else {
                        this.disgardRMA()
                        this.getpurchaseOrders()
                    }
                } else {
                    this.showToaster = false
                    this.toasterMsg = 'Something went wrong'
                    this.toasterType = 'error'
                }
            }, (err) => {
                this.rmaLoader = false
                let message = err.graphQLErrors[0].message
                console.log('createRMAOrder err', message);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )

    }

    openStoreCredit() {
        let suppier = {}
        suppier['_id'] = this.orderDetail['Supplier']['_id']
        this.supplierInfoDetail(suppier)
        this.existingPO = true
        this.poStatus = false
        this.managesuppliers = true
        this.cutomerInfo = true
        this.restock = false
        this.selectRType = true
        this.clearAllPOFilters()
        setTimeout(() => {
            this.staticTabs.tabs[0].active = false;
            this.staticTabs.tabs[5].active = true;
        }, 200)
    }

    rmaDateErrorFun() {
        this.rmaDateError = false
    }

    backRMA() {
        this.selectRShipping = false
        this.selectRSupplier = true
        this.selectRItems = false
        this.selectRType = false
    }

    disgardRMA() {
        this.rmaLimit = 10000
        this.rmaSkip = 0
        this.rmaProductData = {}
        this.rmaReturnProducts = []
        this.showRMAProductList = false
        this.rmaSearchingLoader = false
        this.estimatedPayOutRMA = 0
        this.rmaDate = new Date();
        this.rmaDateError = false
        this.rmaDeleteProductIndex = -1
        this.selectRItems = false
        this.selectRType = true
        this.selectRSupplier = false
        this.selectOrderProcess = ''
        this.supplierRestockSelected = {}
        if (this.transactionIdRMA != '') {
            this.cancel('poStatus', 'existingPO')
        }
        this.rmaDetailsSession = false
        this.transactionIdRMA = ''
        this.rmaSupTrackingNumber = ''
    }

    rmaOrderDetail = {}
    rmaOrderID = ''
    rmaDetailsSession = false
    rmaDetailFun(poOrder) {
        this.supplierRestockSelected['_id'] = poOrder['Supplier']._id
        this.supplierRestockSelected['supplier_company'] = poOrder['Supplier'].supplier_company
        this.loadSection('R')
        this.existingPO = false
        this.poStatus = true
        this.mbpClicked = false
        this.orderText = 'RMA'
        this.selectOrderProcess = 'RMA'
        this.rmaOrderDetail = poOrder
        this.transactionIdRMA = poOrder._id
        this.getRMAOrderFun(poOrder._id)
        if (poOrder['dynamic_status'].status_name == 'Draft') {
            this.getRMAProductBySupplierFun()
            this.transactionIdRMA = poOrder._id
            this.rmaOrderID = poOrder._id
            this.restock = true
            this.selectRItems = true
            this.selectRSupplier = false
            this.selectRShipping = false
            this.selectRType = false
        } else {
            this.trakingNo = false
            this.trackingNumberEdit = false
            this.addTrackingSubmitted = false
            this.initializeAddTrackingFrom(this.currentOrderId)
            this.restock = false
            this.rmaDetailsSession = true
            this.getOrderByID()
            this.addCost = Number(this.rmaOrderDetail['final_total']) - (Number(this.rmaOrderDetail['tax_amount']) + Number(this.rmaOrderDetail['total_amount']))
        }
    }

    supplierRMATracNum = ''
    returnItemRMA = 0
    getRMAOrderFun(id) {
        this.getRMAOrder.watch({
            transactionId: id
        }).valueChanges.subscribe(
            (res) => {
                console.log('getRMAOrder res', res['data'].getRMAOrder);
                let returnVal = res['data'].getRMAOrder
                this.orderDetail['supplier_rma_number'] = returnVal.supplier_rma_number == null ? "" : returnVal.supplier_rma_number
                if (returnVal != null) {
                    this.rmaReturnProducts = []
                    this.returnItemRMA = 0
                    if (this.orderDetail['dynamic_status'].status_name == 'Draft') {
                        for (let i = 0; i < returnVal['TransactionRMA'].length; i++) {
                            let product = {}
                            product['_id'] = returnVal['TransactionRMA'][i].Product['_id']
                            product['product_name'] = returnVal['TransactionRMA'][i].Product['product_name']
                            product['sku'] = returnVal['TransactionRMA'][i].skuNo
                            product['Suppliers'] = []
                            product['average_cost'] = returnVal['TransactionRMA'][i].productCostPrice
                            product['quantityInput'] = false
                            product['quantity'] = returnVal['TransactionRMA'][i].rma_quantity
                            product['total'] = returnVal['TransactionRMA'][i].sub_total
                            product['ProductStockPrice'] = []
                            let obj = {}
                            obj['qty_available'] = returnVal['TransactionRMA'][i].Product['ProductStockPrice'][0].qty_available
                            product['ProductStockPrice'].push(obj)
                            product['Suppliers'][0] = {}
                            product['Suppliers'][0]['sku_number'] = returnVal['TransactionRMA'][i].skuNo
                            this.returnItemRMA = this.returnItemRMA + Number(returnVal['TransactionRMA'][i].rma_quantity)
                            this.rmaReturnProducts.push(product);
                        }
                    } else {
                        if (this.orderDetail['dynamic_status'].status_name == 'Completed') {
                            for (let i = 0; i < returnVal['TransactionRMA'].length; i++) {
                                let product = {}
                                product['Product'] = returnVal['TransactionRMA'][i].Product['_id']
                                product['skuNo'] = returnVal['TransactionRMA'][i].skuNo
                                product['productCostPrice'] = returnVal['TransactionRMA'][i].productCostPrice
                                product['sub_total'] = Number(returnVal['TransactionRMA'][i].productCostPrice) * Number(returnVal['TransactionRMA'][i].approved_quantity)
                                product['totalAmount'] = Number(returnVal['TransactionRMA'][i].productCostPrice) * Number(returnVal['TransactionRMA'][i].approved_quantity)
                                product['approved_quantity'] = returnVal['TransactionRMA'][i].approved_quantity == null ? '--' : returnVal['TransactionRMA'][i].approved_quantity
                                product['receiving_quantity'] = returnVal['TransactionRMA'][i].receiving_quantity == null ? '--' : returnVal['TransactionRMA'][i].receiving_quantity
                                product['quantity'] = returnVal['TransactionRMA'][i].rma_quantity
                                product['product_name'] = returnVal['TransactionRMA'][i].Product['product_name']
                                this.returnItemRMA = this.returnItemRMA + Number(returnVal['TransactionRMA'][i].rma_quantity)
                                this.rmaReturnProducts.push(product);
                            }
                        } else {
                            // this.orderDetail['total_amount'] = 0
                            for (let i = 0; i < returnVal['TransactionRMA'].length; i++) {
                                let product = {}
                                product['Product'] = returnVal['TransactionRMA'][i].Product['_id']
                                product['skuNo'] = returnVal['TransactionRMA'][i].skuNo
                                product['productCostPrice'] = returnVal['TransactionRMA'][i].productCostPrice
                                product['sub_total'] = returnVal['TransactionRMA'][i].sub_total
                                product['totalAmount'] = returnVal['TransactionRMA'][i].sub_total
                                product['approved_quantity'] = 0
                                product['receiving_quantity'] = 0
                                product['bounceForAQ'] = false
                                product['bounceForRQ'] = false
                                product['quantity'] = returnVal['TransactionRMA'][i].rma_quantity
                                product['product_name'] = returnVal['TransactionRMA'][i].Product['product_name']
                                this.returnItemRMA = this.returnItemRMA + Number(returnVal['TransactionRMA'][i].rma_quantity)
                                this.rmaReturnProducts.push(product);
                            }
                        }
                    }
                    this.estimatedPayOutRMA = Number(returnVal.sub_total_amount)
                    this.rmaDate = new Date(this.datePipe.transform(returnVal.transaction_date, 'MM-dd-yyyy'));
                    this.rmaDateError = false
                    this.rmaDeleteProductIndex = -1
                    this.supplierRMATracNum = ''
                    this.loadOrder = false
                }
            }, (err) => {
                let message = err.graphQLErrors[0].message
                console.log('getRMAOrder err', message);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )
    }

    rmaSupNumber = ''
    rmaSupNumberLoader = false
    rmaSupTrackingNumber = ''
    actualRMA = 0
    toasterMsgRMAInvalidPass = true
    updateRMAStatusFun(value) {
        let updateInput = {
            is_add_supplier_rma: false
        }

        if (value == 'Canceled') {
            this.cancelPOSubmitted = true
            this.userNotValid = false
            this.toasterMsg = ''
            if (this.userEmail == '' || this.userPwd == '') {
                return
            }
            if (!this.stockService.validateEmail(this.userEmail)) {
                this.toasterMsgRMAInvalidPass = false
                this.toasterMsg = 'Your email is invalid. Please enter correct email'
                this.toasterType = 'error'
                this.userNotValid = true
                return
            }
            this.cencleButtonDisable = true
            this.cancelPOSubmitted = false
            updateInput['transactionId'] = this.transactionIdRMA//this.orderDetail['_id'],
            updateInput['assign_status'] = AssignRmaStatus.Cancel
            updateInput['is_add_supplier_rma'] = false
            updateInput['username'] = this.userEmail,
                updateInput['password'] = this.userPwd

        } else if (value == 'Delivered') {
            updateInput['transactionId'] = this.transactionIdRMA//this.orderDetail['_id'],
            updateInput['assign_status'] = AssignRmaStatus.Delievery
            updateInput['is_add_supplier_rma'] = false

        } else if (value == 'Deleted') {
            updateInput['transactionId'] = this.transactionIdRMA//this.orderDetail['_id'],
            updateInput['assign_status'] = AssignRmaStatus.Deleted
            updateInput['is_add_supplier_rma'] = false

        } else if (value.contentEditable == "inherit") {
            if (value.value == '') {
                return
            }
            this.orderDetail['supplier_rma_number'] = value.value
            updateInput['transactionId'] = this.transactionIdRMA//this.orderDetail['_id'],
            updateInput['is_add_supplier_rma'] = true
            updateInput['supplier_rma_number'] = value.value
        }
        else {
            updateInput['transactionId'] = this.transactionIdRMA//this.orderDetail['_id'],
            updateInput['assign_status'] = AssignRmaStatus.OnTransit
            updateInput['is_add_supplier_rma'] = false
            updateInput['shipping_company'] = value.company_name
            updateInput['tracking_number'] = value.tracking_number
            updateInput['estimated_date'] = value.estimated_days
            this.rmaSupTrackingNumber = value.tracking_number
        }

        this.updateRMAStatus.mutate({
            input: updateInput
        }).subscribe(
            (res) => {
                this.orderDetail['dynamic_status'] = res['data'].updateRMAStatus.dynamic_status
                var index = this.purchaseOrders.map(x => {
                    return x._id;
                }).indexOf(this.orderDetail['_id']);
                this.purchaseOrders[index]['dynamic_status'] = res['data'].updateRMAStatus.dynamic_status
                if (value == 'Canceled') {
                    this.applyActiveFilter('completed')
                    this.cencleButtonDisable = false
                    this.showToaster = false
                    this.toasterMsg = 'RMA Cancelled Successfully'
                    this.toasterType = 'success'
                    this.modalRef.hide()
                    this.refundDate = null
                    this.userNotValid = false
                    this.userEmail = ''
                    this.userPwd = ''
                    this.getpurchaseOrders()
                    this.cancel('poStatus', 'existingPO')
                    this.disgardRMA()
                    let status = {}
                    status['status_background_color'] = "#ed1c24"
                    status['status_font_color'] = "#fff"
                    status['status_icon'] = null
                    status['status_name'] = "Canceled"
                    status['__typename'] = "TPstatus"
                    this.orderDetail['dynamic_status_list'].push(status)
                    return

                } else if (value == 'Delivered') {
                    let status = {}
                    status['status_background_color'] = "#39b54a"
                    status['status_font_color'] = "#fff"
                    status['status_icon'] = null
                    status['status_name'] = "Delivered"
                    status['__typename'] = "TPstatus"
                    this.orderDetail['dynamic_status_list'].push(status)
                    this.showToaster = false
                    this.toasterMsg = 'RMA Delivered Successfully'
                    this.toasterType = 'success'

                } else if (value == 'Deleted') {
                    this.showToaster = false
                    this.toasterMsg = 'RMA  Deleted Successfully'
                    this.toasterType = 'success'
                    this.modalRef.hide()
                    this.getpurchaseOrders()
                    this.disgardRMA()

                } else if (value.contentEditable == "inherit") {
                    this.orderDetail['supplier_rma_number'] = value.value
                    this.showToaster = false
                    this.toasterMsg = 'Supplier RMA Number Added Successfully'
                    this.toasterType = 'success'

                } else {
                    this.orderDetail['shipping_tracking_no'] = value.tracking_number
                    this.orderDetail['shipping_company_name'] = value.company_name
                    this.orderDetail['shipping_estimated_days'] = value.estimated_days
                    this.orderDetail['arrival_Date'] = value.estimated_days
                    this.trakingNo = false
                    this.showToaster = false
                    this.toasterMsg = 'Add Tracking Number Successfully'
                    this.toasterType = 'success'
                    this.addTrackingForm.reset();
                    this.initializeAddTrackingFrom('')
                    this.trackingNumberEdit = false
                    this.onTransitShipingNumLoader = false
                    var index = this.purchaseOrders.map(x => {
                        return x._id;
                    }).indexOf(this.currentOrderId);
                    this.purchaseOrders[index]['shipping_tracking_no'] = value.tracking_number
                    this.purchaseOrders[index]['shipping_company_name'] = value.company_name
                    this.purchaseOrders[index]['shipping_estimated_days'] = value.estimated_days
                    this.addTrackingLoader = false
                    let status = {}
                    status['status_background_color'] = "#fcaa3d"
                    status['status_font_color'] = "#fff"
                    status['status_icon'] = null
                    status['status_name'] = "On Transit"
                    status['__typename'] = "TPstatus"
                    this.orderDetail['dynamic_status_list'].push(status)
                }

            }, (err) => {
                if (err = 'Error: GraphQL error: User not found') {
                    this.toasterMsgRMAInvalidPass = false
                    this.toasterMsg = 'User Not Found. Please enter correct email or password'
                    this.toasterType = 'error'
                    this.cancelPOSubmitted = false
                    this.userNotValid = true
                    this.userMsg = 'User not found'
                    this.cencleButtonDisable = false
                    return
                }
                if (value == 'Canceled') {
                    this.modalRef.hide()
                }
                if (value == 'Deleted') {
                    this.modalRef.hide()
                }
                console.log('error while updating status', err);
            }
        )
    }

    cencleButtonDisable = false
    userErrorForRMA() {
        this.toasterMsgRMAInvalidPass = true
        this.userNotValid = false
    }

    initializeRMATrackingFrom(orderID) {
        this.addTrackingSubmitted = false;
        this.addTrackingForm = this.formbulider.group({
            orderID: [orderID['_id'], Validators.required],
            company_name: ['', Validators.required],
            tracking_number: ['', Validators.required],
            estimated_days: [new Date(), Validators.required],
        });
        if (this.trakingNo) {
            var index = this.orderDetail['dynamic_status_list'].map(x => {
                return x.status_name;
            }).indexOf('On Transit');
            if (index == -1) {
                return
            }
            this.orderDetail['dynamic_status_list'].splice(index, 1)
            this.orderDetail['dynamic_status']['status_name'] = 'Submitted'
            this.trakingNo = true
            return
        }
        this.trackingNumberEdit = false
    }

    addRMATrakingNumber() {
        this.trakingNo = true
        this.trackingNumberEdit = true
        this.addTrackingSubmitted = false;
        this.addTrackingForm = this.formbulider.group({
            orderID: [this.orderDetail['_id'], Validators.required],
            company_name: ['', Validators.required],
            tracking_number: ['', Validators.required],
            estimated_days: [new Date(), Validators.required],
        });
        this.trackingNumberEdit = false
        this.orderDetail['dynamic_status_list'].push({
            status_background_color: "#fcaa3d",
            status_font_color: "#fff",
            status_icon: null,
            status_name: "On Transit"
        }
        )
        this.orderDetail['dynamic_status']['status_name'] = 'On Transit'
    }

    addRMATrackingNumber() {
        if (this.addTrackingForm.invalid) {
            this.addTrackingSubmitted = true;
            return;
        }
        this.addTrackingSubmitted = false;
        this.onTransitShipingNumLoader = true
        this.addTrackingSubmitted = false
        let addTrackingFormData = JSON.parse(JSON.stringify(this.addTrackingForm.value))
        this.updateRMAStatusFun(addTrackingFormData)
    }

    backStepRMASupp() {
        this.selectRItems = false
        this.selectRType = false
        this.selectRSupplier = true
        this.selectRShipping = false
    }

    rmaCompleteLoader = false
    createReceivingRMAFun() {
        let transInput = []
        for (let i = 0; i < this.rmaReturnProducts.length; i++) {
            let product = {}
            product['Product'] = this.rmaReturnProducts[i]['Product']
            product['skuNo'] = this.rmaReturnProducts[i]['skuNo']
            product['productCostPrice'] = parseFloat(this.rmaReturnProducts[i]['productCostPrice'])
            product['sub_total'] = this.rmaReturnProducts[i]['sub_total']
            product['totalAmount'] = this.rmaReturnProducts[i]['totalAmount']
            product['approved_quantity'] = parseFloat(this.rmaReturnProducts[i]['approved_quantity'])
            product['receiving_quantity'] = parseFloat(this.rmaReturnProducts[i]['receiving_quantity'])
            transInput.push(product)
        }
        this.rmaCompleteLoader = true
        this.createReceivingRMA.mutate({
            input: {
                transactionId: this.transactionIdRMA,
                estimated_amount: this.estimatedPayOutRMA,
                actual_amount: this.actualRMA,
                TransactionItemRMA: transInput
            }
        }).subscribe(
            (res) => {
                this.rmaCompleteLoader = false
                console.log('createReceivingRMA res', res['data'].createReceivingRMA);
                let returnVal = res['data'].createReceivingRMA
                if (returnVal != null) {
                    this.orderDetail['dynamic_status'] = returnVal.dynamic_status
                    var index = this.purchaseOrders.map(x => {
                        return x._id;
                    }).indexOf(this.orderDetail['_id']);
                    this.orderDetail['total_amount'] = this.actualRMA
                    this.purchaseOrders.splice(index, 1);
                    // this.purchaseOrders[index]['dynamic_status'] = returnVal.dynamic_status
                    this.orderDetail['dynamic_status'].status_name = 'Completed'
                    let status = {}
                    status['status_background_color'] = "#000000"
                    status['status_font_color'] = "#fff"
                    status['status_icon'] = null
                    status['status_name'] = "Completed"
                    status['__typename'] = "TPstatus"
                    this.orderDetail['dynamic_status_list'].push(status)
                }
            }, (err) => {
                this.rmaCompleteLoader = false
                //let message=err.graphQLErrors[0].message
                // console.log('createReceivingRMA err', message);
                this.showToaster = false
                this.toasterMsg = 'Something went wrong'
                this.toasterType = 'error'
            }
        )

    }

    isReciveAllItem = false
    rmaAllItemRecieve() {
        this.isReciveAllItem = true
        this.actualRMA = 0
        for (let i = 0; i < this.rmaReturnProducts.length; i++) {
            this.rmaReturnProducts[i].receiving_quantity = Number(this.rmaReturnProducts[i].quantity)
            this.rmaReturnProducts[i].approved_quantity = Number(this.rmaReturnProducts[i].quantity)
            let total = Number(this.rmaReturnProducts[i].approved_quantity) * Number(this.rmaReturnProducts[i].productCostPrice)
            this.rmaReturnProducts[i].sub_total = total
            this.actualRMA = this.actualRMA + total
        }
        this.orderDetail['total_amount'] = this.actualRMA
    }

    changecostRMA(index, value) {
        this.rmaReturnProducts[index]['average_cost'] = Number(value)
        this.calculateRMATotal()
    }

    changeRMAcostFun(index, value) {
        this.rmaReturnProducts[index]['productCostPrice'] = Number(value)
        this.actualRMA = 0
        for (let i = 0; i < this.rmaReturnProducts.length; i++) {
            let total = Number(this.rmaReturnProducts[i].approved_quantity) * Number(this.rmaReturnProducts[i].productCostPrice)
            this.rmaReturnProducts[i].sub_total = total
            this.actualRMA = this.actualRMA + total
        }
        this.orderDetail['total_amount'] = this.actualRMA
    }

    hideBounceError(index, type) {
        setTimeout(() => {
            this.rmaReturnProducts[index][type] = false
        }, 200)
    }

    changePriceValue(index, value) {
        this.rmaReturnProducts[index].bounceForRQ = false
        this.rmaReturnProducts[index].bounceForAQ = false
        let val = Number(this.rmaReturnProducts[index][value])
        if (value == 'receiving_quantity') {
            if (Number(this.rmaReturnProducts[index]['receiving_quantity']) > Number(this.rmaReturnProducts[index]['quantity'])) {
                this.rmaReturnProducts[index]['receiving_quantity'] = Number(this.rmaReturnProducts[index]['quantity'])
                this.showToaster = false
                this.toasterMsg = "Item received can't be greater then item sent"
                this.toasterType = 'error'
                this.rmaReturnProducts[index].bounceForRQ = true
                this.hideBounceError(index, 'bounceForRQ')
            }
        }
        if (value == 'approved_quantity') {
            if (Number(this.rmaReturnProducts[index]['approved_quantity']) > Number(this.rmaReturnProducts[index]['receiving_quantity'])) {
                this.rmaReturnProducts[index]['approved_quantity'] = Number(this.rmaReturnProducts[index]['receiving_quantity'])
                this.showToaster = false
                this.toasterMsg = "Item approved can't be greater then item received"
                this.toasterType = 'error'
                this.rmaReturnProducts[index].bounceForAQ = true
                this.hideBounceError(index, 'bounceForAQ')
            }
        }
        // if (Number(this.rmaReturnProducts[index][value]) > Number(this.rmaReturnProducts[index].quantity)) {
        //    this.rmaReturnProducts[index]['receiving_quantity'] = Number(this.rmaReturnProducts[index]['quantity'])
        //     this.showToaster = false
        //     this.toasterMsg = "Item approved can't be greater then item received"
        //     this.toasterType = 'error'
        // }
        this.isReciveAllItem = false
        if (Number(this.rmaReturnProducts[index]['receiving_quantity']) < Number(this.rmaReturnProducts[index].approved_quantity)) {
            this.rmaReturnProducts[index]['approved_quantity'] = Number(this.rmaReturnProducts[index]['receiving_quantity'])
            this.showToaster = false
            this.toasterMsg = "Item approved can't be greater then item received"
            this.toasterType = 'error'
            this.rmaReturnProducts[index].bounceForRQ = true
            this.hideBounceError(index, 'bounceForRQ')
        }
        this.actualRMA = 0
        for (let i = 0; i < this.rmaReturnProducts.length; i++) {
            let total = Number(this.rmaReturnProducts[i].approved_quantity) * Number(this.rmaReturnProducts[i].productCostPrice)
            this.rmaReturnProducts[i].sub_total = total
            this.actualRMA = this.actualRMA + total
        }
        this.orderDetail['total_amount'] = this.actualRMA
    }

    //================================== RMA END ===============================================


    // ======================Order Listing Checkbox (Clicked) ===========================

    POCheked(values: any, pOrder) {
        if (values.target.checked == true) {
            pOrder.checked = true
            this.ifPOUnChecked = true
        } else {
            pOrder.checked = false
            this.ifPOUnChecked = false
        }
    }


    toasterFunction(message, status) {
        this.showToaster = false
        this.toasterMsg = message
        this.toasterType = status
    }

    validateCharacters(event: any) {
        const pattern = /[a-zA-z-, ]/;
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 45 || k == 95 || (k >= 48 && k <= 57));
    }
    // ======================Order Listing Checkbox ===========================
    //   updateFiltersLOG(value) {
    //     this.logType = value
    //     this.getUsersLogsActivityFun()
    //   }

    // itemStringsLeft: any[] = addSupplierToList[0]

    //============================================= Start Net Term Selected Supplier =====================================//
    loadNetTerm() {
        this.createNote = true
        this.cutomerInfo = false
        this.netTermsPayment = false
        this.transferCredit = false
        this.manageCredit = false
    }
    loadNetTermPayment() {
        this.netTermsPayment = true
        this.cutomerInfo = false
        this.createNote = false
        this.manageCredit = false
        this.transferCredit = false

    }

    selectedSuppNettermLogs: any
    getSupplierNettermLogsFun(id) {
        this.supplierNetTerm.watch({
            supplier_id: id,
            skip: 0,
            limit: 100000,
            location_id: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                let result = res['data'].supplierNetTerm
                if (result != null) {
                    this.selectedSuppNettermLogs = result
                    this.supplierLoaderPO = false
                    this.netTermsOrdersLoader = false
                }
                console.log('selectedSuppNettermLogs', res['data'].supplierNetTerm);
            }, (err) => {
                this.supplierLoaderPO = false
                this.netTermsOrdersLoader = false
                console.log('selectedSuppNettermLogs', err);
            }
        )
    }

    netTermsForm: any
    netTermsSubmitted = false
    netTermDataforForm: any
    netTermsinitializeFrom() {
        this.inCredit = 'Increase'
        this.netTermsLoader = false
        // this.netTermDataforForm.interest_rate
        // this.netTermDataforForm.pay_term_number
        this.netTermsForm = this.formbulider.group({
            supplierId: [this.currentSupplier['_id'], [Validators.required]],
            is_increase: [true, [Validators.required]],
            credit_amount: ['', [Validators.required]],
            days: ['', [Validators.required]],
            interest_rate: ['', [Validators.required]],
            note: ['', [Validators.required]],
            date: [this.todayDate, [Validators.required]],
            location_id: [window.localStorage.getItem('location_id'), [Validators.required]]
        });
    }

    get fNetTermsForm() {
        return this.netTermsForm.controls
    }

    netTermReturnValue: any
    netTermsLoader = false
    saveNetTermsForm() {
        this.netTermsLoader = true
        if (this.inCredit == 'Increase') {
            this.netTermsForm.controls['is_increase'].setValue(true)
        } else {
            this.netTermsForm.controls['is_increase'].setValue(false)
        }
        if (this.netTermsForm.invalid) {
            this.netTermsSubmitted = true;
            this.netTermsLoader = false
            return;
        } else {
            this.netTermsForm.controls['credit_amount'].setValue(Number(this.netTermsForm.value.credit_amount))
            this.netTermsForm.controls['days'].setValue(Number(this.netTermsForm.value.days))
            this.netTermsForm.controls['interest_rate'].setValue(parseFloat(this.netTermsForm.value.interest_rate))
            let netTermsFormData = JSON.parse(JSON.stringify(this.netTermsForm.value))
            this.createSupplierNetterm.mutate({
                input: netTermsFormData
            }).subscribe(
                (res) => {
                    console.log('Add Net Terms res-->', res);
                    this.netTermReturnValue = res['data'].createSupplierNetterm
                    this.showToaster = false
                    this.toasterMsg = 'Net Terms Successfully Added'
                    this.toasterType = 'success'
                    this.getSupplierNettermLogsFun(netTermsFormData.supplierId)
                    this.getNettermOrders(netTermsFormData.supplierId)
                    this.suppNetTermPaymentLogs(netTermsFormData.supplierId)
                    this.netTermsLoader = false
                    this.netTermsinitializeFrom()
                    // this.getCustomers()
                }, (err) => {
                    console.log('Add Net Terms err-->', err);
                    if (err == 'Error: GraphQL error: Incorrect password') {
                        this.netTermsLoader = false
                        //   this.toaster.showError('Incorrect password', 'Please Enter Correct Password')
                    } else {
                        this.showToaster = false
                        this.toasterMsg = 'Something Went Wrong'
                        this.toasterType = 'error'
                        //   this.toaster.showError('Net Terms not updated Please try again', 'Add Net Terms err')
                        this.netTermsLoader = false
                    }
                }
            )
        }
    }

    suppNetTermPaymentLogsData: any
    suppNetTermPaymentLogs(id) {
        this.cashRegId = ''
        this.paypalTransactionID = ''
        this.creditLineID = ''
        this.creditCardNo = ''
        this.paypalAccount = ''
        this.bankAccNo = ''
        this.checkqueNo = ''
        this.totalOwenAmount = 0
        this.creditLineName = 'Please select any credit line'
        this.paymentDate = new Date().toString()
        let myDate1 = this.datePipe.transform(this.paymentDate, 'MM-dd-yyyy');
        this.paymentDate = myDate1
        this.netternPaymentamount = 0
        this.getAllCashRegisterarOfLocation()
        this.getAllCreditLines()
        this.netTermsOrdersLoader = true
        this.supplierNetTermRecord.watch({
            supplier_id: id,
            skip: 0,
            limit: 100000,
            location_id: window.localStorage.getItem('location_id')
        }).valueChanges.subscribe(
            (res) => {
                let result = res['data'].supplierNetTermRecord
                if (result != null) {
                    this.suppNetTermPaymentLogsData = result
                    for (let i = 0; i < this.suppNetTermPaymentLogsData.length; i++) {
                        this.totalOwenAmount = Number(this.suppNetTermPaymentLogsData[i]['amount_owed']) + Number(this.totalOwenAmount)
                        this.suppNetTermPaymentLogsData[i]['balance'] = Number(this.suppNetTermPaymentLogsData[i]['amount_owed'])
                    }
                    this.supplierLoaderPO = false
                    this.netTermsOrdersLoader = false
                }
                console.log('suppNetTermPaymentLogsData', res['data'].supplierNetTermRecord);
            }, (err) => {
                this.supplierLoaderPO = false
                this.netTermsOrdersLoader = false
                console.log('suppNetTermPaymentLogsData', err);
            }
        )
    }

    suppNetTermsOrders = []
    netTermsOrdersLoader = false
    totalOwenAmount = 0
    afterPaymentOwen = 0
    getNettermOrders(id) {
        this.getSupplierNettermLogs.watch({
            supplierId: id,
            skip: 0,
            limit: 100000
        }).valueChanges.subscribe(
            (res) => {
                let result = res['data'].getSupplierNettermLogs
                if (result != null) {
                    this.suppNetTermsOrders = result
                }
                console.log('selectedSuppNettermLogs', res['data'].getSupplierNettermLogs);
            }, (err) => {
                console.log('selectedSuppNettermLogs', err);
            }
        )

    }

    amountToPayFun(netTermOrder) {
        netTermOrder.balance = netTermOrder.amount_owed
        if (netTermOrder.amount_owed < Number(netTermOrder.amount_pay)) {
            this.showToaster = false
            this.toasterMsg = 'Amount to pay not grater then amount you owed'
            this.toasterType = 'error'
            netTermOrder.amount_pay = 0
            return
        }
        netTermOrder.balance = Number(netTermOrder.balance) - Number(netTermOrder.amount_pay)
        this.calculatePaymentAmount()

    }

    addpaymentAmout() {
        let amount = Number(this.netternPaymentamount)
        for (let i = 0; i < this.suppNetTermPaymentLogsData.length; i++) {
            this.suppNetTermPaymentLogsData[i]['amount_pay'] = 0
        }
        for (let i = 0; i < this.suppNetTermPaymentLogsData.length; i++) {
            if (amount >= Number(this.suppNetTermPaymentLogsData[i]['amount_owed']) && amount > 0) {
                let num = Number(this.suppNetTermPaymentLogsData[i]['amount_owed'])
                amount = amount - num
                this.suppNetTermPaymentLogsData[i]['amount_pay'] = num
                this.suppNetTermPaymentLogsData[i]['balance'] = Number(this.suppNetTermPaymentLogsData[i]['amount_owed']) - Number(this.suppNetTermPaymentLogsData[i]['amount_pay'])
                if (i + 1 == this.suppNetTermPaymentLogsData.length) {
                    let bal = Number(this.netternPaymentamount) - amount
                    let total = bal.toFixed(2)
                    this.netternPaymentamount = Number(total)
                }
            } else {
                this.suppNetTermPaymentLogsData[i]['amount_pay'] = amount
                this.suppNetTermPaymentLogsData[i]['balance'] = Number(this.suppNetTermPaymentLogsData[i]['amount_owed']) - Number(this.suppNetTermPaymentLogsData[i]['amount_pay'])
                return
            }
        }
    }

    calculatePaymentAmount() {
        this.netternPaymentamount = 0
        for (let i = 0; i < this.suppNetTermPaymentLogsData.length; i++) {
            this.netternPaymentamount = Number(this.suppNetTermPaymentLogsData[i]['amount_pay']) + Number(this.netternPaymentamount)
            this.totalOwenAmount = Number(this.suppNetTermPaymentLogsData[i]['amount_owed']) + Number(this.totalOwenAmount)
            this.suppNetTermPaymentLogsData[i]['balance'] = Number(this.suppNetTermPaymentLogsData[i]['amount_owed']) - Number(this.suppNetTermPaymentLogsData[i]['amount_pay'])
        }
    }

    netternPaymentOrders = []
    netternPaymentamount = 0
    devidePayment = false
    netternPaymentLoader = false
    totalNettermAmount = 0
    createNetTermPaymentFun(method) {
        let meth = String(method)
        let netTermOrderInput = []
        for (let i = 0; i < this.suppNetTermPaymentLogsData.length; i++) {
            if (this.suppNetTermPaymentLogsData[i].amount_pay > 0) {
                let obj = {}
                obj['transactionId'] = this.suppNetTermPaymentLogsData[i].transactionID
                obj['amount'] = parseFloat(this.suppNetTermPaymentLogsData[i].amount_pay)
                //some fields get from suppNetTermPaymentLogsData
                netTermOrderInput.push(obj)
            }
        }
        let input: InputSupplierNetTermPayment = {
            amount: 0,
            method: AllowedPurchaseOrderPaymentMethod.Cash,
            BusinessLocation: ''
        };
        if (meth == 'Cash') {
            input['amount'] = parseFloat(this.netternPaymentamount.toString())
            input['method'] = AllowedPurchaseOrderPaymentMethod[meth]
            input['BusinessLocation'] = window.localStorage.getItem('location_id')
            input['supplierId'] = this.currentSupplier['_id']
            input['orders'] = netTermOrderInput
            input['cashRegisterId'] = this.cashRegId
            input['paid_on'] = this.paymentDate
        } else if (meth == 'CreditCard') {
            input['amount'] = parseFloat(this.netternPaymentamount.toString())
            input['method'] = AllowedPurchaseOrderPaymentMethod[meth]
            input['BusinessLocation'] = window.localStorage.getItem('location_id')
            input['supplierId'] = this.currentSupplier['_id']
            input['orders'] = netTermOrderInput
            input['paid_on'] = this.paymentDate
            input['card_number'] = this.creditCardNo
        } else if (meth == 'Cheque') {
            input['amount'] = parseFloat(this.netternPaymentamount.toString())
            input['method'] = AllowedPurchaseOrderPaymentMethod[meth]
            input['BusinessLocation'] = window.localStorage.getItem('location_id')
            input['supplierId'] = this.currentSupplier['_id']
            input['orders'] = netTermOrderInput
            input['paid_on'] = this.paymentDate
            input['cheque_number'] = this.checkqueNo
            input['bank_account_number'] = this.bankAccNo
        } else if (meth == 'Paypal') {
            input['amount'] = parseFloat(this.netternPaymentamount.toString())
            input['method'] = AllowedPurchaseOrderPaymentMethod[meth]
            input['BusinessLocation'] = window.localStorage.getItem('location_id')
            input['supplierId'] = this.currentSupplier['_id']
            input['orders'] = netTermOrderInput
            input['paid_on'] = this.paymentDate
            input['paypal_account'] = this.paypalAccount
            input['paypal_transaction_id'] = this.paypalTransactionID
        } else if (meth == 'StoreCredit') {
            input['amount'] = parseFloat(this.netternPaymentamount.toString())
            input['method'] = AllowedPurchaseOrderPaymentMethod[meth]
            input['BusinessLocation'] = window.localStorage.getItem('location_id')
            input['supplierId'] = this.currentSupplier['_id']
            input['orders'] = netTermOrderInput
            input['paid_on'] = this.paymentDate
            input['creditLineId'] = this.creditLineID
        } else {
            input['amount'] = parseFloat(this.netternPaymentamount.toString())
            input['method'] = AllowedPurchaseOrderPaymentMethod[meth]
            input['BusinessLocation'] = window.localStorage.getItem('location_id')
            input['supplierId'] = this.currentSupplier['_id']
            input['orders'] = netTermOrderInput
            input['paid_on'] = this.paymentDate
            input['bank_account_number'] = this.bankAccNo
        }
        // invoice_number
        this.createSupplierNetTermPayment.mutate({
            input: input
        }).subscribe(
            (res) => {
                let bool = res['data'].createSupplierNetTermPayment
                if (bool) {
                    this.disgardNetTermsPayments()
                    this.getSupplierNettermLogsFun(this.currentSupplier['_id'])
                    this.getNettermOrders(this.currentSupplier['_id'])
                    this.suppNetTermPaymentLogs(this.currentSupplier['_id'])
                    this.netternPaymentLoader = false
                    this.showToaster = false
                    this.toasterMsg = 'Net Term Payment Done Successfully'
                    this.toasterType = 'success'
                }
                console.log('create NetTerm Payment Return Val-->', bool);
            }, (err) => {
                console.log('create NetTerm Payment err', err);
                if (err == 'Error: GraphQL error: Amount is greater than to available cash Register amount') {
                    this.netternPaymentLoader = false
                    this.showToaster = false
                    this.toasterMsg = err
                    this.toasterType = 'Amount is greater than to available cash Register amount.'
                    return
                }
                if (err == 'Error: GraphQL error: store credit balance not avaiable') {
                    this.netternPaymentLoader = false
                    this.showToaster = false
                    this.toasterMsg = err
                    this.toasterType = 'Store credit balance not avaiable.'
                    return
                }
                this.netternPaymentLoader = false
                this.showToaster = false
                this.toasterMsg = "Something went wrong"
                this.toasterType = 'error'
            }
        )
    }

    disgardNetTermsPayments() {
        this.netternPaymentOrders = []
        this.netternPaymentamount = 0
        this.totalOwenAmount = 0
        this.afterPaymentOwen = 0

    }
    //========================================== End Manage Supplier Net terms Payments =======================================================//
    UnselectProcess() {
        // this.selectOrderProcess=''
    }
    isAddModel = true
    isNewModel = false
    isAddItem = true
    isAddingItem = false
    isEditingItem = false
    isItemList = false
    openIsNewModel() {
        this.isAddModel = false
        this.isNewModel = true
    }
    openIsAddModel() {
        this.isNewModel = false
        this.isAddModel = true
    }

    openIsNewItem() {
        this.isAddItem = false
        this.isAddingItem = true
    }
    // openIsAddItem(){
    //     this.isAddingItem = false
    //     this.isAddItem = true
    // }
    openIsItemList() {
        this.isItemList = true
        this.isAddingItem = false
        this.isEditingItem = false
    }
    openIsEditingItem() {
        this.isItemList = false
        this.isEditingItem = true
    }
    openIsRemoveItem() {
        this.isItemList = false
        this.isAddItem = true
    }
    noOpenAccordianOnInput(e) {
        e.stopPropagation();
    }

    selectedDevBrand: number;
    devBrands = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Huawei' },
        { id: 4, name: 'Google Pixel' },
    ];

    selectedDevModelName: number;
    devModelNames = [
        { id: 1, name: 'Note 5' },
        { id: 2, name: 'Note 6' },
        { id: 3, name: 'Note 7' },
        { id: 4, name: 'Note 8' },
    ];

    selectedDevModelNo: number;
    devModelNo = [
        { id: 1, name: 'SM-N9500' },
        { id: 2, name: 'SM-N950F' },
        { id: 3, name: 'SM-N950N' },
        { id: 4, name: 'SM-N950FD' },
    ];

    selectedDevItem: number;
    devItems = [
        { id: 1, name: 'Back Cover With Camera Lens Compatible For Samsung Note8 (Black)' },
        { id: 2, name: 'Back Cover With Camera Lens Compatible For Samsung Note8 (White)' },
        { id: 3, name: 'Back Cover With Camera Lens Compatible For Samsung Note8 (Gold)' },
        { id: 4, name: 'Back Cover With Camera Lens Compatible For Samsung Note8 (Grey)' },
    ];

    manageServices = false
    openManageSrvices(){
        this.stocksection = false
        this.manageServices = true
    }
    backfromManageServices(){
        this.manageServices = false
        this.stocksection = true
        
    }
    openArchiveModal(template: TemplateRef<any>, cls) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
    }
}

