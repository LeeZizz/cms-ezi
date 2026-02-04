import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable()
export class TitleService {

  titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Welcome to our system!');
  titleSubject$: Observable<string> = this.titleSubject.pipe(distinctUntilChanged());

  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
  }

}
