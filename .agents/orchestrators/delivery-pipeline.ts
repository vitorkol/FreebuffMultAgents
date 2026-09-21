export type PipelineStatus = "approved" | "needs_review" | "blocked";

export type Handoff = {
  agent: string;
  input: string[];
  output: string[];
  status: PipelineStatus;
  approvalRequired?: boolean;
};

export const deliveryPipeline = {
  name: "delivery-pipeline",
  input: "docs/product/meeting-summary.md",
  instructions: [
    "Read AGENTS.md and agents/agents.md before starting.",
    "Execute one stage at a time and persist each handoff in docs/product/.",
    "After the ANR approves the user story, the ANR triggers the designer; the designer verifies acceptance criteria (CA), RN/RF/RNF and BDD scenarios, generates the prototype from the design system, saves artifacts in docs/product/prototype/ and informs the ANR.",
    "The ANR validates the prototype and then triggers the tech leader, who estimates the development activity; the ANR prioritizes it in the sprint backlog.",
    "Do not implement code until the user story, prototype and technical refinement are approved and the sprint is active.",
    "When the developer finishes, they trigger the QA stage.",
    "When QA fails, update docs/product/bugs.md and return to the developer stage.",
    "When information is missing, update docs/product/open-questions.md and stop the blocked stage."
  ],
  stages: [
    { agent: "revisor", input: ["docs/product/meeting-summary.md"], output: ["docs/product/meeting-summary-reviewed.md"] },
    { agent: "anr", input: ["docs/product/meeting-summary-reviewed.md"], output: ["docs/product/requirements.md", "docs/product/user-stories.md"] },
    { agent: "revisor", input: ["docs/product/user-stories.md"], output: ["docs/product/user-stories.md"] },
    { agent: "anr", input: ["docs/product/user-stories.md"], output: ["docs/product/user-stories.md"], approvalRequired: true },
    { agent: "designer", input: ["docs/product/user-stories.md"], output: ["docs/product/prototype/", "docs/product/prototype.md"], approvalRequired: true },
    { agent: "anr", input: ["docs/product/prototype.md"], output: ["docs/product/prototype.md"], approvalRequired: true },
    { agent: "tech-leader", input: ["docs/product/user-stories.md", "docs/product/prototype.md"], output: ["docs/product/technical-refinement.md"], approvalRequired: true },
    { agent: "anr", input: ["docs/product/user-stories.md", "docs/product/technical-refinement.md"], output: ["docs/product/sprint-prioritization.md"], approvalRequired: true },
    { agent: "developer", input: ["docs/product/user-stories.md", "docs/product/technical-refinement.md", "docs/product/sprint-prioritization.md"], output: ["backend/", "frontend/"], approvalRequired: true },
    { agent: "qa", input: ["docs/product/user-stories.md", "backend/", "frontend/"], output: ["docs/product/test-plan.md", "docs/product/test-evidence.md", "docs/product/bugs.md"] }
  ]
};
