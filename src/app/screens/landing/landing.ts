import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';

@Component({
  selector: 'app-landing',
  imports: [
    ...SHARED_IMPORTS,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {

}
