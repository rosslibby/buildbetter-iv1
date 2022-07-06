import { useRef, useState } from 'react';
import { Moment } from "../data";
import { LinkIcon } from '../../components/LinkIcon';
import { TrashIcon } from '../../components/TrashIcon';

export { MomentCard };
export type { MomentCardProps };

interface MomentCardProps {
  handleChanges: (data: Moment) => void;
  removeCard: (id: number) => void;
  moment: Moment;
}

interface CardActionProps {
  linkAction?: () => void;
  garbageAction?: () => void;
}

const MomentCard = (props: MomentCardProps) => {
  // YOUR IMPLEMENTATION HERE
  const handleRemoveCard = () => props.removeCard(props.moment.id)

  return (
    <div className="card" tabIndex={props.moment.id}>
      <span className={`card__type card__type--${props.moment.type}`}>{props.moment.type}</span>
      <div className="card__input"
        contentEditable={true}
        dangerouslySetInnerHTML={{__html: props.moment.notes}}
        onBlur={(e) => {
          const target = e.target as HTMLElement

          props.handleChanges({
            ...props.moment,
            notes: target.innerText.replaceAll('\n', '<br />')
          })
        }}
      />
      {/* <textarea
        className="card__input"
        defaultValue={props.moment.notes}
        onChange={(e) => props.handleChanges({
          ...props.moment,
          notes: e.target.value
        })}
        placeholder="Add note..."
      /> */}
      <CardActions garbageAction={handleRemoveCard} />
    </div>
  );
};

const CardActions = (props: CardActionProps) => (
  <div className="card__actions">
    <button>
      <LinkIcon />
    </button>
    <button onClick={props.garbageAction}>
      <TrashIcon />
    </button>
  </div>
)