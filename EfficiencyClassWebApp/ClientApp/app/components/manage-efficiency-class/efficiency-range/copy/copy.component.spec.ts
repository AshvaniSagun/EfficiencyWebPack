import { async, ComponentFixture, TestBed } from
    '@angular/core/testing';
import { } from 'jasmine';
import { copyComponent } from '../../../manage-efficiency-class/efficiency-range/copy/copy.component';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { ManageEfficiencyClassModule } from '../../manage-efficiency-class.module';
import { HttpModule } from '@angular/http';
import { shareddataservice } from '../../../../services/sharedservice/shared.service';
import { ToastrService } from 'toastr-ng2';
import { ToastrModule } from 'toastr-ng2';


describe('copyComponent', () => {
    let component: copyComponent;
    let fixture: ComponentFixture<copyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [copyComponent],
            imports: [DataTableModule, ButtonModule, FormsModule, HttpModule, DialogModule, ToastrModule.forRoot()],
            providers: [shareddataservice, ToastrService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(copyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('copyComponent  is created ', () => {
        expect(component).toBeTruthy();
    });


});