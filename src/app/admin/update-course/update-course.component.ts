import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic';
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
  courseTitle = 'course Details';
  selectedList: any;
  Topic: Topic[];

  constructor(
    public dialog: MatDialog,
    public courseService: CourseService,
    public topicService: TopicService,
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
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');
    this.topicService.getCourseList(id).subscribe((res) => {
      this.Topic = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Topic;
      });
    });

    this.courseService.getCourseDoc(id).subscribe((res) => {
      this.courseRef = res;
      this.editForm = this.formBuilder.group({
        title: [this.courseRef.title],
        description: [this.courseRef.description],
        photourl: [this.courseRef.photourl],
      });
    });
  }
  openModel(menuList: any) {
    console.log('list', menuList);
    this.selectedList = menuList;
  }
  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    console.log('idsss', id);
    this.courseService.updateCourse(this.editForm.value, id);
    this.router.navigate(['layout']);
  }

  openDialog(): void {
    const id = this.act.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: { name: id, animal: this.animal },
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
    private act: ActivatedRoute,

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
    console.log('id', this.data.name);
    this.topicService.createCourse(this.topicForm.value, this.data.name);
    // this.router.navigate(['']);
  }
}
