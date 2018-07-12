import { Injectable, Component } from '@angular/core';
import {
    Http, Request, RequestMethod, Response,
    RequestOptions, Headers
} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { formulamodel, formulanamemodel, Testformula, TestformulaRoot } from '../models/formula'
import { shareddataservice} from '../services/sharedservice/shared.service'
import { apiurlmodel } from '../models/app.url.model'

@Injectable()
export class FormulaService {
    public headers: Headers;
    constructor(private _http: Http, public _shareddataservice: shareddataservice) {

    }
    public _apiurlmodel = new apiurlmodel();
    public serverurl: string = this._apiurlmodel.apiurl;
    public _formulaname: string = 'MasterData/GetVariableList?';
    public _formuladetails: string = 'Formula/Get?';
    public _formulasave: string = 'Formula/AddFromulaAndDependency';
    public _rootleveltest: string = 'Formula/EfficiencyClassCalculation';
    public _sendformulaId: string = 'Formula/FormulaParsing';
    public SendTestVariablesApi: string = 'Formula/TestFormula';
    public _updateUrl: string = 'Formula/UpdateFormula';
    public _delete: string = 'Formula/DeleteFormula';
    testformula: Testformula[];
    public _headerinfo = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${this._shareddataservice.Token}`
    });
    public header_options = new RequestOptions({ headers: this._headerinfo });
    //getformuladetails(): Observable<formulamodel[]> {
    //    //debugger
    //    return this._http.get(this.serverurl + this._formuladetails)
    //        .map(res => <formulamodel[]>res.json())
    //        .catch(this.handleError);
    //}

    getformuladetails(mmid: any): Observable<formulamodel[]> {
        return this._http.get(this.serverurl + this._formuladetails + 'mmid=' + mmid, this.header_options)
            .map(res => <formulamodel[]>res.json())

    }

    getformulaname(MMId: any): Observable<formulanamemodel[]> {
        return this._http.get(this.serverurl + this._formulaname + 'MMId=' + MMId, this.header_options)
            .map(res => <formulanamemodel[]>res.json())

    }
    SaveFormulaData(model: formulamodel) {

        let body = JSON.stringify([
            {
                "ID": 0,
                "MMID": model.MMID,
                "FormulaDefinition": model.FormulaDefinition,
                "VariableId": model.VariableId,
                "VariableName": model.VariableName,
                "FormulaPriority": model.FormulaPriority,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": new Date(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": new Date()
            }
        ]);
        console.log(body);
        return this._http.post(this.serverurl + this._formulasave, body, this.header_options)
            .map(res => <formulamodel[]>res.json())
            .catch(this.handleError);
    }
    UpdateFormulaData(model: formulamodel) {

        let body = JSON.stringify([
            {
                "ID": model.ID,
                "MMID": model.MMID,
                "FormulaDefinition": model.FormulaDefinition,
                "VariableId": model.VariableId,
                "VariableName": model.VariableName,
                "FormulaPriority": model.FormulaPriority,
                "CreatedBy": this._shareddataservice.Userinfo,
                "CreatedOn": new Date(),
                "UpdatedBy": this._shareddataservice.Userinfo,
                "UpdatedOn": new Date()
            }
        ]);
        console.log(body);
      
        return this._http.put(this.serverurl + this._updateUrl, body, this.header_options)
            .map(res => <formulamodel[]>res.json())
            .catch(this.handleError);
    }


    deleteformula(id: string): Observable<formulamodel[]> {
        //debugger
        var deleteByIdUrl = this.serverurl + this._delete + '?formulaId=' + id
        console.log(deleteByIdUrl);
        return this._http.delete(deleteByIdUrl, this.header_options)
            .map(res => <formulamodel[]>res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json());
    }

    //test formula

    SendFormulaID(model: formulamodel) {
        let body = JSON.stringify(
            {
               
                "formulaDefinition": model.FormulaDefinition,
              
            }
        );
      
        return this._http.post(this.serverurl + this._sendformulaId, body, this.header_options)
            .map(res => <Testformula[]>res.json())
   
    }

    

    //test with edited values
    SendTestVariables(model: any) {

        return this._http.post(this.serverurl + this.SendTestVariablesApi, model, this.header_options)
            .map(res => <Testformula[]>res.json())
            .catch(this.handleError);
    }

    //Rootlevel
    RootlevelTestFormula(modelT: TestformulaRoot, year: any, spec: any) {

        let body = JSON.stringify([
            {
                "specificationMarket": spec,
                "modelYear": year,
                "pno12": modelT.pno12,
                "fuelType": modelT.fuelType,
                "co2": modelT.co2,
                "fuelEfficiency": modelT.fuelEfficiency,
                "electricalEnergyConsumption": modelT.electricalEnergyConsumption,
                "electricalRange": modelT.electricalRange,
                "weightParameters": {
                    "actualMass": modelT.actualMass,
                    "testMassInd": modelT.testMassInd,
                    "massInRunningOrderTotal": modelT.massInRunningOrderTotal,
                    "massOfOptionalEquipmentTotal": modelT.massOfOptionalEquipmentTotal,
                    "nedc_ActualMass": modelT.nedc_ActualMass,
                    "homologationCurbWeightTotal": modelT.homologationCurbWeightTotal
                }
            }
        ]);
        console.log(body);
        return this._http.post(this.serverurl + this._rootleveltest, body, this.header_options)
            .map(res => <TestformulaRoot[]>res.json())
            .catch(this.handleError);
    }


}