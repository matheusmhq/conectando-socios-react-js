<p  align="center">
<a href="https://conectando-socios.netlify.app/">
		<img src="/src/assets/images/logo.png" alt="Logo Conectando Sócios" title="Logo Conectando Sócios" />
	</a>
</p>

#

<p align="center">
  Projeto desenvolvido pro TCC do curso de Engenharia de Software na Instituição Unicesumar.
</p>

<p align="center">
  Um Sistema totalmente responsivo construído com React JS.
</p>

<p align="center">
    <a href="https://github.com/matheusmhq/conectando-socios-react-js/blob/main/LICENSE" alt="license">
        <img src="https://img.shields.io/github/license/matheusmhq/tmdb-react-js?style=plastic" />
    </a>
</p>

<p align="center">
  <a href="#demo">Demo</a> •
  <a href="#bibliotecas">Bibliotecas</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#iniciando">Iniciando</a>   
</p>

<p align="center">
    <img style="border-radius: 5px" src="src/assets/images/demo.gif" alt="Conectando Sócios React js">
</p>

# Demo

[Conectando Sócios - Live ◀️](https://conectando-socios.netlify.app/)

## Bibliotecas

As principais bibliotecas usadas nesse projeto:

| Biblioteca             | Descrição   |
| :-------------:|--------------|
| [React](http://facebook.github.io/react/index.html) | Uma biblioteca JavaScript para criar interfaces de usuário. |
| [Bootstrap](https://react-bootstrap.github.io/) | A biblioteca de front-end mais popular reconstruída para React. |
| [Router Dom](https://reactrouter.com/) | O React Router Dom é uma lib completa para controle de rotas. |
| [Axios](https://github.com/axios/axios) | Cliente HTTP baseado em promessa para o navegador e node.js. |
| [Redux](https://redux.js.org/) | Um gerenciador de estado global para aplicativos JavaScript. |
| [Moment](https://momentjs.com/) | Uma biblioteca de datas JavaScript para analisar, validar, manipular e formatar datas. |
| [Cypress](https://docs.cypress.io/) | Cypress é uma ferramenta de teste de front-end de próxima geração desenvolvida para a web moderna. |
| [Jest](https://jestjs.io/) | Jest é um poderoso Framework de Testes em JavaScript com um foco na simplicidade. |
| [Testing Library](https://testing-library.com/) | Utilitários de teste simples e completos que incentivam boas práticas de teste. |

# Funcionalidades

- [Home (/)](https://conectando-socios.netlify.app/) - Lista os últimos **_projetos_** publicados baseado nos filtros selecionados **_categoria_**, **_estado_** e **_cidade_**, também permite busca por **_palavra-chave_**. Clicando no coração é possível salvar~favoritar um **_projeto_**.

- [Como funciona (/how-work)](https://conectando-socios.netlify.app/how-work) - Uma breve explicação do intuito da plataforma. Disponível um link em .pdf para acesso a **_Documentação do Usuário_**

- [Publicar Projeto (/publish-project)](https://conectando-socios.netlify.app/publish-project) - Permite publicar um projeto preencheendo os campos **_título_**, **_categoria_** e **_descrição_**.

- [Detalhes (/details)](https://conectando-socios.netlify.app/details/195) - Exibe informações detalhadas como **_título_**, **_descrição_**, **_categoria_**, **_links das redes_** etc... sobre o **_projeto_** escolhido. Também é possível editar ou deletar o **_projeto_** caso seja o autor da publicação.

- [Meus Projetos (/my-projects)](https://conectando-socios.netlify.app/my-projects/published) - Lista **_projetos_** publicados ou salvos da conta.

- [Configurações (/user)](https://conectando-socios.netlify.app/user/profile) - Permite editar informações do perfil e alterar a senha.



- OBS: Todas as páginas que contém listagem estão **_páginadas_**.

# Iniciando

- Clonar esse repositório

  ```
  git clone git@github.com:matheusmhq/conectando-socios-react-js.git

  cd conectando-socios-react-js
  ```

- Instale as dependências

  ```
  yarn install
  ```

- Agora é só rodar **yarn start**

- A aplicação irá abrir no seguinte endereço `http://localhost:3000`

## Testes

- Testes unitários (Jest e Testing Library)

  ```
  yarn test
  ```

- Testes e2e (Cypress)

  ```
  yarn cypress-open
  ```