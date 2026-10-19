/**
 * Type and colours of the iHP and Education pages, for the embedded
 * Sustainability and Entrepreneurship pages (passed to IndexedEmbed's
 * injectCss). Headings: Montserrat bold in navy. Text: Outfit, near-black.
 * IndexedEmbed loads both fonts in the embedded page.
 */
export const HP_TYPOGRAPHY_CSS = [
  'h2{font-family:Montserrat,system-ui,sans-serif!important;font-weight:700!important;font-size:26px!important;line-height:1.35!important;color:#09347b!important;letter-spacing:0!important;text-transform:none!important}',
  'h3{font-family:Montserrat,system-ui,sans-serif!important;font-weight:700!important;font-size:21px!important;line-height:1.35!important;color:#09347b!important}',
  'h4{font-family:Montserrat,system-ui,sans-serif!important;font-weight:700!important;color:#09347b!important}',
  'p,li,td,th,dd,dt,figcaption,blockquote{font-family:Outfit,system-ui,sans-serif!important;color:#02122d!important}',
  'p,li{font-size:17px!important;line-height:1.6!important}',
  'td,th{font-size:15.5px!important;line-height:1.45!important}',
  'figcaption{font-size:14.5px!important;color:#3c5a80!important}',
  '@media(max-width:600px){h2{font-size:22px!important}h3{font-size:18px!important}p,li{font-size:16px!important}}',
].join('');
