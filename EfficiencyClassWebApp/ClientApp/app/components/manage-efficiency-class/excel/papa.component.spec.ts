import { async, ComponentFixture, TestBed } from
    '@angular/core/testing';
import { } from 'jasmine';
import { PapaComponent } from '../excel/Papa.component';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
//import { ManageEfficiencyClassModule } from '../../manage-efficiency-class.module';
import { HttpModule } from '@angular/http';
import { shareddataservice } from '../../../services/sharedservice/shared.service';
import { ToastrService } from 'toastr-ng2';
import { ToastrModule } from 'toastr-ng2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('PapaComponent', () => {
    let component: PapaComponent;
    let fixture: ComponentFixture<PapaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PapaComponent],
            imports: [DataTableModule, ButtonModule, BrowserAnimationsModule, FormsModule, HttpModule, DialogModule, ToastrModule.forRoot()],
            providers: [shareddataservice, ToastrService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PapaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('PapaComponent  is created ', () => {
        expect(component).toBeTruthy();
    });


});