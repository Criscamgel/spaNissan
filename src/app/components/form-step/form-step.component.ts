import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CentralesService } from '../../services/centrales.service';
import { constantes } from '../../../app/constantes';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';


@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent{

  const = constantes;

  constructor(public centrales: CentralesService) { }

  ngOnInit() {
    registerLocaleData( es );
  }

  env = environment;
  modal:boolean = false;
  valorFinanciarCop:any = 0;
  editable:boolean = true;
  aprobado:boolean = false;
  negado:boolean = false;
  sppiner:boolean = true;
  dateNow = new Date().getFullYear();

  // Variable ver detalles
  verDetalle:boolean = false;

  // Variables Calculadora
  valorCuota:number = 0;
  cuotas:number = 0;
  tasa:number = 0.15;
  seguroTotal:number = 0;
  seguroCuota:number = 0;
  

  min = this.env.min;
  minF = this.env.minF;

  /* Functions */

  patternCoincide(event, value) {
    const pattern =  new RegExp(value);
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chechedc(this){
    this.centrales.contacto.OtrosDatos.AutorizaMareigua = true;
  }

  sendCentrales(this){
    this.editable = false;
    
    if(this.centrales.contacto.DatosFinancieros.ActividadEconomica){
      if(this.centrales.contacto.DatosFinancieros.ActividadEconomica === 1){
          this.centrales.contacto.DatosFinancieros.ActividadEconomica = 1;
          this.centrales.contacto.DatosFinancieros.ActividadIndependiente = 15;
      }
      if(this.centrales.contacto.DatosFinancieros.ActividadEconomica === 11){
          this.centrales.contacto.DatosFinancieros.ActividadEconomica = 1;
          this.centrales.contacto.DatosFinancieros.ActividadIndependiente = 16;
      }
      if(this.centrales.contacto.DatosFinancieros.ActividadEconomica === 2){
          this.centrales.contacto.DatosFinancieros.ActividadEconomica = 2;
          this.centrales.contacto.DatosFinancieros.ActividadIndependiente = 3;
      }
    }

    this.centrales.authenticate(this.centrales.contacto);
    setTimeout(() => {
      this.centrales.response(this.centrales.contacto).subscribe((resp:any) => {
        this.respuesta = resp.IdResultado;
        
        if(this.respuesta == 2 || this.respuesta == 3){
          
          this.sppiner = false
          this.aprobado = true
        }else{
          
          this.sppiner = false
          this.negado = true
        }
      })  
     }, 3000);
     
    
  }

   checkTyc(this){
    this.modal=false; 
    this.centrales.contacto.OtrosDatos.AutorizaConsultaCentrales=true;
    this.centrales.contacto.OtrosDatos.AutorizaMareigua=true;
   }

   reload()
    {
    window.location.href = constantes.linkWebAliado; 
    }

    verDetalles(){
      this.verDetalle = !this.verDetalle;    
    }

    /* Calculadora */

changeButtonCliente(val) {
  

  const nmv = 0.0115;
  this.centrales.contacto.OtrosDatos.ValorFinanciar = this.valorFinanciarCop;
  let cuota;
  if (val !== undefined) {

    if (val.value !== undefined) {
      cuota = Number(val.value);
    } else {
      cuota = Number(val);
    }

  }

  this.seguroTotal = ((1220 / 1000000) * this.valorFinanciarCop) * cuota;
  
  const vlrActual = Math.round(this.valorFinanciarCop);
  const vlrPartuno = vlrActual * nmv;
  let vlrPartdos = Math.pow((1 + nmv), - cuota);
  vlrPartdos = 1 - vlrPartdos;
  this.valorCuota = Math.round(vlrPartuno / vlrPartdos);

  /* Seguro de la cuota */
  const vlrPartunoSeg = this.seguroTotal * nmv;
  let vlrPartdosSeg = Math.pow((1 + nmv), - cuota);
  vlrPartdosSeg = 1 - vlrPartdosSeg;
  let seguroCta = Math.round(vlrPartunoSeg / vlrPartdosSeg);
  this.seguroCuota = seguroCta;
  seguroCta = Math.round(seguroCta);

  this.valorCuota += this.seguroCuota;

}

  
}