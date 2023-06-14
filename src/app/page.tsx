import EmployeeForm from '@components/Forms/EmployeeForm';
import Users from '@components/Users/Users';
import Header from '@components/Header/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <EmployeeForm />
      <Users />
    </main>
  );
}
