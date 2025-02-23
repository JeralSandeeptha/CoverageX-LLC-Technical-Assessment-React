import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import TaskContent from '../../components/task-content/TaskContent';
import './DashboardPage.scss';

const DashboardPage = () => {

  return (
    <>
     <Navbar />
     <Header />
     <TaskContent /> 
    </>
  );

}

export default DashboardPage;