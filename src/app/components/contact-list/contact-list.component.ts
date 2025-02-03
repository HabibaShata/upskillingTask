import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../models/Iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ButtonModule, CommonModule, InputTextModule, ToastModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  providers: [MessageService],
})
export class ContactListComponent {
  private _Router = inject(Router);
  private _UserService = inject(UserService);
  private messageService = inject(MessageService);
  @Input({ required: true }) contacts: IUser[] = [];
  contactsSignal = signal<IUser[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contacts'] && changes['contacts'].currentValue) {
      this.contactsSignal.set(this.contacts);
    }
  }

  deleteUser(id: string) {
    this._UserService.deleteUser(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
        });
        this.contactsSignal.set(
          this.contactsSignal().filter((user) => user.id !== id)
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.error || 'Failed to delete user',
        });
      },
    });
  }
  editUser(id: string) {
    this._Router.navigate(['/form', id]);
  }
}
