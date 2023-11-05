import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-history-coin',
  templateUrl: './history-coin.component.html',
  styleUrls: ['./history-coin.component.scss']
})
export class HistoryCoinComponent implements OnInit {
  history: any[] = []
  loading: boolean = false
  constructor(
    private coinService: CoinService,
    private messageService: MessageService
  ) { }
  ngOnInit() {
    this.getHistory();
  }
  /**
   *Trae el historial de bancos
   *
   * @memberof HistoryCoinComponent
   */
  getHistory() {
    this.loading = true
    this.coinService.historyEntities().subscribe({
      next: (results: any) => {
        results.results
        this.history = results.results
        this.loading = false
      },
      error: (erro) => {
        this.loading = false
        this.messageService.add({ severity: 'error', summary: 'Error de carga', detail: 'Hubo problema, por favor refrescar la pagina' });
      }
    })
  }
}
