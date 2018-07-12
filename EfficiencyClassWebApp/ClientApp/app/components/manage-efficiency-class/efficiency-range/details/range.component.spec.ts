import { async, ComponentFixture, TestBed } from
    '@angular/core/testing';
import { } from 'jasmine';
import { rangeComponent } from '../../../manage-efficiency-class/efficiency-range/details/range.component';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ManageEfficiencyClassModule } from '../../manage-efficiency-class.module';
import { HttpModule } from '@angular/http';
import { shareddataservice } from '../../../../services/sharedservice/shared.service';
import { ToastrService } from 'toastr-ng2';
import { ToastrModule } from 'toastr-ng2';


describe('rangeComponent', () => {
    let component: rangeComponent;
    let fixture: ComponentFixture<rangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [rangeComponent],
            imports: [DataTableModule, ButtonModule, FormsModule, HttpModule, DialogModule, ToastrModule.forRoot()],
            providers: [shareddataservice, ToastrService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(rangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('rangeComponent  is created ', () => {
        expect(component).toBeTruthy();
    });


});