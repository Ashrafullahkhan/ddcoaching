import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { Course } from '../models/course';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: Storage
  ) {}

  getCourseDoc(id) {
    return this.angularFirestore
      .collection('courses-collection')
      .doc(id)
      .valueChanges();
  }
  getCourseList() {
    return this.angularFirestore
      .collection('courses-collection')
      .snapshotChanges();
  }
  createCourse(course: Course) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('courses-collection')
        .add(course)
        .then(
          (response) => {
            console.log('responce', response);
          },
          (error) => reject(error)
        );
    });
  }
  deleteCourse(course) {
    console.log('herer');
    return this.angularFirestore
      .collection('courses-collection')
      .doc(course.id)
      .delete();
  }
  updateCourse(course: Course, id) {
    return this.angularFirestore
      .collection('courses-collection')
      .doc(id)
      .update({
        title: course.title,
        description: course.description,
        photoURL: course.photoURL,
      });
  }
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
