import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../model/User';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @Input()
  user: User;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  editUser() {
    this.router.navigate(['admin', 'users'], {
      queryParams: { action: 'edit', id: this.user.id },
    });
  }
  deleteUser() {
    this.dataService.deleteUser(this.user.id).subscribe((data) => {
      this.router.navigate(['admin', 'users']);
    });
  }
  resetPassword() {
    this.dataService.resetuserPassword(this.user.id).subscribe();
  }
}
