import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
	const containerVariants = {
		hidden: { opacity: 0, x: -100 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<motion.div
				className="flex flex-wrap justify-center items-center"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div
					className="w-full md:w-2/3 text-center"
					variants={itemVariants}
				>
					<motion.h2
						className="text-3xl md:text-5xl font-bold mb-4"
						variants={itemVariants}
					>
						Rigor-roma: a Pomodoro Study Timer
					</motion.h2>
					<motion.p className="text-lg md:text-xl" variants={itemVariants}>
						This is a simple pomodoro timer that can track how much you've
						focused.
					</motion.p>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default About;
