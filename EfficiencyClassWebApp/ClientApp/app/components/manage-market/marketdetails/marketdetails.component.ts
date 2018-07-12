import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { marketmodel } from '../../../models/market';
import { ManageMarketService } from '../../../services/marketdetails.service';
import { Subscription } from 'rxjs';
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
import { MessagesModule, MessageModule, TooltipModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { shareddataservice } from '../../../services/sharedservice/shared.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService, Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
    selector: 'marketdetails',
    templateUrl: './marketdetails.component.html',
    styleUrls: ['./marketdetails.component.css'],
    providers: [ManageMarketService, MessageService, ConfirmationService],
})
/** manageMarket component*/
export class ManageMarketComponent implements OnInit {
    private subscription: Subscription;
    public resmessage: string;
    public addmessage: string;
    public listmessage: string;
    public marketsdetails: marketmodel[];
    public market: marketmodel;
    public markets: marketmodel[];
    public Marketid: string;
    public MarketTypeId: string;
    public marketTypeId: string;
    public ParameterGroupName: string;
    public Year: string;
    public MMId: string;
    public User: string;
    public MarketTypeName: string;
    public ParameterGroupId: string;
    public MarketName: string;
    public SpecMarket: string;
    public saveD: boolean;
    public edited: boolean;
    public showprimesave: boolean;
    public showprimeupdate: boolean;
    public isadd: boolean;
    public marketId = ''
    public submitted: boolean;
    public CDSID: any;
    public errorMsg: string
    msgs: Message[] = [];
    //Constructor
    constructor(private marketService: ManageMarketService, private toastrService: ToastrService, private messageService: MessageService, public _shareddataservice: shareddataservice, private confirmationService: ConfirmationService) {

        this.CDSID = _shareddataservice.Userinfo;
        this.marketsdetails = []
        this.getmarketdetails(this.CDSID)

        this.addmessage = 'Add New market';
        this.listmessage = 'All market';

    }
    ngOnInit() {

        this.resmessage = "";
        this.getmarketdetails(this.CDSID);
        this.getmarketname(this.CDSID);
        this.getmarkettype();
        this.getparameter();
        this.edited = true;
        this.saveD = false;

    }
    public name: marketmodel[];
    public type: marketmodel[];
    public parameter: marketmodel[];

    displayDialog: boolean;
    car: marketmodel = new marketmodel();
    selectedCar: marketmodel;
    newCar: boolean;



    showDialogToEdit(contact: marketmodel) {

        this.car.MMId = contact.MMId;
        this.car.Marketid = contact.Marketid;
        this.car.MarketTypeName = contact.MarketTypeName;
        this.car.MarketName = contact.MarketName;
        this.car.Marketid = contact.Marketid;
        this.car.MarketTypeName = contact.MarketTypeName;
        this.car.MarketTypeId = contact.MarketTypeId;
        this.car.ParameterGroupId = contact.ParameterGroupId;
        this.car.Year = contact.Year;
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.displayDialog = true;



    }
    save(car: marketmodel) {
        this.submitted = true
        this.marketService.SaveMarketData(car)
            .subscribe(response => {
                this.resmessage = response;
                //this.marketsdetails.unshift(car);
               // this.marketsdetails = this.marketsdetails.sort(x => new Date(x.CreatedOn).getTime());
                this.getmarketdetails(this.CDSID);
                this.cleardata();
                this.toastrService.success('Market Details added successfully.')
                this.displayDialog = false;
            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });
    }

    update(car: marketmodel) {
        this.submitted = true
        this.showprimesave = false;
        this.showprimeupdate = true;
        this.marketService.UpdateMarketData(car)
            .subscribe(response => {
                this.resmessage = response;
                this.getmarketdetails(this.CDSID);
                this.cleardata();
                this.toastrService.success('Market Details updated successfully.')
                this.displayDialog = false;
            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });


    }
  //  delete(car: marketmodel) {
  //   this.displayDialog = false;
  //   this.market = car;
  //    var IsConf = confirm('Deleting ' + this.market.MarketName + ' will delete all the published and staged data permanently for ' + this.market.Year + '. Do you want to continue deleting the ' + this.market.MarketName + ' for ' + this.market.Year + '?');
  //    if (IsConf) {

  //        this.marketService.deletemarket(this.market.MMId)
  //           .subscribe(
  //           market => {
  //                this.marketsdetails = market
  //                this.toastrService.error(this.market.MarketName + ' for the year ' + this.market.Year + ' deleted successfully.');
  //               this.getmarketdetails(this.CDSID);
  //           }

  //            , (error) => {
  //               this.errorMsg = error[0].ModelState[0].Message;
  //                this.toastrService.warning(this.errorMsg);
  //            });
  //    }


  //}




    delete(car: marketmodel) {
        this.market = car;
        this.confirmationService.confirm({
            message:'Deleting ' + this.market.MarketName + ' will delete all the published and staged data permanently for ' + this.market.Year + '.    Do you want to continue deleting the ' + this.market.MarketName + ' for ' + this.market.Year + ' ?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.marketService.deletemarket(this.market.MMId)
                    .subscribe(
                    market => {
                        this.marketsdetails = market
                       this.displayDialog = false;
                        this.toastrService.error(this.market.MarketName + ' for the Model year ' + this.market.Year + ' deleted successfully.');
                        this.getmarketdetails(this.CDSID);
                    }
                    , (error) => {
                        this.errorMsg = error[0].ModelState[0].Message;
                        this.toastrService.warning(this.errorMsg);
                    });
            },
          
        });
    }
    showDialogToAdd() {
        this.showprimesave = true;
        this.showprimeupdate = false;
        this.car = new marketmodel();
        this.displayDialog = true;
    }
    //onRowSelect(event: any) {
    //    //this.newCar = false;

    //    this.showprimesave = false;
    //    this.showprimeupdate = true;
    //    this.car = this.cloneCar(event.data);
    //    this.displayDialog = true;
    //}

    cloneCar(c: marketmodel): marketmodel {
        let car = new marketmodel();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.marketsdetails.indexOf(this.selectedCar);
    }

    getmarketdetails(cdsid: any) {
        //debugger
        cdsid = this.CDSID
        this.marketService.getmarketdetails(cdsid).subscribe(
            marketsdetails => this.marketsdetails = marketsdetails

        );
    }

    getmarketname(cdsid: any) {
        //debugger
        cdsid = this.CDSID
        this.marketService.getmarketname(cdsid).subscribe(
            marketname => this.name = marketname
        );
    }
    getmarkettype() {
        //debugger
        this.marketService.getmarkettype().subscribe(
            markettype => this.type = markettype
        );
    }
    getparameter() {
        //debugger
        this.marketService.getparameter().subscribe(
            parameter => this.parameter = parameter
        );
    }
    //SaveMarketData(model: marketmodel) {
    //    console.log(model);
    //    this.marketService.SaveMarketData(model)
    //        .subscribe(response => {
    //            this.resmessage = response;
    //            this.getmarketdetails();
    //            this.cleardata();
    //            alert("Details saved successfully");
    //        });
    //}
    //UpdateMarketData(model: marketmodel) {

    //    console.log(model);
    //    this.marketService.UpdateMarketData(model)
    //        .subscribe(response => {
    //            this.resmessage = response;
    //            this.getmarketdetails();
    //            this.cleardata();
    //            alert("Details updated successfully");
    //        });
    //}
    addNew() {
        this.edited = false;
        this.saveD = true;
        var market = new marketmodel();
        this.marketsdetails = [];
        this.marketsdetails.unshift(market);
        market.Marketid = "";
        market.MarketTypeId = "";
        market.ParameterGroupId = "";
        market.Year = "";
        market.showsave = true;
        market.showEdit = market.showEdit ? false : true;
        market.showupdate = false;
        market.cancel = true;
        market.isadd = true;
    };
    editMarkert(m: marketmodel) {
        this.edited = true;
        this.saveD = false;

        m.showupdate = true;
        m.cancel = true;
        m.showEdit = m.showEdit ? false : true;

    }
    //cancel(m: marketmodel) {
    //    if (m.isadd) {
    //        this.getmarketdetails();
    //    }
    //    else {
    //        m.showEdit = false;
    //        m.cancel = false;
    //        m.showupdate = false;

    //    }

    //}
    cleardata() {
        this.MMId = '';
        this.Marketid = '';
        this.MarketTypeId = '';
        this.ParameterGroupId = '';
        this.Year = '';
    }

    // Delete
    //deletemarket(item: marketmodel) {
    //    //debugger
    //    this.market = item;
    //    var IsConf = confirm('You are about to delete ' + this.market.MarketName + '. Are you sure?');
    //    if (IsConf) {
    //        this.marketService.deletemarket(this.market.MMId)
    //            .subscribe(
    //            market => {
    //                this.marketsdetails = market
    //                this.getmarketdetails();

    //            }
    //            );
    //    }
    //}
    _keyPress(event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}