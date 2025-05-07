# Projeto Front-End - Mens Shop - Loja Ecommerce

Projeto front end de uma loja ecommerce com API mockada.

---

## Tecnologias Utilizadas

- Node.js: v18.2.4  
- Angular: 17.3.15  
- PrimeNG: 17.18.15  
- PrimeFlex: 3.3.1  

---

## Como Executar

Para rodar o projeto utilize o comando:

```bash
npm run start
```

## Fluxos de Uso

1. A tela carrega inicialmente na home, exibindo os produtos da loja, barra de pesquisa, opções de carrinho e entrar.  
    1.1. Deslogado o usuário pode acessar o carrinho, colocar produtos no carrinho, pesquisar produtos.  
    1.2. O usuário pode clicar em entrar e fazer o login, o que exibirá um novo menu com opções: carrinho, minhas compras e logout.  

2. Entrar  
    2.1. Ao clicar em entrar, o usuário será redirecionado para a tela de login, onde pode acessar com e-mail e senha, se cadastrar ou recuperar senha.  
        2.1.1. Por ter uma API mockada, ao logar com qualquer e-mail e senha retornará sucesso.  
    2.2. Ao clicar em **cadastre-se**, o usuário será direcionado para uma tela de cadastro. O formulário deverá ser preenchido corretamente com as senhas iguais e o checkbox de aceitar termos deve ser marcado para realizar o cadastro corretamente.  
        2.2.1. O cadastro não tem integração com a API mockada. Caso o formulário esteja válido, os termos tickados e as senhas iguais, retornará mensagem de sucesso e abrirá modal com opções de redirecionamento para login ou home.  
    2.3. Ao clicar em **esqueci a senha**, o usuário deverá digitar um e-mail e clicar em **recuperar senha**. Aparecerá um aviso de link de recuperação.  

3. Compra  
    3.1. Todos os produtos têm o campo de selecionar o tamanho e os botões de **comprar** ou **colocar no carrinho**.  
    3.2. Ao clicar em **colocar no carrinho**, o ícone/menu carrinho será atualizado com a quantidade de itens.  
    3.3. Ao clicar em **comprar**, o usuário será redirecionado para o carrinho com o item selecionado mais os itens que foram colocados no carrinho.  
        3.3.1. É necessário selecionar o tamanho; caso não seja selecionado, exibirá um modal informando a necessidade.  
    3.4. Na página de carrinho de compras são exibidos todos os produtos selecionados, com as informações, valor total e opções de aumentar/diminuir a quantidade ou excluir o item.  
        3.4.1. Nessa página haverá um botão para **voltar às compras** e outro botão **prosseguir**.  
            3.4.1.1. Em caso de usuário deslogado, o botão exibirá solicitação de login. Após logar, será redirecionado para o checkout.  
                    Em caso de usuário logado, o botão redirecionará direto para o checkout.  
    3.5. Na página de checkout, o usuário verá um resumo das compras e poderá selecionar a forma de recebimento: entrega ou retirada.  
        3.5.1. Ao selecionar **retirada**, o usuário deverá escolher qual das lojas disponíveis deseja retirar o produto.  
        3.5.2. Ao selecionar **entrega**, o usuário poderá escolher um endereço cadastrado ou cadastrar um novo.  
        3.5.3. Há dois botões: **voltar para o carrinho** ou **ir para forma de pagamento** (só será habilitado após selecionar o tipo de recebimento).  
    3.6. Na página de pagamento serão exibidas as opções: Pix, Crédito, Débito e Boleto.  
        3.6.1. Ao selecionar **Pix**, exibirá um modal com QRCode e código Pix que pode ser copiado.  
        3.6.2. Ao selecionar **Crédito ou Débito**, exibirá lista de cartões cadastrados com opção de usar ou cadastrar novo.  
            3.6.2.1. Ao clicar em **cadastrar novo**, abrirá um modal para preenchimento dos dados do cartão.  
        3.6.3. Ao selecionar **Boleto**, abrirá modal para preenchimento dos dados. Após enviar corretamente, será exibido aviso de que o boleto foi enviado por e-mail.  
        3.6.4. Após selecionar a forma de pagamento, será habilitado o botão **ir para revisão da compra**. Também é possível voltar usando o botão **revisar dados de entrega**.  
    3.7. Na tela de revisão será exibido:  
        - Resumo dos produtos  
        - Forma de pagamento  
        - Forma de recebimento  
        O usuário poderá:  
        - Retornar para a tela de pagamento clicando em **revisar forma de pagamento**  
        - Finalizar compra  
        3.7.1. Ao finalizar compra, exibirá modal de sucesso com opções:  
            - Acompanhar compra (irá para "Minhas compras")  
            - Voltar para loja (irá para "Home")  

4. Minhas Compras  
    4.1. A tela exibirá uma lista de pedidos com resumo e acordeão.  
        4.1.1. Ao clicar no acordeão, será exibido:  
            - Detalhes do pedido  
            - Timeline de eventos (Pagamento, Separação, A caminho, Entrega etc.)  
        4.1.2. Ao finalizar uma compra, o usuário poderá ser redirecionado para essa tela. A compra será automaticamente adicionada à lista.  
            4.1.2.1. Como a API é mockada, os dados exibidos vêm do login e são atualizados localmente com a jornada de compra.  

5. Logoff  
    5.1. O usuário logado verá no menu a opção de **deslogar**. Ao clicar, será redirecionado para a home com aviso de logoff exibido em banner superior.  
