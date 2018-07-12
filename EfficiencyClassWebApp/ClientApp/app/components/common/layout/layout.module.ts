import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { headerComponent } from '../../../components/common/layout/header/header.component'
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule],
    declarations: [headerComponent],
    providers: [],
    exports: [headerComponent]
})
export class LayoutModule { }
