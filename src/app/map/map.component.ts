import { Component, OnInit} from '@angular/core';
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
        this.map.set(item[0], item[1].substring(0, 5));
      }
      this.isReady = false;
      this.assignStates();
    })

  }

  assignStates() {
    for(let item of this.myData.States) {
      let state = item[Object.keys(item)[0]];
      state.winner = this.map.get(state.abbreviation.toLowerCase());
      if(state.winner == "Biden") {
        this.blueElectors += state.electors;
      } else if(state.winner != "Biden" && state.winner != "Trump") {
        this.grayElectors += state.electors;
      }
    }
  }

  colorState(abb) {
     return {
      'red': this.map.get(abb.toLowerCase()) == "Trump",
      'blue': this.map.get(abb.toLowerCase()) == "Biden"
    } 
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
