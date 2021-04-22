import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PollsService {

    constructor(private httpClient: HttpClient) {
        
    }

    getData(): Observable<any> {        
        return this.httpClient.get('http://localhost:8080/polls');
    }

}