import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const { items, customer, paymentMethod, totalText, orderSummary } = data;

    const html = `
      <div style="font-family:sans-serif;padding:24px;">
        <h2 style="color:#e63946;">New Manual Order Received - KAGAMI TCG</h2>
        <p><strong>Payment Method Selected:</strong> ${paymentMethod}</p>
        <hr />
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}, ${customer.country}</p>
        <hr />
        <h3>Order Summary</h3>
        <pre style="background:#f4f4f4;padding:15px;border-radius:5px;">${orderSummary}</pre>
        <p style="font-size:18px;font-weight:700;">Total: ${totalText}</p>
      </div>
    `;

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'KAGAMI TCG Orders <onboarding@resend.dev>',
      to: 'tcgshopkagami1@gmail.com',
      subject: 'New Order (' + paymentMethod + ') - ' + customer.name + ' | KAGAMI TCG',
      html
    });

    if (resendError) {
      console.error('Resend API Error:', resendError);
      return NextResponse.json({ error: resendError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: resendData });
  } catch (error) {
    console.error('Failed to send order email via Resend:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
