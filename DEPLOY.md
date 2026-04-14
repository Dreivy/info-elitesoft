# 🚀 Guia de Deploy - FutStore Backend

## Pré-requisitos

- Git instalado (adicionado ao PATH)
- Conta no Render (https://dashboard.render.com)
- Chave secreta do Stripe (https://dashboard.stripe.com/apikeys)

---

## Opção A: Backend no mesmo repositório do frontend (RECOMENDADO)

### Passo 1 - Commit e Push do código

```bash
cd "C:\Users\DREIVY\Desktop\AGENTS\info-elitesoft-site"
git add backend/server.js backend/package.json backend/package-lock.json
git commit -m "fix: backend Stripe corrigido com lineItems price_data e logs"
git push origin main
```

### Passo 2 - Configurar Render

1. Acesse: https://dashboard.render.com
2. Selecione o serviço `futstore-backend`
3. Vá em **Settings** → **Build & Deploy**
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Clique em **Save Changes**
6. Clique em **Manual Deploy** → **Deploy latest commit**

### Passo 3 - Environment Variables no Render

No dashboard do Render, em **Environment**:

| Variável | Valor |
|----------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (sua chave do Stripe) |
| `FRONTEND_URL` | `https://dreivy.github.io` |
| `NODE_ENV` | `production` |
| `PORT` | *(deixe vazio - Render define automaticamente)* |

---

## Opção B: Repositório separado para backend

Se o backend está em um repositório separado:

```bash
cd "C:\Users\DREIVY\Desktop\AGENTS\info-elitesoft-site\backend"
git add .
git commit -m "fix: backend Stripe corrigido"
git push origin main
```

O Render fará deploy automático se Auto Deploy estiver habilitado.

---

## Verificação Pós-Deploy

### 1. Testar health check
```
https://futstore-backend.onrender.com/health
```
Deve retornar: `{"status":"ok","timestamp":"..."}`

### 2. Testar pagamento completo
1. Acesse: https://dreivy.github.io/info-elitesoft
2. Adicione 3+ itens ao carrinho
3. Verifique total com desconto (R$ 99,00 para cada 3 itens)
4. Finalize compra → deve redirecionar para Stripe

### 3. Verificar logs no Render
1. Acesse o dashboard do Render
2. Clique no serviço `futstore-backend`
3. Vá em **Logs**
4. Procure pelos logs:
   - `📥 Payload recebido:` - mostra o payload recebido
   - `🔍 Processando item:` - mostra cada item processado
   - `📦 Line items para Stripe:` - mostra os items enviados ao Stripe
   - `✅ Sessão criada com sucesso:` - confirma criação da sessão

---

## Rollback (se necessário)

Se o deploy falhar:
1. No dashboard do Render, vá em **Events**
2. Clique em **Rollback** na última versão estável
3. Ou faça revert no git e push:
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## Estrutura do Payload Esperado

O backend espera este formato:

```json
{
  "customerEmail": "cliente@email.com",
  "customerName": "Nome do Cliente",
  "total": 99.00,
  "description": "Pedido FutStore - Brasil I (M) x1, Flamengo I (M) x1",
  "lineItems": [
    {
      "price_data": {
        "unit_amount": 9900,
        "currency": "brl",
        "product_data": {
          "name": "Brasil I (M)",
          "description": "Camisa de Futebol - FutStore"
        }
      },
      "quantity": 1
    }
  ]
}
```

---

## Promoção: 3+ itens = R$ 99,00

**Regra de negócio:**
- Cada grupo de 3 itens = R$ 99,00 (preço promocional)
- Itens que não completam grupo de 3 = preço normal (proporcional)

**Exemplos:**
- 3 itens = R$ 99,00
- 4 itens = R$ 99,00 + (1/3 do subtotal dos itens restantes)
- 6 itens = R$ 198,00 (2 grupos de 3)
- 7 itens = R$ 198,00 + (1/3 do subtotal)
