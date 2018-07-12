export class usermodel {
    public Id: string;
    public CDSID: string;
    public userName: string;
    public email: string;
    public marketNames: string;
    public marketIds: any[];
    public RoleId: string;
    public CreatedBy: string;
    public CreatedOn: string;
    public UpdatedBy: string;
    public UpdatedOn: string;
}
export class marketnamemodel {
    public marketId: any;
    public SpecMarketCode: any;
    public marketName: any;
    
}

export class marketdropdown {
    constructor(public label: any, public value: any) { };
}
export class rolemodel {
    public id: string;
    public value: string;
}
export class SelectedMarketmodel {
    public marketId: string;
    public marketName: string;
}
export class dummymodel {
    public id: number;
    public itemName: string;
}
export class hideModel {
    public RoleId: string;
    public RoleName: string;
}