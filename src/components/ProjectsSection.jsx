import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Finance Tracker",
    description:
      "A modern, full-stack web application that helps users seamlessly track their income and expenses.",
    image: "/projects/project1.png",
    tags: [
      "React",
      "TailwindCSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    demoUrl: "https://finance-tracker-nine-jade.vercel.app/",
    githubUrl: "https://github.com/Sylester-Oputa/finance-tracker.git",
  },
  {
    id: 2,
    title: "Upwey Global Investment",
    description:
      "A modern real estate web platform featuring real-time property updates and a responsive user interface.",
    image: "/projects/project2.png",
    tags: [
      "React",
      "TailwindCSS",
      "Redux Toolkit",
      "Ruby on Rails",
    ],
    demoUrl: "https://upwey.com.ng/",
    githubUrl: "https://github.com/JimOluwaseyi/upwey-frontend.git",
  },
  {
    id: 3,
    title: "YouTube Clone",
    description:
      "A YouTube clone built with TypeScript and the YouTube API, featuring video search, previews, and playback in a fully responsive layout.",
    image: "/projects/project3.png",
    tags: ["React", "TypeScript", "TailwindCSS", "YouTube API"],
    demoUrl: "https://b-tube.vercel.app/",
    githubUrl: "https://github.com/Sylester-Oputa/BTube.git",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 md:h-64 lg:h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Sylester-Oputa"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
