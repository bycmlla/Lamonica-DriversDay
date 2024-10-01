import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { Motorista } from '../../models/motorista';
import { FormsModule } from '@angular/forms';
import { MotoristaService } from '../../services/motorista.service';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx'
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

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
    'kmTotal',
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
  private debounceTimer: any;

  constructor(
    private cd: ChangeDetectorRef,
    private motoristaService: MotoristaService,
  ) {}

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.motoristaService.getMotoristas()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.motoristas = data;
        this.filteredMotoristas = this.motoristas;

        this.supervisores = [
          ...new Set(this.motoristas.map((motorista) => motorista.supervisor)),
        ].filter(Boolean);
        this.data = [
          ...new Set(this.motoristas.map((motorista) => motorista.data)),
        ].filter(Boolean);

        this.cd.markForCheck();
        console.log(this.motoristas)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  

  buscarMotoristas(): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.aplicarFiltros();
    }, 300);
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

  limparFiltros(): void {
    this.filterValue = '';
    this.filterSupervisor = '';
    this.filterData = '';
    this.selectedSupervisor = null;
    this.selectedDate = null;
  
    this.filteredMotoristas = this.motoristas;
    
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

    XLSX.writeFile(workbook, 'Jornada_motorista.xlsx');
  }

  exportarParaTxt(): void {
    const dadosParaExportar = this.filteredMotoristas.map((motorista) => 
      `ID Motorista: ${motorista.idMot}\n` +
      `Nome: ${motorista.nomeMot}\n` +
      `Supervisor: ${motorista.supervisor}\n` +
      `Início da Jornada: ${motorista.inicioJornada}\n` +
      `Fim da Jornada: ${motorista.fimJornada}\n` +
      `Repouso: ${motorista.repouso}\n` +
      `Tempo Total de Jornada: ${motorista.tJornada}\n` +
      `Condução: ${motorista.conducao}\n` +
      `Direção Máx Contínua: ${motorista.dirMaxContinua}\n` +
      `Hora Extra: ${motorista.horaExtra}\n` +
      `Refeição: ${motorista.refeicao}\n` +
      `Descanso: ${motorista.descanso}\n`
    ).join('\n------------------------\n');
  
    const blob = new Blob([dadosParaExportar], { type: 'text/plain' });
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Jornada_motorista.txt';
    link.click();
  
    window.URL.revokeObjectURL(link.href);
  }
  
}
