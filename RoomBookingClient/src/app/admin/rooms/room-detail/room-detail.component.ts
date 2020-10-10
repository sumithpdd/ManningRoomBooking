import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../model/Room';
import {Router} from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room: Room;

  constructor(private dataService :DataService,
    private router: Router) { }

  ngOnInit() {
  }

  editRoom() {
    this.router.navigate(['admin','rooms'], {queryParams : { action: 'edit', id: this.room.id}});
  }
  deleteRoom() {
    this.dataService.deleteRoom(this.room.id).subscribe((data) => {
      this.router.navigate(['admin', 'rooms']);
    });
  }
}
