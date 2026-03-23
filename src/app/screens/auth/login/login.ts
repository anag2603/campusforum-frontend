import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared_imports';

@Component({
  selector: 'app-login',
  imports: [
    ...SHARED_IMPORTS,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
