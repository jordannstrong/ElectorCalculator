import { Component, OnInit} from '@angular/core';
import * as data from '../../assets/info.json';

@Component({
  selector: 'app-map',
  templateUrl: '../../assets/Blank_US_states_map.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  states: any = (data as any).default;
  borderWidth = 1;
  borderColor = "White";
  
  onClick(event) {
    var value = event.target.attributes.stroke.value;
    if(value == "Red") { event.target.attributes.stroke.value = "White"; }
    if(value == "White") { event.target.attributes.stroke.value = "Red"; }
    
  }

  ngOnInit(): void {
    var paths = document.querySelectorAll("path");
    for (var p in paths) {
      this.addText(paths[p]);
    }
  }

  select(): void {
  }

  addText(p): void {
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var bound = p.getBBox();
    text.setAttribute("transform", "translate(" + (bound.x + bound.width/2) + " " + (bound.y + bound.height/2) + ")");
    text.textContent = p.attributes.id.value;
    text.setAttribute("color", "White");
    text.setAttribute("font-size", "14");
    p.parentNode.insertBefore(text, p.nextSibling);
  }

}
