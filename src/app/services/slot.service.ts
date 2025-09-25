import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  private url = 'http://localhost:9090/rest/slot/';

  constructor(private http: HttpClient) {}

  slotDisponibili(veterinarioId: number, data: string): Observable<any> {
    let params = new HttpParams()
      .set('veterinarioId', veterinarioId.toString())
      .set('data', data.toString());

    return this.http.get(this.url + 'getSlot', { params });
  }
}
