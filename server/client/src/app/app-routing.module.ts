import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from './cars-list/cars-list.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ContactComponent } from './contact/contact.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SubsidiariesListComponent } from './subsidiaries-list/subsidiaries-list.component';
import { EditSubsidiaryComponent } from './edit-subsidiary/edit-subsidiary.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'subsidiaries', component: SubsidiariesListComponent},
  { path: 'home/edit/:id', component: EditSubsidiaryComponent},
  { path: 'users', component: UsersListComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cars', component: CarsListComponent },
  { path: 'cars/new', component: AddCarComponent },
  { path: 'cars/edit/:id', component: EditCarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }