import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { CentralesService } from '../../services/centrales.service';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';


@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent{

  constructor(private centrales: CentralesService) { }

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
  tasa:number = 0.01;
  seguroTotal:number = 0;
  seguroCuota:number = 0;
  

  min = this.env.min;
  minF = this.env.minF;

  contacto:ContactoInterface = {
    DatosBasicos: {
      TipoDocumento: null,  
      NumeroDocumento: null,  
      Nombre1: null,  
      Celular: null,  
      CorreoPersonal: null
    },
  
    DatosFinancieros: {  
      ActividadEconomica: null,  
      ActividadIndependiente: 3,  
      IngresoMensual: null  
    },
  
    OtrosDatos: {  
      AutorizaConsultaCentrales: false,  
      AutorizaMareigua: false,  
      ValorFinanciar: null,
      IdentificacionVendedor: null  
    },

    DatosVehiculo: {
      Marca: 13
    }
  }

  /* Functions */

  patternCoincide(event, value) {
    const pattern =  new RegExp(value);
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chechedc(this){
    this.contacto.OtrosDatos.AutorizaMareigua = true;
  }

  sendCentrales(this){
    this.editable = false;
    
    if(this.contacto.DatosFinancieros.ActividadEconomica){
      if(this.contacto.DatosFinancieros.ActividadEconomica === 1){
          this.contacto.DatosFinancieros.ActividadEconomica = 1;
          this.contacto.DatosFinancieros.ActividadIndependiente = 15;
      }
      if(this.contacto.DatosFinancieros.ActividadEconomica === 11){
          this.contacto.DatosFinancieros.ActividadEconomica = 1;
          this.contacto.DatosFinancieros.ActividadIndependiente = 16;
      }
      if(this.contacto.DatosFinancieros.ActividadEconomica === 2){
          this.contacto.DatosFinancieros.ActividadEconomica = 2;
          this.contacto.DatosFinancieros.ActividadIndependiente = 3;
      }
    }

    this.centrales.authenticate(this.contacto);
    setTimeout(() => {
      this.centrales.response(this.contacto).subscribe((resp:any) => {
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
    this.contacto.OtrosDatos.AutorizaConsultaCentrales=true;
    this.contacto.OtrosDatos.AutorizaMareigua=true;
   }

   reload()
    {
    window.location.href="https://www.nissan.com.co/"; 
    }

    verDetalles(){
      this.verDetalle = !this.verDetalle;    
    }

    /* Calculadora */

changeButtonCliente(val) {
  

  const nmv = Math.pow((1 + this.tasa), (1 / 12)) - 1;
  this.seguroCuota = (1200 / 1000000) * this.valorFinanciarCop;
  this.contacto.OtrosDatos.ValorFinanciar = this.valorFinanciarCop; 
  let cuota;
  if (val !== undefined) {

    if (val.value !== undefined) {
      cuota = Number(val.value);
    } else {
      cuota = Number(val);
    }

  }

  this.seguroTotal  = Math.round(this.seguroCuota * cuota);
  const vlrActual = Math.round(this.valorFinanciarCop);
  const vlrPartuno = vlrActual * nmv;
  let vlrPartdos = Math.pow((1 + nmv), - cuota);
  vlrPartdos = 1 - vlrPartdos;
  this.valorCuota = Math.round(vlrPartuno / vlrPartdos);
  /* Seguro de la cuota */
  const vlrPartunoSeg = this.seguroTotal * nmv;
  let vlrPartdosSeg = Math.pow((1 + nmv), - cuota);
  vlrPartdosSeg = 1 - vlrPartdosSeg;
  let seguroCta = (Math.round(vlrPartunoSeg) / vlrPartdosSeg);
  this.seguroCuota = seguroCta;
  seguroCta = Math.round(seguroCta);
  }
}

export interface DatosBasicos {
  
  Nombre1?: String; 
  TipoDocumento?: String;  
  NumeroDocumento?: String;  
  Celular?: String;  
  CorreoPersonal?: String;
}

export interface DatosFinancieros {
  
  ActividadEconomica?: Number;  
  ActividadIndependiente?: Number;  
  IngresoMensual?: Number;
  
}

export interface OtrosDatos {
  
  AutorizaConsultaCentrales?: Boolean;  
  AutorizaMareigua?: Boolean;  
  ValorFinanciar?: Number;
  IdentificacionVendedor?: Number;
}

export interface DatosVehiculo {
  
  Marca: number;
}

export interface ContactoInterface{

  DatosBasicos?:DatosBasicos;
  DatosFinancieros?:DatosFinancieros;
  OtrosDatos?:OtrosDatos;
  DatosVehiculo:DatosVehiculo;
}