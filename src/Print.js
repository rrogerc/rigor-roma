import { useSelector } from "react-redux";

const Print = () => {
  const user = useSelector((state) => state.rigor);

  const print = () => {
    console.log(user.rigor);
  };

  return (
    <div>
      <button onClick={print}>Print Debug</button>
    </div>
  );
};

export default Print;
