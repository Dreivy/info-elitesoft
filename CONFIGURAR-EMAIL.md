# 📧 Configuração de Email - FutStore

## ✅ Sistema Atual: FormSubmit (ZERO cadastro!)

O site agora usa **FormSubmit.co** - não precisa criar conta em lugar nenhum!

### 🔧 Como Ativar (30 segundos):

1. **Abra o arquivo `index.html`**
2. **Procure por** (linha ~987):
   ```javascript
   const EMAIL_LOJA = "SEU_EMAIL_AQUI@gmail.com";
   ```
3. **Troque pelo seu email real**:
   ```javascript
   const EMAIL_LOJA = "seuemail@gmail.com";
   ```
4. **Salve e pronto!** ✅

### 📬 Como Funciona:

Quando um cliente finaliza a compra:
1. ✅ **Você recebe** um email com todos os dados do pedido
2. ✅ **Cliente recebe** uma cópia do email de confirmação
3. ✅ **Primeiro email**: Você precisa confirmar ativando o link que chega no seu email (só na primeira vez)
4. ✅ **Depois**: Todos os emails chegam automaticamente!

### 📋 O que chega no email:

| Campo | Exemplo |
|-------|---------|
| 📦 Pedido | FUT-123456 |
| 📅 Data | 10/04/2026 |
| 👤 Cliente | João Silva |
| 📧 Email | joao@email.com |
| 📱 Telefone | (11) 99999-9999 |
| 📋 CPF | 123.456.789-00 |
| 🛒 Itens | Lista completa com tamanhos |
| 💰 Total | R$ 149,90 |
| 🚚 Frete | GRÁTIS |
| 📍 Endereço | Endereço completo |

### ⚠️ Importante:

- **Primeiro email**: Você receberá um email de confirmação do FormSubmit para ativar. Clique no link para ativar.
- **Depois**: Todos os pedidos chegam automaticamente!
- **Spam**: Verifique a caixa de spam se não encontrar o email.

### 🆓 Limites:
- ✅ Gratuito
- ✅ Sem limite de emails
- ✅ Sem cadastro necessário
- ✅ Funciona com qualquer email (Gmail, Outlook, etc.)

###  Arquivo para editar:
```
info-elitesoft-site/index.html
```
Procure por `SEU_EMAIL_AQUI` e troque pelo seu email real!
