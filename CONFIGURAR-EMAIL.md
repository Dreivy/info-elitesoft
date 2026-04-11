# 📧 Configuração do EmailJS - FutStore

## O que é o EmailJS?
EmailJS é um serviço gratuito que permite enviar emails diretamente do frontend (JavaScript) sem precisar de backend.

## 🚀 Como Configurar (5 minutos):

### Passo 1: Criar conta no EmailJS
1. Acesse: https://www.emailjs.com/
2. Clique em **"Sign Up Free"**
3. Crie sua conta gratuita (200 emails/mês grátis)

### Passo 2: Adicionar Serviço de Email
1. No dashboard, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha **Gmail** (ou outro provedor)
4. Conecte sua conta Gmail
5. Anote o **Service ID** (ex: `service_futstore`)

### Passo 3: Criar Template de Email para Cliente
1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Use este template:

**Assunto:** `✅ Confirmação de Pedido #{{pedido_numero}} - FutStore`

**Conteúdo:**
```
Olá {{to_name}}!

Seu pedido foi realizado com sucesso! 🎉

 Número do Pedido: {{pedido_numero}}
📅 Data: {{data_pedido}}

🛒 Itens do Pedido:
{{itens_pedido}}

💰 Total: {{total_pedido}}
🚚 Frete: {{frete}}

📍 Endereço de Entrega:
{{endereco_completo}}

Obrigado por comprar na FutStore! ⚽

Qualquer dúvida, responda este email.
```

4. Salve e anote o **Template ID** (ex: `template_confirmacao_cliente`)

### Passo 4: Criar Template de Email para Loja
1. Crie outro template para notificação interna
2. **Assunto:** `🛒 Novo Pedido #{{pedido_numero}} - FutStore`

**Conteúdo:**
```
🔔 NOVO PEDIDO RECEBIDO!

📦 Pedido: {{pedido_numero}}
📅 Data: {{data_pedido}}

👤 Cliente: {{nome_cliente}}
📧 Email: {{email_cliente}}
📱 Telefone: {{telefone_cliente}}
📋 CPF: {{cpf_cliente}}

🛒 Itens:
{{itens_pedido}}

💰 Total: {{total_pedido}}
🚚 Frete: {{frete}}

📍 Endereço:
{{endereco_completo}}

---
FutStore - Sistema de Pedidos
```

3. Salve e anote o **Template ID** (ex: `template_novo_pedido_loja`)

### Passo 5: Pegar sua Chave Pública
1. Vá em **"Account"** (canto superior direito)
2. Copie sua **Public Key** (ex: `user_abc123xyz`)

### Passo 6: Atualizar o Código
No arquivo `index.html`, substitua:

```javascript
// Linha ~987
emailjs.init("SUA_CHAVE_PUBLICA_AQUI");
// Troque para:
emailjs.init("user_abc123xyz"); // Sua chave real
```

E substitua os IDs dos templates e serviço nas funções `enviarEmailConfirmacao()`:
- `service_futstore` → Seu Service ID real
- `template_confirmacao_cliente` → Seu Template ID do cliente
- `template_novo_pedido_loja` → Seu Template ID da loja

## ✅ Pronto!

Agora quando um cliente finalizar a compra:
1. ✅ Recebe email de confirmação com detalhes do pedido
2. ✅ Você recebe notificação do novo pedido
3. ✅ Tudo automático, sem backend!

## 📊 Limites do Plano Gratuito:
- 200 emails/mês
- Suficiente para começar!
- Upgrade disponível se precisar de mais
