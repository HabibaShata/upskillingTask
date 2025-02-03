import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
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
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchTermChange.emit(this.searchTerm);
    console.log(this.searchTerm);
  }
}
