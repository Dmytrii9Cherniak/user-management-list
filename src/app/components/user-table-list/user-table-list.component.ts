import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-table-list',
  templateUrl: './user-table-list.component.html',
  styleUrl: './user-table-list.component.scss'
})
export class UserTableListComponent implements OnInit {

  public users: UserModel[];

  constructor(
    private userService: UsersService,
    private toastrService: ToastrService,
    ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe((value: UserModel[]): void => {
      this.users = value;
    })
  }

  public deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.toastrService.info('User deleted successfully.');
      },
      error: (error): void => {
        console.error(error);
      },
      complete: (): void => {
        this.getAllUsers();
      }
    });
  }


}
