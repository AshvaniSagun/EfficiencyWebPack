import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { formulamodel, formulanamemodel, Testformula, TestformulaRoot, RootTestResult } from '../../../../models/formula'
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
    selector: 'formula',
    templateUrl: './formula.component.html',
    styleUrls: ['./formula.component.css'],
    providers: [FormulaService]
})
export class formulaComponent implements OnInit {
    private subscription: Subscription;
    public resmessage: string;
    public addmessage: string;
    public listmessage: string;
    public formulaname: formulanamemodel[];
    public formuladetails: formulamodel[];
    public formula: formulamodel;
    public formulas: formulamodel[];
    public ID: string;
    public MMID: string;
    public FormulaDefinition: string;
    public VariableId: string;
    public FormulaPriority: string;
    public saveD: boolean;
    public edited: boolean;
    public showprimesave: boolean;
    public submitted: boolean;
    public showprimeupdate: boolean;
    public showTestBox: boolean;
    public id: string;
    public MMIDF: string;
    public formulaId: string
    public FormulaTestList: Testformula[]
    public FormulaRootTestList: RootTestResult[]
    public TestResult: string;
    public showTestResult: boolean;
    public showeditbutton: boolean;
    public rootlevel: boolean
    public displayDialogR: boolean
    public showRootTestResult: boolean
    public year: string
    public spec: string
    public errorMsg: string
    public variableObject: formulanamemodel;
    public VariableName: string;
    public IDdrop: string;
    public TestResultP: boolean

    carT: formulamodel = new formulamodel();
    Roottest: TestformulaRoot = new TestformulaRoot();

    constructor(private formulaService: FormulaService, private activatedRoute: ActivatedRoute, private toastrService: ToastrService, public _shareddataservice: shareddataservice) {
        this.subscription = this._shareddataservice.reload.subscribe(() => {
            this.ngOnInit();
            this.subscription = this._shareddataservice.inputEventsO.subscribe((newValue: any) => {
            
            })
        })

      
        this.addmessage = 'Add New market';
        this.listmessage = 'All market';

    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.MMID = params['MMID'];
            this.year = params['year'];
            this.spec = params['spec'];
              
        });
        this.resmessage = "";
        this.getformuladetails(this.MMID);
        this.getformulaname(this.MMID);
        this.showTestBox = false;
        this.showTestResult = false
        this.rootlevel = false
        this.displayDialogR = false
        this.showRootTestResult=false
        this.TestResultP=false
        this.formulaname = []
        this.variableObject = this.formulaname[0];
    }
    public type: formulamodel[];
    displayDialog: boolean;
    displayDialogT: boolean
    car: formulamodel = new formulamodel();
    selectedCar: formulamodel;
    newCar: boolean;

    getid($event:any) {

        for (let i = 0; i < this.formulaname.length; i++) {
            this.variableObject = this.formulaname[i];
            if ($event == this.variableObject.id) {
                this.IDdrop=$event
                this.VariableName=this.variableObject.value
            }
        }
     
    }

    TestRow() {
        this.showTestBox = true;
        this.displayDialogT = true
    }

    lookupRowStyleClass(rowData: formulamodel) {
        return rowData.isPublished ? 'disabled-account-row' : '';
    }
   
    showDialogToEdit(contact: formulamodel) {
      
        this.IDdrop = contact.VariableId;
        this.VariableName = contact.VariableName;
        this.car.ID = contact.ID;
        this.car.MMID = contact.MMID;
        this.car.FormulaDefinition = contact.FormulaDefinition;
        this.car.VariableId = contact.VariableId;
        this.car.VariableName = contact.VariableName;
        this.car.FormulaPriority = contact.FormulaPriority;   
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;

    }

    save(car: formulamodel, id: any) {
        car.VariableId = this.IDdrop
        car.VariableName=this.VariableName
        this.submitted = true;
        car.MMID = this.MMID
        this.formulaService.SaveFormulaData(car)
            .subscribe(response => {
                this.resmessage = response;
                this.getformuladetails(this.MMID);
                this._shareddataservice.TaxPublice(false);
                this.toastrService.success('Formula Details added successfully.');
                this.displayDialog = false;
            },
       (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });
        
    }
    update(car: formulamodel) {
        car.VariableId = this.IDdrop
        car.VariableName = this.VariableName
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.formulaService.UpdateFormulaData(car)
            .subscribe(response => {
                this.resmessage = response;
                this.getformuladetails(this.MMID);
                this.toastrService.success('Formula Details updated successfully.');
                this.displayDialog = false;
            },
            (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });
    }
    delete(car: formulamodel) {
        this.displayDialog = false;
        this.formula = car;
        var IsConf = confirm('You are about to delete ' + this.formula.VariableName + '. Are you sure?');
        if (IsConf) {
            this.formulaService.deleteformula(this.formula.ID)
                .subscribe(
                formula => {
                    this.formuladetails = formula
                    this.toastrService.error(car.VariableName + ' deleted successfully.');
                    this.getformuladetails(this.MMID);
                }, (error) => {
                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });
             
        }
    }
    showDialogToAdd() {
        this.showprimesave = true;
        this.showprimeupdate = false;
        this.car = new formulamodel();
        this.displayDialog = true;
    }
   
    cloneCar(c: formulamodel): formulamodel {
        let car = new formulamodel();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.formuladetails.indexOf(this.selectedCar);
    }
    getformuladetails(mmid: any) {
        mmid = this.MMID
        //debugger
        this.formulaService.getformuladetails(mmid).subscribe(
            formuladetails => {
                this.formuladetails = formuladetails
                this.formuladetails = this.formuladetails.filter(ws => ws.MMID == this.MMID)
                var listobj = this.formuladetails.filter(X => X.isPublished == false);
                if (listobj.length != 0) {
                    this._shareddataservice.TaxPublice(false);
                }
                var listobjT = this.formuladetails.filter(X => X.isPublished == true);
                if (listobjT.length != 0) {
                    this.showeditbutton = true
                }
            }
        );
    }

    

    getformulaname(MMID: any) {
        MMID = this.MMID
        this.formulaService.getformulaname(MMID).subscribe(
            fname => this.formulaname = fname

        );
    }
    cleardata() {
        this.ID = '';
        this.MMID = '';
        this.FormulaDefinition = '';
        this.VariableId = '';
        this.FormulaPriority = '';

    }
    _keyPress(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    //testformula 

    //public SendFormulaID(car: formulamodel) {
    public SendFormulaID(model: any) {

        this.formulaService.SendFormulaID(model)
       
            .subscribe(response => {
               
              this.FormulaTestList = response
             console.log(this.FormulaTestList )
                    this.showTestBox = true;
                this.displayDialogT = true
                this.TestResult = ''
                 this.showTestResult = false
            

                } );

    } 

    //while cliking testclick button

    public TestClick(model: any) {
        this.formulaService.SendTestVariables(model)
            .subscribe(response => {
                this.TestResult = response;
               // this.toastrService.success('Formula Variable Tested  successfully.');
                this.showTestBox = true;
                this.displayDialogT = true
                this.showTestResult = true
              
            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });
    }



    clearTestText() {
       

        this.Roottest.specificationMarket = ''

        this.Roottest.modelYear = ''

        this.Roottest.pno12 = ''

        this.Roottest.fuelType = ''

        this.Roottest.co2 = ''

        this.Roottest.fuelEfficiency = ''

        this.Roottest.electricalEnergyConsumption = ''

        this.Roottest.electricalRange = ''

        this.Roottest.actualMass = ''

        this.Roottest.weightParameters = ''

        this.Roottest.testMassInd = ''

        this.Roottest.massInRunningOrderTotal = ''

        this.Roottest.massOfOptionalEquipmentTotal = ''

        this.Roottest.nedc_ActualMass = ''

        this.Roottest.homologationCurbWeightTotal = ''




    }


    ClickRootlevelTest() {

        this.showRootTestResult = false
        this.rootlevel=true
        this.displayDialogR = true
        this.clearTestText()
    }

    RootTestClick(modelR: any, year: any, spec: any) {
        console.log(modelR)
        year = this.year
        spec = this.spec
      

        this.formulaService.RootlevelTestFormula(modelR, year, spec)

            .subscribe(response => {

                this.FormulaRootTestList = response
                if ((this.FormulaRootTestList[0].calculatedEfficiencyClass === null) && (this.FormulaRootTestList[0].value === null)) {

                    this.errorMsg = this.FormulaRootTestList[0].error
                    this.toastrService.error(this.errorMsg)
                }

                else {
                    this.TestResultP = true
                    this.showRootTestResult = true
                    console.log(this.FormulaRootTestList)
                }
            
            });


    }
    _keyPressSymbols(event: any) {
        const pattern = /[0-9 .]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }

    }
      
    }

