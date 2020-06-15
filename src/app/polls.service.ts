import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll } from './poll.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PollsService implements OnInit{
    private serverData: Observable<any>;
    private polls: Poll[];

    

    constructor(private httpClient: HttpClient) {
        
    }

    ngOnInit() {
        
    }

    getData(): Observable<any> {        
        return this.httpClient.get('http://127.0.0.1:5002/polls');
    }

}