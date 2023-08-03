import styles from './Footer.module.scss'
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <span>Data Settings</span>
        <span>Do not sell my personal information</span>
        <span>Privacy Policy</span>
        <span>Terms and Conditions</span>
      </div>
      <div className={styles.bottom}>
        <span>© 2023 TarCompany Russia, Inc.</span>
      </div>
    </div>
  )
}

export default Footer