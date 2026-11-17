import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import QrGenerator from "./QrGenerator";

export const metadata = {
  title: "Generador de Códigos QR Gratis",
  description:
    "Generador de códigos QR gratis y sin marca de agua: URL, texto, WiFi, vCard, WhatsApp, correo y teléfono. Descarga PNG 1024 px o SVG. Sin registro.",
  keywords: [
    "generador de códigos qr",
    "crear código qr gratis",
    "generador qr wifi",
    "código qr whatsapp",
    "código qr vcard",
    "qr sin marca de agua",
  ],
  alternates: {
    canonical: "https://frinjo.me/es/generador-de-codigos-qr",
    languages: {
      es: "https://frinjo.me/es/generador-de-codigos-qr",
      fr: "https://frinjo.me/fr/generateur-de-qr-code",
      en: "https://frinjo.me/qr-code-generator",
      "x-default": "https://frinjo.me/qr-code-generator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Generador de Códigos QR Gratis — PNG y SVG, Sin Marca de Agua | Frinjo",
    description:
      "Crea QR para URL, WiFi, vCard, WhatsApp, correo y teléfono. Descarga PNG 1024 px o SVG vectorial. Gratis, sin registro, 100% en tu navegador.",
    url: "https://frinjo.me/es/generador-de-codigos-qr",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Generador de Códigos QR",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/es/generador-de-codigos-qr",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Generador de códigos QR gratuito que funciona por completo en el navegador (biblioteca qrcode, generación local, sin servidor). Tipos: URL (añade https:// si falta), texto libre, WiFi en formato WIFI:T:WPA;S:ssid;P:contraseña;; del estándar de zxing (con seguridad WPA/WEP/red abierta y red oculta), tarjeta de contacto vCard 3.0, enlace de WhatsApp wa.me con mensaje prellenado, correo mailto con asunto y cuerpo, y llamada tel:. Personalización de color del código y del fondo, vista previa instantánea y descarga en PNG de 1024 px o SVG vectorial, sin marca de agua, sin registro y sin caducidad: el QR es estático y codifica directamente el contenido.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Herramientas", item: "https://frinjo.me/es" },
    { "@type": "ListItem", position: 3, name: "Generador de Códigos QR", item: "https://frinjo.me/es/generador-de-codigos-qr" },
  ],
};

const FAQS: [string, string][] = [
  [
    "¿El código QR caduca?",
    "No. Este generador crea códigos ESTÁTICOS: el contenido (tu URL, tu red WiFi, tu contacto) va codificado directamente en los cuadros del QR, sin servidores intermedios ni redirecciones. Mientras el contenido siga siendo válido —tu web en línea, tu contraseña WiFi sin cambiar—, el código funcionará para siempre. Los QR que caducan son los «dinámicos» de los servicios de suscripción, que pasan por su servidor y se apagan si dejas de pagar.",
  ],
  [
    "¿Puedo usar el QR para mi negocio (menús, tarjetas, escaparates)?",
    "Sí, sin restricciones y sin marca de agua. Usos típicos: el menú de un restaurante (QR a la URL de tu carta), la tarjeta de presentación (vCard que se guarda como contacto al escanear), el WiFi de un local (sin dictar contraseñas), el escaparate (QR a WhatsApp para consultas) y envíos o facturas (QR a la página del pedido). Descarga el SVG si lo vas a imprimir grande o enviar a una imprenta: es vectorial y no pierde calidad.",
  ],
  [
    "¿Qué tamaño y formato debo descargar para imprimir?",
    "Para tarjetas y folletos pequeños basta el PNG de 1024 px. Para carteles, vinilos o imprenta profesional, descarga el SVG: se escala a cualquier tamaño sin pixelarse. Al imprimir, deja siempre un margen blanco alrededor del código (la «zona silenciosa») y prueba el escaneo con el material final antes de imprimir en cantidad: el papel brillante y los colores de fondo oscuros son las dos causas clásicas de fallo.",
  ],
  [
    "¿Por qué mi QR no se escanea?",
    "Tres causas principales: (1) poco contraste —código claro sobre fondo oscuro o colores parecidos—; este generador avisa, pero la regla es código oscuro sobre fondo claro; (2) contenido demasiado largo, que produce un QR muy denso difícil de leer en impresiones pequeñas — acorta la URL si puedes; (3) tamaño impreso demasiado pequeño: un QR con mucho contenido necesita al menos 3–4 cm por lado. Prueba siempre con dos teléfonos distintos antes de publicar.",
  ],
  [
    "¿Cómo escaneo un código QR con mi teléfono?",
    "En casi todos los teléfonos actuales no necesitas ninguna app: abre la cámara, apunta al código durante un segundo y toca el enlace que aparece en pantalla. En iPhone funciona desde iOS 11 y en Android desde la app de cámara de la mayoría de fabricantes; si la tuya no lo reconoce, usa Google Lens (en la app de Google o en Chrome) o el escáner de Ajustes rápidos. Nunca instales un lector de QR de pago: los que piden suscripción para escanear son innecesarios.",
  ],
  [
    "¿Puedo poner mi logotipo en el centro del código?",
    "Sí, con cuidado. Un QR admite que se tape hasta un ~30% de su superficie si se generó con el nivel de corrección de errores más alto (H), y los logotipos comerciales se colocan justo en ese margen. Este generador no inserta logotipos, pero puedes descargar el SVG y añadir el tuyo en cualquier editor gráfico: mantén el logo pequeño (menos de un tercio del código), conserva el margen blanco exterior y prueba el escaneo con varios teléfonos antes de imprimir. Si el logo tapa las esquinas de posicionamiento (los tres cuadrados grandes), el código dejará de leerse.",
  ],
  [
    "¿Qué datos míos se guardan al crear un QR?",
    "Ninguno. La generación ocurre 100% en tu navegador con una biblioteca local: el contenido (incluida tu contraseña WiFi o tu teléfono) nunca se envía a un servidor ni queda registrado. Puedes comprobarlo desconectando internet: el generador sigue funcionando.",
  ],
  [
    "¿Cómo funciona el QR de WiFi exactamente?",
    "Codifica el formato estándar que entienden Android e iOS: WIFI:T:WPA;S:nombre-de-red;P:contraseña;H:false;; Al escanearlo, el teléfono ofrece unirse a la red sin teclear nada. Si tu red es abierta, elige «Sin contraseña». Ojo: quien escanee el código puede ver la contraseña en el contenido, así que úsalo solo donde ya darías la clave (tu local, tu oficina, tu casa).",
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

export default function GeneradorQrPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Gratis · Sin marca de agua · Sin caducidad
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Generador de <span className="text-gold-gradient">Códigos QR</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            URL, WiFi, contacto, WhatsApp — en PNG o SVG
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Siete tipos de código en una sola página, con colores personalizables y descarga en{" "}
            <strong>PNG de 1024 px o SVG vectorial</strong>. Sin registro, sin marca de agua y sin que tus
            datos salgan de tu navegador.
          </p>
        </div>
      </section>

      <QrGenerator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="Cómo funciona"
            title="Los tipos que un negocio usa de verdad"
            sub="Cada tipo codifica el formato estándar que los teléfonos ya entienden: al escanear, la acción ocurre sola."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">WiFi</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Tus clientes se conectan sin pedir la clave</h3>
              <p className="text-stone-600 leading-relaxed">
                El QR guarda red y contraseña en el formato estándar: al escanearlo, el teléfono ofrece
                unirse. Ideal para cafeterías, consultorios, Airbnb y oficinas.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">vCard</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Tu tarjeta que se guarda como contacto</h3>
              <p className="text-stone-600 leading-relaxed">
                Nombre, empresa, teléfono, correo y web en formato vCard 3.0: quien lo escanea te agrega a
                su agenda con un toque, sin teclear y sin papel que perder.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">WhatsApp</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Del escaparate directo a tu chat</h3>
              <p className="text-stone-600 leading-relaxed">
                Enlace wa.me con tu número y un mensaje ya escrito («Hola, quiero información sobre…»): el
                cliente solo pulsa enviar. El QR favorito de los negocios locales.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">URL y texto</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Menús, reseñas, cupones, direcciones</h3>
              <p className="text-stone-600 leading-relaxed">
                Cualquier enlace o texto libre: la carta de tu restaurante, tu página de reseñas de Google,
                un cupón o la dirección de tu local. Corto es mejor: menos contenido = QR más fácil de escanear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-orange-50 dot-grid border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead
            eyebrow="Lo esencial"
            title="¿Qué es un código QR y cómo se crea uno que funcione?"
            sub="Inventado en 1994 por Denso Wave para rastrear piezas de coche en las fábricas de Toyota; hoy cabe en él desde un enlace hasta 2,953 bytes de datos."
          />
          <div className="-mt-4 space-y-5 text-stone-600 leading-relaxed text-left">
            <p>
              Un código QR (Quick Response) es un código de barras bidimensional: guarda la información en
              una cuadrícula de módulos blancos y negros y la lee cualquier cámara en menos de un segundo.
              Existen 40 «versiones» (tamaños) y cuatro niveles de corrección de errores que permiten
              reconstruir el contenido aunque parte del código esté dañado o tapado.
            </p>
            <p>
              <strong className="text-stone-900">Crear el tuyo lleva cuatro pasos:</strong> (1) elige el tipo
              —URL, WiFi, vCard, WhatsApp, correo, teléfono o texto—; (2) escribe el contenido, cuanto más
              corto mejor; (3) ajusta los colores manteniendo el código oscuro sobre fondo claro; (4)
              descarga en PNG para pantallas y papel pequeño, o en SVG para imprimir en grande. Después,
              escanéalo tú mismo con dos teléfonos antes de darlo por bueno.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 mt-8 text-left">
            <div>
              <p className="font-bold text-stone-900 mb-2">Corrección de errores: cuánto daño aguanta</p>
              <table className="w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden bg-white">
                <thead>
                  <tr className="bg-orange-100/60 text-stone-900">
                    <th className="px-4 py-2.5 font-bold">Nivel</th>
                    <th className="px-4 py-2.5 font-bold">Recupera hasta</th>
                    <th className="px-4 py-2.5 font-bold">Uso típico</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">L</td>
                    <td className="px-4 py-2.5">≈7% del código</td>
                    <td className="px-4 py-2.5">Pantallas, QR cortos</td>
                  </tr>
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">M</td>
                    <td className="px-4 py-2.5">≈15%</td>
                    <td className="px-4 py-2.5">Uso general</td>
                  </tr>
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">Q</td>
                    <td className="px-4 py-2.5">≈25%</td>
                    <td className="px-4 py-2.5">Exterior, desgaste</td>
                  </tr>
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">H</td>
                    <td className="px-4 py-2.5">≈30%</td>
                    <td className="px-4 py-2.5">Con logotipo central</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-stone-600 mt-2">Más corrección = código más denso. Para un enlace corto, el nivel medio basta y se escanea más fácil.</p>
            </div>
            <div>
              <p className="font-bold text-stone-900 mb-2">QR estático vs dinámico</p>
              <table className="w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden bg-white">
                <thead>
                  <tr className="bg-orange-100/60 text-stone-900">
                    <th className="px-4 py-2.5 font-bold"></th>
                    <th className="px-4 py-2.5 font-bold">Estático (este)</th>
                    <th className="px-4 py-2.5 font-bold">Dinámico</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">Contenido</td>
                    <td className="px-4 py-2.5">Fijo en el código</td>
                    <td className="px-4 py-2.5">Editable tras imprimir</td>
                  </tr>
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">Caducidad</td>
                    <td className="px-4 py-2.5">Nunca</td>
                    <td className="px-4 py-2.5">Si dejas de pagar</td>
                  </tr>
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">Coste</td>
                    <td className="px-4 py-2.5">Gratis</td>
                    <td className="px-4 py-2.5">Suscripción mensual</td>
                  </tr>
                  <tr className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">Estadísticas</td>
                    <td className="px-4 py-2.5">No</td>
                    <td className="px-4 py-2.5">Sí, de escaneos</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-stone-600 mt-2">El dinámico solo compensa si necesitas cambiar el destino sin reimprimir o medir escaneos; para menús, tarjetas y WiFi, el estático es el de siempre.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Herramientas en español y en francés
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            ¿Necesitas el QR en francés, con pago SEPA?
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            La versión francesa añade el <strong className="text-white">QR de virement SEPA</strong>: tus
            clientes escanean y su banco abre un pago ya rellenado con tu IBAN. Y para tus datos de
            prueba, el <strong className="text-white">generador de identidad falsa</strong> crea perfiles
            completos en español.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            <Link href="/fr/generateur-de-qr-code" className="font-semibold text-orange-400 hover:text-orange-300">
              Générateur de QR code (FR)
            </Link>{" "}
            ·{" "}
            <Link href="/es/generador-de-identidad-falsa" className="font-semibold text-orange-400 hover:text-orange-300">
              Generador de identidad falsa
            </Link>{" "}
            ·{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              Todas las herramientas
            </Link>
          </p>
        </div>
      </section>

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

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas sobre códigos QR, resueltas" />
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
              Crear mi código QR <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
