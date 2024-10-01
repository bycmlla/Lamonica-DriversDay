package com.datavisualization.driverday.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CollectionId;
import java.math.BigDecimal;

import java.time.LocalDate;

@Entity
@Table(name = "JORNADA_MOTORISTA")

public class Driver {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "IDMOT")
  private Long idMot;

  @Column(name = "NOMEMOT")
  private String nomeMot;

  private String supervisor;

  private LocalDate data;

  @Column(name = "INICIO_JORNADA")
  private String inicioJornada;

  @Column(name = "FIM_JORNADA")
  private String fimJornada;

  private String repouso;

  @Column(name = "REPOUSO_24H")
  private String repouso24h;

  @Column(name = "T_JORNADA")
  private String tJornada;

  private String conducao;

  @Column(name = "DIR_MAX_CONTINUA")
  private String dirMaxContinua;

  @Column(name = "HORA_EXTRA")
  private String horaExtra;

  private String refeicao;

  private String descanso;

  @Column(name = "KM_TOTAL")
  private BigDecimal kmTotal;


  public Long getId() {
    return id;
  }

  public void setId(Long Id) {
    this.id = Id;
  }
  public Long getIdMot() {
    return idMot;
  }

  public void setIdMot(Long idMot) {
    this.idMot = idMot;
  }

  public String getNomeMot() {
    return nomeMot;
  }

  public void setNomeMot(String nomeMot) {
    this.nomeMot = nomeMot;
  }

  public String getSupervisor() {
    return supervisor;
  }

  public void setSupervisor(String supervisor) {
    this.supervisor = supervisor;
  }

  public LocalDate getData() {
    return data;
  }

  public void setData(LocalDate data) {
    this.data = data;
  }

  public String getInicioJornada(){
    return inicioJornada;
  }
  public void setInicioJornada (String inicioJornada){
    this.inicioJornada = inicioJornada;
  }

  public String getFimJornada () {
    return fimJornada;
  }

  public void setFimJornada (String fimJornada){
    this.fimJornada = fimJornada;
  }

  public String getRepouso () {
    return repouso;
  }
  public void setRepouso (String repouso) {
    this.repouso = repouso;
  }

  public String getRepouso24h () {
    return repouso24h;
  }

  public void setRepouso24h (String repouso24h){
    this.repouso24h = repouso24h;
  }

  public String gettJornada () {
    return tJornada;
  }

  public void settJornada (String tJornada) {
    this.tJornada = tJornada;
  }

  public String getConducao() {
    return conducao;
  }

  public void setConducao(String conducao) {
    this.conducao = conducao;
  }

  public String getDirMaxContinua() {
    return dirMaxContinua;
  }
  public void setDirMaxContinua(String dirMaxContinua) {
    this.dirMaxContinua = dirMaxContinua;
  }

  public String getHoraExtra() {
    return horaExtra;
  }

  public void setHoraExtra(String horaExtra) {
    this.horaExtra = horaExtra;
  }

  public String getRefeicao() {
    return refeicao;
  }

  public void setRefeicao(String refeicao) {
    this.refeicao = refeicao;
  }

  public String getDescanso() {
    return descanso;
  }
  public void setDescanso(String descanso) {
    this.descanso = descanso;
  }
  public BigDecimal getKmTotal() {
    return kmTotal;
  }

  public void setKmTotal(BigDecimal kmTotal) {
    this.kmTotal = kmTotal;
  }
}
