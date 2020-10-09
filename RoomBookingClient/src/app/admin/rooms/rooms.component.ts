import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Room } from '../../model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Array<Room>;
  selectedRoom:Room;
  constructor(private dataservice: DataService,
    private routes:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // this.rooms = this.dataservice.getRooms();
      this.dataservice.getRooms().subscribe(
       (data)=>{
         this.rooms=data;
       }
     );
    this.routes.queryParams.subscribe(
      (params)=>{
        const id =params['id'];
        if(id)
        {
          this.selectedRoom= this.rooms.find(room=> room.id===+id);

        }
      }
    )
  }
  setRoom(id:number){
    this.router.navigate(['admin','rooms'],{queryParams:{id:id}});
   }
}
