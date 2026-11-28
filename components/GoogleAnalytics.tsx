import Script from "next/script";

/**
 * Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_ID is set (e.g. "G-XXXXXXXXXX").
 *
 * Consent Mode: analytics storage is "denied" unless the visitor previously accepted
 * (saved by CookieBanner in localStorage), so no analytics cookies are set without consent.
 * Until then GA only receives cookieless, anonymous pings.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
var c='denied';try{if(localStorage.getItem('ss_cookie_consent')==='granted')c='granted';}catch(e){}
gtag('consent','default',{analytics_storage:c,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-config" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
