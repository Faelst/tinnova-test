import styles from './styles.module.scss';

type Props = {
  children: JSX.Element | React.ReactChild | React.ReactChild[];
};

export function Card({ children }: Props) {
  return <div className={styles.containerForm}>{children}</div>;
}
