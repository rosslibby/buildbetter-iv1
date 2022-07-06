import { Moment } from "../data";

export { MomentCard };
export type { MomentCardProps };

interface MomentCardProps {
  moment: Moment;
}

const MomentCard = (props: MomentCardProps) => {
  // YOUR IMPLEMENTATION HERE
  return (
    <div className="card">
      <span className={`card__type card__type--${props.moment.type}`}>{props.moment.type}</span>
      <input
        className="card__input"
        placeholder="Add note..."
        type="text"
      />
    </div>
  );
};