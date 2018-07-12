import { Component, ViewChild, ElementRef, Inject, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Params, RouterLinkActive } from '@angular/router';
import { marketnamemodel, marketyearmodel } from '../../../models/SelectMarketYear';
import { SelectMarketYearService } from '../../../services/SelectMarketYear.service';
import { marketmodel } from '../../../models/market';
import { ManageMarketService } from '../../../services/marketdetails.service';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import 'jquery';
import { Subscription } from 'rxjs';
import { shareddataservice } from '../../../services/sharedservice/shared.service'
import { Observable } from 'rxjs/Observable';
import { DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { ToastrService } from 'toastr-ng2';
import { PapaComponent } from '../../../components/manage-efficiency-class/excel/Papa.component';
import { MarketService } from '../../../services/papa.sevice';

declare var $: any;
@Component({
    selector: 'SelectMarketYear',
    templateUrl: './SelectMarketYear.component.html',
    providers: [SelectMarketYearService, ManageMarketService],
})
export class SelectMarketYearComponent implements OnInit {
    private subscription: Subscription;
    @Output() notify: EventEmitter<string> = new EventEmitter();
    @ViewChild('myInput')
    myInputVariable: any;

    reset() {
        this.myInputVariable.nativeElement.value = "";
    }
    public resmessage: string;
    public Generic: boolean;
    public specific: boolean;
    public hide: boolean = true
    public marketId: string
    public marketIdN: string
    public showpublishbutton: boolean;
    public tobepublishedpopup: boolean;
    public MMId: string
    public select: string
    public id: string
    public publishresponse: string;
    public range: boolean;
    public formula: boolean;
    public copy: boolean;
    public selectedItem: boolean;
    public previewresponse: string;
    public CDSID: any;
    public Selectedyear: string
    public selectedspec: any;
    public SpecmarketCode: string
    public butDisabled: boolean
    public errorMsg: string

    constructor(public marketService: SelectMarketYearService,
        public _shareddataservice: shareddataservice, public marketdetailsservice: ManageMarketService, private toastrService: ToastrService, private router: Router) {
        this.subscription = this._shareddataservice.inputEvents.subscribe((newValue: string) => {
            this.marketIdN = newValue;
            this.year = []
            this.onSelectshared(this.marketIdN)
        })

        this.subscription = this._shareddataservice.taxPublice.subscribe((value: any) => {
            this.showpublishbutton = value;
        })


        this.subscription = this._shareddataservice.copycancel.subscribe((value: any) => {
            if (value == true) {

                this.hide = true
            
             
            }
        })

        this.CDSID = _shareddataservice.Userinfo;
        this.marketsdetails = []
        this.getmarketdetails(this.CDSID)
    }
    ngOnInit() {
        this.name = []
        this.year = []
        this.marketsdetails = []
        this.showpublishbutton = true
        this.getmarketname(this.CDSID);
        this.getmarketdetails(this.CDSID);
        this.tobepublishedpopup = false;
        this.selectedItem = false
        this.selectedspec = this.name[0];


    }
    public name: marketnamemodel[];
    public year: marketyearmodel[];
    public marketsdetails: marketmodel[];
    public selectedCity: any

    getmarketdetails(cdsid: any) {
        this.marketdetailsservice.getmarketdetails(cdsid).subscribe(
            marketsdetails => {
                this.marketsdetails = marketsdetails
            }
        );
    }
    getmarketname(cdsid: any) {
        cdsid = this.CDSID
        this.marketService.getmarketname(cdsid).subscribe(
            marketname => this.name = marketname

        );
    }

    public onSelectD($event: any) {

        this.marketId = this.selectedspec.marketId
        this.SpecmarketCode = this.selectedspec.SpecMarketCode

        this.marketService.getmarketyear(this.marketId).subscribe(
            marketyear => this.year = marketyear
        );
        this._shareddataservice.getmarketname(this.marketId);

    }



    public onSelectshared(marketId: any) {

        this.marketId = marketId
        this.marketService.getmarketyear(this.marketId).subscribe(
            marketyear => this.year = marketyear

        );
        this.hide = true
    }

    onSelectYear(MMId: any) {


        this.MMId = MMId.target.value;
        if (this.MMId == "0: undefined") {
            this.hide = true
        }
        else {
            this.Selectedyear = MMId.target.options[MMId.target.selectedIndex].text;

            this.hide = false
            this.Generic = true
            this.formula = false


            this.selectedItem = true;
            var markettype = this.marketsdetails.filter(list => list.MMId == this.MMId)

            if (markettype.length > 0) {
                if (markettype[0].MarketTypeId == "1") {
                    this.Generic = false

                    $(".copy").addClass("changebgd");
                    $(".variable").addClass("changebgd");
                    $(".range").removeClass("changebgd");
                    $(".formula").removeClass("changebgd");
                    $(".range").removeClass("changebgd");
                    $(".range").parent("li").removeClass("active");
                    $(".range").parent("li").addClass("border");
                    $(".details").removeClass("changebgd");
                    $(".details").parent("li").removeClass("active");
                    $(".variable").parent("li").removeClass("active");
                    $(".formula").parent("li").removeClass("active");

                    //$(".efficiencyTabs .secondlevel-tab > li:nth-child(2) > a").css("border-right", " 1px solid #fff !important");
                }
                else {
                    this.Generic = true

                    $(".copy").addClass("changebgd");
                    $(".variable").addClass("changebgd");
                    $(".range").removeClass("changebgd");
                    $(".formula").removeClass("changebgd");
                    $(".range").removeClass("changebgd");
                    $(".range").parent("li").removeClass("active");
                    //$(".efficiencyTabs .secondlevel-tab > li:nth-child(2) > a").css("border-right", " 1px solid #2B7BCD !important");
                    $(".range").parent("li").addClass("border");
                    $(".details").removeClass("changebgd");
                    $(".details").parent("li").removeClass("active");
                    $(".variable").parent("li").removeClass("active");
                    $(".formula").parent("li").removeClass("active");
                }

            }
            this.router.navigate(['ManageEfficiencyClass/copyefficencyrange/' + this.MMId + '/market/' + this.marketId + '/Selectedyear/' + this.Selectedyear]);

            this._shareddataservice.Reload();


        }

    }



    navigateWeightSegment() {
        this.router.navigate(['ManageEfficiencyClass/WeightSegmentCo2', this.MMId]);

        this.formula = false

        $(".details").addClass("changebgd");
        $(".variable").removeClass("changebgd");
        $(".copy").removeClass("changebgd");
        $(".formula").removeClass("changebgd");
        $(".range").removeClass("changebgd");
        $(".variable").parent("li").removeClass("active");
        $(".copy").parent("li").removeClass("active");
        $(".range").parent("li").removeClass("active");
        $(".formula").parent("li").removeClass("active")

    }
    navigateRange() {

        this.formula = false
        this.router.navigate(['ManageEfficiencyClass/range', this.MMId]);

        $(".range").addClass("changebgd");
        $(".variable").removeClass("changebgd");
        $(".copy").removeClass("changebgd");
        $(".details").removeClass("changebgd");
        $(".formula").removeClass("changebgd");
        $(".variable").parent("li").removeClass("active");
        $(".copy").parent("li").removeClass("active");
        $(".details").parent("li").removeClass("active");
        $(".formula").parent("li").removeClass("active")
      
    }
    navigateFormula() {

        this.formula = true
        this.router.navigate(['ManageEfficiencyClass/formula', this.MMId]);

        $(".formula").addClass("changebgd");
        $(".variable").addClass("changebgd");
        $(".copy").removeClass("changebgd");
        $(".details").removeClass("changebgd");
        $(".range").removeClass("changebgd");
        $(".copy").parent("li").removeClass("active");
        $(".details").parent("li").removeClass("active");
        $(".range").parent("li").removeClass("active")

    }
    public navigatecopy() {
        this.router.navigate(['ManageEfficiencyClass/copyefficencyrange/' + this.MMId + '/market/' + this.marketId + '/Selectedyear/' + this.Selectedyear]);

        this.formula = false
        this.copy = true
        this.range = false

        $(".copy").addClass("changebgd");
        $(".variable").removeClass("changebgd");       
        $(".details").removeClass("changebgd");
        $(".formula").removeClass("changebgd");
        $(".range").removeClass("changebgd");

        $(".variable").parent("li").removeClass("active");
        $(".range").parent("li").removeClass("active");
        $(".details").parent("li").removeClass("active");
        $(".formula").parent("li").removeClass("active")
    }
    public navigateDetails() {
        this.router.navigate(['ManageEfficiencyClass/details', this.MMId]);

        $(".details").addClass("changebgd");
        $(".variable").removeClass("changebgd");
        $(".copy").removeClass("changebgd");
        $(".formula").removeClass("changebgd");
        $(".range").removeClass("changebgd");
        $(".variable").parent("li").removeClass("active");
        $(".range").parent("li").removeClass("active");
        $(".copy").parent("li").removeClass("active");
        $(".formula").parent("li").removeClass("active")
    }
    public navigatevariable() {
        this.router.navigate(['ManageEfficiencyClass/variable', this.MMId]);
        $(".variable").addClass("changebgd");
        $(".copy").removeClass("changebgd");
        $(".details").removeClass("changebgd");
        $(".formula").addClass("changebgd");
        $(".range").removeClass("changebgd");
        $(".formulanew").removeClass("changebgd");
        $(".details").parent("li").removeClass("active");
        $(".range").parent("li").removeClass("active");
        $(".copy").parent("li").removeClass("active");
        $(".formula").parent("li").removeClass("active")
    }
    public navigateformulanew() {
        this.router.navigate(['ManageEfficiencyClass/formula/' + this.MMId + '/formula/' + this.Selectedyear + '/spec/' + this.SpecmarketCode]);
        $(".variable").removeClass("changebgd");
        $(".variable").removeClass("highlight");
        $(".copy").removeClass("changebgd");
        $(".details").removeClass("changebgd");
        $(".formula").addClass("changebgd");
        $(".formulanew").addClass("changebgd");
        $(".range").removeClass("changebgd");
        $(".details").parent("li").removeClass("active");
        $(".range").parent("li").removeClass("active");
        $(".copy").parent("li").removeClass("active")
    }
    publishbutton() {

        this.marketService.Tobepublished(this.MMId)
            .subscribe(response => {
                this.previewresponse = response;
                this.tobepublishedpopup = true;

            });
    }

    Nopublish() {

        this.tobepublishedpopup = false;


    }

    Okpublish() {
        this.marketService.publishbutton(this.MMId)
            .subscribe(response => {
                this.publishresponse = response;
                this.tobepublishedpopup = false;
                this.showpublishbutton = true;
                this.toastrService.success(this.publishresponse);
                this._shareddataservice.Reload();

            },
                (error) => {

                    this.errorMsg = error[0].ModelState[0].Message;
                    this.toastrService.warning(this.errorMsg);
                });

    }


}






