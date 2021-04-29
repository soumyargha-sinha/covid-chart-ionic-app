import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { IonicModule } from '@ionic/angular';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [TitleBarComponent, ErrorComponent, LoadingComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    TitleBarComponent, ErrorComponent, LoadingComponent
  ]
})
export class CollectiveModule { }
