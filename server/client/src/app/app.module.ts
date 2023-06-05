import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarFormComponent } from './car-form/car-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './contact/contact.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DescriptionModalComponent } from './description-modal/description-modal.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SubsidiariesListComponent } from './subsidiaries-list/subsidiaries-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubsidiaryFormComponent } from './subsidiary-form/subsidiary-form.component';
import { EditSubsidiaryComponent } from './edit-subsidiary/edit-subsidiary.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsListComponent,
    CarFormComponent,
    AddCarComponent,
    EditCarComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    QuestionAnswerComponent,
    DescriptionModalComponent,
    UsersListComponent,
    SubsidiariesListComponent,
    HomePageComponent,
    SubsidiaryFormComponent,
    EditSubsidiaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
