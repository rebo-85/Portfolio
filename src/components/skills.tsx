export default function Skills() {
  const skills = [
    "Minecraft Bedrock",
    "@minecraft/server",
    "JavaScript / TypeScript",
    "Blockbench",
    "geo.json",
    "Animation & Bones",
    "Tooling / CLI"
  ]

  return (
    <section id="skills" className="py-8">
      <h3 className="text-2xl font-bold">Skills & Technologies</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <span key={i} className="tag bg-slate-800 text-slate-200">{s}</span>
        ))}
      </div>
    </section>
  )
}
