# mens-shop
Projeto front end de uma loja ecommerce com api mockada.

Projeto utilizando as tecnologias
Node.js V18.2.4
Angular 17.3.15
PrimeNg: 17.18.15
PrimeFlex: 3.3.1

Para rodar o projeto utilize o comando no terminal 
npm run start

Fluxos de Uso:
1 - A tela carrega inicialmente na home, exibindo os produtos da loja, barra de pesquisa, opções de carrinho e entrar.
    1.1 - Deslogado o usuário pode acessar o carrinho, colocar produtos no carrinho, pesquisar produtos.
    1.2 - O usuário pode clicar em entrar e fazer o login o que exibirá um novo menu com opções, carrinho, minhas compras e logout.
2 - Entrar
    2.1 Ao clicar em entrar o usuário será redirecionado para tela de login, onde pode acessar com email e senha, se cadastrar ou recuperar senha.
        2.1.1 - Por ter uma api mockada, ao logar com qualquer email e senha retornará sucesso.
    2.2 - Ao clicar em cadastre-se o usuário será direcionado para uma tela de cadastro, o formulário deverá ser preenchido corretamente com as senhas iguais e clicar em aceitar termos para realizar o cadastro corretamente.
        2.2.1 - O cadastro não tem integração com a api mockada, caso o formulário de cadastro esteja válido, os termos tickados e as senhas iguais retornara mensagem de sucesso e abrirá modal de com opções de redirecionamento para login ou home.
    2.3 - Ao clicar em esqueci a senha o usuário deverá digitar um email e clicar em recuperar senha. Aparecerá um aviso de link de recuperação.
3 - Compra
    3.1 - Todos os produtos tem o campo de selecionar o tamanho e os botões de comprar ou colocar no carrinho
    3.2 - Ao clicar em colocar no carrinho o icone/menu carrinho será atualizado com a quantidade de itens.
    3.3 - Ao clicar em comprar o usuário será redirecionado pro carrinho com o item selecionado mais os itens que foram colocados no carrinho.
        3.3.1 - É necessário selecionar o tamanho, caso não seja selecionado exibirá o modal informando a necessidade de selecionar o tamanho.
    3.4 - Na pagina de carrinho de compras é exibido todos os produtos selecionados, com as informaçoes, valor total e opções de aumentar, diminuir a quantidade ou excluir o item no carrinho.
        3.4.1 - Nessa pagina haverá um botão para voltar as compras, e outro botão prosseguir.
        3.4.1.1 - Em caso do usuário deslogado, na pagina de carrinho é exibido o botão solicitando login para continuar, ao clicar o usuário é direcionado para o login e apos logar é direcionado para o checkout das compras.
        Em caso de usuário logado, o botão ira redirecionar para o checkout das compras.
    3.5 - Na pagina de checkout o usuário exibira um pequeno resumo das compras e terá uma opção de selecionar forma de recebimento entrega ou retirada.
        3.5.1 - Ao selecionar retirada o usuário deverá selecionar qual das lojas disponiveis ele quer retirar o produto.
        3.5.2 - Ao selecionar entrega o usuário terá a opção de selecionar um endereço cadastrado no seu usuário ou cadastrar um novo endereço.
        3.5.3 - A pagina tem dois botões com opção de voltar para o carrinho, ou ir para forma de pagamaneto que só será habilitado após selecionar o a forma de recebimento.
    3.6 - Na pagina de pagamento exibirá as opções de pix, crédito, débito e boleto.
        3.6.1 - Ao selecionar pix exibirá um modal com QRCode e codigo pix que pode ser copiado.
        3.6.2 - Ao selecionar débito ou crédito exibira uma lista de cartões cadastrados com o botão de usar, ou o botão de cadastrar um novo.
            3.6.2.1 - Ao clicar em cadastrar novo, abrirá um modal para o usuário fazer o cadastro de um novo cartao, ou poderá usar um pre cadastrado, clicando em usar.
        3.6.3 - Ao clicar em boleto abrirá um modal onde o usuário irá preencher os dados pra gerar um boleto, ao preencher corretamente e clicar em enviar boleto. Exibirá um aviso que o boleto foi enviado para o email cadastrado.
        3.6.4 - Ao selecionar a forma de pagamento será desabilitado o botão de ir para revisão da compra ou usuário poderá retornar utilizando o botão revisar dados de entrega 
    3.7 - Na tela de revisão deverá exibir o resumo dos produtos, a forma de pagamento e a forma de recebimento, o usuário poderá retornar para a tela de pagamento ao clicar no botão revisar forma de pagamento ou clicar em finalizar compra.
        3.7.1 - Ao clicar em finalizar compra o exibirá um modal de sucesso, exibindo a opção do usuário ser redirecionado para acompanhar compra (será redirecionado pro menu minhas compras) ou voltar para loja (será redirecionado pra home).
4 - Minhas compras
    4.1 Na tela de minhas compras exibirá uma lista de pedidos com um resumo e um acordion
        4.1.1 Ao clicar no acordion do pedido deverá exibir um seção com detalhes do pedido e uma lista de timeline de eventos do pedido(Pagamento, seperação, a caminho, entrega etc... ).
        4.1.2 - Ao finalizar uma compra o usuário poderá ser redirecionado para o acompanhamento, e a compra será atualizada automaticamente com os pedidos anteriores mais a compra finalizada no evento de processamento de pagamento.
            4.1.2.1 - Nao temos integração da api mockada nesse menu, as compras exibidas são as compras cadastradas no retorno do login do usuário e ao finalizar uma compra atulizamos na própria aplicação com os dados da jornada.
5 - Logoff 
    5.1 - O usuário logado terá no menu a opção de deslogar, em qualquer pagina que esteja, será redirecionado para home com o aviso de logoff com um banner superior.
        
    


