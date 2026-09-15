const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const checkout = {
  personal: process.env.CHECKOUT_PERSONAL || '',
  pro: process.env.CHECKOUT_PRO || '',
  agencia: process.env.CHECKOUT_AGENCIA || ''
};

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'kit30d-store', ts: new Date().toISOString() });
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nAllow: /\n');
});

app.get('/buy/:plan', (req, res) => {
  const url = checkout[req.params.plan];
  if (!url) return res.redirect('/?checkout=pendiente#precios');
  return res.redirect(302, url);
});

app.get('/', (req, res) => {
  const checkoutReady = Boolean(checkout.personal || checkout.pro || checkout.agencia);
  const notice = req.query.checkout === 'pendiente'
    ? '<div class="notice">El checkout se esta activando. La pagina ya esta en linea; falta conectar el procesador de pago.</div>'
    : '';
  res.type('html').send(`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kit 30D de Ventas por WhatsApp | Respuestas, Seguimientos y Contenido</title>
<meta name="description" content="Kit digital con 100 respuestas de WhatsApp, 30 promociones, 30 dias de contenido, 25 seguimientos y 20 prompts de IA para pequenos negocios.">
<meta name="robots" content="index,follow">
<meta property="og:title" content="Kit 30D de Ventas por WhatsApp">
<meta property="og:description" content="Deja de improvisar tus respuestas. Copia, personaliza y usa un sistema comercial durante 30 dias.">
<style>
:root{--g:#0b6b4f;--g2:#149b72;--ink:#12221c;--muted:#5f6d67;--bg:#f4faf7;--card:#fff;--line:#dcebe5;--yellow:#ffd94a}*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:var(--ink);background:linear-gradient(180deg,#fff,var(--bg));line-height:1.55}a{text-decoration:none;color:inherit}.wrap{max-width:1120px;margin:auto;padding:0 22px}.nav{height:70px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:900;color:var(--g);font-size:20px}.pill{background:#e5f7ef;color:var(--g);padding:8px 12px;border-radius:999px;font-weight:800;font-size:13px}.hero{padding:58px 0 36px;display:grid;grid-template-columns:1.08fr .92fr;gap:42px;align-items:center}.eyebrow{font-size:13px;font-weight:900;letter-spacing:.08em;color:var(--g);text-transform:uppercase}.hero h1{font-size:clamp(42px,6vw,72px);line-height:.98;margin:12px 0 18px;letter-spacing:-.055em}.hero p{font-size:19px;color:var(--muted);max-width:650px}.cta{display:inline-flex;align-items:center;justify-content:center;background:var(--g);color:white;font-weight:900;padding:16px 24px;border-radius:14px;margin-top:12px;box-shadow:0 12px 30px rgba(11,107,79,.20)}.subcta{display:block;margin-top:11px;font-size:13px;color:var(--muted)}.mock{background:linear-gradient(160deg,#064d39,#0f7c5b);border-radius:28px;padding:28px;color:white;box-shadow:0 28px 70px rgba(9,76,56,.22);position:relative;overflow:hidden}.mock:after{content:'30D';position:absolute;right:-10px;bottom:-54px;font-weight:900;font-size:150px;opacity:.06}.mock h2{font-size:37px;line-height:1;margin:0 0 16px}.chat{background:#f7f5f0;color:#15241e;padding:13px 15px;border-radius:13px 13px 13px 3px;margin:12px 0;max-width:90%;font-size:14px}.chat.me{background:#d7f7e5;margin-left:auto;border-radius:13px 13px 3px 13px}.stats{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:34px 0 56px}.stat{background:#fff;border:1px solid var(--line);padding:18px;border-radius:16px;text-align:center}.stat b{display:block;color:var(--g);font-size:26px}.stat span{font-size:12px;color:var(--muted)}section{padding:58px 0}h2.sec{font-size:clamp(30px,4vw,46px);line-height:1.05;letter-spacing:-.035em;margin:0 0 12px}.lead{font-size:18px;color:var(--muted);max-width:760px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:28px}.card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px}.card .n{width:38px;height:38px;border-radius:11px;background:#e7f7f0;color:var(--g);display:grid;place-items:center;font-weight:900}.card h3{margin:16px 0 7px}.card p{color:var(--muted);margin:0}.dark{background:#0c2f25;color:#fff}.dark .lead{color:#c8ddd5}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}.step{border:1px solid rgba(255,255,255,.16);border-radius:16px;padding:20px}.step b{color:#6fe0b7}.pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:30px}.price{background:#fff;border:1px solid var(--line);border-radius:22px;padding:26px;position:relative}.price.featured{border:2px solid var(--g);transform:translateY(-8px);box-shadow:0 18px 45px rgba(11,107,79,.12)}.tag{position:absolute;right:16px;top:16px;background:var(--yellow);font-weight:900;font-size:11px;padding:7px 9px;border-radius:999px}.amount{font-size:42px;font-weight:950;letter-spacing:-.04em;color:var(--g)}.amount small{font-size:14px;color:var(--muted)}ul.clean{list-style:none;padding:0;margin:18px 0}ul.clean li{margin:9px 0;color:var(--muted)}ul.clean li:before{content:'✓';color:var(--g2);font-weight:900;margin-right:8px}.btn{display:block;text-align:center;background:var(--g);color:#fff;font-weight:900;padding:14px;border-radius:12px}.faq{max-width:840px}.faq details{background:#fff;border:1px solid var(--line);border-radius:14px;padding:17px 19px;margin:11px 0}.faq summary{font-weight:850;cursor:pointer}.notice{position:sticky;top:0;z-index:10;background:#fff3c4;color:#5b4600;border-bottom:1px solid #eed36b;text-align:center;padding:10px;font-weight:800;font-size:13px}.footer{padding:40px 0 55px;color:var(--muted);font-size:13px;border-top:1px solid var(--line)}.checkout-status{font-size:12px;color:var(--muted);text-align:center;margin-top:12px}@media(max-width:820px){.hero{grid-template-columns:1fr;padding-top:32px}.stats{grid-template-columns:repeat(2,1fr)}.grid3,.pricing,.steps{grid-template-columns:1fr}.price.featured{transform:none}.nav .pill{display:none}.hero h1{font-size:48px}}
</style>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Kit 30D de Ventas por WhatsApp","description":"Kit digital con respuestas, promociones, seguimientos, calendario de contenido y prompts de IA.","brand":{"@type":"Brand","name":"Kit 30D"},"offers":{"@type":"AggregateOffer","lowPrice":"29","highPrice":"149","priceCurrency":"USD"}}</script>
</head>
<body>${notice}
<div class="wrap"><nav class="nav"><div class="brand">KIT 30D</div><div class="pill">Producto digital · Acceso inmediato al comprar</div></nav>
<div class="hero">
<div><div class="eyebrow">Sistema comercial listo para adaptar</div><h1>Deja de improvisar tus ventas por WhatsApp.</h1><p>Un kit practico para responder mas rapido, dar seguimiento, publicar durante 30 dias y convertir conversaciones en oportunidades de venta.</p><a class="cta" href="#precios">Ver licencias</a><span class="subcta">Pago unico · Producto digital · Sin suscripcion</span></div>
<div class="mock"><div class="pill" style="display:inline-block;background:#effff8">+200 recursos listos</div><h2>Kit 30D de Ventas por WhatsApp</h2><div class="chat">Hola. ¿Cuanto cuesta [PRODUCTO]?</div><div class="chat me">Esta en [PRECIO] e incluye [BENEFICIO]. ¿Quieres que te muestre las opciones disponibles?</div><div class="chat">Si, mandamelas.</div></div>
</div>
<div class="stats"><div class="stat"><b>100</b><span>respuestas</span></div><div class="stat"><b>30</b><span>promociones</span></div><div class="stat"><b>30</b><span>dias de contenido</span></div><div class="stat"><b>25</b><span>seguimientos</span></div><div class="stat"><b>20</b><span>prompts de IA</span></div></div>
</div>
<section><div class="wrap"><h2 class="sec">Todo lo necesario para dejar de escribir desde cero.</h2><p class="lead">Pensado para pequenos negocios, vendedores, community managers y agencias que atienden clientes por mensajeria.</p><div class="grid3"><div class="card"><div class="n">01</div><h3>Responde</h3><p>Primer contacto, precio, objeciones, cierre, urgencia, postventa y clientes frecuentes.</p></div><div class="card"><div class="n">02</div><h3>Da seguimiento</h3><p>Mensajes para 24 horas, 3 dias, una semana y clientes anteriores.</p></div><div class="card"><div class="n">03</div><h3>Publica</h3><p>Calendario de 30 dias y promociones listas para adaptar a tu producto.</p></div></div></div></section>
<section class="dark"><div class="wrap"><h2 class="sec">Un flujo sencillo.</h2><p class="lead">No necesitas aprender un sistema complicado para empezar a usarlo.</p><div class="steps"><div class="step"><b>1</b><h3>Copia</h3><p>Elige la plantilla adecuada.</p></div><div class="step"><b>2</b><h3>Personaliza</h3><p>Cambia producto, precio y beneficio.</p></div><div class="step"><b>3</b><h3>Envia</h3><p>Utilizala en tus conversaciones.</p></div><div class="step"><b>4</b><h3>Mide</h3><p>Conserva lo que mejor funcione.</p></div></div></div></section>
<section id="precios"><div class="wrap"><h2 class="sec">Elige tu licencia.</h2><p class="lead">El contenido es el mismo. Cambian los derechos de uso.</p><div class="pricing">
<div class="price"><h3>Personal</h3><div class="amount">$29 <small>USD</small></div><ul class="clean"><li>1 negocio propio</li><li>Kit digital completo</li><li>Uso permanente</li><li>No permite reventa</li></ul><a class="btn" href="/buy/personal">Comprar Personal</a></div>
<div class="price featured"><span class="tag">MAS ELEGIDA</span><h3>Pro</h3><div class="amount">$79 <small>USD</small></div><ul class="clean"><li>Hasta 3 marcas</li><li>Kit digital completo</li><li>Uso permanente</li><li>Ideal para gestores</li></ul><a class="btn" href="/buy/pro">Comprar Pro</a></div>
<div class="price"><h3>Agencia</h3><div class="amount">$149 <small>USD</small></div><ul class="clean"><li>Hasta 10 clientes</li><li>Uso comercial de los textos adaptados</li><li>Kit digital completo</li><li>No permite revender el PDF original</li></ul><a class="btn" href="/buy/agencia">Comprar Agencia</a></div>
</div><div class="checkout-status">${checkoutReady ? 'Checkout conectado.' : 'La pagina esta lista; el checkout sera activado al conectar el procesador de pago.'}</div></div></section>
<section><div class="wrap faq"><h2 class="sec">Preguntas frecuentes</h2><details><summary>¿Necesito tener un negocio grande?</summary><p>No. El kit esta pensado especialmente para pequenos negocios y personas que venden por mensajeria.</p></details><details><summary>¿Funciona para cualquier giro?</summary><p>Las plantillas usan variables como [PRODUCTO], [PRECIO] y [BENEFICIO], por lo que se adaptan a productos o servicios.</p></details><details><summary>¿Garantiza ventas?</summary><p>No. Es una herramienta de ejecucion comercial. Los resultados dependen de tu oferta, precio, mercado, trafico y seguimiento.</p></details><details><summary>¿Tengo que mostrar mi rostro?</summary><p>No. El contenido puede utilizarse con capturas, producto, pantalla, manos o piezas de texto.</p></details></div></section>
<footer class="footer"><div class="wrap"><b>Kit 30D de Ventas por WhatsApp</b><br>Producto digital. No se prometen resultados financieros especificos.</div></footer>
</body></html>`);
});

app.listen(PORT, '0.0.0.0', () => console.log(`kit30d-store listening on ${PORT}`));
