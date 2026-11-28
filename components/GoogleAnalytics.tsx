import Script from "next/script";
import { GA_ID, GTM_ID } from "@/lib/tracking";

/**
 * Loads Google Tag Manager (preferred) or, without a container, GA4 directly.
 *
 * Consent Mode: analytics storage is "denied" unless the visitor previously accepted
 * (saved by CookieBanner in localStorage). The default is set BEFORE the Google tag loads,
 * so no analytics cookies are set without consent. Until then Google only receives
 * cookieless, anonymous pings.
 */
export default function GoogleAnalytics() {
  if (!GTM_ID && !GA_ID) return null;

  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
var c='denied';try{if(localStorage.getItem('ss_cookie_consent')==='granted')c='granted';}catch(e){}
gtag('consent','default',{analytics_storage:c,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`}
      </Script>

      {GTM_ID ? (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var s=document.createElement('script');s.async=true;
s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
document.head.appendChild(s);`}
        </Script>
      ) : (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-config" strategy="afterInteractive">
            {`gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
