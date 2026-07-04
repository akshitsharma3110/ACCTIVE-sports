import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export const metadata = {
  title: 'ACCTIVE Sports Industries — Premium Sportswear Catalogue | Meerut',
  description: 'Explore the complete product catalogue of ACCTIVE Sports Industries, Meerut — premium sportswear manufacturer offering T-Shirts, Shorts, Lowers, and Tracksuits with sublimation prints and quality fabrics.',
  keywords: 'ACCTIVE Sports, Meerut sportswear, sublimation t-shirts, lycra shorts, tracksuits manufacturer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
