import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { Navbar } from '../../partials/navbar/navbar';
import { Footer } from "../../partials/footer/footer";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    Navbar,
    Footer,
],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {

}
