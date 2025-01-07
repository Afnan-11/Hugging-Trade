import Provider from "@/app/provider";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import {Analytics} from "@vercel/analytics/react";
import {GeistSans} from "geist/font/sans";
import type {Metadata} from "next";
import "./globals.css";

import {Inter} from "next/font/google";
import Script from "next/script";
import {routing} from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Hugging Trade",
  description: "Simple pricing, unbeatable returns.",
  openGraph: {
    images: [
      {
        url: "https://www.huggingtrade.com/opengraph-image.jpg",
        width: 1200,
        height: 628,
      },
    ],
  },
  metadataBase: new URL("https://www.huggingtrade.com"),
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}) {
  const locale = params.locale || "en";
  return (
    <AuthWrapper>
      <html
        lang={locale}
        suppressHydrationWarning
      >
        <head>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      (function(w:any, d:any, s:any, l:any, i:any) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-MWQ5D3J4');
    `,
            }}
          />

          <link
            rel="preload"
            href="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
            as="image"
          />
          <link
            rel="preload"
            href="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
            as="image"
          />
          <script
            async
            src="https://cdn.tolt.io/tolt.js"
            data-tolt="d4e918c1-0e8c-49fb-a33a-d22c73ee5f95"
          ></script>

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                !function(e,t,n){
                  function a() {
                    var e = t.getElementsByTagName("script")[0], 
                    n = t.createElement("script");
                    n.type = "text/javascript", 
                    n.async = !0, 
                    n.src = "https://beacon-v2.helpscout.net", 
                    e.parentNode.insertBefore(n, e);
                  }
                  if(e.Beacon = n = function(t,n,a){
                    e.Beacon.readyQueue.push({ method: t, options: n, data: a });
                  }, n.readyQueue = [], "complete" === t.readyState) return a();
                  e.attachEvent ? e.attachEvent("onload", a) : e.addEventListener("load", a, !1);
                }(window, document, window.Beacon || function(){ });
              `,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `window.Beacon('init', 'e0166fdc-5c3a-47b1-a61a-4d830b5a8348')`,
            }}
          />

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TTJRN2PBT2"
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TTJRN2PBT2');
              `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function () {
                  var reb2b = window.reb2b = window.reb2b || [];
                  if (reb2b.invoked) return;
                  reb2b.invoked = true;
                  reb2b.methods = ["identify", "collect"];
                  reb2b.factory = function (method) {
                    return function () {
                      var args = Array.prototype.slice.call(arguments);
                      args.unshift(method);
                      reb2b.push(args);
                      return reb2b;
                    };
                  };
                  for (var i = 0; i < reb2b.methods.length; i++) {
                    var key = reb2b.methods[i];
                    reb2b[key] = reb2b.factory(key);
                  }
                  reb2b.load = function (key) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.async = true;
                    script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
                    var first = document.getElementsByTagName("script")[0];
                    first.parentNode.insertBefore(script, first);
                  };
                  reb2b.SNIPPET_VERSION = "1.0.1";
                  reb2b.load("GNLKQHEQMW6Q");
                }();
              `,
            }}
          />
        </head>
        <body className={GeistSans.className}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MWQ5D3J4"
              height="0"
              width="0"
              style={{display: "none", visibility: "hidden"}}
            ></iframe>
          </noscript>
          <Script
            id="front-chat"
            strategy="afterInteractive"
          />
          <Script
            id="frontchat-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      (function() {
        var script = document.createElement('script');
        script.src = 'https://chat-assets.frontapp.com/v1/chat.bundle.js';
        script.async = true;
        script.onload = function() {
          if (window.FrontChat) {
            window.FrontChat('init', {
              chatId: 'ffb4d0f4c8d69025781c1dfdc534b01c',
              useDefaultLauncher: true,
            });
          }
        };
        document.head.appendChild(script);
      })();
    `,
            }}
          />

          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              // enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
