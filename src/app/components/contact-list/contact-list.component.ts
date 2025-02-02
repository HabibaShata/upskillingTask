import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IUser } from '../../models/Iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    PaginatorModule,
    ToastModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  providers: [MessageService],
})
export class ContactListComponent implements OnInit {
  private _Router = inject(Router);
  private allUsers = signal<IUser[]>([]);
  users = computed(() => this.allUsers());

  statuses!: any[];

  loading: boolean = false;
  searchValue: string | undefined;

  constructor(
    private _UserService: UserService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this._UserService.getUsers().subscribe((users) => {
      this.allUsers.set(users.data);
    });
  }

  clear(table: TableModule) {
    // table.();
    this.searchValue = '';
  }

  deleteUser(id: string) {
    this._UserService.deleteUser(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
        });
        this.loadUsers();
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
