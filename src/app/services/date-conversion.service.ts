import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateConversionService {

  constructor() { }

  public convertFromSQLDate(date: string) {
    const splitDate = date.split('-');
    return splitDate.reverse().join("/");
  }

}
