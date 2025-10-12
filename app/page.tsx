import css from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <section className={css.heroSection}>
      <div className={css.containerInformation}>
        <h1 className={css.heroTitle}>Campers of your dreams</h1>
        <p className={css.heroText}>You can find everything you want in our catalog</p>
        <Link href={'/catalog'} className={css.btnLink}>
          View Now
        </Link>
      </div>
    </section>
  );
}
