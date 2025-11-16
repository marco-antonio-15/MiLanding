import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from 'src/app/services/project.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit{

  // stream con todos los proyectos (inmutable)
  projects$!: Observable<Project[]>;

  // stream con los proyectos filtrados (para la plantilla)
  filteredProjects$!: Observable<Project[]>;

  // BehaviorSubject interno para el filtro de texto
  private filter$ = new BehaviorSubject<string>('');

  // propiedad pública que mantiene compatibilidad con [(ngModel)]="filter"
  get filter(): string {
    return this.filter$.value;
  }
  set filter(v: string) {
    // normalizamos el valor
    this.filter$.next(v ?? '');
  }

  // categorías (si decides filtrar por categoría en el futuro)
  categories = ['Frontend','Mobile','Backend','DevOps','Tools'];
  selectedCategory = new BehaviorSubject<string>('');

  constructor(private projectsService: ProjectService) {}

  ngOnInit(): void {
    
    this.projects$ = this.projectsService.getAll();

    const category$ = new BehaviorSubject<string>(''); 
    this.filteredProjects$ = combineLatest([
      this.projects$,
      this.filter$.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      ),
      category$.pipe(startWith(''))
    ]).pipe(
      map(([projects, q, category]) => {
        const qLow = (q || '').trim().toLowerCase();
        return projects.filter(p => {
          const title = (p.title || '').toString().toLowerCase();
          const stack = (p.stack || []).join(' ').toLowerCase();
          const tags = (p.tags || []).join(' ').toLowerCase();

          const matchesQ = !qLow || (title + ' ' + stack + ' ' + tags).includes(qLow);
          const matchesCategory = !category

          return matchesQ && matchesCategory;
        });
      })
    );
  }

  clearFilters() {
    this.filter = '';
    this.selectedCategory = new BehaviorSubject<string>(''); 
  }
}
