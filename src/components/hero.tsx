import styles from './hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      {/* left */}
      <div>
        <h2 className={styles['hero-title']}>
          Minecraft development made with craft & code
        </h2>
        <p className={styles['hero-desc']}>
          I build Bedrock addons, gameplay systems, scripted cinematics, models and dev tools — focused on reliable APIs, reusable systems, and clean pack structure.
        </p>
        <div className={styles['hero-btn-row']}>
          <a href="#projects" className={styles['hero-btn-main']}>See Projects</a>
          <a href="#contact" className={styles['hero-btn-alt']}>Hire / Contact</a>
        </div>
        <div className={styles['hero-features']}>
          {[
            { title: "Bedrock Add-ons", desc: "Behavior & resource packs" },
            { title: "Cinematics", desc: "Camera systems & cutscenes" },
            { title: "Tools", desc: "Scripts, model converters" },
          ].map((item, i) => (
            <div key={i} className={styles['hero-feature']}>
              <div className={styles['hero-feature-title']}>{item.title}</div>
              <div className={styles['hero-feature-desc']}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* right */}
      <div className={styles['hero-card-wrap']}>
        <div className={styles['hero-card']}>
          <div className={styles['hero-card-header']}>
            <div>
              <div className={styles['hero-card-meta']}>Featured</div>
              <div className={styles['hero-card-title']}>Advanced Cutscene Camera</div>
              <div className={styles['hero-card-desc']}>
                Smooth rotation, easing options, and keyframe interpolation for Bedrock cinematics.
              </div>
            </div>
            <div className={styles['hero-card-year']}>2025</div>
          </div>
          <div className={styles['hero-card-footer']}>
            <div className={styles['hero-card-icon']}>⤴</div>
            <div className={styles['hero-card-note']}>
              Includes editor tools for camera paths and JSON export.
            </div>
          </div>
        </div>
        <div className={styles['hero-card-bg']}></div>
      </div>
    </section>
  )
}