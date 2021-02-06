import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-instructor',
  templateUrl: './top-instructor.component.html',
  styleUrls: ['./top-instructor.component.css'],
})
export class TopInstructorComponent implements OnInit {
  @Input() instructor;
  constructor() {}

  ngOnInit(): void {
    console.log(this.instructor);
  }
}
