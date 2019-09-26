import React from 'react'

const Projects = ({projects}) => {

	const hoverMouse = (e) => {
		console.log(e.pageY)
		console.log(e.pageX)
	}

	return (
		<div className="projects__list">
		{projects.map(project => {
			return (
			<div className="project" key={project.title} onMouseOver={hoverMouse}>
				<div className="project__title">
					<h3>{project.title}</h3>
					<div>
						<a href={project.demo} className="demo__btn">Demo</a>
						<a href={project.source} className="source__btn">Source</a>
					</div>
				</div>
				<div className="projects__info">
					<span>{project.description}</span>
					<p>{project.stack}</p>
				</div>
				<div className="wave"></div>
			</div>
			)
		})}
		</div>
	)
}

export default Projects