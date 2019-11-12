import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalAguardandoConfirmacao: any;
  pedidoService: any;
  totalEmPreparacao: any;
  totalSaiuParaEntrega: any;
  totalEntregue: any;

  constructor() { }

  ngOnInit() {
    this.popularDashboard();
  }

  popularDashboard() {
    this.totalAguardandoConfirmacao = this.pedidoService.getTotalAguardandoConfirmacao();
    this.totalEmPreparacao = this.pedidoService.getTotalEmPreparacao();
    this.totalSaiuParaEntrega = this.pedidoService.getTotalSaiuParaEntrega();
    this. totalEntregue = this.pedidoService.getTotalEntregue();
  }
}
