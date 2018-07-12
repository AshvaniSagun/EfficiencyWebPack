import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { adminmodel } from '../models/admin';
import { apiurlmodel } from '../models/app.url.model'
import { shareddataservice } from '../services/sharedservice/shared.service';

@Injectable()
export class AdminService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _admindetails: string = 'SpecificMarket/GetSpecificMarketDetails';
    public _adminsave: string = 'SpecificMarket/AddSpecificMarketDetails';
    public _updateUrl: string = 'SpecificMarket/UpdateSpecificMarketDetails';
    public _delete: string = 'SpecificMarket/DeleteSpecificMarketDetails';
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',    
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });


    getadmindetails(): Observable<adminmodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._admindetails, this.header_options)
            .map(res => <adminmodel[]>res.json())
            .catch(this.handleError);
    }

    SaveAdminData(model: adminmodel) {

        let body = JSON.stringify(
            {
                "marketId": 0,
                "SpecMarketCode": model.SpecMarketCode,  
                "marketName": model.marketName,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        );
        console.log(body);
     
        return this._http.post(this.serverurl + this._adminsave, body, this.header_options)
            .map(res => <adminmodel[]>res.json())
            .catch(this.handleError);
    }
    UpdateAdminData(model: adminmodel) {

        let body = JSON.stringify(
            {
                "marketId": model.marketId,
                "SpecMarketCode": model.SpecMarketCode,
                "marketName": model.marketName,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        );
        console.log(body);
 
        return this._http.put(this.serverurl + this._updateUrl, body, this.header_options)
            .map(res => <adminmodel[]>res.json())
            .catch(this.handleError);
    }

    deletemarket(id: string): Observable<adminmodel[]> {
        //debugger
        var deleteByIdUrl = this.serverurl + this._delete + '?id=' + id
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <adminmodel[]>res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
}