import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly projects: Project[] = [
    {
      id: 'verif-cert',
      title: 'Verificación de Certificados Etalonet',
      short:
        'Angular + Laravel + MySQL. Validación mediante hash, metadatos, endpoint seguro y consulta pública.',
      stack: ['Laravel', 'PHP', 'PdfParser', 'ClamAV', 'Angular', 'MySQL'],
      category: 'Backend',
      featured: true,
      caseStudy: {
        problem:
          'Los certificados de calibración debían poder comprobarse directamente por clientes y auditores, sin depender de la palabra de quien los emite.',
        solution:
          'Firma electrónica con validación por hash y metadatos, un endpoint seguro y una consulta pública en la web.',
        result:
          'Certificados verificables en línea que confirman que fueron emitidos por Etalonet y que no han sido alterados.',
      },
    },
    {
      id: 'pdf-ai-extractor',
      title: 'Extractor IA de Datos en Certificados',
      short:
        'Pipeline que limpia el PDF, envía el contenido procesado a OpenAI y devuelve folio, cliente, equipo, etc.',
      stack: ['Laravel', 'OpenAI', 'PdfParser'],
      category: 'Tools',
    },
    {
      id: 'pdf-ai-analysis',
      title: 'Sistema RAG y Machine Learning para Validación de Certificados',
      short:
        'RAG + ML. Revisión inteligente de PDF que combina validación estricta, análisis semántico y recuperación de contexto.',
      long: 'Motor de validación automática de informes PDF usando RAG + ML. Extrae campos, genera embeddings, compara contra la base de datos y analiza con IA para detectar inconsistencias con alta precisión.',
      stack: ['Laravel', 'MySQL', 'OpenAI', 'RAG', 'Cosine Similarity'],
      category: 'Tools',
      featured: true,
      caseStudy: {
        problem:
          'Revisar certificados en PDF exigía comparar cada campo a mano contra la base de datos.',
        solution:
          'Un motor que extrae los campos, genera embeddings, compara contra la base de datos y usa IA para detectar inconsistencias.',
        result:
          'Revisión automatizada de certificados, con IA integrada para aprobar o rechazar cada documento.',
      },
    },
    {
      id: 'ionic-certs',
      title: 'Generador de Certificados',
      short:
        'App Android con Ionic + Capacitor para capturar datos y generar PDFs de calibración.',
      stack: ['Ionic', 'Capacitor', 'Android', 'Chart.js'],
      category: 'Mobile',
      featured: true,
      caseStudy: {
        problem:
          'La emisión de certificados dependía de capturar los datos a mano, lo que retrasaba las entregas y generaba errores.',
        solution:
          'Aplicación Android con Ionic y Capacitor que captura los datos de calibración y genera los PDFs.',
        result:
          'Entregas más rápidas y 90% menos margen de error en la emisión de certificados.',
      },
    },
    {
      id: 'calib-chart',
      title: 'Componente Angular de Calibración',
      short:
        'Angular + Chart.js para curvas de calibración, cálculo de errores e incertidumbre.',
      stack: ['Angular', 'Chart.js', 'TypeScript'],
      category: 'Frontend',
    },
    {
      id: 'metrologia-uno',
      title: 'Software de Incertidumbre para Equipos Patrón',
      short:
        'Angular + Laravel + OpenAI para cálculos de incertidumbre en equipos patrón dentro de tu sistema de metrología.',
      stack: ['Angular', 'TypeScript', 'OpenAI'],
      category: 'Frontend',
    },
    {
      id: 'config-pre',
      title: 'Módulo de Preconfiguración de Calibraciones',
      short:
        'Gestión de selección de equipos, patrones, vigencias y procedimientos técnicos.',
      stack: ['Angular', 'TypeScript', 'API'],
      category: 'Frontend',
    },
    {
      id: 'converter-app',
      title: 'Conversor de Unidades Android/iOS',
      short:
        'App móvil con UI moderna, selección de unidades por magnitud y modal de “Acerca de”.',
      stack: ['Ionic', 'Angular', 'Capacitor'],
      category: 'Mobile',
    },
    {
      id: 'converter-web',
      title: 'Conversor de Unidades Web (Angular)',
      short:
        'Componente web con selección de unidades por magnitud y modal de “Acerca de”.',
      stack: ['Angular', 'Bootstrap'],
      category: 'Frontend',
    },
    {
      id: 'qr-scanner-ui',
      title: 'Interfaz de Cámara para QR (Capacitor)',
      short:
        'Scanner con vista previa real para consultar instrumento, certificado y vigencia.',
      stack: ['Ionic', 'Capacitor', 'Barcode Scanner'],
      category: 'Mobile',
    },
    {
      id: 'dompdf-cert',
      title: 'Plantilla PDF para Certificados',
      short: 'HTML + CSS + Dompdf para informes profesionales de calibración.',
      stack: ['PHP', 'HTML', 'CSS', 'Dompdf'],
      category: 'Backend',
    },
    {
      id: 'dompdf-trace',
      title: 'Plantilla PDF con Diagrama de Trazabilidad',
      short: 'HTML + CSS + Dompdf para cartas de trazabilidad.',
      stack: ['PHP', 'HTML', 'CSS', 'Dompdf', 'MySQL'],
      category: 'Backend',
    },
    {
      id: 'railway-deploy',
      title: 'Despliegue de Aplicaciones en Railway',
      short:
        'Backend Node desplegado con variables de entorno, storage persistente y logs para un chat con IA especializado en metrología.',
      stack: ['Node.js', 'Express', 'OpenAI', 'Railway', 'Docker'],
      category: 'DevOps',
      featured: true,
    },
    {
      id: 'asistente-voz',
      title: 'Automatización de equipos con asistente de voz',
      short:
        'Órdenes de voz para administrar equipos y automatizar tareas repetitivas desde un asistente.',
      stack: ['Alexa Skills', 'Automatización'],
      category: 'Tools',
      featured: true,
    },
    {
      id: 'nuevo-landing',
      title: 'Landing Page Personal',
      short:
        'Landing personal con Angular y GitHub Pages. Incluye routing, header responsivo y foto personal.',
      stack: ['Angular', 'GitHub Pages', 'TypeScript'],
      category: 'Frontend',
      linkDemo: 'https://marco-antonio-15.github.io/MiLanding',
    },
  ];

  getAll(): Observable<Project[]> {
    return of(this.projects);
  }

  /** Proyectos marcados como destacados para el inicio. */
  getFeatured(): Observable<Project[]> {
    return this.getAll().pipe(map((list) => list.filter((p) => p.featured)));
  }

  getById(id: string): Observable<Project | undefined> {
    return of(this.projects.find((p) => p.id === id));
  }

  constructor() {}
}
