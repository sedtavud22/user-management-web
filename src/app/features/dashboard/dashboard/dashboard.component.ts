import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CreateUser, User } from '../models/user.model';
import { DashboardService } from '../services/dashboard.service';
import { formatDate } from '@angular/common';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { confirmPasswordValidator } from '../utils/confirm-password.validator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users?: User[];
  roles?: Role[];
  permissions?: Permission[];
  totalCount?: number;
  pageSizeChoices: number[] = [1, 2, 3, 4, 5, 6];
  query = '';
  sortBy = '';
  sortDirection = '';
  pageNumber = 1;
  pageSize = 6;

  userForm = this.formBuilder.group(
    {
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: [''],
      roleId: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      permissions: this.formBuilder.array([]),
    },
    { validators: confirmPasswordValidator }
  );

  buildPermissions(permissionArray: Permission[]) {
    const arr = permissionArray.map((permission) =>
      this.formBuilder.group({
        permissionId: [permission.permissionId],
        isReadable: [false],
        isWriteable: [false],
        isDeletable: [false],
      })
    );
    this.userForm.setControl('permissions', this.formBuilder.array(arr));
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dashboardService: DashboardService
  ) {}

  getUsers() {
    return this.dashboardService
      .getAllUsers(
        this.query,
        this.sortBy,
        this.sortDirection,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.totalCount = value.totalCount;
          value.data.forEach(
            (data) =>
              (data.createdAt = formatDate(
                data.createdAt,
                'mediumDate',
                'en-US'
              ))
          );

          this.users = value.data;
        },
        error: (e) => console.log(e),
      });
  }

  ngOnInit(): void {
    this.getUsers();

    this.dashboardService.getAllRoles().subscribe({
      next: (value) => {
        console.log(value);
        this.roles = value.data;
      },
      error: (e) => console.log(e),
    });

    this.dashboardService.getAllPermissions().subscribe({
      next: (value) => {
        console.log(value);
        this.buildPermissions(value.data);
        this.permissions = value.data;
        console.log(this.userForm.controls);
      },
      error: (e) => console.log(e),
    });
  }

  create() {
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      const newUser: CreateUser = {
        id: this.userForm.value.userId!,
        firstName: this.userForm.value.firstName!,
        lastName: this.userForm.value.lastName!,
        email: this.userForm.value.email!,
        phone: this.userForm.value.phone || null,
        roleId: this.userForm.value.roleId!,
        username: this.userForm.value.username!,
        password: this.userForm.value.password!,
        permissions: this.userForm.value.permissions!,
      };

      this.dashboardService.createUser(newUser).subscribe({
        next: (value) => {
          console.log(value);
          value.data.createdAt = formatDate(
            value.data.createdAt,
            'mediumDate',
            'en-US'
          );
          this.users?.push(value.data);
        },
        error: (e) => console.log(e),
      });

      document.querySelector('dialog')?.close();
    }

    return;
  }

  onSearch(query: string) {
    this.query = query;
    this.getUsers();
  }

  onSort(sortBy: string) {
    this.sortBy = sortBy;
    this.getUsers();
  }

  onSortDirection(sortDirection: string) {
    this.sortDirection = sortDirection;
    this.getUsers();
  }

  changePageSize(pageSize: string) {
    this.pageSize = +pageSize;

    this.getUsers();
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }

    this.pageNumber -= 1;
    this.getUsers();
  }

  getNextPage() {
    if (this.totalCount && this.pageNumber * this.pageSize >= this.totalCount) {
      return;
    }

    this.pageNumber += 1;
    this.getUsers();
  }
}
