import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import data from '../../assets/info.json';
import { PollsService } from '../polls.service';

@Component({
  selector: 'app-map',
  templateUrl: '../../assets/Blank_US_states_map.svg',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // Defines styling of state outlines
  borderWidth = 1;
  borderColor = "White";

  // Parse JSON object of polling data
  myData = JSON.parse(JSON.stringify(data));

  serverData;
  blueElectors: number = 0;
  grayElectors: number = 0;
  spread: string;
  stateClicked: boolean;

  // Map for storing winner of each state
  map: Map<string, string> = new Map<string, string>();

  // Loading overlay
  isReady: boolean;

  constructor(private pollsService: PollsService) {
  }

  ngOnInit(): void {
    // Display loading overlay while fetching polling data
    this.isReady = true;

    this.pollsService.getData().subscribe((data: any[])=>{
      this.serverData = data;
      for(let item of this.myData.States) {
        let state = item[Object.keys(item)[0]];
        this.map.set(state.abbreviation.toLowerCase(), state.winner);
      }
      for(let item of this.serverData) {
        this.map.set(item[0], item[1]);
      }

      // Data fetched, remove loading overlay
      this.isReady = false;

      this.stateClicked = false;

      // Begin color coding map
      this.assignStates();
    })

  }

  // Calculates the total number of electors for blue and tie, red is found by subtracting these from total
  assignStates() {
    for(let item of this.myData.States) {
      let state = item[Object.keys(item)[0]];
      state.winner = this.map.get(state.abbreviation.toLowerCase());

      if(state.winner.substring(0, 5) == "Biden") {
        this.blueElectors += state.electors;
      } else if (state.winner.substring(0, 5) != "Trump") {
        this.grayElectors += state.electors;
      }
    }
  }

  // Assign color intensity based on winner and size of margin
  colorState(abb) {
    let winner = this.map.get(abb.toLowerCase()).substring(0,5);
    let margin: number = +this.map.get(abb.toLowerCase()).substring(7);

    if(winner == "Trump") {
      if(margin > 0 && margin < 1.0) {
        return 'vlightred';
      } else if(margin > 0 && margin < 5.0) {
        return 'lightred';
      } else if(margin > 0 && margin < 10.0) {
        return 'mediumred';
      } else {
        return 'red';
      }
    } else if (winner == "Biden") {
      if(margin > 0 && margin < 1.0) {
        return 'vlightblue';
      } else if(margin > 0 && margin < 5.0) {
        return 'lightblue';
      } else if(margin > 0 && margin < 10.0) {
        return 'mediumblue';
      } else {
        return 'blue';
      }
    }
  }

  // When a state is clicked, display margin of victory
  onClick(event) {
    this.stateClicked = !this.stateClicked;
    if(this.stateClicked == true) {
      this.spread = this.map.get(event.target.id.toLowerCase());
    } else {
      
    }
  }
}
