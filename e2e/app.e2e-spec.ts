import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('tela inicial', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('deve possuir todos os elementos', () => {
      page.hasElements().then(valor => {
        expect(valor).toBe(true);
      });
    });

    it('deve iniciar exibindo "Alô, Mundo!"', () => {
      page.getMensagem().then(mensagem => {
        expect(mensagem).toEqual('Alô, Mundo!');
      });
    });

    it('não deve alterar mensagem à medida que digita', () => {
      page.digitaNome("testando")
          .then(() => page.getMensagem())
          .then((mensagem) => {
            expect(mensagem).toEqual('Alô, Mundo!');
          });
    });

    it('deve alterar mensagem ao pressionar botão', () => {
      page.digitaNome("testando")
          .then(() => page.cumprimenta())
          .then(() => page.getMensagem())
          .then((mensagem) => {
            expect(mensagem).toEqual('Alô, testando!');
          });
    });

  })
});
