import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"
import styles from "./styles.module.scss"

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })
    return (
        <header className={styles.headerContainer}>
            <img src="https://tinnova.com.br/wp-content/uploads/2021/05/logo_dark.png" alt="tinnova-logo" />
            <p> Teste tecnico desenvolvido por <strong>Rafael Silverio</strong></p>
            <span>{currentDate}</span>
        </header>
    );
}