import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About: React.FC = () => {
	return (
		<Container>
			<Row>
				<Col>
					<h2>Rigor-roma: Pomodoro Study Timer</h2>
					<p>
						This is a simple pomodoro timer that can track how much you've
						focused.
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default About;
