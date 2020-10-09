import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  @Input()
  user: User;

  formUser: User;
  message: string;
  password: string;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.formUser = Object.assign({}, this.user);
  }
  onSubmit() {
    if(this.formUser.id==null){
      this.dataService.addUser(this.formUser,this.password).subscribe((user) => {
        this.router.navigate(['admin', 'users'], {
          queryParams: { action: 'view', id: user.id },
        });
      });
    }else{
    this.dataService.updateUser(this.formUser).subscribe((user) => {
      this.router.navigate(['admin', 'users'], {
        queryParams: { action: 'view', id: user.id },
      });
    });}
  }
}
