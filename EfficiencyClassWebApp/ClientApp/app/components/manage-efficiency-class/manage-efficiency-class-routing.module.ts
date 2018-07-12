import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { formulaComponent } from '../../components/manage-efficiency-class/addformula/formula/formula.component'
import { VariableComponent } from '../../components/manage-efficiency-class/addformula/variable/variable.component'
import { copyComponent } from '../../components/manage-efficiency-class/efficiency-range/copy/copy.component'
import { rangeComponent } from '../../components/manage-efficiency-class/efficiency-range/details/range.component'
import { PapaComponent } from '../../components/manage-efficiency-class/excel/Papa.component'
import { SelectMarketYearComponent } from '../../components/manage-efficiency-class/SelectMarketYear/SelectMarketYear.component'
import { manageEfficiencyClassComponent } from '../../components/manage-efficiency-class/manage-efficiency-class.component'
import { LoggedInGuard } from '../../authentication/logged-in.guard';




const ManageEfficiencyRoutes: Routes = [
    {
        path: 'ManageEfficiencyClass',
        component: SelectMarketYearComponent, canActivate: [LoggedInGuard], 
        children: [  

            { path: 'WeightSegmentCo2/:MMID', component: PapaComponent, canActivate: [LoggedInGuard]  },
            { path: 'range/:MMID', component: rangeComponent, canActivate: [LoggedInGuard] },
            { path: 'copyefficencyrange/:MMID/market/:MID/Selectedyear/:Selectedyear', component: copyComponent, canActivate: [LoggedInGuard]  },
            { path: 'details/:MMID', component: rangeComponent, canActivate: [LoggedInGuard]  },
            { path: 'formula/:MMID', component: VariableComponent, canActivate: [LoggedInGuard]  },
            { path: 'variable/:MMID', component: VariableComponent, canActivate: [LoggedInGuard]  },
            { path: 'formula/:MMID/formula/:year/spec/:spec', component: formulaComponent, canActivate: [LoggedInGuard]  },
          
        ]
    },
  
    {
        path: 'ManageEfficiencyClass/formula/:MMID',
        component: SelectMarketYearComponent, canActivate: [LoggedInGuard] ,
        children: [

            { path: 'Variable', component: VariableComponent, canActivate: [LoggedInGuard]  },

        ]
    },
    

    
];

@NgModule({
    imports: [RouterModule.forChild(ManageEfficiencyRoutes)],
    exports: [RouterModule]
})
export class ManageEfficiencyClassRoutingModule { }
