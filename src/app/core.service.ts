import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { PeriodicElement } from './models/periodic';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  list: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' ,status : 'delivered' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status : 'delivered' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',status : 'delivered' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' , status : 'delivered'},
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status : 'delivered' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status : 'delivered' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status : 'delivered' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status : 'delivered' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status : 'delivered' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status : 'delivered' },
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  listHeader = ['position', 'name', 'weight', 'symbol', 'status'];

  constructor() {
  }


  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    //update api goes here
    this.list$.next(this.list);
  }

  getControl(index, fieldName) {
  }



}
