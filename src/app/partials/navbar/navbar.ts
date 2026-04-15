import { Component, EventEmitter, Output } from '@angular/core';
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

  // Notificación al componente padre para alternar la barra lateral (sidebar)
  @Output() menuToggle = new EventEmitter<void>();

  // Método para emitir el evento de alternar la barra lateral (sidebar)
  onMenuSidebar() {
    this.menuToggle.emit();
  }

}
