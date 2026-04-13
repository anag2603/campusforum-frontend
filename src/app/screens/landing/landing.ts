import { Component, AfterViewInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { Navbar } from '../../partials/navbar/navbar';
import { Footer } from "../../partials/footer/footer";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    Navbar,
    Footer,
    RouterLink,
    CommonModule
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements AfterViewInit {

  // Controla si el menú hamburguesa está abierto (móvil)
  public menuAbierto = false;

  // Arreglo con los posts que se pintarán en el HTML
  public postsRecientes = [
    {
      id: 1,
      categoria: '</> Programación',
      claseCat: 'etiqueta-cat--prog',
      fecha: '5 abr 2026',
      titulo: '¿Cuál es el algoritmo de ordenamiento más eficiente para datos casi ordenados?',
      extracto: 'Comparando Timsort vs Insertion Sort con benchmarks reales en Python y C++...',
      iniciales: 'MR',
      autor: 'Miguel Rodríguez',
      claseAvatar: 'autor__avatar--azul',
      comentarios: 42,
      vistas: '218',
      destacado: false
    },
    {
      id: 2,
      categoria: '✦ IA',
      claseCat: 'etiqueta-cat--ia',
      fecha: '4 abr 2026',
      titulo: 'Introducción práctica a Redes Neuronales Convolucionales con PyTorch',
      extracto: 'Guía paso a paso para construir tu primer clasificador de imágenes. Incluye dataset de la FCC...',
      iniciales: 'LP',
      autor: 'Dra. Laura Pérez',
      claseAvatar: 'autor__avatar--verde',
      comentarios: 97,
      vistas: '1.4K',
      destacado: true
    },
    {
      id: 3,
      categoria: '∑ Matemáticas',
      claseCat: 'etiqueta-cat--mat',
      fecha: '3 abr 2026',
      titulo: 'Transformadas de Fourier: ¿por qué son fundamentales en procesamiento de señales?',
      extracto: 'Explicación visual e intuitiva con ejemplos de audio y gráficas en Jupyter Notebook...',
      iniciales: 'JT',
      autor: 'Juan Torres',
      claseAvatar: 'autor__avatar--ambar',
      comentarios: 31,
      vistas: '445',
      destacado: false
    },
    {
      id: 4,
      categoria: '⚛ Física',
      claseCat: 'etiqueta-cat--fis',
      fecha: '2 abr 2026',
      titulo: 'Mecánica cuántica para computólogos: el principio de superposición',
      extracto: '¿Cómo se relaciona la superposición cuántica con los qubits? Una mirada desde la CS...',
      iniciales: 'AG',
      autor: 'Andrea Gutiérrez',
      claseAvatar: 'autor__avatar--morado',
      comentarios: 19,
      vistas: '302',
      destacado: false
    }
  ];

  public alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  // Activa animaciones fade-in cuando el elemento entra al viewport
  ngAfterViewInit(): void {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-in')
      .forEach(el => observador.observe(el));
  }
}
