import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchStatewiseData(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + environment.STATEWISE_URI);
  }

  fetchTimeSeriesData(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + environment.STATEWISE_URI).pipe(map(res => res['cases_time_series']));
  }

  fetchTimeSeriesDataOfLastFiveDays(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + environment.STATEWISE_URI).pipe(map(res => res['cases_time_series'].slice(res['length']-5,res['length'])));

  }

  fetchDistrictwiseData(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + environment.DISTWISE_URI);
  }

}
