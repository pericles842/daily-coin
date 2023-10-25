import { Component, OnInit } from '@angular/core';
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
    private coinService: CoinService
  ) { }
  ngOnInit() {
    this.getHistory();
  }

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
      }
    })
  }
}
