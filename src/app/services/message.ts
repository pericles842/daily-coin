import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MessageServiceSocial {

  constructor(
    private http: HttpClient,
  ) { }
  /**
   *Envia un mensaje a wasap
   *
   * @param {string} text
   * @memberof MessageService
   */
  sendEmailWhatsApp(text: string) {
    const url = `https://api.whatsapp.com/send?text=${text}`
    window.open(url, '_blank');
  }
}
