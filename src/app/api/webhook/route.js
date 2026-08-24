import Stripe from 'stripe';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta = session.metadata || {};

    const orderLines = (meta.order_summary || '').split(' | ').map((line) => '<li>' + line + '</li>').join('');
    const amountPaid = ((session.amount_total || 0) / 100).toFixed(2);

    const html = `
      <div style="font-family:sans-serif;padding:24px;">
        <h2 style="color:#e63946;">New Order - KAGAMI TCG</h2>
        <p><strong>Name:</strong> ${meta.customer_name || 'N/A'}</p>
        <p><strong>Email:</strong> ${meta.customer_email || session.customer_email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${meta.customer_phone || 'N/A'}</p>
        <p><strong>Address:</strong> ${meta.customer_address || ''}, ${meta.customer_city || ''}, ${meta.customer_state || ''} ${meta.customer_zip || ''}, ${meta.customer_country || ''}</p>
        <h3>Items</h3>
        <ul>${orderLines}</ul>
        <p style="font-size:18px;font-weight:700;">Total Paid: $${amountPaid} USD</p>
        <p style="font-size:12px;color:#888;">Session: ${session.id}</p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: 'KAGAMI TCG Orders <onboarding@resend.dev>',
        to: 'tcgshopkagami1@gmail.com',
        subject: 'New Order Paid - ' + (meta.customer_name || 'Customer') + ' | KAGAMI TCG',
        html
      });
    } catch (emailError) {
      console.error('Email failed:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
