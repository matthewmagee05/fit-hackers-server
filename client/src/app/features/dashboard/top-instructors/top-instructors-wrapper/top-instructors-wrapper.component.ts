import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { InstructorService } from './instructor.service';

@Component({
  selector: 'app-top-instructors-wrapper',
  templateUrl: './top-instructors-wrapper.component.html',
  styleUrls: ['./top-instructors-wrapper.component.css'],
})
export class TopInstructorsWrapperComponent implements OnInit {
  instructors$;
  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors() {
    this.instructors$ = this.instructorService.getInstructors().pipe(
      tap((results: any[]) => {
        results.sort((a, b) => (a.likes > b.likes ? -1 : 1));
      })
    );
  }
}
