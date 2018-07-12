import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { variablemodel, fueltypemodel } from '../../../../models/variable'
import { VariableService } from '../../../../services/variable.service'
import { FormulaService } from '../../../../services/formula.service'
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
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'variable',
    templateUrl: './variable.component.html',
    styleUrls: ['./variable.component.css'],
    providers: [VariableService]
})
export class VariableComponent implements OnInit {
    private subscription: Subscription;
    public resmessage: string;
    public addmessage: string;
    public listmessage: string;
    public variabledetails: variablemodel[];
    public variable: variablemodel;
    public variables: variablemodel[];
    public Id: string;
    public VariableName: string;
    public VariableValue: string;
    public MMId: string;
    public VariableTypeId: string;
    public saveD: boolean;
    public edited: boolean;
    public cols: variablemodel[];
    public showprimesave: boolean;
    public showprimeupdate: boolean;
    public showinputdata: boolean
    public showtextbox: boolean
    public showfueldata: boolean
    public showeditbutton: boolean;
    public errorMsg: string
    public fuelTypeDD: boolean 
    public inputTypeDD: boolean 
    public ValueTextBox: boolean 
    //Constructor
    sales: any[];
    constructor(private variableService: VariableService, private activatedRoute: ActivatedRoute, private toastrService: ToastrService, public _shareddataservice: shareddataservice) {
        this.subscription = this._shareddataservice.reload.subscribe(() => {
            this.ngOnInit();
        })
      
        this.addmessage = 'Add New market';
        this.listmessage = 'All market';

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.MMId = params['MMID'];
        });
        this.resmessage = "";
        this.getvariabledetails(this.MMId);
        this.getvariabletype();
        this.getvariableinputname();
        this.getfueltypename();
        this.edited = true;
        this.saveD = false;
        this.showinputdata = false;
        this.showtextbox = true
        this.showfueldata = false

    }
    public type: variablemodel[];
    public input: variablemodel[];
    public fuel: fueltypemodel[];
    displayDialog: boolean;
    car: variablemodel = new variablemodel();
    selectedCar: variablemodel;
    newCar: boolean;

    lookupRowStyleClass(rowData: variablemodel) {
        return rowData.isPublished ? 'disabled-account-row' : '';
    }


    editVariable(car: variablemodel) {
        console.log(car)

        car.VariableName = ''

        if (car.VariableTypeId == "4") {
            this.showinputdata = true
            this.showtextbox = false
            this.showfueldata = false
           
        }
        else if (car.VariableTypeId == "26") {
            this.showfueldata = true
            this.showtextbox = false
            this.showinputdata = false
          
        }
        else {
            this.showinputdata = false
            this.showtextbox = true
            this.showfueldata = false
          
        }
    }

    showDialogToEdit(contact: any) {

        if (contact.VariableTypeId == "4") {
            this.showinputdata = true
            this.showtextbox = false
            this.showfueldata = false

        }
        else if (contact.VariableTypeId == "26") {
            this.showfueldata = true
            this.showtextbox = false
            this.showinputdata = false

        }
        else {
            this.showinputdata = false
            this.showtextbox = true
            this.showfueldata = false

        }
        this.car.Id = contact.Id;
        this.car.VariableName = contact.VariableName;
        this.car.VariableValue = contact.VariableValue;
        this.car.VariableTypeId = contact.VariableTypeId;
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;



    }
    SringisEmpty(str: any) {
        str = str.trim();
        return (!str || 0 === str.length);
    }
    save(car: variablemodel) {
        if ((car.VariableTypeId == "5" || car.VariableTypeId == "26") && car.VariableValue==null) {
            this.toastrService.error("Variable Value is requred!")
        }
        else if ((car.VariableName == "" || this.SringisEmpty(car.VariableName) || car.VariableName == null)) {
            this.toastrService.error("Variable Name cannot be Empty!")
        }
        else {

            car.MMId = this.MMId
            this.variableService.SaveVariableData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    //this._shareddataservice.getnewfomula(this.MMId);
                    this._shareddataservice.TaxPublice(false);
                    this.toastrService.success(car.VariableName + ' added successfully.');
                    this.getvariabledetails(this.MMId);
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }

    }
    update(car: variablemodel) {
        if ((car.VariableTypeId == "5" || car.VariableTypeId == "26") && car.VariableValue == "") {
            this.toastrService.error("Variable Value is requred!")
        }
        else if ((car.VariableName == "" || this.SringisEmpty(car.VariableName) || car.VariableName == null)) {
            this.toastrService.error("Variable Name cannot be Empty!")
        }
        else {
            
        car.MMId = this.MMId
            this.showprimesave = false;
        this.showprimeupdate = true;
        console.log(car)
            this.variableService.UpdateVariableData(car)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getvariabledetails(this.MMId);
                    this.toastrService.success(car.VariableName + ' updated successfully.')
                    this.displayDialog = false;
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
        }
                   
    }

    delete(car: variablemodel) {
        car.MMId = this.MMId
        this.displayDialog = false;
        this.variable = car;
        var IsConf = confirm('You are about to delete ' + this.variable.VariableName + '. Are you sure?');

        if (IsConf) {

            this.variableService.deletevariable(this.variable.Id)
                .subscribe(
                variable => {
                    this.variabledetails = variable
                    this.toastrService.error(car.VariableName +' deleted successfully.');
                    this.getvariabledetails(this.MMId);
                } , (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
              
        }
     
    }
    showDialogToAdd() {
        this.showprimesave = true;
        this.showprimeupdate = false;
        this.car = new variablemodel();
        this.displayDialog = true;
        this.showtextbox = true
        this.showinputdata = false
        this.showfueldata = false
    }

    cloneCar(c: variablemodel): variablemodel {
        let car = new variablemodel();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.variabledetails.indexOf(this.selectedCar);
    }    
    getvariabledetails(mmid: any) {  
        mmid = this.MMId
        this.variableService.getvariabledetails(mmid).subscribe(
            variabledetails => {
                this.variabledetails = variabledetails
                this.variabledetails = this.variabledetails.filter(ws => ws.MMId == this.MMId)

                var listobj = this.variabledetails.filter(X => X.isPublished == false);
                if (listobj.length != 0) {
                    this._shareddataservice.TaxPublice(false);
                }

                var listobjT = this.variabledetails.filter(X => X.isPublished == true);
                if (listobjT.length != 0) {
                    this.showeditbutton = true
                }
            }
        );
    }
    getvariabletype() {

        this.variableService.getvariabletype().subscribe(
            variabletype => this.type = variabletype
        );
    }
    getvariableinputname() {

        this.variableService.getvariableinputname().subscribe(
            variableinputname => this.input = variableinputname
        );
    }
    getfueltypename() {

        this.variableService.getfueltypename().subscribe(
            fueltypename => this.fuel = fueltypename
        );
    }

    cleardata() {
        this.Id = '';
        this.VariableName = '';
        this.VariableValue = '';
        this.MMId = '';
        this.VariableTypeId = '';
    }

    _keyPress(event: any) {
        const pattern = /[0-9 . -]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}