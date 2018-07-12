import { async, ComponentFixture, TestBed } from
    '@angular/core/testing';
import { } from 'jasmine';
import { VariableComponent } from '../variable/variable.component';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ManageEfficiencyClassModule } from '../../manage-efficiency-class.module';
import { HttpModule } from '@angular/http';
import { shareddataservice } from '../../../../services/sharedservice/shared.service';
import { ToastrService } from 'toastr-ng2';
import { ToastrModule } from 'toastr-ng2';


describe('VariableComponent', () => {
    let component: VariableComponent;
    let fixture: ComponentFixture<VariableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VariableComponent],
            imports: [DataTableModule, ButtonModule, FormsModule, HttpModule, DialogModule, ToastrModule.forRoot()],
            providers: [shareddataservice, ToastrService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VariableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('VariableComponent  is created ', () => {
        expect(component).toBeTruthy();
    });


});