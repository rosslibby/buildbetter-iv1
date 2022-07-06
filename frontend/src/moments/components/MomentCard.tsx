import { useEffect, useRef, useState } from 'react';
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
  const cardRef = useRef(null)
  const inputRef = useRef(null)
  const [cardFocused, setCardFocused] = useState<boolean>(false)
  const toggleCardFocus = (state?: boolean) => setCardFocused(state || !cardFocused)
  const handleRemoveCard = () => props.removeCard(props.moment.id)

  useEffect(() => {
    let currentCard = cardRef.current || null,
      currentInput = inputRef.current || null

    if (document.activeElement === currentInput) {
      toggleCardFocus(true)
    }

    return () => {
      currentCard = null
      currentInput = null
    }
  }, [cardRef, inputRef, toggleCardFocus])

  return (
    <div className={`card ${cardFocused && 'card--focused'}`} tabIndex={props.moment.id} ref={cardRef} onBlur={() => toggleCardFocus(false)}>
      <span className={`card__type card__type--${props.moment.type}`}>{props.moment.type}</span>
      <div className="card__input"
        onFocus={() => toggleCardFocus(true)}
        ref={inputRef}
        tabIndex={props.moment.id + 1}
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