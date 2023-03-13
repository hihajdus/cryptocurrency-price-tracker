import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { ApiService } from './service/api.service';
import { Base, Rate } from './interface/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  data: any;
  rates: Rate[];

  public filteredItemsMulti: ReplaySubject<Rate[]> = new ReplaySubject(1);
  public itemMultiCtrl: FormControl = new FormControl([]);
  public itemMultiFilterCtrl: FormControl = new FormControl('');

  @ViewChild('multiSelect', { static: true }) multiSelect: any;
  
  protected _onDestroy = new Subject<void>();

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.getAllData();
  }
  
  getAllData() {
    let res = this.service.getData();

    res.subscribe({
      next: res => {
        this.data = res;
        this.rates = this.data.rates;

        this.filteredItemsMulti.next(this.rates.slice());

        this.itemMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterItemsMulti();
        })

        
      },
      error: (e) => console.log(e),
      complete: () => console.info('complete')
    })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterItemsMulti() {
    if (!this.rates) {
      return;
    }
    // get the search keyword
    let search = this.itemMultiFilterCtrl.value;
    if (!search) {
      this.filteredItemsMulti.next(this.rates.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the items
    this.filteredItemsMulti.next(
      this.rates.filter(item => item.asset_id_quote.toLowerCase().indexOf(search) > -1)
    );
  }

}
