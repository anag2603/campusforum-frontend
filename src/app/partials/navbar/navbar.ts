import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

}
