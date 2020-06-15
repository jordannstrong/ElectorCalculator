import { Component, OnInit } from '@angular/core';
import { PollsService } from '../polls.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  serverData = this.pollsService.getData();

  constructor(private pollsService: PollsService) { }

  ngOnInit(): void {
  }

  onClick() {
  }

}
