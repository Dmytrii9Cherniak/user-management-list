import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ModalManager } from '../../OOP/modal.manager';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-table-list',
  templateUrl: './user-table-list.component.html',
  styleUrl: './user-table-list.component.scss'
})
export class UserTableListComponent extends ModalManager implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public users: UserModel[];
  public filteredUsers: UserModel[];
  public createUserForm: FormGroup;
  public updateUserForm: FormGroup;
  private modalSubscription: Subscription;
  private selectedUser: UserModel | null = null;

  constructor(
    private userService: UsersService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.updateUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.getAllUsers();

    const createUserModal$ = this.modalState$.pipe(
      map(modalStates => modalStates['createUserModal']),
      filter(isVisible => !isVisible),
      tap(() => this.createUserForm.reset())
    );

    const editUserModal$ = this.modalState$.pipe(
      map(modalStates => modalStates['editUserModal']),
      filter(isVisible => !isVisible),
      tap(() => this.updateUserForm.reset())
    );

    this.modalSubscription = merge(createUserModal$, editUserModal$).subscribe();
  }

  public getAllUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((value: UserModel[]): void => {
      this.users = value;
      this.filteredUsers = this.users;
      this.isLoading = false;
    }, (): void => {
      this.isLoading = false;
      this.toastrService.error('Failed to load users.');
    });
  }

  public filterUsers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    if (!filterValue) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
      );
    }

    if (this.filteredUsers.length === 0) {
      this.toastrService.info('No users match your search.');
    }
  }

  public createNewUser(): void {
    if (this.createUserForm.invalid) {
      this.toastrService.error('Please fill in all required fields correctly.');
      this.createUserForm.markAllAsTouched();
      return;
    }

    if (this.createUserForm.valid) {
      this.userService.createUser(this.createUserForm.value).subscribe({
        next: () :void => {
          this.closeModal('createUserModal');
          this.getAllUsers();
        },
        error: (err) :void => {
          console.error(err)
        },
        complete: () :void => {
          this.toastrService.success('User created successfully.');
        }
      });
    }
  }

  public openEditModal(user: UserModel): void {
    this.selectedUser = user;
    this.updateUserForm.patchValue({
      name: user.name,
      email: user.email
    });
    this.openModal('editUserModal');
  }

  public updateExistingUser(): void {
    if (this.updateUserForm.invalid) {
      this.toastrService.error('Please fill in all required fields correctly.');
      this.updateUserForm.markAllAsTouched();
      return;
    }

    if (this.updateUserForm.valid && this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id, this.updateUserForm.value).subscribe({
        next: (): void => {
          this.updateUserForm.reset();
          this.closeModal('editUserModal');
          this.getAllUsers();
        },
        error: (error): void => {
          console.error(error);
        },
        complete: (): void => {
          this.toastrService.success('User updated successfully.');
        }
      });
    }
  }

  public deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: (): void => {
        this.getAllUsers();
      },
      error: (error): void => {
        console.error(error);
      },
      complete: (): void => {
        this.toastrService.info('User deleted successfully.');
      }
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}
