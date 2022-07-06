import { useRef, useState } from 'react';
import { Moment } from "../data";
import { LinkIcon } from '../../components/LinkIcon';
import { PlayIcon } from '../../components/PlayIcon';
import { TrashIcon } from '../../components/TrashIcon';

export { MomentCard };
export type { MomentCardProps };

interface MomentCardProps {
  handleChanges: (data: Moment) => void;
  removeCard: (id: number) => void;
  moment: Moment;
}

interface PlayButtonProps {
  seconds: number
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

  return (
    <div className={`card ${cardFocused && 'card--focused'}`} tabIndex={props.moment.id} ref={cardRef} onBlur={() => toggleCardFocus(false)}>
      <div className="card__header">
        <span className={`card__type card__type--${props.moment.type}`}>{props.moment.type}</span>
        <PlayButton seconds={props.moment.timeInSeconds} />
      </div>
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

const formatTime = (seconds: number) => {
  const remainingSeconds = seconds % 60
  const minutes = seconds - remainingSeconds

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

const PlayButton = (props: PlayButtonProps) => (
  <div className="play-button">
    <button className="play-button__icon">
      <PlayIcon />
    </button>
    <span className="play-button__timestamp">{formatTime(props.seconds)}</span>
  </div>
)

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