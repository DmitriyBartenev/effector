import EmployeeForm from '@components/Forms/EmployeeForm';
import Users from '@components/Users/Users';
import Header from '@components/Header/Header';
import ThemeLayout from '@components/Layouts/ThemeLayout';

export default function Home() {
  return (
    <main>
      <ThemeLayout>
        <Header />
        <EmployeeForm />
        <Users />
      </ThemeLayout>
    </main>
  );
}
