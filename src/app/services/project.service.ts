import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Project {
  id: string;
  title: string;
  short: string;
  long?: string;
  stack: string[];
  img?: string;
  linkRepo?: string;
  linkLive?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = [
    {
      id: 'verif-cert',
      title: 'Verificación de Certificados UCAL',
      short: 'Laravel + Dompdf. Hash + QR y endpoint de validación.',
      stack: ['Laravel', 'Dompdf', 'PHP', 'QR'],
      linkRepo: 'https://github.com/tuusuario/verif-cert'
    },
    {
      id: 'ionic-certs',
      title: 'App Generadora de Certificados (Android)',
      short: 'Ionic + Capacitor + Barcode Scanner, generación de PDFs',
      stack: ['Ionic', 'Capacitor', 'Android', 'Barcode Scanner'],
    },
    {
      id: 'calib-chart',
      title: 'Componente de Calibración',
      short: 'Angular + Chart.js para curvas y cálculo de incertidumbre',
      stack: ['Angular', 'Chart.js', 'TypeScript'],
    }
  ];

  getAll(): Observable<Project[]> { return of(this.projects); }
  getById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id));
  }

  constructor() { }
}
