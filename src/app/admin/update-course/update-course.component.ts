import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
})
export class UpdateCourseComponent {
  public courseForm: FormGroup;
  animal: string;
  name: string;

  constructor(
    public dialog: MatDialog,
    public courseService: CourseService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.courseForm = this.formBuilder.group({
      title: [''],
      description: [''],
      photourl: [''],
    });
  }
  onSubmit() {
    this.courseService.createCourse(this.courseForm.value);
    this.router.navigate(['layout']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./create-course.component.css'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
