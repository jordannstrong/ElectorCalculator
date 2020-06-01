import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: '../../assets/Blank_US_states_map.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  borderWidth = 1;
  borderColor = "White";
  renderer: any;
  
  onClick(event) {
    event.target.attributes.stroke.value = "Red";
  }

  ngOnInit(): void {
    renderer: Renderer2;
    el: ElementRef;
  }

  select(): void {
  }

}
