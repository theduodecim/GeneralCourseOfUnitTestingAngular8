import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    UserService,
    DataService
  ],
})
export class UserComponent implements OnInit {
  public user: { name: string };
  public isloggedIn = false;
  public data: string;

  constructor(public userService: UserService, public dataService: DataService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.dataService.getDetails().then((dataPromise: string) => {
      console.log(dataPromise);
      return this.data = dataPromise;
    });
  }

}
