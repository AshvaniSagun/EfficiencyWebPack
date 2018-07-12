import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { rangemodel, fueltypemodel } from '../../../../models/range'
import { RangeService } from '../../../../services/range.service'
import { Subscription } from 'rxjs';
import { shareddataservice } from '../../../../services/sharedservice/shared.service'
import { FormBuilder } from '@angular/forms';
import {
    forwardRef,
    Attribute, OnChanges, SimpleChanges
} from '@angular/core';
import {
    NG_VALIDATORS, Validator,
    AbstractControl, ValidatorFn
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule, MessageModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'range',
    templateUrl: './range.component.html',
    providers: [RangeService,]
})
export class rangeComponent implements OnInit {
    private subscription: Subscription;
    public resmessage: string;
    public addmessage: string;
    public listmessage: string;
    public rangedetails: rangemodel[];
    public fueltype: fueltypemodel[];
    public range: rangemodel;
    public ranges: rangemodel[];
    public FuelTypeId: string;
    public startRange: string;
    public endRange: string;
    public ecValue: string;
    public saveD: boolean;
    public edited: boolean;
    public MMId: any;
    public showprimesave: boolean;
    public showprimeupdate: boolean;
    public showeditbutton: boolean;
    public errorMsg:string

    constructor(private rangeService: RangeService,  private router: Router,private activatedRoute: ActivatedRoute, private toastrService: ToastrService, public _shareddataservice: shareddataservice) {
        
        this.addmessage = 'Add New market';
        this.listmessage = 'All market';
        this.subscription = this._shareddataservice.reload.subscribe(() => {
            this.ngOnInit();
        })

    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.MMId = params['MMID'];
        });
        this.resmessage = "";
        this.getrangedetails(this.MMId);
        this.getfueltype();   
       
    }
    displayDialog: boolean;
    car: rangemodel = new rangemodel();
    selectedCar: rangemodel;
    newCar: boolean;

    showDialogToEdit(contact: rangemodel) {

        this.car.id = contact.id;
        this.car.FuelTypeId = contact.FuelTypeId;
        this.car.startRange = contact.startRange;
        this.car.endRange = contact.endRange;
        this.car.ecValue = contact.ecValue;
        this.car.MMID = contact.MMID;
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;
    }
    SringisEmpty(str: any) {
        str = str.trim();
        return (!str || 0 === str.length);
    }
    save(car: rangemodel) {

        if ((car.ecValue == "" || this.SringisEmpty(car.ecValue) || car.ecValue == null)) {
            this.toastrService.error("EC Value cannot be Empty!")
        }
        else {
            car.MMID = this.MMId
            this.rangeService.SaveRangeData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getrangedetails(this.MMId);
                    this.cleardata();
                    this._shareddataservice.TaxPublice(false);
                    this.toastrService.success('Efficiency Range added successfully.');
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
        
    }
    update(car: rangemodel) {
        if ((car.ecValue == "" || this.SringisEmpty(car.ecValue) || car.ecValue == null)) {
            this.toastrService.error("EC Value cannot be Empty!")
        }
        else {
            this.showprimesave = false;
            this.showprimeupdate = true;
            this.rangeService.UpdateRangeData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getrangedetails(this.MMId);
                    this.cleardata();
                    this.toastrService.success('Efficiency Range updated successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
       
    }
    delete(car: rangemodel) {

        car.MMID = this.MMId
        this.displayDialog = false;
        this.range = car;
        var IsConf = confirm('You are about to delete a Efficiency Range. Are you sure?');

        if (IsConf) {

            this.rangeService.deleterange(this.range.id, car)
                .subscribe(
                range => {
                    this.rangedetails = range
                    this.toastrService.error('Efficiency Range deleted successfully.');
                    this.getrangedetails(this.MMId);
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
        this.car = new rangemodel();
        this.displayDialog = true;
    }
   

    cloneCar(c: rangemodel): rangemodel {
        let car = new rangemodel();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.rangedetails.indexOf(this.selectedCar);
    }


    lookupRowStyleClass(rowData: rangemodel) {
        return rowData.isPublished ? 'disabled-account-row' : '';
    }


    getrangedetails(MMId: any) {
        //debugger
        this.rangeService.getrangedetails(MMId).subscribe(
            range => {
            this.rangedetails = range
                var listobj = this.rangedetails.filter(X => X.isPublished == false);
                if (listobj.length != 0) {
                    this._shareddataservice.TaxPublice(false);
                }
                var listobjT = this.rangedetails.filter(X => X.isPublished == true);
                if (listobjT.length != 0) {
                    this.showeditbutton = true
                }

            });
    }
    getfueltype() {
        //debugger
        this.rangeService.getfueltype().subscribe(
            fueltype => this.fueltype = fueltype
        );
    }
    SaveRangeData(model: rangemodel) {
        this.rangeService.SaveRangeData(model)
            .subscribe(response => {
                this.resmessage = response;
                //this.getrangedetails();
                //this.rangedetails.unshift(rangemodel);
                this.cleardata();
                this._shareddataservice.TaxPublice(false);
                alert("Details saved successfully");
            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });  
    }
    UpdateRangeData(model: rangemodel) {
        console.log(model);
        this.rangeService.UpdateRangeData(model)
            .subscribe(response => {
                this.resmessage = response;
               // this.getrangedetails();
                this.cleardata();
                alert("Details updated successfully");
            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });  
    }
    addNew() {
        this.edited = false;
        this.saveD = true;
        var forobj = new rangemodel();
        this.rangedetails = [];
        this.rangedetails.unshift(forobj);
        forobj.FuelTypeId = "";
        forobj.startRange = "";
        forobj.endRange = "";
        forobj.endRange = "";
        forobj.showsave = true;
        forobj.showEdit = forobj.showEdit ? false : true;
        forobj.showupdate = false;
        forobj.cancel = true;
        forobj.isadd = true;
    };
    editRange(m: rangemodel) {
        this.edited = true;
        this.saveD = false;

        m.showupdate = true;
        m.cancel = true;
        m.showEdit = m.showEdit ? false : true;

    }
    cancel(m: rangemodel) {
        if (m.isadd) {
           // this.getrangedetails();
        }
        else {
            m.showEdit = false;
            m.cancel = false;
            m.showupdate = false;

        }

    }
    cleardata() {
        this.FuelTypeId = '';
        this.startRange = '';
        this.endRange = '';
        this.ecValue = '';
    }
    _keyPress(event: any) {
        const pattern = /[0-9 . -]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressSymbols(event: any) {
        const pattern = /[a-z A-Z ` ~ ! @ # $ % ^ & * ( ) - _ = + , . < > / ? ; : ' " ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
 
}