import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project?: Project;
  loading = true;
  notFound = false;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectService
  ) {}

  ngOnInit(): void {
    // suscribirse a params y obtener proyecto
    this.sub.add(
      this.route.paramMap.subscribe(async (params) => {
        this.loading = true;
        this.notFound = false;
        const id = params.get('id');
        if (!id) {
          this.notFound = true;
          this.loading = false;
          return;
        }

        this.service.getById(id).subscribe((p) => {
          this.loading = false;
          if (!p) {
            this.notFound = true;
            this.project = undefined;
            return;
          }
          this.project = p;
        });
      })
    );
  }

  goBack() {
    // intentar regresar al listado
    this.router.navigate(['/projects']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
