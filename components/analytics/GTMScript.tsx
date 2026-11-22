'use client';

/**
 * Google Tag Manager - تحميل آمن وشرطي
 * - لا يُحمَّل أبداً بدون NEXT_PUBLIC_GTM_ID صالح (GTM-XXXXXXX)
 * - مستثنى بالكامل من /admin و /admin/*
 * - تحميل واحد فقط لكل تحميل صفحة (next/script يمنع التكرار بنفس الـ id)
 * - لا يرسل أي PII ولا يولّد أحداث وهمية ولا يلمس Clarity أو cookie consent
 */

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// نقبل فقط IDs بصيغة GTM-XXXXXXX — قيمة ناقصة أو placeholder = لا تحميل خالص
const GTM_READY =
  typeof GTM_ID === 'string' && /^GTM-[A-Za-z0-9]+$/.test(GTM_ID);

export default function GTMScript() {
  const pathname = usePathname() || '/';

  // 1) بدون ID صالح -> لا شيء يُحمَّل نهائياً
  if (!GTM_READY) return null;

  // 2) صفحات الأدمن (وأي صفحة فرعية /admin/...) -> GTM ممنوع
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <>
      {/* سكربت التشغيل الرسمي لـ GTM */}
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      {/* noscript fallback للمتصفحات المعطِّلة للجافاسكربت */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="gtm"
        />
      </noscript>
    </>
  );
}