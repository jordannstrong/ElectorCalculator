import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.css']
})
export class ResultBarComponent implements OnInit {

  @Input() blue: number;
  @Input() gray: number;
  red: number;
  bluePercent: number;
  grayPercent: number;
  redPercent: number;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.red = 538 - this.blue - this.gray;
    this.bluePercent = this.blue / 538 * 100;
    this.grayPercent = this.gray / 538 * 100;
    this.redPercent = 100 - this.bluePercent - this.grayPercent;
  }

}
