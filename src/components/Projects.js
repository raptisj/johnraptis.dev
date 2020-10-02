import React from "react"

const Projects = ({ projects }) => {
  return (
    <div className="projects__list">
      {projects.map((project, i) => {
        return (
          <a href={project.link} target="_blank" key={i}>
            <div className="project">
              <div className="project__state">{project.state}</div>
              <div className="project__title">
                <h3>{project.title}</h3>
              </div>
              <div className="project__info">{project.description}</div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default Projects
