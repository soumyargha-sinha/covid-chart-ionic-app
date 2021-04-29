import { Component } from '@angular/core';
import { ApiService } from '../collective/api.service';
import { specs } from '../collective/specs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private apiSvc: ApiService, private storage: Storage) { }

  readonly SPECS = specs;
  lineChartData = [];
  barChartDataLoaded = false;
  pieChartDataLoaded = false;
  view: any[] = [350, 300];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Name';
  showYAxisLabel: boolean = false;
  yAxisLabel: string = 'Value';
  legendTitle: string = 'Legend';

  barChartData = [];
  colorScheme = {
    domain: []
  };

  pieChartColorScheme = {
    domain: []
  }
  pieChartData = [{
    "name": "Recovered",
  },
  {
    "name": "Deaths",
  }];
  pieView: any[] = [350, 200];

  // options
  showPieLegend: boolean = true;
  showLabels: boolean = true;

  ngOnInit() { }

  ionViewWillEnter() {
    this.storage.get('time_series').then((val) => {
      JSON.parse(val).forEach(day => {
        let barChartElem = {};
        barChartElem['name'] = day['date'],
          barChartElem['series'] = [];
        Object.keys(this.SPECS.icons).filter(item => item !== 'active').forEach(item => {
          barChartElem['series'].push({
            name: item,
            value: (item === 'confirmed') ? day['dailyconfirmed'] : ((item === 'recovered') ? day['dailyrecovered'] : day['dailydeceased'])
          });
        });
        this.barChartData.push(barChartElem);
      });
      this.colorScheme.domain = [];
      Object.keys(this.SPECS.icons).filter(item => item !== 'active').forEach(item => {
        this.colorScheme.domain.push(this.SPECS.icons[item]['color']);
      })
      this.barChartDataLoaded = true;
    });
    this.storage.get('statewise').then((val) => {
      let overallData = JSON.parse(val)[0];
      this.pieChartData[0]['value'] = Number(overallData['recovered'])/(Number(overallData['recovered'])+Number(overallData['deaths']))*100;
      this.pieChartData[1]['value'] = Number(overallData['deaths'])/(Number(overallData['recovered'])+Number(overallData['deaths']))*100;
      this.pieChartColorScheme.domain = [this.colorScheme.domain[1], this.colorScheme.domain[2]];
      this.pieChartDataLoaded = true;
    });
  }

}
