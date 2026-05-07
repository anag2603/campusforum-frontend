import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { Navbar } from '../../partials/navbar/navbar';
import { Footer } from "../../partials/footer/footer";
import { Sidebar } from '../../partials/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    Navbar,
    Footer,
    Sidebar,
    //RouterLink,
    CommonModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileScreen implements OnInit{

  ngOnInit(): void {}

  isAvatarGalleryVisible: boolean = false;

  // Simulación de datos de usuario (dummy data)
  user = {
    //TODO: Reemplazar con datos reales del usuario autenticado y añadir más campos según sea necesario
    first_name: 'Valeria Elizabeth',
    last_name: 'Rojo',
    secondary_last_name: 'Hernández',  
    email: 'valeria.rojo@uabc.edu.mx',
    avatar: 'assets/images/avatares/avatar-original.png'
  }

  // Controla si la barra lateral (sidebar) está abierta
  public isSidebarOpen: boolean = false;

  // Simulación de estado de inicio de sesión
  // TODO: Se debe reemplazar con un servicio de autenticación real
  public isLogin: boolean = false;

  // Controla si el menú hamburguesa está abierto (móvil)
  public menuAbierto = false;

  // Método para cerrar la barra lateral (sidebar)
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  // Método para alternar la visibilidad de la barra lateral (sidebar)
  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  // 🔹 Mostrar/ocultar galería
  toggleAvatarGallery() {
    this.isAvatarGalleryVisible = !this.isAvatarGalleryVisible;
  }

  // 🔹 Seleccionar avatar
  selectAvatar(img: string) {
    this.user.avatar = img;
    this.isAvatarGalleryVisible = false;
  }

}
