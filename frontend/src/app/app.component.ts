import { Component, OnInit } from '@angular/core';
import {ClimaTempoService  } from "../app/shared/services/http/climatempo.service";
import { climaProximoDias } from "src/app/shared/models/clima.response";
import { temperaturaCidadeResponse } from "src/app/shared/models/temperatura.response";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private climatempoService: ClimaTempoService,
  ) { }

  climatempo:climaProximoDias[]=[];
  localidade!: any;
  maisquentes: temperaturaCidadeResponse[]=[];
  maisfrias: temperaturaCidadeResponse[]=[];;
  dataCorrente = new Date();
  title = 'clima tempo';

  ngOnInit(): void {    
    this.doPesquisar('Sao Paulo');
  }

  doPesquisar(cidade:any) {
    this.localidade=" - Cidade não encontrada, digite uma cidade válida !";
    this.climatempoService.listar(cidade).subscribe({
      next: resultado => {
        this.climatempo = resultado ;
        this.localidade = this.climatempo[0].cidade.nome + "-" + this.climatempo[0].cidade.estado.uf ;
      },
      error: () => {
        alert('Erro ao carregar dados');
      }
    });  

    this.climatempoService.listarprevisaohoje().subscribe({
      next: resultado => {
        this.maisquentes = resultado.maisQuentes ;
        this.maisfrias = resultado.maisFrias;
      },
      error: () => {
        alert('Erro ao carregar dados');
      }
    });  
  }
}
