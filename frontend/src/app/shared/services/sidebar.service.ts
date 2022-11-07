import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidebarService {

  private collapsedSource = new Subject();
  collapsed = false;

  updateCollapsed(value: boolean) {
    this.collapsedSource.next(value);
  }
}
