import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CollectiveModule } from '../collective/collective.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CollectiveModule,
    FormsModule, NgxChartsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule { }
