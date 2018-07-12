import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { usermodel, marketnamemodel, rolemodel, SelectedMarketmodel, hideModel } from '../models/user';
import { apiurlmodel } from '../models/app.url.model'
import { shareddataservice } from '../services/sharedservice/shared.service'
import { SelectItem } from 'primeng/primeng';

@Injectable()
export class ManageUserService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }
    public variable: string;
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _userdetails: string = 'UserManagement/GetUserDetails';
    public _marketname: string = 'MasterData/GetSpecificMarketList';
    public _userrole: string = 'MasterData/GetRoleDetails';
    public _selectedmarket: string = 'MasterData/GetMarket?'; 
    public _usersave: string = 'UserManagement/AddUserDetails';
    public _updateUrl: string = 'UserManagement/UpdateUserDetails';
    public _delete: string = 'UserManagement/DeleteUserDetails';
    public _typeOfUser: string = 'UserManagement/GetTypeOfUser?';
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
		'Authorization': `Bearer ${this._shareddataservice.Token}`
    });

    public header_options = new RequestOptions({ headers: this._headerinfo });
    
    getuserdetails(): Observable<usermodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._userdetails, this.header_options)
            .map(res => <usermodel[]>res.json())
            .catch(this.handleError);
    }

   

    getmultidropdown(): Observable<marketnamemodel[]> {
        return this._http.get(this.serverurl + this._marketname, this.header_options)
            .map(res => <marketnamemodel[]>res.json())
            .catch(this.handleError);
    }

    getuserrole(): Observable<usermodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._userrole, this.header_options)
            .map(res => <usermodel[]>res.json())
            .catch(this.handleError);
    }
    getSelectedMarket(uId:any): Observable<SelectedMarketmodel[]> {
		//debugger
		return this._http.get(this.serverurl + this._selectedmarket + 'cdsid=' + uId, this.header_options)
            .map(res => <SelectedMarketmodel[]>res.json())
            .catch(this.handleError);
    }
    SaveMarketData(model: usermodel, selectedCars1: any) {

        let body = JSON.stringify(
            {
                "Id": 0,
                "CDSID": model.CDSID,
                "userName": model.userName,
                "email": model.email,
                "marketNames": "",
                "marketIds": selectedCars1,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        );
        console.log(body);   

        return this._http.post(this.serverurl + this._usersave, body, this.header_options)
            .map(res => <usermodel[]>res.json())
            .catch(this.handleError);
    }
    UpdateUserData(model: usermodel, selectedCars1: any) {

        let body = JSON.stringify(
            {
                "Id": model.Id,
                "CDSID": model.CDSID,
                "userName": model.userName,
                "email": model.email,
                "marketNames": "",
                "marketIds": selectedCars1,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        );
        console.log(body);
        
        return this._http.put(this.serverurl + this._updateUrl, body, this.header_options)
            .map(res => <usermodel[]>res.json())
            .catch(this.handleError);
    }

    deleteuser(id: string): Observable<usermodel[]> {
        //debugger
      
        var deleteByIdUrl = this.serverurl + this._delete + '?id=' + id
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <usermodel[]>res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
    getTypeofUser(cdsid: any): Observable<hideModel[]> {
        //debugger
		this._headerinfo = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		'Authorization': `Bearer ${this._shareddataservice.Token}`
		});

		this.header_options = new RequestOptions({ headers: this._headerinfo });

        return this._http.get(this.serverurl + this._typeOfUser + 'cdsid=' + cdsid, this.header_options)
            .map(res => <hideModel[]>res.json())
            .catch(this.handleError);
    }
}