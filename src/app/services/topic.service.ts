import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable, switchMap } from 'rxjs';
import { Course } from '../models/course';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private courseCol: AngularFirestoreCollection<any> | undefined;
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
  getCourseList(id) {
    return this.angularFirestore
      .collection('courses-collection')
      .doc(id)
      .collection('topic')
      .snapshotChanges();
  }
  createCourse(topic: Topic, id) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('courses-collection')
        .doc(id)
        .collection('topic')
        .add(topic)
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
    return this.angularFirestore.collection('topic-collection').doc(id).update({
      title: course.title,
      description: course.description,
      photourl: course.photourl,
    });
  }
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
