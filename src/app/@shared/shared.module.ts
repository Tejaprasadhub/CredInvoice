import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule,PrimengModule,FormsModule],
  declarations: [LoaderComponent,SpinnerComponent],
  exports: [LoaderComponent,SpinnerComponent],
})
export class SharedModule {}
