import { Component, OnInit} from '@angular/core';
import { shareddataservice } from '../../services/sharedservice/shared.service'
import { usermodel, marketnamemodel, SelectedMarketmodel, dummymodel, marketdropdown, hideModel } from '../../models/user';
import { ManageUserService } from '../../services/manageusers.service';
import { AdalService } from 'ng2-adal/dist/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SecretService } from "../../services/auth/secret.service";
import { Subscription } from 'rxjs';
import { apiurlmodel } from '../../models/app.url.model';
import { AuthService } from '../../services/auth/auth.service';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [AuthService, ManageUserService]
})
export class NavMenuComponent implements OnInit {

    public User: any
    public CDSID: string;
    public typeofUser: hideModel[];
    public loginerror: any;

    constructor(private authroleService: AuthService, private router: Router, private adalService: AdalService, private userService: ManageUserService, private activatedRoute: ActivatedRoute, public _shareddataservice: shareddataservice, private secretService: SecretService) {
       
    

    }

    public home: boolean
    public markets: boolean
    public ManageEfficiencyClass: boolean
    public users: boolean


    public roleId: string


    public ngOnInit() {

     

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
            this.User = this.adalService.userInfo.userName;
            var user = this.User
            this.User = user.split("@")[0];
            this.CDSID = this.User;
            this.getTypeofUser(this.CDSID)
            this.adalService.handleWindowCallback();
            this.loginerror = this.adalService.userInfo.loginError;
            this._shareddataservice.getCdsId(this.User);
            var _apiurlmodel = new apiurlmodel(); 
            var tempvar = this.adalService.getCachedToken(_apiurlmodel.clientid);
            this._shareddataservice.setToken(this.adalService.getCachedToken(_apiurlmodel.clientid));
            this.router.navigate(['home']);
        
        }

       

      

      

        //if (this.roleId == '1') {

        //  alert("user")
        //this.home = true
        // this.markets = true
        //   this.ManageEfficiencyClass = true
        //   this.users = false
        //}
        //else {
        //   alert("super user")
        //  this.home = true
        //  this.markets = true
        //   this.ManageEfficiencyClass = false
        //    this.users = true
        //}


        }



    getTypeofUser(cdsid: any) {

        cdsid = this.CDSID
        //debugger
        this.userService.getTypeofUser(cdsid).subscribe(
            role => { this.typeofUser = role
                this.roleId = this.typeofUser[0].RoleId
                this._shareddataservice.setRoleId(this.roleId);
            }, (error) => {
               
            });
    } 


    

//if (this.roleId === '2') {

//    this.router.navigate(['ManageEfficiencyClass']);

//}


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
