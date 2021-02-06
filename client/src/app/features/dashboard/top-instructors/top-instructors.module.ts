import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopInstructorsWrapperComponent } from './top-instructors-wrapper/top-instructors-wrapper.component';
import { TopInstructorComponent } from './top-instructor/top-instructor.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [TopInstructorsWrapperComponent, TopInstructorComponent],
  imports: [CommonModule, MaterialModule],
  exports: [TopInstructorsWrapperComponent, TopInstructorComponent],
})
export class TopInstructorsModule {}
