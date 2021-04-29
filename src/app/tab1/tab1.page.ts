import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { specs } from '../collective/specs';
import { ApiService } from '../collective/api.service';
import { Storage } from '@ionic/storage';
// import { BackgroundMode, BackgroundModeOriginal } from '@ionic-native/background-mode';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  statKeys: string[];
  readonly SPECS = specs;
  refreshFlag = 0;
  refreshCheckFlag = 0;
  statewise = [];
  districtwise = {};
  dataLoaded = false;
  selectedState = 'none';
  errorTriggered = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: false
  };

  constructor(/* private localNotifications: LocalNotifications, public backgroundMode: BackgroundModeOriginal, */ private apiSvc: ApiService, private storage: Storage) { }

  ngOnInit() {
    this.statKeys = Object.keys(this.SPECS.icons);
    this.storage.get('statewise').then((stateVal) => {
      if (!stateVal) {
        this.fetchSetLoadStatewiseData('');
      }
      else {
        this.storage.get('lastFetched').then((lastUpdt) => {
          if ((new Date().getTime() - new Date(lastUpdt).getTime()) < 1800000) {
            this.statewise = JSON.parse(stateVal);
            this.storage.get('districtwise').then((distVal) => {
              this.districtwise = JSON.parse(distVal);
              this.dataLoaded = true;
            });
          }
          else {
            this.fetchSetLoadStatewiseData('');
          }
        });
      }
    });

    setInterval(() => {
      this.refreshData();
    }, 1800000);

    // this.backgroundMode.enable();
    // this.backgroundMode.on("activate").subscribe(() => {
    //   this.refreshCheckFlag = this.refreshFlag;
    //   setInterval(() => {
    //     this.checkRefreshFlag();
    //   }, 5000);
    // });

  }

  checkRefreshFlag() {
    if (this.refreshCheckFlag !== this.refreshFlag) {
      // noti
      this.refreshCheckFlag = this.refreshFlag;
    }
    // this.localNotifications.schedule({
    //   title: 'ffff',
    //   text: 'Single ILocalNotification',
    // });
  }

  fetchSetLoadStatewiseData(refreshKey: string) {
    this.apiSvc.fetchStatewiseData().subscribe(
      res => {
        this.storage.set('statewise', JSON.stringify(res['statewise']));
        this.storage.set('time_series', JSON.stringify(res['cases_time_series'].slice(res['cases_time_series']['length'] - 5, res['cases_time_series']['length'])));
        this.storage.get('statewise').then((val) => {
          this.statewise = JSON.parse(val);
          this.fetchDistrictwiseData(refreshKey);
        });
      },
      err => {
        this.errorTriggered = true;
      }
    );
  }

  fetchDistrictwiseData(refreshKey: string) {
    this.apiSvc.fetchDistrictwiseData().subscribe(
      res => {
        this.filterByState(res);
        this.storage.set('districtwise', JSON.stringify(this.districtwise));
        this.storage.set('lastFetched', new Date());
        if (refreshKey === 'refresh') {
          this.refreshFlag = (this.refreshFlag === 0) ? 1 : 0;
        }
        this.dataLoaded = true;
      },
      err => {
        this.errorTriggered = true;
      }
    )
  }

  selectState(stateName: string) {
    this.selectedState = (this.selectedState === stateName) ? 'none' : stateName;
  }

  filterByState(districtwiseData: []) {
    districtwiseData.forEach(state => {
      this.districtwise[state['state']] = state['districtData'];
    });
  }

  refreshData() {
    this.dataLoaded = false;
    this.fetchSetLoadStatewiseData('refresh');
  }

  ionViewWillEnter() {
    this.storage.get('lastFetched').then((lastUpdt) => {
      if ((new Date().getTime() - new Date(lastUpdt).getTime()) >= 1800000) {
        this.fetchSetLoadStatewiseData('');
      }
    });
  }

}

