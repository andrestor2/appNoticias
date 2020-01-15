import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe(resp => {
      this.noticias.push(...resp.articles);
      if (event) {
        event.target.complete();
      }
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
    });
  }

  cargarMasNoticias(event) {
    this.cargarNoticias(event);
  }
}
