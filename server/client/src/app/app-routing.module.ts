import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from './cars-list/cars-list.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ContactComponent } from './contact/contact.component';
import { SubsidiariesListComponent } from './subsidiaries-list/subsidiaries-list.component';
import { EditSubsidiaryComponent } from './edit-subsidiary/edit-subsidiary.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'session', component: ProfileComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'home/edit/:id', component: EditSubsidiaryComponent },
  { path: 'subsidiaries', component: SubsidiariesListComponent },
  { path: 'cars', component: CarsListComponent },
  { path: 'cars/new', component: AddCarComponent },
  { path: 'cars/edit/:id', component: EditCarComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }