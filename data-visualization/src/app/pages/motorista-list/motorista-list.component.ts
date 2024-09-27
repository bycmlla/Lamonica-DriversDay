import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { Motorista } from '../../models/motorista';
import { FormsModule } from '@angular/forms';
import { MotoristaService } from '../../services/motorista.service';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-motorista-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
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
    'tJornada',
    'conducao',
    'dirMaxContinua',
    'horaExtra',
    'refeicao',
    'descanso',
  ];

  motoristas: Motorista[] = [];
  filteredMotoristas: Motorista[] = this.motoristas;
  supervisores: string[] = [];
  data: Date[] = [];
  filterValue: string = '';
  filterSupervisor: string = '';
  filterData: string = '';
  selectedSupervisor: string | null = null;
  selectedDate: Date | null = null;

  constructor(
    private cd: ChangeDetectorRef,
    private motoristaService: MotoristaService
  ) {}

  ngOnInit(): void {
    this.motoristaService.getMotoristas().subscribe((data) => {
      this.motoristas = data;
      this.filteredMotoristas = this.motoristas;

      this.supervisores = [
        ...new Set(this.motoristas.map((motorista) => motorista.supervisor)),
      ].filter(Boolean);
      this.data = [
        ...new Set(this.motoristas.map((motorista) => motorista.data)),
      ].filter(Boolean);
    });
  }

  buscarMotoristas(): void {
    this.aplicarFiltros();
  }

  buscarMotoristasPorSupervisor(supervisor: string): void {
    this.selectedSupervisor = supervisor;
    this.aplicarFiltros();
  }

  buscarMotoristasPorData(data: Date): void {
    this.selectedDate = data;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let motoristasFiltrados = this.motoristas;

    if (this.filterValue.trim() !== '') {
      const nome = this.filterValue.trim().toLowerCase();
      motoristasFiltrados = motoristasFiltrados.filter((motorista) =>
        motorista.nomeMot?.toLowerCase().includes(nome)
      );
    }

    if (this.selectedSupervisor) {
      motoristasFiltrados = motoristasFiltrados.filter(
        (motorista) => motorista.supervisor === this.selectedSupervisor
      );
    }

    if (this.selectedDate) {
      motoristasFiltrados = motoristasFiltrados.filter(
        (motorista) => motorista.data === this.selectedDate
      );
    }

    this.filteredMotoristas = motoristasFiltrados;
    this.cd.detectChanges();
  }


  exportarParaExcel(): void {
    const dadosParaExportar = this.filteredMotoristas.map((motorista) => ({
      'ID Motorista': motorista.idMot,
      Nome: motorista.nomeMot,
      Supervisor: motorista.supervisor,
      'Início da Jornada': motorista.inicioJornada,
      'Fim da Jornada': motorista.fimJornada,
      Repouso: motorista.repouso,
      'Tempo Total de Jornada': motorista.tJornada,
      Condução: motorista.conducao,
      'Direção Máx Contínua': motorista.dirMaxContinua,
      'Hora Extra': motorista.horaExtra,
      Refeição: motorista.refeicao,
      Descanso: motorista.descanso,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dadosParaExportar);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Motoristas Filtrados': worksheet },
      SheetNames: ['Motoristas Filtrados'],
    };

    XLSX.writeFile(workbook, 'motoristas_filtrados.xlsx');
  }
}
