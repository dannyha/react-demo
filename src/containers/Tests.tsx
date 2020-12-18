import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Tests() {
  const roles = useSelector((state: RootState) => state.roles);

  useEffect(() => {
    console.log('loaded test')
    console.log(roles);
  }, [roles]);

  return (
    <div className="Tests-Container">
      See console
    </div>
  );
}

export default Tests;