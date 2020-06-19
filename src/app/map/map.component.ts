import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import data from '../../assets/info.json';
import { PollsService } from '../polls.service';

@Component({
  selector: 'app-map',
  templateUrl: '../../assets/Blank_US_states_map.svg',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  borderWidth = 1;
  borderColor = "White";

  myData = JSON.parse(JSON.stringify(data));

  serverData;
  blueElectors: number = 0;
  grayElectors: number = 0;

  map: Map<string, string> = new Map<string, string>();
  isReady: boolean;

  spread: string;

  constructor(private pollsService: PollsService) {
  }

  ngOnInit(): void {
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
      this.isReady = false;
      this.assignStates();
    })

  }

  assignStates() {
    for(let item of this.myData.States) {
      let state = item[Object.keys(item)[0]];
      state.winner = this.map.get(state.abbreviation.toLowerCase());
      if(state.winner.substring(0, 5) == "Biden") {
        this.blueElectors += state.electors;
      } else if(state.winner.substring(0, 5) != "Biden" && state.winner.substring(0, 5) != "Trump") {
        this.grayElectors += state.electors;
      }
    }
  }

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

  onClick(event) {
      this.spread = this.map.get(event.target.id.toLowerCase());
      console.log(this.spread);
  }

  /* addText(p): void {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var bound = p.getBBox();
    text.setAttribute("transform", "translate(" + (bound.x + bound.width/2) + " " + (bound.y + bound.height/2) + ")");
    text.textContent = this.searchJSON(p.attributes.id.value);
    text.setAttribute("color", "White");
    text.setAttribute("font-size", "14");
    p.parentNode.insertBefore(text, p.nextSibling);
  } */
}
