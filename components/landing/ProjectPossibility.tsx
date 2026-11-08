import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

import { ProjectArtwork } from "./ProjectArtwork";

/** "Your next project could start on campus." (Figma 14:16363). */
export function ProjectPossibility() {
  return (
    <section aria-labelledby="project-heading">
      <Container className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:gap-16 lg:py-22">
        <ProjectArtwork />

        <div className="flex flex-1 flex-col items-start gap-6">
          <EyebrowLabel>Build something that matters</EyebrowLabel>
          <h2 id="project-heading" className="text-heading-48 font-bold text-fg">
            Your next project could start on campus.
          </h2>
          <p className="text-body-md text-fg-muted">
            What if finding a study partner, sharing resources, or navigating campus felt easier?
            Small, familiar problems can be the beginning of meaningful work.
          </p>
          <p className="text-body text-fg-muted">
            Bring research, design, and development together. Try an idea, get feedback, and make
            the next version better.
          </p>
          <Button href="/overview" variant="link" withArrow>
            Explore project-based learning
          </Button>
        </div>
      </Container>
    </section>
  );
}
