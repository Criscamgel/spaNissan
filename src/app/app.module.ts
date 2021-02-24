import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { DataComponent } from './components/data/data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormStepComponent } from './components/form-step/form-step.component';
import { CurrencyDirective } from './directives/currency.directive';
import { ToNumberPipe } from './pipes/to-number.pipe';
import { CustomMinDirective } from './directives/custom-min.directive';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    FormStepComponent,
    CurrencyDirective,
    ToNumberPipe,
    CustomMinDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CurrencyMaskModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
