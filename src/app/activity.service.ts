import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivity } from './types';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  
  constructor(private http: HttpClient) { }

  getActivity(activityID: string): Observable<IActivity>{
    return this.http.get<IActivity>(API + '/id/' + activityID)
  }

  getAllActivites():Observable<IActivity[]>{
      return this.http.get<IActivity[]>(API)
  }

}


const API = 'https://orangevalleycaa.org/api/videos';
