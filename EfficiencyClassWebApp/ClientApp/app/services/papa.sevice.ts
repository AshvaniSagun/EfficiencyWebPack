import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { marketnamemodel, marketyearmodel, Csvdata } from '../models/papa';
import { apiurlmodel } from '../models/app.url.model'
import { shareddataservice } from '../services/sharedservice/shared.service'
import { Subscription } from 'rxjs';

@Injectable()
export class MarketService {
    private subscription: Subscription;
    public MMId: any;
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {
        this.subscription = this._shareddataservice.inputEvents.subscribe((newValue: string) => {
         
            this.MMId = newValue;
         
          
        })
    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    //public _marketname: string = 'MasterData/GetMarket';
    public _marketyear: string = 'MasterData/GetMarketModelYear?';
    public Savecsv: string = 'CsvUpload/AddCsv';
    public getweightapi: string = 'CsvUpload/Get?';
    public updatecsv: string = 'CsvUpload/UpdateCsv'
    public deletecsv: string = 'CsvUpload/DeleteCsvUploadedData'
    public savecsv: string = 'CsvUpload/AddCsv'
    public MMID: string
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',        
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });

  
    //getmarketname(): Observable<marketnamemodel[]> {
    //    //debugger
    //    return this._http.get(this.serverurl + this._marketname, this.header_options )
    //        .map(res => <marketnamemodel[]>res.json())
    //        .catch(this.handleError);
    //}
    getweightsegment(mmid: any): Observable<Csvdata[]> {
        //debugger
        return this._http.get(this.serverurl + this.getweightapi + 'mmid=' + mmid, this.header_options)
            .map(res => <Csvdata[]>res.json())
            .catch(this.handleError);
    }
    getmarketyear(marketId: any): Observable<marketyearmodel[]> {

        //console.log(this._marketyear+ mid)
        //debugger
        return this._http.get(this.serverurl + this._marketyear + 'marketId=' + marketId, this.header_options)

            .map(res => <marketyearmodel[]>res.json())
            .catch(this.handleError);
    }
    //bulk upload
    SaveCsvData(uploadcsvdata: any,MMID:any) {

        for (let item of uploadcsvdata) {

            item.MMID = MMID;
            item.EwId = "0";
            item.CreatedBy = this._shareddataservice.Userinfo,
            item.CreatedOn =new Date();
            item.UpdatedBy = this._shareddataservice.Userinfo,
            item.UpdatedOn = new Date();
          
        }
       
        let body = JSON.stringify(uploadcsvdata)             
        console.log(body)
       
        return this._http.post(this.serverurl + this.Savecsv, body, this.header_options)
            .map(res => <Csvdata>res.json())
            .catch(this.handleError);
    }


    SavecsvdbData(model: Csvdata) {

        let body = JSON.stringify([
            {
                "EwId": 0,
                "MMID": model.MMID,
                "PNO12": model.PNO12,
                "PWeight": model.PWeight,
                "SegmentCo2": model.SegmentCo2,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": new Date(),
                "UpdatedBy": this._shareddataservice.Userinfo,
               "UpdatedOn":new Date()
            }
        ]);
        console.log(body);
       
        return this._http.post(this.serverurl + this.savecsv, body, this.header_options)
            .map(res => <Csvdata[]>res.json())
            .catch(this.handleError);
    }


    UpdatecsvdbData(model: Csvdata) {

        let body = JSON.stringify([
            {
                "EwId": model.EwId,
                "MMID": model.MMID,
                "PNO12": model.PNO12,
                "PWeight": model.PWeight,
                "SegmentCo2": model.SegmentCo2,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": new Date(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn":new Date()
            }
        ]);
        console.log(body);
        return this._http.put(this.serverurl + this.updatecsv, body, this.header_options)
            .map(res => <Csvdata[]>res.json())
            .catch(this.handleError);
    }


    deletecsvdbdata(id: string): Observable<Csvdata[]> {
        //debugger
        var deleteByIdUrl = this.serverurl +this.deletecsv + '?ewId=' + id
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <Csvdata[]>res.json())
            .catch(this.handleError);
    }



    private handleError(error: Response) {
        return Observable.throw(error.json());
    }
}
