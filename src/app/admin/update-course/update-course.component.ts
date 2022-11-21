import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { TopicService } from 'src/app/services/topic.service';

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
  public editForm: FormGroup;
  courseRef: any;
  animal: string;
  name: string;

  constructor(
    public dialog: MatDialog,
    public courseService: CourseService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      title: [''],
      description: [''],
      photourl: [''],
    });
  }
  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');
    this.courseService.getCourseDoc(id).subscribe((res) => {
      this.courseRef = res;
      this.editForm = this.formBuilder.group({
        title: [this.courseRef.title],
        description: [this.courseRef.description],
        photourl: [this.courseRef.photourl],
      });
    });
  }
  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    this.courseService.updateCourse(this.editForm.value, id);
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
  styleUrls: ['./update-course.component.css'],
})
export class DialogOverviewExampleDialog {
  public topicForm: FormGroup;
  animal: string;
  name: string;
  constructor(
    public topicService: TopicService,
    public formBuilder: FormBuilder,
    public router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.topicForm = this.formBuilder.group({
      title: [''],
      titledescription: [''],
      category: [''],
      photourl: [''],
      coverImage: [''],
      overview1: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.topicService.createCourse(this.topicForm.value);
    // this.router.navigate(['']);
  }
}
