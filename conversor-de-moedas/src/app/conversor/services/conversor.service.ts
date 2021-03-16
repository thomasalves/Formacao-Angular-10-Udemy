import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Conversao, ConversaoResponse } from '../models';


@Injectable()
export class ConversorService {

  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=81593c9648c7f4cc2fafadad61297a28";

  constructor(private http: HttpClient) { }
  /**
   * Realiza a chamada p  ara a API de conversão
   * 
   * @param Conversao conversao
   * @return Observable<ConversaoResponse>
   */

  converter(conversao: Conversao): Observable<any> {
    let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`

    return this.http
      .get(this.BASE_URL + params);
      
  }

  /**
   * Retona a cotação para dado uma response
   * 
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return number
   */
  cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao) : number {
    if(conversaoResponse === undefined){
      return 0;
    }

    return conversaoResponse.rates[conversao.moedaPara]
  }

  /**
   * Retorna a cotação de dado uma response.
   * 
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return string
   */
  cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string  {
    if(ConversaoResponse === undefined){
      return '0';
    }

    return(1/ conversaoResponse.rates[conversao.moedaPara]).toFixed(4)
  }

  /**
   * Retorna a data de cotação dado uma response
   * 
   * @param ConversaoResponse conversaoResponse
   * @return string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if(conversaoResponse === undefined){
      return '';
    }

    return conversaoResponse.date
  }
}
