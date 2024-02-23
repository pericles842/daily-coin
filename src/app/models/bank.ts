import { BankingRole } from "../enum/entiesBanking"

export class Bank {
  date: string = ''
  date_label: string = ''
  key!: BankingRole
  label_status: 'bajo' | 'neutro' | 'alto' = 'neutro'
  name: string = ''
  price: number = 0
  percentage: string = ''
  symbol: string = ''
  active: boolean = false
}

