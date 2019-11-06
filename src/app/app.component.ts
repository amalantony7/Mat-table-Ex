import { Component, ViewChild } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { CoreService } from './core.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from './models/periodic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = this.core.listHeader;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
  controls: FormArray;
  data = Object.assign(this.core.list);
  selected = "";

  position : number ;
  name : string = "";
  weight  : number;
  symbol : string ="";
  status : string ="";

  columnAdd = "";
  



  selection = new SelectionModel<PeriodicElement[]>(true, []);

  private sort : MatSort
  @ViewChild(MatSort, { static: false }) set matSort(ms : MatSort){
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  constructor(private core: CoreService) { }


  ngOnInit() {
    this.core.list$.subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
    })

    const toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        position: new FormControl(entity.position, [Validators.required]),
        name: new FormControl(entity.name, [Validators.required]),
        weight: new FormControl(entity.weight, Validators.required),
        symbol: new FormControl(entity.symbol, Validators.required),
        status: new FormControl(entity.status, Validators.required)
      }, { updateOn: "blur" });
    });

    this.controls = new FormArray(toGroups);

    this.dataSource.sort = this.sort;

  }

  get alteredColumns(){
    console.log(this.displayedColumns.slice(1))
    return this.displayedColumns.slice(1)
  }

  addColumn(index) {

      console.log(this.displayedColumns);
      this.columnsToDisplay.push(this.displayedColumns[index]);


  }


  updateField(index, field) {
    const control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index, field, control.value);
      this.dataSource.sort = this.sort;
      console.log(index, field, control.value);
    }

  }

  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1)
      this.dataSource = new MatTableDataSource<PeriodicElement[]>(this.dataSource.data);
      console.log(this.dataSource.data);
      this.core.list$.next(this.dataSource.data);
    });
    this.selection = new SelectionModel<PeriodicElement[]>(true, []);
  }

  getControl(index, fieldName) {
    const a = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

addRow(){
  this.core.list.push({position: this.position, name: this.name, weight: this.weight, symbol: this.symbol , status : this.status});
  this.dataSource = new MatTableDataSource<PeriodicElement[]>(this.dataSource.data);
}
  
}
