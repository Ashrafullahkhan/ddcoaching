
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, ViewChild,Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
   displayedColumns: string[] = [ 'name',  'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
   openDelete(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDelete, {
      width: '300px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
export interface PeriodicElement {
  name: string;
 
  

}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen'},
  {name: 'Helium'},
  { name: 'Lithium' },
  { name: 'Beryllium',},
  { name: 'Boron'  },
  { name: 'Carbon' },
  { name: 'Nitrogen' },
  {name: 'Oxygen'},

];
@Component({
  selector: 'dialog-overview-example-delete',
  templateUrl: './dialog-overview-example-delete.html',
  
})
export class DialogOverviewExampleDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}