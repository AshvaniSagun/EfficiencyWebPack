import { async, ComponentFixture, TestBed } from
    '@angular/core/testing';
import { } from 'jasmine';
import { formulaComponent } from './formula.component';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ManageEfficiencyClassModule } from '../../manage-efficiency-class.module';
import { HttpModule } from '@angular/http';
import { shareddataservice } from '../../../../services/sharedservice/shared.service';
import { ToastrService } from 'toastr-ng2';
import { ToastrModule } from 'toastr-ng2';


describe('formulaComponent', () => {
    let component: formulaComponent;
    let fixture: ComponentFixture<formulaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [formulaComponent],
            imports: [DataTableModule, ButtonModule, FormsModule, HttpModule, DialogModule, ToastrModule.forRoot()],
            providers: [shareddataservice, ToastrService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(formulaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('formulaComponent  is created ', () => {
        expect(component).toBeTruthy();
    });


});