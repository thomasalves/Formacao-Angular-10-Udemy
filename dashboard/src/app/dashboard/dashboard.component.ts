import { Component, OnInit } from '@angular/core';

//import { Observable } from "rxjs/Observable";

import { DadosService } from "./dados.service";

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor( private dadosService:  DadosService) { }

  ngOnInit(): void {
    this.dadosService.obterDados().subscribe( 
      dados => {
          this.dados = dados;
          this.init()
      })
  }

  /**
   * Iniciaza a API de gráficos com delay de 1 segundo,
   * o que permitr a integração da API com o Angular.
   * 
   * @return void
   */
  init(): void {
    if(typeof(google) !== 'undefined'){
      google.charts.load('current', { 'packages' : ['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 3000);
    }
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada.
   * Responsável por chamar os métodos geredores dos gráficos.
   * 
   * @return void
   */
  exibirGraficos() : void {
    this.exibirPieChart();
    this.exibir3DPieChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
    this.exibirDonutChart()

  }

  /**
   * Exibe o grafico Pie Chart
   * 
   * @return void
   */
  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart =  new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibir o gráfico Pie Chart em 3D
   * 
   * @return void
   */
  exibir3DPieChart() : void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el)
      const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  };

  /**
   * Exibe o gráfico Donut CHart
   * 
   * @return void
   */
  exibirDonutChart() : void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.3;
    chart.draw(this.obterDataTable(), opcoes);
  }

   /**
    * Exibe o gráfico Bar Chart 
    * 
    * @return void
    */
   exibirBarChart(): void {
    const el = document.getElementById('bar_chart');
    const chart =  new google.visualization.BarChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
   }

  /**
   * Exibe o gráfico de Line Chart
   * @return void
   */
  exibirLineChart(): void {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes())
  }

  /**
   * Exibe o fráfico Column Chart
   * @return void
   */
  exibirColumnChart() : void {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes())
  }


  /**
   * Cria e retorna o objeto DataTable da API de graficos,
   * responsavel por definir os dados do gráfico.
   * 
   * @return any
   */
  obterDataTable(): any {
   const data = new google.visualization.DataTable();
   
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico.
   * 
   * @return any
   */
  obterOpcoes(): any {
    return {
      'title':  'Quantidade de cadastros primeiro semestre',
      'width':  400,
      'height': 300,
    };
  }
  
}
