import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { Navbar } from '../../partials/navbar/navbar';
import { Footer } from '../../partials/footer/footer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    Navbar,
    Footer,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

}
