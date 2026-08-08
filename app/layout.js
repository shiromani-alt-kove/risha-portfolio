import './globals.css';

export const metadata = {
  title: { default: 'Risha Singh — Web Designer', template: '%s | Risha Singh' },
  description: 'Risha Singh is a web designer creating premium, conversion-focused websites, landing pages and digital experiences for modern businesses.',
  metadataBase: new URL('https://rishasingh.com'),
  openGraph: {
    title: 'Risha Singh — Web Designer',
    description: 'I design websites that turn visitors into customers.',
    type: 'website',
  },
  robots: { index: true, follow: true },
  other: { 'theme-color': '#080a0f' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
