// eslint-disable-next-line import/no-extraneous-dependencies
import { LoaderIcon } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="page__loader">
      <LoaderIcon className="loader" />
    </div>
  );
};

export default Loader;
