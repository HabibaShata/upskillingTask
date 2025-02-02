import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddNewContactButtonComponent } from './components/add-new-contact-button/add-new-contact-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    ContactListComponent,
    SearchBarComponent,
    AddNewContactButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'upskillingTask';
}
