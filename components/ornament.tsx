export default function Ornament({compact=false}: {compact?:boolean}) {
  return <div className={`ornament ${compact?'ornament-compact':''}`} aria-hidden="true"><span></span><span className="ornament-flake">✳</span><span></span></div>;
}
