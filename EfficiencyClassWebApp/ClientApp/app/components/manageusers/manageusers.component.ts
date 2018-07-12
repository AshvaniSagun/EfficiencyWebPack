import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { usermodel, marketnamemodel, SelectedMarketmodel, dummymodel, marketdropdown, hideModel } from '../../models/user';
import { ManageUserService } from '../../services/manageusers.service';
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
import { shareddataservice } from '../../services/sharedservice/shared.service'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MultiSelectModule } from 'primeng/primeng';
//import { MultiSelectModule } from 'primeng/multiselect';
//import { MultiSelectModule } from 'primeng/multiselect';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'manageusers',
    templateUrl: './manageusers.component.html',
    providers: [ManageUserService, MessageService],
})
export class manageusersComponent implements OnInit {
    selectedCars1: string[] = [];
    targetCars: usermodel[];
    public resmessage: string;
    public user: usermodel;
    public userdetails: usermodel[];
    public dropdownlist: marketdropdown[] = [];
    public role: usermodel[];

    public selected: SelectedMarketmodel[];
    public Id: string;
    public CDSID: string;
    public userName: string;
    public email: string;
    public marketNames: string;
    public showprimesave: boolean;
    public showprimeupdate: boolean;
    public submitted: boolean;

    public uId: any;
    public errorMsg: string
    constructor(private userService: ManageUserService, private toastrService: ToastrService, public _shareddataservice: shareddataservice, private messageService: MessageService) {
        this.CDSID = _shareddataservice.Userinfo;
        this.userdetails = []
        this.getSelectedMarket(this.CDSID)
    }
    public dropdownList: dummymodel[];
    public selectedItems: any
    dropdownSettings = {};
    public id: string;
    public itemName: string;



    ngOnInit() {

        this.getmultidropdown(),
        this.getuserdetails();

        this.getuserrole();
        this.getSelectedMarket(this.CDSID);
        //this.userService.getmarketname();
        this.targetCars = [];


    }
    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

    displayDialog: boolean;
    car: usermodel = new usermodel();
    selectedCar: usermodel;
    newCar: boolean;

    getuserdetails() {
        //debugger
        this.userService.getuserdetails().subscribe(
            user => { this.userdetails = user }

        );
        console.log(this.userdetails)
    }

    getmultidropdown() {
        //debugger
        this.userService.getmultidropdown().subscribe(
            marketname => {
                for (let i = 0; i < marketname.length; i++) {
                    this.dropdownlist.push({
                        label: marketname[i].marketName,
                        value: marketname[i].marketId
                    });
                }
            }
        );

    }


    getuserrole() {
        //debugger
        this.userService.getuserrole().subscribe(
            userrole => this.role = userrole
        );
    }
    getSelectedMarket(cdsid: any) {
        //debugger
        cdsid = this.CDSID
        this.userService.getSelectedMarket(cdsid).subscribe(
            selectedmarket => this.selected = selectedmarket
        );
    }
    showDialogToEdit(contact: usermodel) {

        this.car.Id = contact.Id;
        this.car.CDSID = contact.CDSID;
        this.car.userName = contact.userName;
        this.car.email = contact.email;
        this.car.marketNames = contact.marketNames;
        this.selectedCars1 = contact.marketIds;
        this.car.marketIds = this.selectedCars1
        this.car.RoleId = contact.RoleId;
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;
    }

    clear() {
        this.car.CDSID = ''
        this.car.marketNames = ''
        this.car.email = ''
        this.car.email = ''
        this.car.RoleId = ''
      
    }
    SringisEmpty(str: any) {
        str = str.trim();
        return (!str || 0 === str.length);
    }
    save(car: usermodel, selectedCars1: any) {

        if ((car.CDSID == "" || this.SringisEmpty(car.CDSID) || car.CDSID == null)) {
            this.toastrService.error("CDSID cannot be Empty!")
        }
        else if ((car.userName == "" || this.SringisEmpty(car.userName) || car.userName == null)) {
            this.toastrService.error("Name cannot be Empty!")
        }
        else if ((car.email == "" || this.SringisEmpty(car.email) || car.email == null)) {
            this.toastrService.error("Email cannot be Empty!")
        }     
        else {
            console.log(selectedCars1)
            this.submitted = true
            this.userService.SaveMarketData(car, selectedCars1)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getuserdetails();
                    this.toastrService.success(car.CDSID + ' added successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
         
    }
    update(car: usermodel, selectedCars1: any) {

        if ((car.CDSID == "" || this.SringisEmpty(car.CDSID) || car.CDSID == null)) {
            this.toastrService.error("CDSID cannot be Empty!")
        }
        else if ((car.userName == "" || this.SringisEmpty(car.userName) || car.userName == null)) {
            this.toastrService.error("Name cannot be Empty!")
        }
        else if ((car.email == "" || this.SringisEmpty(car.email) || car.email == null)) {
            this.toastrService.error("Email cannot be Empty!")
        }
        else {
            this.submitted = true
            this.showprimesave = false;
            this.showprimeupdate = true;
            this.userService.UpdateUserData(car, selectedCars1)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getuserdetails();
                    this.toastrService.success(car.CDSID + ' updated successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });

        }
    }
    delete(car: usermodel) {
        this.displayDialog = false;
        this.user = car;
        var IsConf = confirm('You are about to delete ' + this.user.CDSID + '. Are you sure?');
        if (IsConf) {

            this.userService.deleteuser(this.user.Id)
                .subscribe(
                market => {
                    this.userdetails = market
                    this.toastrService.error(this.user.CDSID + ' deleted successfully.');
                    this.getuserdetails();
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                }
                );
        }

    }
    showDialogToAdd() {
        this.showprimesave = true;
        this.showprimeupdate = false;
        this.car = new usermodel();
        this.displayDialog = true;
        this.selectedCars1 = [];
        this.clear()

    }
   
    cloneCar(c: usermodel): usermodel {
        let car = new usermodel();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    _keyPressSymbols(event: any) {
        const pattern = /[0-9 a-z A-Z]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }

    }

    _keyPress(event: any) {
        const pattern = /[0-9 a-z A-Z @ .]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}
