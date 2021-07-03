import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { AdministratorSettingsComponent } from './components/administrator-settings/administrator-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateNewBinComponent } from './components/create-new-bin/create-new-bin.component';
import { CreateNewItemComponent } from './components/create-new-item/create-new-item.component';
import { CreateNewWarehouseComponent } from './components/create-new-warehouse/create-new-warehouse.component';
import { EditDeleteItemComponent } from './components/edit-delete-item/edit-delete-item.component';
import { FirstTimeLoginComponent } from './components/first-time-login/first-time-login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LookUpItemComponent } from './components/look-up-item/look-up-item.component';
import { ManageBinsComponent } from './components/manage-bins/manage-bins.component';
import { ManageWarehousesComponent } from './components/manage-warehouses/manage-warehouses.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { RemoveInventoryComponent } from './components/remove-inventory/remove-inventory.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'first-time-login', component: FirstTimeLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', component: MenuComponent, children:[
  { path: 'login', component: LoginComponent},
  { path: 'add-inventory' , component: AddInventoryComponent, canActivate:[RouteGuardService] },
  { path: 'remove-inventory', component: RemoveInventoryComponent, canActivate:[RouteGuardService] },
  { path: 'new-item', component: CreateNewItemComponent, canActivate:[RouteGuardService] },
  { path: 'edit-delete-item', component: EditDeleteItemComponent, canActivate:[RouteGuardService] },
  { path: 'new-bin', component: CreateNewBinComponent, canActivate:[RouteGuardService] },
  { path: 'manage-bins', component: ManageBinsComponent, canActivate:[RouteGuardService] },
  { path: 'manage-warehouses', component: ManageWarehousesComponent, canActivate:[RouteGuardService]},
  { path: 'new-warehouse', component: CreateNewWarehouseComponent, canActivate:[RouteGuardService] },
  { path: 'look-up-item', component: LookUpItemComponent, canActivate:[RouteGuardService] },
  { path: 'admin', component: AdministratorSettingsComponent, canActivate:[RouteGuardService]},
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate:[RouteGuardService]},
  { path: 'new-item/:id', component: CreateNewItemComponent, canActivate:[RouteGuardService]},
  { path: 'look-up-item/:id', component: LookUpItemComponent, canActivate:[RouteGuardService]}]
  
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
