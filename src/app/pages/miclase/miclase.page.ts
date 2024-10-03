
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/model/asistencia';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class miclasePage implements OnInit {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public asistencia: Asistencia | undefined = undefined;
  public usuario: Usuario;
  public escaneando = false;
  public datosQR: string = '';
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router

  ){
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
    this.comenzarEscaneoQR();
  }

  public simularCapturaQR() {
    this.mostrarDatosQROrdenados(`
      {
        "sede": "Alonso Ovalle",
        "idAsignatura": "PGY4121",
        "seccion": "001D",
        "nombreAsignatura": "Aplicaciones Móviles",
        "nombreProfesor": "Cristián Gómez Vega",
        "dia": "2022-08-09",
        "bloqueInicio": 7,
        "bloqueTermino": 9,
        "horaInicio": "13:00",
        "horaFin": "15:15"
      }
    `);
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }


  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }
  
  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    this.usuario.asistencia = JSON.parse(datosQR);
    this.usuario.navegarEnviandoUsuario(this.router, 'miclase');
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandoUsuario(this.router, pagina);
  }












}
