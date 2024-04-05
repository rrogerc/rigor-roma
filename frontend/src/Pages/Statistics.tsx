import React from 'react';
import {useSelector} from 'react-redux';

import {Container, Row, Table} from 'react-bootstrap';
import {RootState} from '../store';
import {UserState} from '../types';
// import Heatmap from '../Components/Heatmap';

const Statistics: React.FC = () => {
  // const data = Array.from({length: 365}, () => Math.floor(Math.random() * 10)); For Heatmap

  const user = useSelector<RootState, UserState | null>(state => state.user);

  const parseLocalDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(s => parseInt(s, 10));
    return new Date(year, month - 1, day); // Remember, months are 0-based in JS
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  if (!user)
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
          {user.rigor.map(time => (
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
};

export default Statistics;
