import * as style from './style.css';

type EditableSpanType = {
  title: string,
};
export const EditableSpan = ({ title }: EditableSpanType) => {
  return (
    <span className={style.wrapper}>
      {title}
    </span>
  );
};
