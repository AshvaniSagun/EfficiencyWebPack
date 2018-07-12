import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { rangemodel, fueltypemodel } from '../models/range';
import { shareddataservice } from '../services/sharedservice/shared.service';
import { apiurlmodel } from '../models/app.url.model';

@Injectable()
export class RangeService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _rangedetails: string = 'EfficiencyRange/GetEfficiencyClassRange?MMId=';
    public _fuelType: string = 'MasterData/GetFuelType';
    public _rangesave: string = 'EfficiencyRange/AddEfficiencyClassRange';
    public _updateUrl: string = 'EfficiencyRange/UpdateEfficiencyClassRange';
    public _delete: string = 'EfficiencyRange/DeleteEfficiencyClassRange';
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });

    public MMID: string;
    getrangedetails(MMId: any): Observable<rangemodel[]> {
        //debugger 
        return this._http.get(this.serverurl + this._rangedetails + MMId, this.header_options)
            .map(res => <rangemodel[]>res.json())
            .catch(this.handleError);
    } 
    getfueltype(): Observable<fueltypemodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._fuelType, this.header_options)
            .map(res => <fueltypemodel[]>res.json())
            .catch(this.handleError);
    } 
    SaveRangeData(model: rangemodel) {

        let body = JSON.stringify([
            {
                "id": 0,
               "MMID": model.MMID,
                "FuelTypeId": model.FuelTypeId,
                "startRange": model.startRange,             
                "endRange": model.endRange,
                "ecValue": model.ecValue,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()            
            }
        ]);
        console.log(body);
       
        return this._http.post(this.serverurl + this._rangesave, body, this.header_options)
            .map(res => <rangemodel[]>res.json())
            .catch(this.handleError);
    }
    UpdateRangeData(model: rangemodel) {

        let body = JSON.stringify([
            {
                "id": model.id,
                "MMID": model.MMID,
                "FuelTypeId": model.FuelTypeId,
                "startRange": model.startRange,
                "endRange": model.endRange,
                "ecValue": model.ecValue,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": this._shareddataservice.getdate(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": this._shareddataservice.getdate()           
            }
        ]);
      
        return this._http.put(this.serverurl + this._updateUrl, body, this.header_options)
            .map(res => <rangemodel[]>res.json())
            .catch(this.handleError);
    }
    deleterange(id: string,model:rangemodel): Observable<rangemodel[]> {
        //debugger    
        var deleteByIdUrl = this.serverurl +this._delete + '?id=' + id + '&' + 'MMID=' + model.MMID
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <rangemodel[]>res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
}