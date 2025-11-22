import { Component } from '@angular/core';

interface ContactMethod {
  id: string;
  icon: string;
  label: string;
  value: string;
  link: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  personalInfo = {
    name: 'Marco Antonio Luna Salas',
    role: 'Desarrollador de Software',
    tagline: '¿Tienes un proyecto en mente? ¡Hablemos!',
    availability: 'Disponible para proyectos freelance',
    email: 'marcoa.luna13@gmail.com',
    phone: '+522711632210',
    location: 'Guadalupe, Nuevo León, México',
  };

  // Métodos de contacto
  contactMethods: ContactMethod[] = [
    {
      id: 'email',
      icon: '📧',
      label: 'Email',
      value: this.personalInfo.email,
      link: `mailto:${this.personalInfo.email}`,
      description: 'Escríbeme un correo',
      color: '#22c55e',
    },
    {
      id: 'whatsapp',
      icon: '💬',
      label: 'WhatsApp',
      value: this.personalInfo.phone,
      link: `https://wa.me/${this.personalInfo.phone.replace(/\D/g, '')}`,
      description: 'Chatea conmigo',
      color: '#25D366',
    },
    {
      id: 'phone',
      icon: '📱',
      label: 'Teléfono',
      value: this.personalInfo.phone,
      link: `tel:${this.personalInfo.phone}`,
      description: 'Llámame directamente',
      color: '#3b82f6',
    },
    {
      id: 'location',
      icon: '📍',
      label: 'Ubicación',
      value: this.personalInfo.location,
      link: `https://www.google.com/maps/search/${encodeURIComponent(
        this.personalInfo.location
      )}`,
      description: 'Ver en el mapa',
      color: '#ef4444',
    },
  ];

  // Redes sociales - ACTUALIZA CON TUS ENLACES
  socialLinks = [
    {
      id: 'linkedin',
      icon: '💼',
      name: 'LinkedIn',
      url: 'www.linkedin.com/in/marco-antonio-luna-salas',
      color: '#0077b5',
    },
    {
      id: 'github',
      icon: '💻',
      name: 'GitHub',
      url: 'https://github.com/marco-antonio-15',
      color: '#333',
    },
    {
      id: 'instagram',
      icon: '📸',
      name: 'Instagram',
      url: 'https://www.instagram.com/marco.antonio_ls',
      color: '#E4405F',
    },
    /*{
      id: 'facebook',
      icon: '👥',
      name: 'Facebook',
      url: 'https://facebook.com/tu-usuario',
      color: '#1877f2',
    },*/
  ];

  constructor() {}

  // Track by para mejor performance
  trackById(index: number, item: any): string {
    return item.id;
  }

  // Copiar al clipboard
  copyToClipboard(text: string, label: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // agregar un toast/snackbar notification
        console.log(`${label} copiado al portapapeles!`);
        alert(`✅ ${label} copiado al portapapeles`);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  }

  /**
   * Genera el enlace de WhatsApp a partir de un teléfono,
   * dejando solo dígitos. Devuelve la URL completa.
   */
  waLink(phone?: string | null): string {
    if (!phone) return 'https://wa.me/';
    // elimina todo lo que no sea dígito
    const digits = phone.toString().replace(/\D/g, '');
    return `https://wa.me/${digits}`;
  }
}
