import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kagamitcg.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customer.email,
      success_url: baseUrl + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: baseUrl + '/checkout',
      metadata: {
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_address: customer.address,
        customer_city: customer.city,
        customer_state: customer.state,
        customer_zip: customer.zip,
        customer_country: customer.country,
        customer_email: customer.email,
        order_summary: items
          .map((i) => i.qty + 'x ' + i.name + (i.variant ? ' (' + i.variant + ')' : '') + ' - $' + (i.price * i.qty).toFixed(2))
          .join(' | '),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
