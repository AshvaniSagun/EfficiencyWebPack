import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PapaParseService } from 'ngx-papaparse';
import { marketnamemodel, marketyearmodel, Csvdata } from '../../../models/papa';
import { FileUploadModule } from 'primeng/primeng';
import { MarketService } from '../../../services/papa.sevice';
import { Subscription } from 'rxjs';
import { shareddataservice } from '../../../services/sharedservice/shared.service'
import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'jquery';
import { Observable } from 'rxjs/Observable';
import { DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { ToastrService } from 'toastr-ng2';
import { DialogModule, TooltipModule } from 'primeng/primeng';
import { FormBuilder } from '@angular/forms';
import {
    forwardRef,
    Attribute, OnChanges, SimpleChanges
} from '@angular/core';
import {
    NG_VALIDATORS, Validator,
    AbstractControl, ValidatorFn
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService, Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';


@Component({
    selector: 'PapaParse',
    templateUrl: './Papa.component.html',
    providers: [MarketService, PapaParseService, ConfirmationService],

})
export class PapaComponent implements OnInit {

    @ViewChild('myInput')
    myInputVariable: any;

    reset() {

        this.myInputVariable.nativeElement.value = "";

    }
    private subscription: Subscription;
    public resmessage: string;
    public mid: string;
    public marketId = this.mid
    public fileReaded: Blob;
    public csvData: string
    public show: boolean;
    public showSave: boolean;
    public showup: boolean;
    public Savebutton: boolean;
    public objects: string
    public EwId: string;
    public MMID: string;
    public PNO12: string;
    public PWeight: string;
    public SegmentCo2: string;
    public CreatedBy: string;
    public CreatedOn: string;
    public UpdatedBy: string;
    public UpdatedOn: string;
    public _inputValue: string;
    public showweight: boolean
    reader = new FileReader();
    public index: any
    car: Csvdata = new Csvdata();
    selectedCar: Csvdata;
    newCar: boolean;
    public type: Csvdata[];
    public errorMsg:string
    displayDialog: boolean;
    public visible = false;
    private visibleAnimate = false;
    public showmodel: boolean;
    public showpublishbutton: boolean;
    //preview

    public previewsave: boolean;
    public displayPreviewDialogpopupsave: boolean
    public displayPreviewDialogpopup: boolean
    public showeditbutton: boolean;
    public previewupdate: boolean;
    displayPreviewDialogpop: boolean;
    msgs: Message[] = [];
    cars: Csvdata = new Csvdata();


    selectedCars: Csvdata;

    newCars: boolean;

    carss: Csvdata[];

    constructor(private papa: PapaParseService, private confirmationService: ConfirmationService,private activatedRoute: ActivatedRoute, public marketService: MarketService, private toastrService: ToastrService, public _shareddataservice: shareddataservice) {

        this.subscription = this._shareddataservice.reload.subscribe(() => {
            this.ngOnInit();

        })
        this.subscription = this._shareddataservice.reloadOnchange.subscribe(() => {
            this.ngOnInit();
        })

    }


    display: boolean = false;

    showDialog() {
        this.display = true;
    }


    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.MMID = params['MMID'];
        });
      
        this.show = false;
        this.showSave = false;
        this.showup = false;
        this.Savebutton = true;
        this.getweihtsegment(this.MMID);
        this.showweight = true;
        this.displayPreviewDialogpop = false

    }

    public date: string
    public getdate() {
        try {
            var currentdate = new Date();
            currentdate.toISOString().substring(0, 10);
            return currentdate;


        } catch (e) {

        }
    }
    public name: marketnamemodel[];
    public year: marketyearmodel[];
    public weightsegment: Csvdata[];
    public preview: Csvdata[];
    public updatepreview: Csvdata;
    private csvsingle: Csvdata = new Csvdata();
    public showprimesave: boolean;
    public showprimeupdate: boolean;
    public csvdb: Csvdata;


    //getmarketname() {
    //    //debugger
    //    this.marketService.getmarketname().subscribe(
    //        marketname => this.name = marketname

    //    );
    //}
    lookupRowStyleClass(rowData: Csvdata) {
        return rowData.isPublished ? 'disabled-account-row' : '';
    }

    getweihtsegment(mmid: any) {
        //debugger
        mmid = this.MMID
        this.marketService.getweightsegment(mmid).subscribe(
            weight => {
                this.weightsegment = weight
                this.weightsegment = this.weightsegment.filter(ws => ws.MMID == this.MMID)
                //this.weightsegment.unshift()
                var listobj = this.weightsegment.filter(X => X.isPublished == false);
                if (listobj.length != 0) {
                    this._shareddataservice.TaxPublice(false);
                }
                var listobjT = this.weightsegment.filter(X => X.isPublished == true);
                if (listobjT.length != 0) {
                    this.showeditbutton = true
                }

            }
        );
    }

    showDialogToEdit(contact: Csvdata) {

        this.car.EwId = contact.EwId;
        this.car.MMID = contact.MMID;
        this.car.PNO12 = contact.PNO12;
        this.car.PWeight = contact.PWeight;
        this.car.SegmentCo2 = contact.SegmentCo2;
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;



    }
    SringisEmpty(str: any) {
        str = str.trim();
        return (!str || 0 === str.length);
    }

    save(car: Csvdata) {
        this.newCars = true
        car.MMID = this.MMID
        if ((typeof car.PWeight === 'undefined' || car.PWeight == '' || typeof car.PWeight === null || car.PWeight == '0') && (typeof car.SegmentCo2 === 'undefined' || car.SegmentCo2 == '' || typeof car.SegmentCo2 === null || car.SegmentCo2 == '0')) {
            this.toastrService.error("Weight or SegmentCo2 should not be null")
        }
        else if ((car.PNO12 == "" || this.SringisEmpty(car.PNO12) || car.PNO12 == null)) {
            this.toastrService.error("PNO12 cannot be Empty!")
        }
        else {

            this.marketService.SavecsvdbData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this._shareddataservice.TaxPublice(false);
                    this.getweihtsegment(this.MMID);
                    this.toastrService.success('Pno12 Details for ' + car.PNO12 + ' added successfully.');
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }

    }

    updatecsvdb(car: Csvdata) {
        this.newCars = false
        this.showprimesave = false;
        this.showprimeupdate = true;
        if ((typeof car.PWeight === 'undefined' || car.PWeight == '' || typeof car.PWeight === null || car.PWeight == '0') && (typeof car.SegmentCo2 === 'undefined' || car.SegmentCo2 == '' || typeof car.SegmentCo2 === null || car.SegmentCo2 == '0')) {
            this.toastrService.error("Weight or SegmentCo2 should not be null")
        }
        else if ((car.PNO12 == "" || this.SringisEmpty(car.PNO12) || car.PNO12 == null)) {
            this.toastrService.error("PNO12 cannot be Empty!")
        }
        else {
            this.marketService.UpdatecsvdbData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getweihtsegment(this.MMID);
                    this.toastrService.success('Pno12 Details for ' + car.PNO12 + ' updated successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
         
    }
    deletecsvdbdata(car: Csvdata) {
        this.newCars = false
        this.displayDialog = false;
        this.csvdb = car;
        var IsConf = confirm('You are about to delete the details of ' + this.csvdb.PNO12 + '. Are you sure?');

        if (IsConf) {

            this.marketService.deletecsvdbdata(this.csvdb.EwId)
                .subscribe(
                variable => {
                    this.weightsegment = variable

                    this.getweihtsegment(this.MMID);
                    this.toastrService.error(this.csvdb.PNO12 + ' deleted successfully.');
                },
               (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }

    }

    showDialogToAdd() {
        this.showprimesave = true;
        this.showprimeupdate = false;
        this.car = new Csvdata();
        this.displayDialog = true;
    }
    onRowSelect(event: any) {
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }


    cloneCar(c: Csvdata): Csvdata {
        let car = new Csvdata();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }




    getFilePreview(csvData: any) {

        this.fileReaded = csvData.target.files[0];

        let reader: FileReader = new FileReader();

        reader.readAsText(this.fileReaded);

        reader.onload = (e) => {
            let csv: string = reader.result;
            this.papa.parse(csv, {
                complete: (results, file) => {
                    console.log('Parsed: ', results, file);

                    let arrays = results.data
                    arrays.splice(-1, 1)
                    console.log(arrays)

                    let keys = arrays[0];
                    let values = arrays.slice(1);
                    let objects = values.map((array: any) => {
                        let object = {};

                        keys.forEach((key: any, i: any) => object[key] = array[i]);

                        return object;
                    });

                    console.log(JSON.stringify(objects));

                    this.preview = objects

                    // this.show = true;
                    this.showweight = false;
                    this.display = true;
                    this.reset();

                }
            });


        }

    }

    //bulk upload csv

    fileclick(car: Csvdata) {

        let objects: any
        objects = this.preview
        console.log(this.preview)
        JSON.stringify(this.preview)
        this.marketService.SaveCsvData(this.preview, this.MMID)

            .subscribe(response => {
                this.resmessage = response;
                this.display = false;
                this.toastrService.success('Pno12 Details uploaded successfully.');
                this.getweihtsegment(this.MMID);
                this.reset();

            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });
    }


    public onSelectD(marketId: any) {

        this.marketService.getmarketyear(marketId).subscribe(
            marketyear => this.year = marketyear
        );

        this.year = this.year.filter((item) => item.id == marketId)

    }

    onSelectYear(id: any) {
        alert("MMID" + id)

    }

    getFile(csvData: any, MMID: any) {

        this.fileReaded = csvData.target.files[0];

        let reader: FileReader = new FileReader();

        reader.readAsText(this.fileReaded);

        reader.onload = (e) => {
            let csv: string = reader.result;
            this.papa.parse(csv, {
                complete: (results, file) => {

                    let arrays = results.data
                    arrays.splice(-1, 1)
                    console.log(arrays)

                    let keys = arrays[0];
                    let values = arrays.slice(1);
                    let objects = values.map((array: any) => {
                        let object = {};

                        keys.forEach((key: any, i: any) => object[key] = array[i]);

                        return object;
                    });

                }

            });


        }


    }

    select(data: any) {
        let csv: string = data;
        this.papa.parse(csv, {
            complete: (results, file) => {
                console.log('Parsed: ', results, file);

                let arrays = results.data
                arrays.splice(-1, 1)
                console.log(arrays)

                let keys = arrays[0];
                let values = arrays.slice(1);
                let objects = values.map((array: any) => {
                    let object = {};

                    keys.forEach((key: any, i: any) => object[key] = array[i]);

                    return object;
                });

                console.log(JSON.stringify(objects));

                this.preview = objects

                this.show = true;
                this.showweight = false;

            }
        });


    }



    //preview crud

    model: any = {}
    public i :number

    InMemoryEdit(contact: Csvdata, i:any) {
        //this.car.EwId = contact.EwId;
        //this.car.MMID = contact.MMID;
        this.i=i
        this.newCars = false
        this.cars.PNO12 = contact.PNO12;
        this.cars.PWeight = contact.PWeight;
        this.cars.SegmentCo2 = contact.SegmentCo2;
        this.showprimesave = false;
        this.showprimeupdate = false;
        this.displayPreviewDialogpop = true;

    }

    showDialogToAdds() {
        this.displayPreviewDialogpopupsave = true
        this.displayPreviewDialogpopup = false
        this.newCars = true;
        this.cars = new Csvdata();

        this.displayPreviewDialogpop = true;

    }

    savep(cars: Csvdata) {
       
        this.newCars = true;
        if ((typeof cars.PWeight === 'undefined' || cars.PWeight == '' || typeof cars.PWeight === null || cars.PWeight == '0') && (typeof cars.SegmentCo2 === 'undefined' || cars.SegmentCo2 == '' || typeof cars.SegmentCo2 === null || cars.SegmentCo2 == '0')) {
            this.toastrService.error("Weight or SegmentCo2 should not be null")
        }
        else if ((cars.PNO12 == "" || this.SringisEmpty(cars.PNO12) || cars.PNO12 == null)) {
            this.toastrService.error("PNO12 cannot be Empty!")
        }
        else {
            let preview = [...this.preview];
            if (this.newCars)
                preview.push(this.cars);
            this.preview = preview;
            //this.preview.push(this.cars)
            this.cars = new Csvdata();
            this.toastrService.success('Pno12 Details added successfully.');
            this.displayPreviewDialogpop = false;
        }
    }

    updatep(cars: Csvdata) {

        this.newCars = false;
        if ((typeof cars.PWeight === 'undefined' || cars.PWeight == '' || typeof cars.PWeight === null || cars.PWeight == '0') && (typeof cars.SegmentCo2 === 'undefined' || cars.SegmentCo2 == '' || typeof cars.SegmentCo2 === null || cars.SegmentCo2 == '0')) {
            this.toastrService.error("Weight or SegmentCo2 should not be null")
        }
        else if ((cars.PNO12 == "" || this.SringisEmpty(cars.PNO12) || cars.PNO12 == null)) {
            this.toastrService.error("PNO12 cannot be Empty!")
        }
        else {
            let preview = [...this.preview];
            preview[this.i] = this.cars;
            this.preview = preview;
            //this.preview.push(this.cars)
            this.cars = new Csvdata();
            console.log(this.preview)
            this.toastrService.success('Pno12 Details updated successfully.');

            this.displayPreviewDialogpop = false;
        }
    }

    findSelectedCarIndexp(): number {
        return this.preview.indexOf(this.selectedCars);
    }

    //deletep() {
    //    let index = this.i;
    //    this.preview = this.preview.filter((val, i) => i != index);
    //    var IsConf = confirm('You are about to delete a PNO12 detail. Are you sure?');
    //    if (IsConf) {
    //        this.toastrService.error('PNO12 deleted successfully.');
    //        this.displayPreviewDialogpop = false;
    //    }
    //}

    deletep(cars:Csvdata) {
       
        this.confirmationService.confirm({
            message: 'You are about to delete ' + cars.PNO12 + '  detail. Are you sure?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                let index = this.i;
                this.preview = this.preview.filter((val, i) => i != index);
                this.toastrService.error(cars.PNO12+' deleted successfully.');
                this.displayPreviewDialogpop = false;

            },

        });
            }
  


   




    _keyPress(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}









