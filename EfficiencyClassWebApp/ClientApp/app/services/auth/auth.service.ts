import { Component, Injectable } from '@angular/core';
import { AdalService } from 'ng2-adal/dist/core';
import { Observable } from 'rxjs';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { apiurlmodel } from '../../models/app.url.model'
import { shareddataservice } from '../../services/sharedservice/shared.service'

@Injectable()
export class AuthService {
    public headers: Headers;
    constructor(private adalService: AdalService, private _http: Http, public _shareddataservice: shareddataservice) { }

    //adal-token 
    public getToken(): Observable<string> {        
        return this.adalService.acquireToken("https://volvocars.onmicrosoft.com").map(
            token => token.toString()
        );
    }

    //to get role-id
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
  

    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

}