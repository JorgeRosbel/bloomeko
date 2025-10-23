import { GlobalWrapper } from '@components/providers/global_wrapper';
import { Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <GlobalWrapper>
      <Route path="/" element={<h2 className="text-red-700">Esto es testing</h2>} />
    </GlobalWrapper>
  );
};

export default App;
