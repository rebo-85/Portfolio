export default function Projects() {
  const projects = [
    {
      title: "Cutscene Camera System",
      tag: "Bedrock",
      tagColor: "bg-emerald-800 text-emerald-200",
      desc: "Custom Vector classes, keyframe easing, rotation interpolation, JSON-based scene format and an in-game playback controller.",
      actions: ["Demo", "Source"],
    },
    {
      title: "Modular Off-Road Truck (.geo.json)",
      tag: "Models",
      tagColor: "bg-amber-800 text-amber-200",
      desc: "Voxel-style geo.json model with bones prepared for wheel & suspension animation and modular attachments.",
      actions: ["Download", "Preview"],
    },
    {
      title: "Scripting Utilities",
      tag: "Tools",
      tagColor: "bg-sky-800 text-sky-200",
      desc: "Reusable JS modules: entity movement, path creation, event signals, and pack validation scripts.",
      actions: ["NPM", "Docs"],
    },
  ]

  return (
    <section id="projects" className="py-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Selected Projects</h3>
        <div className="text-sm text-slate-400">Open-source & private work</div>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <article key={i} className="project-card glass p-5 rounded-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{p.title}</h4>
              <span className={`tag ${p.tagColor}`}>{p.tag}</span>
            </div>
            <p className="mt-3 text-slate-300 text-sm">{p.desc}</p>
            <div className="mt-4 flex items-center gap-3">
              {p.actions.map((a) => (
                <a key={a} className="text-xs px-3 py-1 border rounded-md">{a}</a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
