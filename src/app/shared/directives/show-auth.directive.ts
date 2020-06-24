import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { JwtService } from '../../core';

@Directive({
  selector: '[appShowAuth]',
})
export class ShowAuthDirective implements OnInit {
  isAuth: boolean;

  @Input('appShowAuth') condition: boolean;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly jwtService: JwtService
  ) {}

  ngOnInit(): void {
    const token = this.jwtService.getToken();

    if (!Boolean(token) && this.condition) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }

    if (Boolean(token) && !this.condition) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
