"use client"
import styles from './header.module.css'
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.container}>
      <a href="#hero" className={styles["logo-link"]}>
        <div className={styles["logo-bg"]}>RB</div>
        <div>
          <h1 className={styles["logo-title"]}>ReBo</h1>
          <p className={styles["logo-desc"]}>Minecraft Bedrock Developer</p>
        </div>
      </a>
      <nav className={styles.navbar}>
        <a href="#projects" className={styles["nav-link"]}>Projects</a>
        <a href="#about" className={styles["nav-link"]}>About</a>
        <a href="#skills" className={styles["nav-link"]}>Skills</a>
        <a href="#contact" className={styles["nav-link"]}>Contact</a>
      </nav>
      <button
        onClick={() => setOpen(!open)}
        className={`${styles["menu-btn"]} ${open ? styles["menu-btn-open"] : styles["menu-btn-close"]}`}
        aria-label="Open menu"
      >
        {/* burger */}
        <span className={styles["burger"]}></span>
        <span className={styles["burger"]}></span>
        <span className={styles["burger"]}></span>
      </button>
      <div
        className={`${styles["menu-panel"]} ${open ? styles["menu-panel-open"] : ""}`}>
        <a href="#projects" className={styles["menu-panel-link"]} onClick={() => setOpen(false)}>Projects</a>
        <a href="#about" className={styles["menu-panel-link"]} onClick={() => setOpen(false)}>About</a>
        <a href="#skills" className={styles["menu-panel-link"]} onClick={() => setOpen(false)}>Skills</a>
        <a href="#contact" className={styles["menu-panel-link"]} onClick={() => setOpen(false)}>Contact</a>
      </div>
    </header>
  )
}