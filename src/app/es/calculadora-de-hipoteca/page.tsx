import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import HipotecaCalculator from "./HipotecaCalculator";

export const metadata = {
  title: "Calculadora de Hipoteca 2026 — Cuota €/$",
  description:
    "Calculadora de hipoteca gratis: cuota mensual en euros o dólares, intereses totales y tabla de amortización anual. España y EE. UU./Latinoamérica.",
  keywords: [
    "calculadora de hipoteca",
    "simulador de hipoteca",
    "calcular cuota de hipoteca",
    "cuota mensual hipoteca",
    "tabla de amortización",
    "calculadora de hipoteca EE. UU.",
    "cuánto pago de hipoteca",
  ],
  alternates: {
    canonical: "https://frinjo.me/es/calculadora-de-hipoteca",
    languages: {
      es: "https://frinjo.me/es/calculadora-de-hipoteca",
      "x-default": "https://frinjo.me/es/calculadora-de-hipoteca",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Calculadora de Hipoteca 2026 — Cuota Mensual en € y $ | Frinjo",
    description:
      "Tu cuota mensual en España o en EE. UU./Latinoamérica, con intereses totales y tabla de amortización año a año. Gratis y sin registro.",
    url: "https://frinjo.me/es/calculadora-de-hipoteca",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Hipoteca",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/es/calculadora-de-hipoteca",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Calculadora de hipoteca gratuita con sistema de amortización francés (cuota fija) para España en euros y para EE. UU. y Latinoamérica en dólares. Metodología: cuota mensual M = P × r(1+r)^n ÷ ((1+r)^n − 1), donde P es el capital prestado (precio menos entrada), r es el tipo de interés anual dividido entre 12 y n es el plazo en meses; si el tipo es 0%, la cuota es P ÷ n. Devuelve la cuota mensual, los intereses totales, el coste total del préstamo y la tabla de amortización anual. El modo EE. UU. suma al pago mensual el impuesto predial anual, el seguro de hogar y la cuota HOA. Todo el cálculo se realiza en el navegador del visitante.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Herramientas", item: "https://frinjo.me/es" },
    { "@type": "ListItem", position: 3, name: "Calculadora de Hipoteca", item: "https://frinjo.me/es/calculadora-de-hipoteca" },
  ],
};

const FAQS: [string, string][] = [
  [
    "¿Cómo se calcula la cuota mensual de una hipoteca?",
    "Con el sistema francés, el que usan España y casi toda Latinoamérica: cuota M = P × r(1+r)^n ÷ ((1+r)^n − 1), donde P es el dinero prestado, r es el interés mensual (tipo anual ÷ 12) y n es el número de meses. Ejemplo: 180,000 € al 3.5% a 30 años dan una cuota de unos 808 € al mes. La cuota es fija; lo que cambia cada mes es el reparto interno entre intereses y capital.",
  ],
  [
    "¿Qué es la amortización y por qué al principio pago casi todo intereses?",
    "Amortizar es devolver el capital. En el sistema francés la cuota es constante, pero el interés de cada mes se calcula sobre el saldo pendiente: al principio el saldo es máximo y la mayor parte de la cuota es interés; con los años el saldo baja y cada vez amortizas más capital con la misma cuota. Por eso la tabla de amortización anual muestra intereses decrecientes y capital creciente, y por eso los pagos anticipados ahorran mucho más si se hacen en los primeros años.",
  ],
  [
    "¿Cuánto necesito de entrada para comprar una vivienda?",
    "En España los bancos suelen financiar hasta el 80% del valor de tasación o compra, así que la entrada típica es el 20%, más un 10% aproximado de gastos e impuestos que también sale de tu bolsillo. En EE. UU. se puede entrar con el 3–3.5% en préstamos FHA o convencionales con poco enganche, pero con menos del 20% normalmente pagarás seguro hipotecario (PMI) además de la cuota. En Latinoamérica lo habitual está entre el 10% y el 30% según el país y el banco.",
  ],
  [
    "¿Es mejor un interés fijo o variable?",
    "El fijo paga lo mismo durante todo el préstamo: cuesta algo más al principio, pero elimina el riesgo de subidas. El variable (en España, Euríbor más un diferencial) arranca más barato, pero tu cuota se revisa cada 6–12 meses y puede subir con el Euríbor. La elección depende de tu tolerancia al riesgo y de cuánto tiempo piensas quedarte la vivienda; esta calculadora trabaja con un tipo fijo constante, así que con una hipoteca variable los resultados son una estimación al tipo actual.",
  ],
  [
    "¿Por qué en EE. UU. el pago mensual incluye impuestos y seguros?",
    "Porque en EE. UU. el banco suele recaudarlos dentro de la cuota (cuenta escrow): cada mes pagas capital e intereses más 1/12 del impuesto predial anual y 1/12 del seguro de hogar, y si el edificio tiene asociación, la cuota HOA se suma aparte. Por eso dos hipotecas con el mismo capital y tipo pueden tener pagos mensuales muy distintos según la zona. El modo EE. UU. y Latinoamérica de esta calculadora desglosa cada parte.",
  ],
  [
    "¿Qué es la TAE y en qué se diferencia del TIN?",
    "El TIN es solo el tipo de interés nominal: lo que el banco cobra por prestarte el dinero. La TAE (tasa anual equivalente) suma al TIN las comisiones y gastos obligatorios del préstamo — apertura, tasación si la impone el banco, seguros vinculados — y por eso es la cifra que permite comparar ofertas de bancos distintos. Una hipoteca con un TIN más bajo puede salir más cara si su TAE es mayor por las vinculaciones. Esta calculadora trabaja con el TIN; pide siempre la TAE (viene en la FiAE/FIPER que el banco debe entregarte) antes de comparar.",
  ],
  [
    "Si amortizo anticipadamente, ¿reduzco cuota o plazo?",
    "Reducir plazo ahorra muchos más intereses, porque el saldo baja antes y cada cuota lleva menos interés; reducir cuota mantiene el plazo y solo alivia el pago mensual. En España, la Ley 5/2019 limita la comisión por amortización anticipada en hipotecas fijas al 2% del capital reembolsado durante los primeros 10 años y al 1.5% después; en variables, al 0.25% los 3 primeros años o al 0.15% los 5 primeros, según lo pactado. Amortizar en los primeros años rinde más: es cuando el saldo — y por tanto el interés de cada cuota — es mayor.",
  ],
  [
    "¿Cuánto de mis ingresos debería ir a la cuota?",
    "La regla práctica que usan los bancos españoles es que la cuota, sumada a tus otras deudas, no supere el 30–35% de tus ingresos netos mensuales. Con 2,000 € netos al mes, la cuota prudente ronda los 600–700 €; por encima de eso, cualquier imprevisto (una avería, un mes sin ingresos) pone el presupuesto en tensión. Antes de enamorarte de una vivienda, divide tu sueldo neto entre tres: esa es, aproximadamente, la cuota máxima que deberías simular aquí.",
  ],
  [
    "¿La calculadora es gratis? ¿Se guardan mis datos?",
    "Sí, es gratis y sin registro. Las cifras de tu vivienda y tu préstamo se procesan solo en tu navegador: no se envían a ningún servidor ni quedan guardadas. Los resultados son una simulación informativa, no una oferta vinculante de ningún banco.",
  ],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const card =
  "rounded-3xl border border-stone-200 bg-white p-8 hover:shadow-xl hover:border-orange-200 transition";

export default function CalculadoraHipotecaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Gratis · Sin registro · España + EE. UU.
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Calculadora de <span className="text-gold-gradient">Hipoteca</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Tu cuota mensual en euros o en dólares, sin letra pequeña
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Precio, entrada, interés y plazo: eso es todo. Obtén la cuota, los intereses totales y la{" "}
            <strong>tabla de amortización año a año</strong>. Y si compras en EE. UU., añade impuestos,
            seguro y HOA para ver el pago mensual real, no solo el del préstamo.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <HipotecaCalculator />

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="Cómo funciona"
            title="La fórmula de la cuota, explicada"
            sub="Casi todas las hipotecas de España y Latinoamérica usan el sistema francés: cuota fija, interés decreciente, capital creciente."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">La fórmula</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">M = P × r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)</h3>
              <p className="text-stone-600 leading-relaxed">
                P es el capital prestado (precio menos entrada), r es el tipo mensual (el anual dividido
                entre 12) y n es el número de meses. Con un interés del 0% la fórmula se reduce a dividir
                el capital entre los meses — la calculadora cubre también ese caso.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">La entrada</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Cada euro de entrada es un euro que no paga intereses</h3>
              <p className="text-stone-600 leading-relaxed">
                Subir la entrada del 10% al 20% en una vivienda de 200,000 € reduce el préstamo en 20,000 €
                y ahorra miles en intereses durante 30 años. En EE. UU., además, llegar al 20% elimina el
                seguro hipotecario privado (PMI).
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">El plazo</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Plazo largo: cuota cómoda, interés caro</h3>
              <p className="text-stone-600 leading-relaxed">
                Pasar de 20 a 30 años baja la cuota mensual de forma notable, pero el total de intereses
                puede casi duplicarse. Compara en la calculadora: la cifra que manda no es la cuota, es el
                coste total del préstamo.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">EE. UU.: el pago real</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Impuestos + seguro + HOA van dentro del mes</h3>
              <p className="text-stone-600 leading-relaxed">
                El impuesto predial varía muchísimo por estado y condado (de ~0.3% a más del 2% anual del
                valor) y el seguro de hogar se paga por mensualidades vía escrow. Por eso el modo EE. UU.
                desglosa el pago total en sus cuatro partes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKED EXAMPLE */}
      <section className="py-16 sm:py-20 bg-orange-50 dot-grid border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead
            eyebrow="Ejemplo completo"
            title="Comprar una vivienda de 240,000 €, con todos los gastos"
            sub="La cuota es solo una parte: esto es el dinero que necesitas el día de la firma y lo que pagas en total."
          />
          <div className="-mt-4 space-y-5 text-stone-600 leading-relaxed text-left">
            <p>
              Vivienda de segunda mano en Madrid por <strong className="text-stone-900">240,000 €</strong>, con
              entrada del 20% (<strong className="text-stone-900">48,000 €</strong>) y un préstamo de{" "}
              <strong className="text-stone-900">192,000 € al 3.5% a 30 años</strong>. La cuota sale a{" "}
              <strong className="text-stone-900">862 € al mes</strong> y los intereses totales a unos{" "}
              <strong className="text-stone-900">118,400 €</strong> en los 30 años.
            </p>
            <p>
              Pero el día de la firma también pagas los gastos de compra: el ITP de Madrid (6%) son{" "}
              <strong className="text-stone-900">14,400 €</strong> — en otras comunidades va del 4% al 11% —,
              más notaría, registro y gestoría (unos 2,500 €) y la tasación (unos 400 €). Total de gastos:{" "}
              <strong className="text-stone-900">≈17,300 €</strong>. El ahorro que necesitas antes de comprar
              no es la entrada sola: es entrada + gastos,{" "}
              <strong className="text-stone-900">≈65,300 €</strong> en este ejemplo. En vivienda nueva el ITP se
              sustituye por IVA del 10% más actos jurídicos documentados.
            </p>
          </div>
          <h3 className="font-display text-2xl font-bold text-stone-900 mt-10 mb-4 text-left">
            Cuota por cada 100,000 € prestados al 3.5%
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border border-stone-200 rounded-2xl overflow-hidden bg-white">
              <thead>
                <tr className="bg-orange-100/60 text-stone-900">
                  <th className="px-4 py-3 font-bold">Plazo</th>
                  <th className="px-4 py-3 font-bold">Cuota mensual</th>
                  <th className="px-4 py-3 font-bold">Intereses totales</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">15 años</td>
                  <td className="px-4 py-3">714.86 €</td>
                  <td className="px-4 py-3">28,700 €</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">20 años</td>
                  <td className="px-4 py-3">579.91 €</td>
                  <td className="px-4 py-3">39,200 €</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">25 años</td>
                  <td className="px-4 py-3">500.62 €</td>
                  <td className="px-4 py-3">50,200 €</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">30 años</td>
                  <td className="px-4 py-3">449.04 €</td>
                  <td className="px-4 py-3">61,700 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-stone-600 leading-relaxed mt-6 text-left">
            Alargar el plazo de 15 a 30 años recorta la cuota un 37%, pero más que duplica los intereses.
            Si la cuota a 20 años te cabe en el presupuesto (la regla del 35% de tus ingresos netos), ese
            plazo suele ser el equilibrio entre pagar cómodo y no regalar intereses.
          </p>
        </div>
      </section>

      {/* MORE TOOLS */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Herramientas en español
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            La hipoteca es la mitad de la foto; el IVA es la otra
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            Si la vivienda es para vivir y trabajar, tus facturas importan tanto como tu cuota: la{" "}
            <strong className="text-white">calculadora de IVA</strong> cubre España, México y toda
            Latinoamérica con facturas multilínea, retenciones y total en letra. Y para tus pruebas y
            registros, el <strong className="text-white">generador de identidad falsa</strong> crea
            perfiles completos en español sin límite diario. Y si el gasto no es una casa sino un
            crédito personal, la <strong className="text-white">calculadora de préstamos</strong> te
            da la cuota mensual y los intereses totales de cualquier préstamo antes de firmar.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            <Link href="/es/calculadora-de-iva" className="font-semibold text-orange-400 hover:text-orange-300">
              Calculadora de IVA
            </Link>{" "}
            ·{" "}
            <Link href="/es/generador-de-identidad-falsa" className="font-semibold text-orange-400 hover:text-orange-300">
              Generador de identidad falsa
            </Link>{" "}
            ·{" "}
            <Link href="/es/calculadora-de-prestamos" className="font-semibold text-orange-400 hover:text-orange-300">
              Calculadora de préstamos
            </Link>{" "}
            ·{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              Todas las herramientas
            </Link>
          </p>
        </div>
      </section>

      {/* SERVICES CTA */}
      <section className="py-16 sm:py-20 bg-orange-50 dot-grid">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHead
            eyebrow="Hecho para ti"
            title="¿Quieres una herramienta como esta en tu propia web?"
            sub="WebStore Pro crea sitios rápidos de Desarrollo Web Full Stack y calculadoras a medida que posicionan: diseñadas, programadas y listas para SEO desde el primer día."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={btnPrimary}>
              Pide tu presupuesto gratis <Icon name="arrow" className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/923258774221" target="_blank" rel="noopener noreferrer" className={btnOutline}>
              WhatsApp +92 325 8774221
            </a>
          </div>
          <p className="mt-5 text-sm text-stone-500">
            ¿Prefieres correo? <a href="mailto:neilsonsmarry@gmail.com" className="font-semibold text-orange-700 hover:text-orange-800">neilsonsmarry@gmail.com</a>
            {" "}· O revisa nuestros <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">servicios</Link> y <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">herramientas gratuitas</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas de hipoteca, resueltas" />
          <div className="space-y-3">
            {FAQS.map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-stone-200 bg-stone-50/60 open:bg-white open:shadow-md transition group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-bold text-stone-900 [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 grid place-items-center group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-6 text-stone-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#top" className={btnPrimary}>
              Calcular mi cuota <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Simulación informativa con un tipo fijo constante; no es una oferta vinculante. Las
            condiciones reales dependen del banco, tu perfil y, en hipotecas variables, de la evolución
            del índice de referencia.
          </p>
        </div>
      </section>
    </>
  );
}
