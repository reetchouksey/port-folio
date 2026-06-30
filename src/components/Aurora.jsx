import usePerfMode from "../hooks/usePerfMode.js";

export default function Aurora() {
  const { lite } = usePerfMode();
  // `animate-blob` is a continuous 14s keyframe loop running on four large
  // blurred layers. On touch / low-end devices the GPU spends most of its
  // time on this alone — render static (no animation) but keep the colour
  // wash so the page still looks alive.
  const anim = lite ? "" : "animate-blob";
  return (
    <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
      <div
        className={`absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#d4a04c,transparent_60%)] blur-3xl opacity-55 ${anim}`}
      />
      <div
        className={`absolute -top-20 right-[-12%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_50%_40%,#c4734f,transparent_60%)] blur-3xl opacity-50 ${anim} [animation-delay:-3s]`}
      />
      <div
        className={`absolute bottom-[-10%] left-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#e6c178,transparent_60%)] blur-3xl opacity-45 ${anim} [animation-delay:-6s]`}
      />
      <div
        className={`absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_40%_60%,#7a8442,transparent_65%)] blur-3xl opacity-30 ${anim} [animation-delay:-9s]`}
      />
    </div>
  );
}
