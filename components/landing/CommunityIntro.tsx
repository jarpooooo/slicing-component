import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

const attributes = ["Student-led", "Peer-powered", "Curiosity-first"];

type CommunityIntroProps = {
  university: string;
};

/** "A campus. A community." introduction (Figma 14:16204). */
export function CommunityIntro({ university }: CommunityIntroProps) {
  return (
    <section aria-labelledby="intro-heading">
      <Container className="grid gap-10 py-16 lg:grid-cols-[490px_1fr] lg:gap-16 lg:py-22 xl:gap-24">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel>A campus. A community.</EyebrowLabel>
          <h2 id="intro-heading" className="text-heading-48 font-bold text-fg">
            <span className="block">Not just learning tech.</span>
            <span className="block">Finding your people.</span>
          </h2>
          <Button href="/about" variant="link" withArrow>
            More about GDGoC UGM
          </Button>
        </div>

        <div className="flex flex-col items-start gap-6">
          <p className="text-body-md text-fg-muted md:text-lead">
            Google Developer Groups on Campus, {university} brings students together around one
            simple idea: we can go <strong className="font-bold">further</strong> when we{" "}
            <strong className="font-bold">learn</strong> with each other.
          </p>
          <p className="text-body-md text-fg-muted">
            From your first line of code to your next product idea, there’s room to ask questions,
            share what you know, and try something new.
          </p>
          <ul className="flex flex-wrap gap-3">
            {attributes.map((attribute) => (
              <li key={attribute}>
                <Chip>{attribute}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
