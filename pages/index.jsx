import Link from "next/link";

export default function Home(){
  return (
    <>
      <nav className="nav">
        <div className="nav-inner container">
          <Link href="/" className="brand">
            <span className="brand-logo">SP</span>
            <span>SchoolPortal</span>
          </Link>
          <div className="actions">
            <Link className="btn" href="/addSchool">Add School</Link>
            <Link className="btn" href="/showSchools">View Schools</Link>
          </div>
        </div>
      </nav>

      
      <header className="hero">
  <div className="box">
    <h1>Welcome to SchoolPortal</h1>
    <p>Add and View Schools with a clean, modern design.</p>
    <div className="actions">
      <Link className="btn" href="/addSchool">➕ Add School</Link>
      <Link className="btn" href="/showSchools">📖 View Schools</Link>
    </div>
  </div>
</header>

      <div className="container footer">© {new Date().getFullYear()} SchoolPortal</div>
    </>
  );
}
