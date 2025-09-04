import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowSchools(){
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch("/api/schools");
        const data = await res.json();
        setSchools(data || []);
      }catch(e){
        alert("Failed to load schools");
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner container">
          <Link href="/" className="brand"><span className="brand-logo">SP</span><span>SchoolPortal</span></Link>
          <div className="actions"><Link className="btn" href="/addSchool">Add School</Link></div>
        </div>
      </nav>

      <div className="container">
        <h2 style={{margin:"16px 0"}}>Schools</h2>
        {loading ? <p className="badge">Loading...</p> : (
          schools.length === 0 ? <p className="badge">No schools yet</p> :
          <div className="grid">
            {schools.map(s => (
              <article className="card" key={s.id}>
  <img src={s.image?.startsWith("/schoolImages") ? s.image : "/logo.svg"} alt={s.name}/>
  <div className="card-body">
    <h3 className="card-title">{s.name}</h3>
    <p className="card-sub">{s.address}, {s.city}</p>
    <div className="card-footer">
      <span className="badge">{s.state}</span>
      <a href={`mailto:${s.email_id}`} className="btn" style={{padding:"6px 12px",fontSize:"13px"}}>
        Contact
      </a>
    </div>
  </div>
</article>

            ))}
          </div>
        )}
      </div>
    </>
  );
}
