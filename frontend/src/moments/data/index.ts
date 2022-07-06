export { emptyMoment, filledMoment, moments };
export type { Moment };

type MomentType = "todo" | "insight" | "bug" | "feature";

interface Moment {
  id: number;
  type: MomentType;
  notes: string;
  timeInSeconds: number;
}

const emptyMoment: Moment = {
  id: 1,
  type: "todo",
  notes: "",
  timeInSeconds: 43,
};

const filledMoment: Moment = {
  id: 1,
  type: "todo",
  notes:
    "Follow back up with this customer to make sure they've gotten onboarded.",
  timeInSeconds: 43,
};

const moments: Moment[] = [
  {
    id: 0,
    type: "todo",
    notes:
      "Follow back up with this customer to make sure they've gotten onboarded.",
    timeInSeconds: 12,
  },
  {
    id: 1,
    type: "insight",
    notes:
      "This customer is confused on the specific execution product-driven development at their company.",
    timeInSeconds: 64,
  },
  {
    id: 2,
    type: "bug",
    notes: "The button to end a call is disabled.",
    timeInSeconds: 93,
  },
  {
    id: 3,
    type: "bug",
    notes: "",
    timeInSeconds: 72,
  },
  {
    id: 4,
    type: "feature",
    notes:
      "The customer would love the ability to download recordings of completed calls.",
    timeInSeconds: 143,
  },
];
