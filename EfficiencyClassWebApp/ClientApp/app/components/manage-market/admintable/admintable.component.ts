import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { adminmodel } from '../../../models/admin';
import {AdminService } from '../../../services/admin.service';
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

@Component({
    selector: 'admintable',
    templateUrl: './admintable.component.html',
    providers: [AdminService, MessageService],
})
export class AdminComponent implements OnInit {

   
    public resmessage: string;  
    public admindetails: adminmodel[];  
    public admin: adminmodel;
    public id: string;
    public marketId: string;
    public SpecMarketCode: string;
    public marketName: string;
    public showprimesave: boolean;
    public showprimeupdate: boolean;
    public submitted: boolean;
    public errorMsg:string
    constructor(private adminService: AdminService, private toastrService: ToastrService, private messageService: MessageService) {

    }

    ngOnInit() {
        this.getadmindetails();
    }

    displayDialog: boolean;
    car: adminmodel = new adminmodel();
    selectedCar: adminmodel;
    newCar: boolean;

    getadmindetails() {
        //debugger
        this.adminService.getadmindetails().subscribe(
            admin => this.admindetails = admin
        );
    } 


    showDialogToEdit(contact: adminmodel) {

        this.car.marketId = contact.marketId;
        this.car.SpecMarketCode = contact.SpecMarketCode;
        this.car.marketName = contact.marketName;
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;
    }
    showDialogToAdd() {
        this.showprimesave = true;
        this.showprimeupdate = false;
        this.car = new adminmodel();
        this.displayDialog = true;
    }
 SringisEmpty(str:any) {
    str = str.trim();
    return (!str || 0 === str.length);
}
    save(car: adminmodel) {

        if ((car.marketName == "" || this.SringisEmpty(car.marketName) || car.marketName == null)) {
            this.toastrService.error("Market Name cannot be Empty!")
        }
        else {
            this.submitted = true
            this.adminService.SaveAdminData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getadmindetails();
                    this.toastrService.success(car.marketName + ' added successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });}
       
    }
    update(car: adminmodel) {

        if ((car.marketName == "" || this.SringisEmpty(car.marketName) || car.marketName == null)) {
            this.toastrService.error("Market Name cannot be Empty!")
        }
        else {
            this.submitted = true
            this.showprimesave = false;
            this.showprimeupdate = true;
            this.adminService.UpdateAdminData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getadmindetails();
                    this.toastrService.success(car.marketName + ' updated successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
        
    }
    delete(car: adminmodel) {
        this.displayDialog = false;
        this.admin = car;
        var IsConf = confirm('You are about to delete ' + this.admin.marketName + '. Are you sure?');
        if (IsConf) {

            this.adminService.deletemarket(this.admin.marketId)
                .subscribe(
                market => {
                    this.admindetails = market
                    this.toastrService.error(this.admin.marketName + ' deleted successfully.');
                    this.getadmindetails();
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
    }  
    _keyPress(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    _keyPressSymbols(event: any) {
        const pattern = /[0-9 a-z A-Z]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
}
