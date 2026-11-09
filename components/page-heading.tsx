import Ornament from './ornament';
export default function PageHeading({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle?:string}){
 return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><Ornament compact/>{subtitle&&<p className="page-subtitle">{subtitle}</p>}</div>;
}
