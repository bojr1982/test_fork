import {EventEmitter} from '@angular/core';

export class Emitters {
  static authEmitter = new EventEmitter<boolean>();
  static sgeEmitter = new EventEmitter<string>();
  static opendEmitter = new EventEmitter<boolean>();
}
