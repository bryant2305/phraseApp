import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class QuotesService {
  constructor(private readonly httpService: HttpService) {}

  getRandomQuote(): Observable<any> {
    return this.httpService
      .get('https://api.quotable.io/random')
      .pipe(map((response) => response.data));
  }
}
