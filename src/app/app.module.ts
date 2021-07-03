import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { RemoveInventoryComponent } from './components/remove-inventory/remove-inventory.component';
import { CreateNewItemComponent } from './components/create-new-item/create-new-item.component';
import { EditDeleteItemComponent } from './components/edit-delete-item/edit-delete-item.component';
import { CreateNewBinComponent } from './components/create-new-bin/create-new-bin.component';
import { ManageBinsComponent } from './components/manage-bins/manage-bins.component';
import { CreateNewWarehouseComponent } from './components/create-new-warehouse/create-new-warehouse.component';
import { ManageWarehousesComponent } from './components/manage-warehouses/manage-warehouses.component';
import { LookUpItemComponent } from './components/look-up-item/look-up-item.component';
import { AdministratorSettingsComponent } from './components/administrator-settings/administrator-settings.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FirstTimeLoginComponent } from './components/first-time-login/first-time-login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AddInventoryComponent,
    RemoveInventoryComponent,
    CreateNewItemComponent,
    EditDeleteItemComponent,
    CreateNewBinComponent,
    ManageBinsComponent,
    CreateNewWarehouseComponent,
    ManageWarehousesComponent,
    LookUpItemComponent,
    AdministratorSettingsComponent,
    LogoutComponent,
    RegisterComponent,
    ChangePasswordComponent,
    FirstTimeLoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
