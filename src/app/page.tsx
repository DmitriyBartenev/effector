import EmployeeForm from '@components/Forms/EmployeeForm';
import Users from '@components/Users/Users';
import Header from '@components/Header/Header';
import ThemeProvider from '@components/Layouts/ThemeProvider';

export default function Home() {
  return (
    <main>
      <ThemeProvider>
        <Header />
        <EmployeeForm />
        <Users />
      </ThemeProvider>
    </main>
  );
}
