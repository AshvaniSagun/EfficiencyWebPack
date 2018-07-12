export class formulamodel {
    public formulaId: string;
    public ID: string;
    public MMID: string;
    public FormulaDefinition: string;
    public VariableId: string;
    public VariableName: string;
    public FormulaPriority: string;
    public CreatedBy: string;
    public CreatedOn: string;
    public UpdatedBy: string;
    public UpdatedOn: string;
    public showEdit: boolean;
    public showsave: boolean;
    public showupdate: boolean;
    public cancel: boolean;
    public isadd: boolean;
    public id: string;
    public isPublished: boolean; 
}
export class formulanamemodel {
    public id: string;
    public value: string;
}

export class Testformula {
    public Name: string;
    public value: string;
    public formulaId: string;
    public formulaDefinition: string
    public variableList: any[];
   
    
}

export class TestformulaRoot {

    public specificationMarket: string

    public modelYear: string;

    public pno12: string;

    public fuelType: string;

    public co2: string;

    public fuelEfficiency: string;

    public electricalEnergyConsumption: string;

    public electricalRange: string;

    public actualMass: string;

    public weightParameters: string;

    public testMassInd: string;

    public massInRunningOrderTotal: string;

    public massOfOptionalEquipmentTotal: string;

    public nedc_ActualMass: string;

    public homologationCurbWeightTotal: string;

}


export class RootTestResult {

    public value: string

    public calculatedEfficiencyClass: string;

    public error:string

  
}

