import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Motorista } from '../../models/motorista';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-motorista-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './motorista-list.component.html',
  styleUrl: './motorista-list.component.scss',
})
export class MotoristaListComponent implements OnInit {
  displayedColumns: string[] = [
    'idMot',
    'nomeMot',
    'supervisor',
    'data',
    'inicioJornada',
    'fimJornada',
    'repouso',
    'tempoTotalJornada',
    'conducao',
    'direcaoMaxContinua',
    'horaExtra',
    'refeicao',
    'descanso',
  ];
  motoristas: Motorista[] = [
    {
      idMot: 2,
      nomeMot: 'roberto silva',
      supervisor: 'Carlos Oliveira',
      data: new Date(),
      inicioJornada: '08:00',
      fimJornada: '18:00',
      repouso: '1h',
      tempoTotalJornada: '10h',
      conducao: '5h',
      direcaoMaxContinua: '2h',
      horaExtra: '1h',
      refeicao: '30min',
      descanso: '15min',
    },
    {
      idMot: 1,
      nomeMot: 'João Silva',
      supervisor: 'Carlos Oliveira',
      data: new Date(),
      inicioJornada: '08:00',
      fimJornada: '18:00',
      repouso: '1h',
      tempoTotalJornada: '10h',
      conducao: '5h',
      direcaoMaxContinua: '2h',
      horaExtra: '1h',
      refeicao: '30min',
      descanso: '15min',
    },
    {
      idMot: 3,
      nomeMot: 'camila aguiar',
      supervisor: 'Carlos Oliveira',
      data: new Date(),
      inicioJornada: '08:00',
      fimJornada: '18:00',
      repouso: '1h',
      tempoTotalJornada: '10h',
      conducao: '5h',
      direcaoMaxContinua: '2h',
      horaExtra: '1h',
      refeicao: '30min',
      descanso: '15min',
    },
    {
      idMot: 3,
      nomeMot: 'camila aguiar',
      supervisor: 'Carlos Oliveira',
      data: new Date(),
      inicioJornada: '08:00',
      fimJornada: '18:00',
      repouso: '1h',
      tempoTotalJornada: '10h',
      conducao: '5h',
      direcaoMaxContinua: '2h',
      horaExtra: '1h',
      refeicao: '30min',
      descanso: '15min',
    },
  ];
  filteredMotoristas: Motorista[] = this.motoristas;
  filterValue: string = '';

  constructor() {}

  ngOnInit(): void {}

  buscarMotoristas(): void {
    const nome = this.filterValue.trim().toLowerCase();

    if (nome === '') {
      this.filteredMotoristas = this.motoristas;
    } else {
      this.filteredMotoristas = this.motoristas.filter((motorista) =>
        motorista.nomeMot.toLowerCase().includes(nome)
      );
    }
  }
}
