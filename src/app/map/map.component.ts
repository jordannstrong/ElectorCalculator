import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: '../../assets/Blank_US_states_map.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  borderWidth = 2;
  borderColor = "White";
  
  onClick(event) {
    var value = event.target.attributes.stroke.value;
    if(value == "Red") { event.target.attributes.stroke.value = "White"; }
    if(value == "White") { event.target.attributes.stroke.value = "Red"; }
  }

  ngOnInit(): void {
  }

  select(): void {
  }

}
