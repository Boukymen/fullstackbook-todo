import styles from '../styles/Layout.module.css'


export default function Layout ({children}: {children: any}) {
    return (
        <div className={styles.layout}>
            <h1 className={styles.title}>
                To Do
            </h1>
            {children}
        </div>
    )
}
