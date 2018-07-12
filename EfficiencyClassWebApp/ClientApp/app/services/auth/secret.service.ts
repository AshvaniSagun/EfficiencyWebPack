import { Injectable } from '@angular/core';
import { apiurlmodel } from '../../models/app.url.model'

// Application specific configuration 
@Injectable()
export class SecretService {
    public _apiurlmodel = new apiurlmodel();
    
    public get adalConfig(): any {
        return {
            tenant: 'volvocars.onmicrosoft.com',            
            clientId: this._apiurlmodel.clientid,
            redirectUri: window.location.origin + '/',
            postLogoutRedirectUri: window.location.origin + '/'
        };
    }
}
