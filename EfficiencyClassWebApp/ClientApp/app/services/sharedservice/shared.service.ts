import { Injectable, Component, EventEmitter } from '@angular/core';
import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class shareddataservice {
    public inputEvents: EventEmitter<string> = new EventEmitter();
   
    public inputEventsO: EventEmitter<object> = new EventEmitter();
    public taxPublice: EventEmitter<object> = new EventEmitter();
    public reload: EventEmitter<object> = new EventEmitter();
    public reloadOnchange: EventEmitter<object> = new EventEmitter();
    public loginuserset: EventEmitter<object> = new EventEmitter();
    public copycancel: EventEmitter<object> = new EventEmitter();
    public Userinfo: string;
    public roleId_get: string;
    public Token: string;
    public TaxPublice( isPublice: any) {
        this.taxPublice.emit(isPublice);
    }
    public Reload() {
        this.reload.emit();
    }
    public Reloadonchange() {
        this.reloadOnchange.emit();
    }

    public Getrangetype(val: string, val2: string, val3: string) {
        this.inputEventsO.emit({ val, val2,val3 });
    }

    public CopyCancel(val: any) {
        this.copycancel.emit(val);
    }
    public getmarketname(val: string) {
        this.inputEvents.emit(val);
    }
    public getnewfomula(val: string) {
        this.inputEvents.emit(val);
    }
    public getcopyyear(val: string) {
        this.inputEvents.emit(val);
    }
    public getCdsId(cdsid: string) {
       this.Userinfo = cdsid;
    }
    public setRoleId(RoleId: string) {
        this.roleId_get = RoleId;
    }
    public setToken(theToken: string) {
        this.Token = theToken ;
    }
    public getdate() {
        try {
            var currentdate = new Date();
            currentdate.toISOString().substring(0, 10);
            return currentdate;
        } catch (e) {

        }
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'OOps!! Server error');
    }
}
export class Errorlist {
    errormsg: string;
    successmsg: string;
    constructor(sucess: string, error: string) {
        this.errormsg = error;
        this.successmsg = sucess;
    }
}