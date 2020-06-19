import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() spread: string;

  constructor() { }

  ngOnInit(): void {
    this.spread = "0";
  }



}
