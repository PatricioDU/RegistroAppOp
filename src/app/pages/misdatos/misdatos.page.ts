import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

  public nombre!: string;
  public apellido!: string;
  public nivelEducacional!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'];
      this.apellido = params['apellido'];
      this.nivelEducacional = params['nivelEducacional'];
    });
  }
}
