import Heatmap from "../Components/Heatmap";
import { useSelector } from "react-redux";

import { Container, Row, Table } from "react-bootstrap";

function Statistics() {
  const user = useSelector((state) => state.user);

  const data = Array.from({ length: 365 }, () =>
    Math.floor(Math.random() * 10)
  );
  function parseLocalDate(dateString) {
    const [year, month, day] = dateString
      .split("-")
      .map((s) => parseInt(s, 10));
    return new Date(year, month - 1, day); // Remember, months are 0-based in JS
  }

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  // console.log(user);
  if (!user || user.length === 0 || !user.rigor)
    return (
      <Container className="mt-5">
        <Row>
          <h5>Login to see your statistics.</h5>
        </Row>
      </Container>
    );

  return (
    <Container className="d-flex justify-content-center align-items-center vh-95 flex-column">
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Minutes Focused</th>
          </tr>
        </thead>
        <tbody>
          {user.rigor.map((time) => (
            <tr key={time.date}>
              <td>{formatDate(parseLocalDate(time.date))}</td>
              <td>{time.minutesFocused} minutes</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <Heatmap data={data} /> */}
    </Container>
  );
}

export default Statistics;
