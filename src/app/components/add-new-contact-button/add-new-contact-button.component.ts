import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-add-new-contact-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './add-new-contact-button.component.html',
  styleUrl: './add-new-contact-button.component.css',
})
export class AddNewContactButtonComponent {
  private _Router = inject(Router);
  addNewUser() {
    this._Router.navigate(['/form']);
  }
}
