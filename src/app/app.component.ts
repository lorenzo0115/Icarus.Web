import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService, StateService } from './core/services';
import { utility } from './utility';

@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(
    private readonly router: Router,
    private readonly state: StateService,
    private readonly useService: UserService
  ) {
    const { width, height } = utility.getWindowSize();
    this.state.setWindowWidth(width);
    this.state.setWindowHeight(height);
  }

  ngOnInit() {
    this.setWindowResizeEventListener();
    this.useService.populate();

    this._router = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }
      });
  }

  setWindowResizeEventListener(): void {
    window.onresize = () => {
      const { width, height } = utility.getWindowSize();
      this.state.setWindowWidth(width);
      this.state.setWindowHeight(height);
    };
  }
}
