import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

}
