import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {
  public courseForm: FormGroup;
  animal: string;
  name: string;

  constructor(
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
}
