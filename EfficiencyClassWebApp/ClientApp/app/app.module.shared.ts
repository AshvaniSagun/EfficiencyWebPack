import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, InputMaskModule, TooltipModule, PickListModule, MultiSelectModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'toastr-ng2';
import { DropdownModule } from 'primeng/primeng';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { shareddataservice } from './services/sharedservice/shared.service';
import { manageusersComponent } from './components/manageusers/manageusers.component';
import { managemarketModule } from './components/manage-market/manage-market.module';
import { ManageEfficiencyClassModule } from './components/manage-efficiency-class/manage-efficiency-class.module';
import { LayoutModule } from './components/common/layout/layout.module';
import { ManageComponent } from './components/manage-market/manage-market.component'
import { manageEfficiencyClassComponent } from './components/manage-efficiency-class/manage-efficiency-class.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdalService } from 'ng2-adal/dist/core';
import { SecretService } from './services/auth/secret.service';
import { LoggedInGuard } from "./authentication/logged-in.guard";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AppRoutingModule } from './app-routing.module';
import { ManageEfficiencyClassRoutingModule } from './components/manage-efficiency-class/manage-efficiency-class-routing.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


@NgModule({
    declarations: [AppComponent, HomeComponent, manageusersComponent, NavMenuComponent, NotFoundComponent, WelcomeComponent],
    bootstrap: [AppComponent],
    imports: [managemarketModule, ManageEfficiencyClassModule, LayoutModule, AngularMultiSelectModule, CommonModule, BrowserModule, HttpModule, MultiSelectModule, PickListModule, ToastrModule.forRoot(),
        FormsModule, InputTextModule, DropdownModule, DataTableModule, ButtonModule, DialogModule, BrowserAnimationsModule, AppRoutingModule, ManageEfficiencyClassRoutingModule
    ],
    providers: [AdalService, SecretService,LoggedInGuard,shareddataservice],
})
export class AppModuleShared {
}
