import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMarketComponent } from '../../components/manage-market/marketdetails/marketdetails.component'
import { AdminComponent } from '../../components/manage-market/admintable/admintable.component'
import { ManageComponent } from '../../components/manage-market/manage-market.component'
import { LoggedInGuard } from '../../authentication/logged-in.guard';


const MarketRoutes: Routes = [
    {
        path: 'markets',
       component: ManageComponent, canActivate: [LoggedInGuard],

       children: [
          
           {
               path: 'admintable',
               component: AdminComponent, canActivate: [LoggedInGuard]
            },
            {
               path: 'MarketDetails',
                component: ManageMarketComponent, canActivate: [LoggedInGuard]
            }
           ]
   }
];

@NgModule({
    imports: [RouterModule.forChild(MarketRoutes)],
    exports: [RouterModule]
})
export class MarketRoutingModule { }
