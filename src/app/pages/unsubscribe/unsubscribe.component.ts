import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { utility } from 'src/app/utility';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css'],
})
export class UnsubscribeComponent implements OnInit {
  unsubscribeForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly userService: UserService) {
    this.setForm();
    this.setVariables();
  }

  ngOnInit(): void {}

  setVariables(): void {}

  setForm(): void {
    this.unsubscribeForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  onUnsubscribe() {
    if (this.unsubscribeForm.invalid) {
      return;
    }

    const { email } = this.unsubscribeForm.value;
    this.userService.unsubscribe(email).subscribe(
      () => {
        utility.successMsg('Unsubscribe success');
      },
      () => {
        utility.dangerMsg('Unsubscribe failure.');
      }
    );
  }
}
