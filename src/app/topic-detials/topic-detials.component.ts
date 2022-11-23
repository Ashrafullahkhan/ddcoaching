import { Component, Input, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "ngx-editor";

@Component({
  selector: "app-topic-detials",
  templateUrl: "./topic-detials.component.html",
  styleUrls: ["./topic-detials.component.css"],
})
export class TopicDetialsComponent implements OnInit {
  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];
  odd = false;
  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];


  // quillConfiguration = QuillConfiguration
  @Input() control: FormControl

  constructor() {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl()
    if (this.done.length % 2 == 1) {
      console.log("oddd");
      this.odd = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.done.length % 2 == 1) {
      console.log("oddd");
      this.odd = true;
    } else {
      this.odd = false;
    }
  }

  data() {
    console.log("the event is: ", this.control);
  }
}
