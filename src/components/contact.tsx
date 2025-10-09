'use client';
export default function Contact() {
  return (
    <section id="contact" className="py-8">
      <h3 className="text-2xl font-bold">Contact</h3>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl">
          <h4 className="font-semibold">Work with me</h4>
          <p className="text-slate-300 text-sm mt-2">Interested in a collab, contract, or need a custom pack? Send me an email or DM on Discord.</p>
          <ul className="mt-4 text-sm text-slate-300 space-y-2">
            <li><strong>Email:</strong> <a href="mailto:you@example.com" className="underline">you@example.com</a></li>
            <li><strong>Discord:</strong> ReBo#1234</li>
            <li><strong>GitHub:</strong> <a href="#" className="underline">github.com/ReBo</a></li>
          </ul>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert('Replace with your contact endpoint.'); }}
              className="glass p-6 rounded-xl flex flex-col gap-3">
          <input required placeholder="Your name" className="p-3 rounded-md bg-transparent border border-slate-700" />
          <input required type="email" placeholder="Email" className="p-3 rounded-md bg-transparent border border-slate-700" />
          <textarea required placeholder="Message" rows={4} className="p-3 rounded-md bg-transparent border border-slate-700"></textarea>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-md bg-emerald-500 text-black">Send</button>
            <button type="reset" className="px-4 py-2 rounded-md border">Reset</button>
          </div>
        </form>
      </div>
    </section>
  )
}
