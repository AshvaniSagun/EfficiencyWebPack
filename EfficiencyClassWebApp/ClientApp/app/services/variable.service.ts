import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { variablemodel,fueltypemodel } from '../models/variable'
import { shareddataservice } from '../services/sharedservice/shared.service'
import { apiurlmodel } from '../models/app.url.model'

@Injectable()
export class VariableService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _variabledetails: string = 'Variable/GetVariable?';
    public _variabletype: string = 'MasterData/GetVariableType ';
    public _inputvariablename: string = 'MasterData/GetInputTypeVariables';
    public _fueltypename: string = 'MasterData/GetFuelTypeVariables';
    public _marketsave: string = 'Variable/AddVariable ';
    public _updateUrl: string = 'Variable/UpdateVariable';
    public _delete: string = 'Variable/DeleteVariable';
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',        
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });

    getvariabledetails(mmid: any): Observable<variablemodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._variabledetails + 'mmid=' + mmid, this.header_options)
            .map(res => <variablemodel[]>res.json())
            .catch(this.handleError);
    }
    getvariabletype(): Observable<variablemodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._variabletype, this.header_options)
            .map(res => <variablemodel[]>res.json())
            .catch(this.handleError);
    }
    getvariableinputname(): Observable<variablemodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._inputvariablename, this.header_options)
            .map(res => <variablemodel[]>res.json())
            .catch(this.handleError);
    }
    getfueltypename(): Observable<fueltypemodel[]> {
		//debugger
		return this._http.get(this.serverurl + this._fueltypename, this.header_options)
            .map(res => <fueltypemodel[]>res.json())
            .catch(this.handleError);
    }

    SaveVariableData(model: variablemodel) {

        let body = JSON.stringify([
            {
                "Id": 0,
                "VariableName": model.VariableName,
                "VariableValue": model.VariableValue,
                "MMID": model.MMId,
                "VariableTypeId": model.VariableTypeId,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        ]);
        console.log(body);
       
        return this._http.post(this.serverurl + this._marketsave, body, this.header_options)
            .map(res => <variablemodel[]>res.json())
            .catch(this.handleError);
    }
    UpdateVariableData(model: variablemodel) {

        let body = JSON.stringify([
            {
                "Id": model.Id,
                "VariableName": model.VariableName,
                "VariableValue": model.VariableValue,
                "MMId": model.MMId,
                "VariableTypeId": model.VariableTypeId,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()
            }
        ]);
        console.log(body);
     
        return this._http.put(this.serverurl + this._updateUrl, body, this.header_options)
            .map(res => <variablemodel[]>res.json())
            .catch(this.handleError);
    }


    deletevariable(id: string): Observable<variablemodel[]> {
        //debugger
        var deleteByIdUrl = this.serverurl +this._delete + '?variableId=' + id
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <variablemodel[]>res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
}