
//import * as data from '../../assets/environment/environmentConfig.json';
import * as data from '../../../appsettings.json';

export class apiurlmodel {

    public apiurl: string;
    public clientid: string;
    
    constructor() {    
        var api_endpoint = "";
        var api_url = "https://dev-efficiency-class-api.azurewebsites.net/api/"; 
		var clientid = "82a1c5c9-566b-473c-a051-aac8d3cea444";

        this.apiurl = api_url;
        this.clientid = clientid;

       
        if (location.hostname == (<any>data).dev_ui_url)
        {
            this.apiurl = (<any>data).dev_api_url;
            this.clientid = (<any>data).dev_client_id;
        }
        if (location.hostname == (<any>data).test_ui_url)
        {
            this.apiurl = (<any>data).test_api_url;
            this.clientid = (<any>data).test_client_id;
        }
        if (location.hostname == (<any>data).qa_ui_url)
        {
            this.apiurl = (<any>data).qa_api_url;
            this.clientid = (<any>data).qa_client_id;
        }
        if (location.hostname == (<any>data).prod_ui_url)
        {
            this.apiurl = (<any>data).prod_api_url;
            this.clientid = (<any>data).prod_client_id;
        }   
    
    }
}
