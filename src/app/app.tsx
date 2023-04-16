// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import AccrodionList from './components/accrodion-list/accrodion-list';

export function App() {
  return (
    <div className={styles.app}>
      <h1>FactWise Assessment</h1>
      <AccrodionList/>
    </div>
  );
}

export default App;
