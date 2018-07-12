import { Component, OnInit } from '@angular/core';
import { AdalService } from 'ng2-adal/dist/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SecretService } from "../../../../services/auth/secret.service";
import { Subscription } from 'rxjs';
import { apiurlmodel } from '../../../../models/app.url.model';
declare var JQuery: any;
declare var $: any;

import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../../../../services/auth/auth.service';
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
import { shareddataservice } from '../../../../services/sharedservice/shared.service'

@Component({
    selector: 'efficiency-header',
    templateUrl: './header.component.html',
    providers: [AuthService, MessageService]

})
export class headerComponent implements OnInit {
    public CDSID: string;
    public errorMsg: string
    public resmessage: string;
    public RoleId: any;
    public RoleName: any;
    public loginbut: boolean
    public logoutbut: boolean
    private subscription: Subscription;
    name = 'welcome to Efficiency Class ';
    public User: any
    public result: boolean
    public loginerror: any;

    function() {
        $('#mobile-menu').click(function () {
            $('.mainTabs-style').toggle();
        });
    }
    constructor(private authroleService: AuthService,private router: Router, private adalService: AdalService, private activatedRoute: ActivatedRoute, public _shareddataservice: shareddataservice, private secretService: SecretService) {

    
        //console.log('Entering welcome');
        //if (this.adalService.userInfo.isAuthenticated) {
           
        //    this.router.navigate(['/home']);
        //    this.router.navigate(['/markets']);
        //    this.router.navigate(['/ManageEfficiencyClass']);
        //    this.router.navigate(['/users']);          
        //}
  
    }
    public ngOnInit() {     

        //this.getTypeofUser(this.CDSID);
   
        this.User = this.adalService.userInfo.userName;
        var user = this.User
        this.User = user.split("@")[0]; 
        this.CDSID = this.User;
  
        this.adalService.handleWindowCallback();
        this.loginerror = this.adalService.userInfo.loginError;

        if (this.adalService.userInfo.userName == "") {
            if (this.loginerror == null) {
                this.logIn();
        
                console.log(this.CDSID)
            }
            else {
                this.logIn();
            }
        }
        if (this.adalService.userInfo.isAuthenticated) {
           
          
            //this._shareddataservice.getCdsId(this.User);
            var _apiurlmodel = new apiurlmodel();
         
            var tempvar = this.adalService.getCachedToken(_apiurlmodel.clientid);
            
            this._shareddataservice.setToken(this.adalService.getCachedToken(_apiurlmodel.clientid));

        }





    
  

    }
    public logIn() {
        this.adalService.login();
      
  
    }
    public logOut() {
        this.adalService.logOut();   
    }
    get authenticated(): boolean {
        return this.adalService.userInfo.isAuthenticated;
 
    }

}
