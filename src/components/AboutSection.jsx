import {
  Briefcase,
  Code,
  Code2,
  Database,
  FileText,
  Lightbulb,
  Server,
  User,
  Workflow,
} from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Passionate Web Developer</h3>

            <p className="text-muted-foreground">
              With over 4 years of proven experience in frontend development and
              hands-on expertise in backend engineering, I specialize in
              building responsive, accessible, and performance-driven web
              applications. Leveraging technologies such as React, Next.js,
              Node.js, Express, and PostgreSQL, I create solutions that are not
              only visually appealing but also secure, scalable, and reliable
              for real-world use cases.
            </p>

            <p className="text-muted-foreground">
              I’m passionate about designing and developing scalable digital
              products that seamlessly blend clean, user-focused design with
              robust backend functionality. Having worked with a wide range of
              modern technologies—from React and Tailwind for front-end
              experiences to Node.js, Prisma, and PostgreSQL for backend
              systems—I thrive on turning complex challenges into intuitive,
              functional solutions. Constantly learning and adapting, I aim to
              stay ahead of industry trends and bring innovation to every
              project I contribute to.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <div className="flex w-full justify-center items-center gap-4">
                <a
                  href="../../public/CVs/Oputa Sylvester Obiwuru CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 w-full rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  Download Frontend CV
                </a>
                <a
                  href="../../public/CVs/Oputa Sylvester Obiwuru Backend CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 w-full rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  Download Backend CV
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {" "}
                    Backend Engineer / API Developer
                  </h4>
                  <p className="text-muted-foreground">
                    Building secure and scalable APIs that power modern
                    applications.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Database Developer</h4>
                  <p className="text-muted-foreground">
                    Designing and optimizing databases for performance and
                    reliability.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Junior DevOps Engineer
                  </h4>
                  <p className="text-muted-foreground">
                    Streamlining development with CI/CD pipelines and
                    containerization.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    {" "}
                    Technical Writer / Documentation Engineer
                  </h4>
                  <p className="text-muted-foreground">
                    Creating clear and accessible technical documentation for
                    developers.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Full-Stack Software Engineer
                  </h4>
                  <p className="text-muted-foreground">
                    Delivering end-to-end solutions across frontend and backend
                    systems.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Solutions Engineer / Startup Tech Lead</h4>
                  <p className="text-muted-foreground">
                    Turning ideas into functional products with speed and precision.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
