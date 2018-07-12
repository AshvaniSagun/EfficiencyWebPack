import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageMarketComponent } from '../../components/manage-market/marketdetails/marketdetails.component'
import { AdminComponent } from '../../components/manage-market/admintable/admintable.component'
import { ManageComponent } from '../../components/manage-market/manage-market.component'
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule, MessagesModule, MessageModule } from 'primeng/primeng';
import { MarketRoutingModule } from './manage-market.routing.module';
import { ConfirmDialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';



@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule, GrowlModule, ConfirmDialogModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule, MessagesModule, MessageModule, MarketRoutingModule],
    declarations: [ManageMarketComponent, AdminComponent, ManageComponent],
    providers: [],
    exports: [ManageComponent]
})
export class managemarketModule { }
