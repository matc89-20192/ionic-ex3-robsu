import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {

  /* d = descrição, p = prioridade, o = ordem de chegada */
  public tarefas :Array<{d :string, p :number, o}> = [];
	private ordemChegada :number;
  
  /* Constantes mensagens toasts */
  private msgsToasts = [
  	"A prioridade deve estar entre 1 e 10.",
  	"Campo de descrição vazia.", 
  	"Tarefa já cadastrada."];

  /* Variáveis de controle dos inputs e buttons */
  public btnDisabled :boolean;
  public clsInpDescricao :string;
  public clsInpPrioridade :string;

  constructor(public navCtrl: NavController,
  						private toastCtrl: ToastController) {

    this.tarefas = [];
    this.ordemChegada = 0;
    this.btnDisabled = true;
    this.clsInpDescricao = this.clsInpPrioridade = "";

  }

	adicionar (descricao :string, prioridade :number) {
		if(this.validaDados(descricao, prioridade)){
			this.tarefas.push({
			 	d :descricao,
				p :prioridade,
				o :this.ordemChegada++
			});

			this.btnDisabled = false;		// Ativa o botão de Remover 1º
			this.clsInpDescricao = this.clsInpPrioridade = ""; // Limpar os inputs

			this.tarefas.sort((t1, t2) => {
        if((t1.p < t2.p) ||
        	((t1.p == t2.p) && (t1.o < t2.o)))
        		return -1;
        return 1;
      });
		}
  }

	validaDados (d :string, p:number) {
		let idMsg :number = -1;

		/* Busca tarefa 'd' na lista */
		for(let t of this.tarefas)
			if(t.d == d)
				idMsg = 2; 

		if(idMsg == 2) idMsg = 2;							// Tarefa já cadastrada
		else if(d == "")	idMsg = 1; 					// Descrição vazia 
		else if((p <1) || (p >10)) idMsg = 0; // Prioridade inválida
		else return true;

		/* Exibe Toasts*/
		let paoTorrado = this.toastCtrl.create({
	    message: this.msgsToasts[idMsg],
	    duration: 5000,
	    position: 'top',
	    showCloseButton: true
		 });
		paoTorrado.onDidDismiss(() => {
	     console.log('Dismissed toast');
		 });
		paoTorrado.present();

		return false;
	}

	remover (index: any) {
		if(typeof(index) == "number") 		// Remove quando clica no item
			this.tarefas.slice(index, 1);

		this.tarefas.shift();							// Remove pelo botão
		
		if(this.tarefas.length < 1)
			this.btnDisabled = true; 		// Desativa o botão de Remover 1º
	}
}