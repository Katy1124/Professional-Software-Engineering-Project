export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <button dta-mdb-button-init className="navbar-toggler" type="button" data-mdb-collapse-init
            data-mdb-target="#navbarToggleExternalContent2" aria-controls="navbarToggleExternalContent2" aria-expanded="false"
            aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>
        </div>
      </nav>

      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard! Here you can manage users, view reports, and configure settings.</p>
    </div>
  );
}