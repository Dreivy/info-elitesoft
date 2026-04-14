require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://dreivy.github.io',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Criar sessão de checkout Stripe
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { customerEmail, customerName, total, description, lineItems } = req.body;

    // Debug: log do payload recebido
    console.log('📥 Payload recebido:', JSON.stringify(req.body, null, 2));

    // Validações básicas
    if (!customerEmail || !customerName || !total || !lineItems || !Array.isArray(lineItems)) {
      return res.status(400).json({
        error: 'Dados incompletos. Envie: customerEmail, customerName, total, lineItems'
      });
    }

    // Construir line_items para o Stripe
    const stripeLineItems = lineItems.map(item => {
      console.log('🔍 Processando item:', JSON.stringify(item, null, 2));
      
      // Validar estrutura do item
      if (!item.price_data) {
        throw new Error('Item sem price_data');
      }

      return {
        price_data: {
          currency: item.price_data.currency || 'brl',
          unit_amount: Math.round(item.price_data.unit_amount),
          product_data: {
            name: item.price_data.product_data?.name || 'Produto',
            description: description || 'Pedido FutStore'
          }
        },
        quantity: item.quantity || 1
      };
    });

    console.log('📦 Line items para Stripe:', JSON.stringify(stripeLineItems, null, 2));

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'https://dreivy.github.io'}/info-elitesoft/?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://dreivy.github.io'}/info-elitesoft/?canceled=true`,
      line_items: stripeLineItems,
      metadata: {
        customerName,
        description: description || '',
        total: String(total)
      }
    });

    console.log('✅ Sessão criada com sucesso:', session.id);

    // Retornar URL da sessão
    res.json({ url: session.url, sessionId: session.id });

  } catch (error) {
    console.error('❌ Erro ao criar sessão Stripe:', error);
    console.error('📋 Detalhes do erro:', {
      message: error.message,
      type: error.type,
      code: error.code,
      param: error.param,
      stack: error.stack
    });
    res.status(500).json({
      error: error.message || 'Erro interno ao criar sessão de pagamento'
    });
  }
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 FutStore Backend rodando na porta ${PORT}`);
});
