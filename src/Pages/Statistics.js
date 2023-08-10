import Heatmap from "../Components/Heatmap";
import { useSelector } from "react-redux";

function Statistics() {
  const user = useSelector((state) => state.user);

  const data = Array.from({ length: 365 }, () =>
    Math.floor(Math.random() * 10)
  );

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  console.log(user);
  if (!user || user.length === 0) return <div>Is Loading</div>;

  return (
    <div>
      {user.rigor.map((time) => (
        <p key={time.date}>
          {formatDate(new Date(time.date))}: {time.minutesFocused} minutes
        </p>
      ))}

      <Heatmap data={data} />
    </div>
  );
}

export default Statistics;
