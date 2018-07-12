import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { marketyearmodel, marketnamemodel, rangemodel } from '../models/SelectMarketYear';
import { shareddataservice } from '../services/sharedservice/shared.service'
import { apiurlmodel } from '../models/app.url.model'
@Injectable()
export class CopyService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }  
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _copy: string = 'EfficiencyRange/CopyMarketDetails'; 
    public _marketyear: string = 'MasterData/GetMarketModelYear?'; 
    public copymsg: string = 'EfficiencyRange/CheckExixtanceofData' 
    public MMID: string;
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',     
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });

    getmarketyear(marketId: any): Observable<marketyearmodel[]> {       
        return this._http.get(this.serverurl + this._marketyear + 'marketId=' + marketId, this.header_options)
            .map(res => <marketyearmodel[]>res.json())
            .catch(this.handleError);
    }

    CopyRangeData(MMID: any, year: any)
         {
        let body = JSON.stringify([
        
        ]);
        console.log(body);
        
        return this._http.post(this.serverurl + this._copy + '?MMId=' + MMID + '&' + 'copyToModelYear=' + year, body, this.header_options)
            .map(res => <rangemodel[]>res.json())
            .catch(this.handleError);
    }

    CopyMessage(MMID: any, Myear: any) {
       
        return this._http.post(this.serverurl + this.copymsg + '?MMId=' + MMID + '&' + 'copyToModelYear=' + Myear, this.header_options)
            .map(res => <rangemodel[]>res.json())
            .catch(this.handleError);
    }
 
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
}
