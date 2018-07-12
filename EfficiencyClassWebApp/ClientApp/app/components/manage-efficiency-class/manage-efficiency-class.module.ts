import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formulaComponent } from '../../components/manage-efficiency-class/addformula/formula/formula.component'
import { VariableComponent } from '../../components/manage-efficiency-class/addformula/variable/variable.component'
import { copyComponent } from '../../components/manage-efficiency-class/efficiency-range/copy/copy.component'
import { rangeComponent } from '../../components/manage-efficiency-class/efficiency-range/details/range.component'
import { PapaComponent } from '../../components/manage-efficiency-class/excel/Papa.component'
import { SelectMarketYearComponent } from '../../components/manage-efficiency-class/SelectMarketYear/SelectMarketYear.component'
import { manageEfficiencyClassComponent } from '../../components/manage-efficiency-class/manage-efficiency-class.component'
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';
import { ManageEfficiencyClassRoutingModule } from './manage-efficiency-class-routing.module';
import { ConfirmDialogModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';



@NgModule({
    imports: [CommonModule, FormsModule, ConfirmDialogModule, GrowlModule,InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule, ManageEfficiencyClassRoutingModule],
    declarations: [formulaComponent, VariableComponent, copyComponent, rangeComponent, PapaComponent, SelectMarketYearComponent, manageEfficiencyClassComponent],
    providers: [],
    exports: [manageEfficiencyClassComponent]
})
export class ManageEfficiencyClassModule { }
