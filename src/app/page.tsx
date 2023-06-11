import { DarkThemeIcon } from '@icons/DarkThemeIcon';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <div className={styles.darkTheme}>
        <DarkThemeIcon />
      </div>
      <div>
        <p>Load</p>
      </div>
    </main>
  );
}
