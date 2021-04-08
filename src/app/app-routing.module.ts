import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { AdministratorSettingsComponent } from './components/administrator-settings/administrator-settings.component';
import { CreateNewBinComponent } from './components/create-new-bin/create-new-bin.component';
import { CreateNewItemComponent } from './components/create-new-item/create-new-item.component';
import { CreateNewWarehouseComponent } from './components/create-new-warehouse/create-new-warehouse.component';
import { EditDeleteItemComponent } from './components/edit-delete-item/edit-delete-item.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LookUpItemComponent } from './components/look-up-item/look-up-item.component';
import { ManageBinsComponent } from './components/manage-bins/manage-bins.component';
import { ManageWarehousesComponent } from './components/manage-warehouses/manage-warehouses.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { RemoveInventoryComponent } from './components/remove-inventory/remove-inventory.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: '', component: MenuComponent, children:[
  { path: 'login', component: LoginComponent},
  { path: 'add-inventory' , component: AddInventoryComponent },
  { path: 'remove-inventory', component: RemoveInventoryComponent },
  { path: 'new-item', component: CreateNewItemComponent },
  { path: 'edit-delete-item', component: EditDeleteItemComponent },
  { path: 'new-bin', component: CreateNewBinComponent },
  { path: 'manage-bins', component: ManageBinsComponent },
  { path: 'manage-warehouses', component: ManageWarehousesComponent},
  { path: 'new-warehouse', component: CreateNewWarehouseComponent },
  { path: 'look-up-item', component: LookUpItemComponent },
  { path: 'admin', component: AdministratorSettingsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'new-item/:id', component: CreateNewItemComponent}],
  
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
