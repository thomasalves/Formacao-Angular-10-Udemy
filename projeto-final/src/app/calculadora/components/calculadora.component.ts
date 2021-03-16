
import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from './../services';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;




  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Iniciaza todos os operadores para os valores padrão
   *
   * @return void
   */
  limpar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adicion o número selecionado para o cálculo posteriomente
   *
   * @param string numero
   * @retunr void
   */

  adicionarNumero(numero: string): void {
    if(this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    }else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  /**
   *  Retorna o valor concatenado. Trata o separador decimaldocument.addEventListener('type', listener);

   * @param string numAtual
   * @param string numConcat
   * @return string
   */

  concatenarNumero(numAtual: string, numConcat: string): string {
    // caso contenha apenas '0' ou null, reinicia o valor
    if(numAtual === '0' || numAtual === null) {
      numAtual= '';
    }

    // primeiro digito é '.' concatena '0' antes do ponto
    if(numConcat === '.' && numAtual === ''){
      return '0.';
    }

    // caso '.' degitado e já cotenha um '.' apenas retorna
    if(numConcat === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }

    return numAtual + numConcat;

   }

    /**
     * Executa lógica quando um operador for selecionado
     * Caso já possua uma operação selecionada, executa a
     * operação anterior, e define a nova operaçãodocument.addEventListener('type', listener);

     * @param string operacao
     * @return void
     */

   definirOperacao(operacao: string): void {
     // apenas define a operacao caso não exista uma
     if(this.operacao === null){
       this.operacao = operacao;
       return;
     }

     /* caso operação definica e número 2 selecionado,
        efetua o cálculo da operação*/
     if(this.numero2 !== null){
        this.resultado = this.calculadoraService.calcular(
         parseFloat(this.numero1),
         parseFloat(this.numero2),
         this.operacao);
        this.operacao = operacao;
        this.numero1 = this.resultado.toString()
        this.numero2 = null;
        this.resultado = null;
     }
   }

   /**
    * Efetua o cáculo de uma operação
    *
    * @return void
    */
   calcular(): void {
     if(this.numero2 === null){
       return;
     }

     this.resultado = this.calculadoraService.calcular(
       parseFloat(this.numero1),
       parseFloat(this.numero2),
       this.operacao);

   }

   /**
    * Retorna o valor a ser ecibido na tela da calculadora
    *
    * @return string
    */

   get display(): string {
     if(this.resultado !== null) {
       return this.resultado.toString();
     }
     if(this.numero2 !== null) {
       return this.numero2;
     }
     return this.numero1;
   }
}

