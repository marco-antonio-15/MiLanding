import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  // stream con todos los proyectos (inmutable)
  projects$!: Observable<Project[]>;

  // stream con los proyectos filtrados (para la plantilla)
  filteredProjects$!: Observable<Project[]>;

  // BehaviorSubject interno para el filtro de texto
  private filter$ = new BehaviorSubject<string>('');

  get filter(): string {
    return this.filter$.value;
  }
  set filter(v: string) {
    this.filter$.next(v ?? '');
  }

  categories = ['Frontend', 'Mobile', 'Backend', 'DevOps', 'Tools'];

  private selectedCategory$ = new BehaviorSubject<string>('');

  get selectedCategoryValue(): string {
    return this.selectedCategory$.value;
  }
  
  set selectedCategoryValue(v: string) {
    this.selectedCategory$.next(v ?? '');
  }

  constructor(private projectsService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.projectsService.getAll();

    // combineLatest entre projects, filter y selectedCategory
    this.filteredProjects$ = combineLatest([
      this.projects$,
      this.filter$.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      ),
      this.selectedCategory$.pipe(startWith('')),
    ]).pipe(
      map(([projects, q, category]) => {
        const qLow = (q || '').trim().toLowerCase();
        const catLow = (category || '').trim().toLowerCase();

        return projects.filter((p) => {
          const title = (p.title || '').toString().toLowerCase();
          const stack = (p.stack || []).join(' ').toLowerCase();
          const tags = (p.tags || []).join(' ').toLowerCase();
          // si tus proyectos tienen un campo 'category' también lo puedes incluir:
          const pCategory = ((p as any).category || '')
            .toString()
            .toLowerCase();

          const matchesQ =
            !qLow || (title + ' ' + stack + ' ' + tags).includes(qLow);

          const matchesCategory =
            !catLow || // si no hay categoría seleccionada, pasa
            pCategory.includes(catLow) || // si el proyecto tiene category exacta
            stack.includes(catLow) || // si stack contiene la categoría
            tags.includes(catLow); // o tags contienen la categoría

          return matchesQ && matchesCategory;
        });
      })
    );
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  clearFilters() {
    this.filter = '';
    this.selectedCategoryValue = '';
  }
}
