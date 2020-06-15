import { Component, OnInit, Injectable } from '@angular/core';
import { PollsService } from './polls.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  serverData: JSON;

  constructor(private pollsService: PollsService, private httpClient: HttpClient) {

  }

  ngOnInit() {
    
  }
}
