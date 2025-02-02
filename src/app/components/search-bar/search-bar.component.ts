import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, IconFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent implements OnInit {
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      text: new FormControl<string | null>(null),
    });
  }
}
