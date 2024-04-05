import React from 'react';

const About: React.FC = () => {
	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-wrap">
				<div className="w-full">
					<h2 className="text-2xl font-bold mb-4">
						Rigor-roma: Pomodoro Study Timer
					</h2>
					<p>
						This is a simple pomodoro timer that can track how much you've
						focused.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
