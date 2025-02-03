import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../models/Iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    ToastModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css',
  providers: [MessageService],
})
export class AddEditUserComponent implements OnInit {
  private _UserService = inject(UserService);
  private _Router = inject(Router);
  userForm!: FormGroup;
  currentUser: IUser | undefined;
  isUserEdit: boolean = false;
  id = '';

  errorMsg: string = '';
  fileName: string = '';
  submitLabel = 'Save';

  constructor(
    private messageService: MessageService,
    private _fb: FormBuilder,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUserForm();

    this._ActivatedRoute.paramMap.subscribe((params) => {
      const paramId = params.get('id');

      if (paramId) {
        this.id = paramId;
        this.isUserEdit = true;
        this.submitLabel = 'Update User';
        this.loadUserData(paramId);
      } else {
        this.submitLabel = 'Save';
      }
    });
  }

  createUserForm() {
    this.userForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      picture: [''],
    });
  }

  loadUserData(id: string) {
    this._UserService.getUserById(id).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.userForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          picture: data.picture,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.fileName = event.target.value;

    this.onload(file);
  }
  onload(file: File): void {
    if (file) {
      this.userForm.patchValue({ picture: file.name });
      console.log('upload image', this.userForm.get('picture')?.value.name);
    }
  }

  onSubmitForm() {
    if (this.userForm.valid) {
      console.log('id', this.id);
      console.log('updated user', this.currentUser);

      if (this.id) {
        this.updateUser();
      } else {
        this.addNewUser();
      }

      this.resetAndReload();
    }
  }
  updateUser() {
    let updatedUser = this.userForm.value;
    this._UserService.updateUser(updatedUser, this.id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'updated successfully',
        });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.error || 'Failed to update user',
        });
      },
    });
  }
  addNewUser() {
    this.currentUser = this.userForm.value;

    this._UserService.addUser(this.currentUser).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User added successfully',
        });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.error || 'Failed to add user',
        });
      },
    });
  }

  resetAndReload() {
    this.userForm.reset();
    setTimeout(() => {
      this._Router.navigate(['home']);
    }, 1500);
  }
}
