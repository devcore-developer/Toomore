"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };

// يشمل /admin وكل الصفحات اللي تحته (/admin/products، /admin/orders، ...)
function isAdminPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export default function ClarityScript() {
  const pathname = usePathname();
  const isAdmin = isAdminPath(pathname);
  const stoppedRef = useRef(false);

  useEffect(() => {
    const clarity =
      typeof window !== "undefined"
        ? (window as Window & { clarity?: ClarityFn }).clarity
        : undefined;
    if (typeof clarity !== "function") return;

    if (isAdmin) {
      // إيقاف التسجيل فورًا — يشمل حالة التنقل من صفحة عامة لأدمن بدون تحميل الصفحة
      clarity("stop");
      stoppedRef.current = true;
    } else if (stoppedRef.current) {
      // استئناف التسجيل عند الرجوع لصفحة عامة بعد ما كان متوقف
      clarity("start");
      stoppedRef.current = false;
    }
  }, [isAdmin]);

  // فتح صفحة أدمن مباشرة: السكربت لا يُحمَّل أصلًا
  if (isAdmin) return null;

  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "zekdff5937");`}
    </Script>
  );
}