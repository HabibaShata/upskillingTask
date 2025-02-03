import { AddNewContactButtonComponent } from './../add-new-contact-button/add-new-contact-button.component';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { IUser } from '../../models/Iuser';
import { UserService } from '../../services/user.service';

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
export class HomeComponent implements OnInit {
  private _UserService = inject(UserService);
  searchQuery: string = '';
  private contacts = signal<IUser[]>([]);
  filteredContacts = signal<IUser[]>([]);

  ngOnInit(): void {
    this._UserService.getUsers().subscribe((data) => {
      this.contacts.set(data.data);
      this.filteredContacts.set(data.data);
    });
  }

  onSearchTermChanged(searchTerm: string) {
    this.searchQuery = searchTerm;
    this.filterContacts();
  }
  filterContacts() {
    const searchTerm = this.searchQuery.toLowerCase();

    const filtered = this.contacts().filter((contact) =>
      contact.firstName.toLowerCase().includes(searchTerm)
    );
    this.filteredContacts.set(filtered);
    // console.log(this.filteredContacts());
  }
}
