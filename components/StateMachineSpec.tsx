import { TRANSFER_STATES } from "@/lib/statemachine";

const TONE_CLASS: Record<string, string> = {
  teal: "text-teal",
  amber: "text-amber",
};

export default function StateMachineSpec() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <thead>
          <tr>
            {["State", "Means", "Transition"].map((h) => (
              <th
                key={h}
                className="border-b border-line px-0 py-2.5 pr-4 text-left font-mono text-[11px] tracking-widest text-text-faint uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSFER_STATES.map((row) => (
            <tr key={row.state}>
              <td
                className={`border-b border-line py-3 pr-6 align-top font-medium whitespace-nowrap ${
                  row.tone ? TONE_CLASS[row.tone] : "text-text"
                }`}
              >
                {row.state}
              </td>
              <td className="border-b border-line py-3 pr-4 align-top text-text-dim">
                {row.means}
              </td>
              <td className="border-b border-line py-3 align-top font-mono text-xs leading-relaxed text-text-mute">
                {row.transition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
