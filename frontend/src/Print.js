import {useSelector, useDispatch} from 'react-redux';
import {addRigor} from './reducers/userReducer';

const Print = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const print = () => {
    console.log(user);
    // dispatch(addRigor(10));
  };

  return (
    <div>
      <button onClick={print}>Print Debug</button>
    </div>
  );
};

export default Print;
