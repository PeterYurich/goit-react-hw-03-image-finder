import css from "./Button.module.css"

export const LoadMoreBtn = ({onClick}) => (
    <button className={css.LoadMoreBtn} onClick={onClick}>Load more...</button>
)