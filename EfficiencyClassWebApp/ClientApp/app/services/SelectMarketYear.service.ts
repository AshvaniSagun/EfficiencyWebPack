import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { marketnamemodel, marketyearmodel} from '../models/SelectMarketYear';
import { apiurlmodel } from '../models/app.url.model';
import { shareddataservice } from '../services/sharedservice/shared.service';

@Injectable()
export class SelectMarketYearService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _marketname: string = 'MasterData/GetMarket?';
    public _marketyear: string = 'MasterData/GetMarketModelYear?';  
    public _publishdata: string = 'Publish/PublishMarketDetails?';  
    public _tobepublishedurl: string = 'Publish/PreviewDetailsTobePublished?';  
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',        
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });


    getmarketname(cdsid: any): Observable<marketnamemodel[]> {
        //debugger
        return this._http.get(this.serverurl + this._marketname + 'cdsid=' + cdsid, this.header_options)
            .map(res => <marketnamemodel[]>res.json())
            .catch(this.handleError);
    }
    getmarketyear(marketId: any): Observable<marketyearmodel[]> {       
        return this._http.get(this.serverurl + this._marketyear + 'marketId=' + marketId, this.header_options)
            .map(res => <marketyearmodel[]>res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json());

    }

    publishbutton(MMID: any) {
      
        return this._http.post(this.serverurl + this._publishdata + 'MMID=' + MMID, this.header_options)
            .map(res => <string[]>res.json())
            .catch(this.handleError);
    }

    Tobepublished(MMID: any) {
        let headers = new Headers({
            'Content-Type':
                'application/json; charset=utf-8'
        });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.serverurl + this._tobepublishedurl + 'MMID=' + MMID, this.header_options)
            .map(res => <string[]>res.json())
            .catch(this.handleError);
    }
}
