# LinguagemWEB-AVD2
Segunda AVD da matéria Linguagem de Programação Web 2

## Objetivos

1) Criar o relacionamento entre as tabelas Client e Salesorder de um para muitos
2) Implementar o CRUD em ambas das rotas
3) Implementar as seguintes rotas:
   '/clients/salesorder': listar todos os clientes e os pedidos de vendas
   '/clients/salesorderunit': listar o id, nome do cliente, cpf, nome do produto, data do pedido de venda, quantidade e valor unitário
   '/clients/salesordertotal': listar id do cliente, nome do cliente, telefone do cliente, data do pedido de venda, nome do produto do pedido de venda, quantidade do pedido de venda, valor unitário do pedido de venda e valor total do pedido de venda(com 10% de juros)
   '/clients/customer_sales_order': listar todas as informações do cliente e o pedido de vendas, sendo passando pelo parâmetro o cpf do usuário.
