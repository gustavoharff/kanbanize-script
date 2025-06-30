export interface Root {
  registrosPonto: RegistrosPonto[]
  horasPrevistas: number
  horasTrabalhadas: number
  diasPrevistos: number
  diasTrabalhados: number
  horasAbonadas: number
  diariaPrevista: number
  mediaDiaria: number
  saldoMensal: number
  temRegistrosAnteriores: boolean
  temRegistrosPosteriores: boolean
  temTresTurnos: boolean
  temQuatroTurnos: boolean
  dataFechamento: string
}

export interface RegistrosPonto {
  idRegistroPonto: number
  data: string
  horasAbonadas: number
  motivoAbono?: string
  fechamentoDiario: number
  possuiCorrecao: boolean
  horasPrevistas: number
  saldoHorasDias: number
  ferias: boolean
  feriado: boolean
  fimDeSemana: boolean
  motivoAfastamento: any
  horarios: Horario[]
  correcoes: Correc[]
  ocorrencias: any[]
  atividades: any[]
}

export interface Horario {
  turno: number
  hora: string
  tipoHorario: number
}

export interface Correc {
  correcaoComInfracao: boolean
  dataCorrecao: string
  horarios: Horario2[]
  justificativa: string
  status: number
  avaliacao: any
  ocorrencias: any
}

export interface Horario2 {
  turno: number
  hora: string
  tipoHorario: number
}
