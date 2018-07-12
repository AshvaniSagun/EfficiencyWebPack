import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { shareddataservice } from '../../services/sharedservice/shared.service';


@Component({
    selector: 'manage-market',
    templateUrl: './manage-market.component.html',
})
export class ManageComponent implements OnInit {
    public Roleid: string

    constructor(private router: Router, public _shareddataservice: shareddataservice) {
        this.Roleid = _shareddataservice.roleId_get;
    

        if (this.Roleid == '2') {


            this.router.navigate(['markets/MarketDetails']);
        }

        if (this.Roleid == '1') {

            this.router.navigate(['markets/admintable']);
        }


    }

    ngOnInit() {
      

    }

   
    Addmarket() {
        this.router.navigate(['markets/admintable']);

     

    }
    Addmarketdetails() {
      
        this.router.navigate(['markets/MarketDetails']);
    }
}
