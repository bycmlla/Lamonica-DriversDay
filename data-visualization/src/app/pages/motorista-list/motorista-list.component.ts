import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Motorista } from '../../models/motorista';
import { FormsModule } from '@angular/forms';
import { MotoristaService } from '../../services/motorista.service';


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
    'tJornada',
    'conducao',
    'dirMaxContinua',
    'horaExtra',
    'refeicao',
    'descanso',
  ];

  motoristas: Motorista[] = [];
  filteredMotoristas: Motorista[] = this.motoristas;
  filterValue: string = '';

  constructor(private motoristaService: MotoristaService) {}

  ngOnInit(): void {
    this.motoristaService.getMotoristas().subscribe((data) => {
      this.motoristas = data;
      this.filteredMotoristas = this.motoristas;
      console.log(this.motoristas)
          });
  }

  buscarMotoristas(): void {
    const nome = this.filterValue.trim().toLowerCase();
  
    if (nome === '') {
      this.filteredMotoristas = this.motoristas;
    } else {
      this.filteredMotoristas = this.motoristas.filter((motorista) =>
        motorista.nomeMot?.toLowerCase().includes(nome)
      );
    }
  }
  
}
