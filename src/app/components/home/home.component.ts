import { AddNewContactButtonComponent } from './../add-new-contact-button/add-new-contact-button.component';
import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    ContactListComponent,
    AddNewContactButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  imgeUrl = '../../../assets/images/man.jpg';
}
