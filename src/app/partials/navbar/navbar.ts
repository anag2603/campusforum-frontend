import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, //Ruteo
    ...SHARED_IMPORTS,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

}
