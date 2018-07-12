import { Component, ViewChild, ElementRef, Inject, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { marketyearmodel, marketnamemodel, rangemodel } from '../../../../models/SelectMarketYear';
import { SelectMarketYearService } from '../../../../services/SelectMarketYear.service';
import { marketmodel } from '../../../../models/market';
import { ManageMarketService } from '../../../../services/marketdetails.service';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import 'jquery';
import { Subscription } from 'rxjs';
import { shareddataservice } from '../../../../services/sharedservice/shared.service'
import { Observable } from 'rxjs/Observable';
import { DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { CopyService } from '../../../../services/copy.service';
import { ToastrService } from 'toastr-ng2';
import { SelectMarketYearComponent } from '../../../manage-efficiency-class/SelectMarketYear/SelectMarketYear.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'copy',
    templateUrl: './copy.component.html',
    providers: [SelectMarketYearService, ManageMarketService, CopyService, SelectMarketYearComponent],
})

export class copyComponent implements OnInit {
    private subscription: Subscription;
    public resmessage: string;
    public MMId: string;
    public Generic: boolean;
    public specific: boolean;
    public hide: boolean = true
    public marketIdN: string;
    public id: string;
    public select: string;
    public errorMsg: string
    public year: marketyearmodel[];
    public Selectedyear: string
    public tobecopy: boolean
    public previewresponse: string
    public activecopy: boolean
    constructor(public marketService: SelectMarketYearService, public copyService: CopyService, private router: Router,private Yearcomponent: SelectMarketYearComponent, private toastrService: ToastrService, public _shareddataservice: shareddataservice, public marketdetailsservice: ManageMarketService, private activatedRoute: ActivatedRoute) {  }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.MMId = params['MID'];
            this.Selectedyear = params['Selectedyear'];
            this.getmarketyear(this.MMId)

        });
        this.tobecopy = false
        this.activecopy=true
    }

    public range: rangemodel;

    getmarketyear(MMId: any) {
        //debugger

        this.marketService.getmarketyear(MMId).subscribe(
            marketyear => {
            this.year = marketyear
            this.year = this.year.filter(x => x.value != this.Selectedyear);

            }
        );
    }


    addTodo(MMId: any, year:any) {
        year = this.Selectedyear
        this.copyService.CopyMessage(MMId, year)
            .subscribe(response => {
                this.previewresponse = response;
                console.log(this.previewresponse)
                this.tobecopy = true
            }, (error) => {
                this.errorMsg = error[0].ModelState[0].Message;
                this.toastrService.warning(this.errorMsg);
            });

    }

    okcopy(MMId:any) {
        let year = this.Selectedyear
    this.copyService.CopyRangeData(MMId, year)
       .subscribe(response => {
         this.resmessage = response;
          this.toastrService.success(this.resmessage);
    }
      , (error) => {
        this.errorMsg = error[0].ModelState[0].Message;
      this.toastrService.warning(this.errorMsg);
   });
        this.tobecopy = false

    }


    nocopy() {
        this.tobecopy = false

    }

    onSelectD($event: any) {

        this.activecopy = false
    }
    cancelcopy() {
        let value=true
        this._shareddataservice.CopyCancel(value);
        //this.router.navigate(['ManageEfficiencyClass']);


    }
}

