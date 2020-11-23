import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-erro-validacao',
  templateUrl: './message-erro-validacao.component.html',
  styleUrls: ['./message-erro-validacao.component.scss'],
})
export class MessageErroValidacaoComponent implements OnInit {

  @Input() texto: string = '';

  constructor() { }

  ngOnInit() {}

}
