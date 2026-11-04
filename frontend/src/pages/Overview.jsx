import ExpensesSection from '../components/ExpensesSection';
import IncomeSection from '../components/IncomeSection';
import CreateNewCategory from '../components/CreateNewTab';

const Overview = () => {
  return (
    <>
      <h2 className="section-title">Overview</h2>
      <IncomeSection />
      <ExpensesSection />
      <CreateNewCategory />
    </>
  );
};

export default Overview;
