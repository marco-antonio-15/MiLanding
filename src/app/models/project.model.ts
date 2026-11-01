export interface CaseStudy {
  problem: string;
  solution: string;
  result: string;
}

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
  category?: string;
  linkDemo?: string;
  /** Se muestra en el inicio. */
  featured?: boolean;
  /** Problema, solución y resultado; se muestra en el detalle. */
  caseStudy?: CaseStudy;
}
