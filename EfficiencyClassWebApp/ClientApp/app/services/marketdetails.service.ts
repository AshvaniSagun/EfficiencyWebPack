import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { marketmodel, marketnamemodel, marketparametermodel, markettypemodel } from '../models/market';
import { shareddataservice } from '../services/sharedservice/shared.service'
import { apiurlmodel} from '../models/app.url.model'

@Injectable()
export class ManageMarketService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _marketdetails: string = 'Market/Get?';
    public _marketname: string = 'MasterData/GetMarket?';
    public _markettype: string = 'MasterData/GetMarketType';
    public _marketparameter: string = 'MasterData/GetParameterGroupMaster ';
    public _marketsave: string = 'Market/AddMarket ';
    public _updateUrl: string = 'Market/UpdateMarket ';
    public _delete: string = 'Market/Delete';
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',        
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });

    getmarketdetails(cdsid:any): Observable<marketmodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._marketdetails + 'cdsid=' + cdsid, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }
    getmarketname(cdsid: any): Observable<marketmodel[]> {
        //debugger      
        return this._http.get(this.serverurl + this._marketname + 'cdsid=' + cdsid, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }
    getmarkettype(): Observable<marketmodel[]> {
        //debugger       
        return this._http.get(this.serverurl + this._markettype, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }
    getparameter(): Observable<marketmodel[]> {
        //debugger      
        return this._http.get(this.serverurl + this._marketparameter, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
    /** GET heroes from the server */

    SaveMarketData(model: marketmodel) {

        let body = JSON.stringify([
            {
                "MMId": 0,
                "Marketid": model.Marketid,
                "MarketTypeId": model.MarketTypeId,
                "ParameterGroupId": model.ParameterGroupId,
                "Year": model.Year,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        ]);
        console.log(body);
        return this._http.post(this.serverurl + this._marketsave, body, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }

    UpdateMarketData(model: marketmodel) {

        let body = JSON.stringify([
            {
                "MMId": model.MMId,
                "Marketid": model.Marketid,
                "MarketTypeId": model.MarketTypeId,
                "ParameterGroupId": model.ParameterGroupId,
                "Year": model.Year,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        ]);
        console.log(body);       
        return this._http.put(this.serverurl + this._updateUrl, body, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }


    deletemarket(id: string): Observable<marketmodel[]> {
        //debugger
        var deleteByIdUrl = this.serverurl + this._delete + '?MMId=' + id
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <marketmodel[]>res.json())
            .catch(this.handleError);
    }

}