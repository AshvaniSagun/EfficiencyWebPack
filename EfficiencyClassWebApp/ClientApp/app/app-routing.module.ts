import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ManageComponent } from './components/manage-market/manage-market.component';
import { manageEfficiencyClassComponent } from './components/manage-efficiency-class/manage-efficiency-class.component';
import { manageusersComponent } from './components/manageusers/manageusers.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ManageEfficiencyClassRoutingModule } from './components/manage-efficiency-class/manage-efficiency-class-routing.module';

export const routes: Routes = [
    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'markets', component: ManageComponent, canActivate: [LoggedInGuard] },
    { path: 'ManageEfficiencyClass', component: manageEfficiencyClassComponent, loadChildren: './components/manage-efficiency-class/manage-efficiency-class-routing.module', canActivate: [LoggedInGuard]},
    { path: 'users', component: manageusersComponent, canActivate: [LoggedInGuard]},
    { path: '**', component: NotFoundComponent }
    //{ path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false }),],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
