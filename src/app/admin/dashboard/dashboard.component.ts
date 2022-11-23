import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Course: Course[];
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<Course>();

  constructor(public dialog: MatDialog, private courseService: CourseService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.courseService.getCourseList().subscribe((res) => {
      this.Course = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Course;
      });
    });
  }
  removeCourse(Course) {
    if (confirm('Are You Sure Want to Delete' + Course.title)) {
      this.courseService.deleteCourse(Course);
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // openDelete(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDelete, {
  //     width: '300px',
  //     data: { name: this.name, animal: this.animal },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
}

@Component({
  selector: 'dialog-overview-example-delete',
  templateUrl: './dialog-overview-example-delete.html',
})
export class DialogOverviewExampleDelete {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen' },
  { name: 'Helium' },
  { name: 'Lithium' },
  { name: 'Beryllium' },
  { name: 'Boron' },
  { name: 'Carbon' },
  { name: 'Nitrogen' },
  { name: 'Oxygen' },
];
