import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.css']
})
export class ResultBarComponent implements OnInit {

  @Input() blue: number;
  red: number;
  bluePercent: number;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.red = 538 - this.blue;
    this.bluePercent = this.blue / 538 * 100;
  }

}
