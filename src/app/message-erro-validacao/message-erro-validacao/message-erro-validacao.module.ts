import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageErroValidacaoComponent } from "./message-erro-validacao.component";

@NgModule({
	declarations: [
		MessageErroValidacaoComponent,
	],
	exports: [
		MessageErroValidacaoComponent,
	],
	imports: [
		CommonModule,
	]
})
export class MesagemErroValidacaoModule {
	
}