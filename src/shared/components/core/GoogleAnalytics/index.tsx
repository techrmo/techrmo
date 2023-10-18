import Script from 'next/script';

import { publicEnvs } from '@/shared/config/envs';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${publicEnvs.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', "${publicEnvs.NEXT_PUBLIC_GOOGLE_ANALYTICS}");
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
