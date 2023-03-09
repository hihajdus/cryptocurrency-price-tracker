import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cryptocurrency-price-tracker';

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getAllData();
  }
  
  getAllData() {
    let res = this.service.getData();

    res.subscribe({
      next: res => console.log(res),
      error: (e) => console.log(e),
      complete: () => console.info('complete')
    })
  }
}
