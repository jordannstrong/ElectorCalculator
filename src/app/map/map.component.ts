import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private ctx: CanvasRenderingContext2D;
  
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  myFunc(): void {

  }
}
