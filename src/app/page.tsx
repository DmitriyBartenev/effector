import ThemeProvider from '@components/Layouts/ThemeProvider';
import Header from '@components/Header/Header';
import Users from '@components/Users/Users';

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <Users />
    </ThemeProvider>
  );
}
