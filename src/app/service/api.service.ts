import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'X-CoinAPI-Key': 'B425F108-05B4-401E-BFE6-8F436C3B043C'
    })
  }
  // get cryptocurrency price data from the API
  getData() {
    let url = 'https://rest.coinapi.io/v1/exchangerate/BTC?invert=false';
    return this.http.get(url, this.httpOptions)
  }
}
