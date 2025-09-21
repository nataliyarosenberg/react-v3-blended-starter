import style from "./GridItem.module.css";


interface GridProps{
  children: React.ReactNode;
}

export default function GridItem({ children }: GridProps) {
  return <li className={style.item}>{children}</li>;
}
