import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type Property = {
    id: number;
    title: string;
    location: string;
    price: number;
};

const Dashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [favourites, setFavourites] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError('');

                const headers = { Authorization: `Bearer ${token}` };

                const [userRes, propertiesRes, favouritesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/auth/me', { headers }),
                    axios.get('http://localhost:5000/api/properties', { headers }),
                    axios.get('http://localhost:5000/api/favourites', { headers }),
                ]);

                setUser(userRes.data);
                setProperties(propertiesRes.data);
                setFavourites(favouritesRes.data);
            } catch (err: any) {
                const message = err?.response?.data?.message || 'Failed to load dashboard';
                setError(message);
                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate, token]);

    const favouriteIds = useMemo(() => new Set(favourites.map((fav) => fav.id)), [favourites]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('rememberedEmail');
        navigate('/', { replace: true });
    };

    const handleToggleFavourite = async (propertyId: number, isFavourite: boolean) => {
        if (!token) return;

        try {
            setError('');
            setActionLoadingId(propertyId);

            const headers = { Authorization: `Bearer ${token}` };

            if (isFavourite) {
                await axios.delete(`http://localhost:5000/api/favourites/${propertyId}`, { headers });
                setFavourites((prev) => prev.filter((item) => item.id !== propertyId));
                toast.success('Removed from favourites');
            } else {
                await axios.post(
                    `http://localhost:5000/api/favourites/${propertyId}`,
                    {},
                    { headers }
                );

                const propertyToAdd = properties.find((item) => item.id === propertyId);
                if (propertyToAdd) {
                    setFavourites((prev) => [propertyToAdd, ...prev]);
                }

                toast.success('Added to favourites');
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || 'Failed to update favourites';
            setError(message);
            toast.error(message);
        } finally {
            setActionLoadingId(null);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <p className="text-muted">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-shell">
            <ToastContainer
                position="top-right"
                autoClose={2200}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="light"
            />

            <nav className="navbar dashboard-navbar">
                <div className="container">
                    <span className="navbar-brand fw-semibold mb-0">Buyer Portal</span>
                    <button className="btn btn-outline-dark btn-sm px-3" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container py-4">
                {error ? (
                    <div className="alert alert-danger border-0 shadow-sm" role="alert">
                        {error}
                    </div>
                ) : null}

                <div className="dashboard-card card mb-4">
                    <div className="card-body p-4">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                            <div>
                                <h2 className="h4 mb-2">Welcome, {user?.name}</h2>
                                <p className="text-muted mb-0">
                                    Role:{' '}
                                    <span className="fw-medium text-dark text-capitalize">
                                        {user?.role}
                                    </span>
                                </p>
                            </div>

                            <div className="px-3 py-2 rounded-3 bg-light border small text-muted">
                                Signed in as {user?.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="dashboard-card card">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-title mb-0">Available Properties</h3>
                                    <span className="text-muted small">{properties.length} properties</span>
                                </div>

                                <div className="row g-3">
                                    {properties.map((property) => {
                                        const isFavourite = favouriteIds.has(property.id);

                                        return (
                                            <div key={property.id} className="col-md-6">
                                                <div className="property-card p-3 h-100 d-flex flex-column justify-content-between">
                                                    <div>
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <h4 className="h6 mb-1">{property.title}</h4>
                                                            {isFavourite ? (
                                                                <span className="badge text-bg-light border text-danger">
                                                                    Favourite
                                                                </span>
                                                            ) : null}
                                                        </div>

                                                        <p className="text-muted small mb-1">
                                                            <i className="bi bi-geo-alt me-1"></i>
                                                            {property.location}
                                                        </p>

                                                        <p className="fw-semibold mb-0">
                                                            {property.price.toLocaleString()}
                                                        </p>
                                                    </div>

                                                    <button
                                                        className={`btn btn-sm w-100 mt-3 ${
                                                            isFavourite
                                                                ? 'btn-outline-danger'
                                                                : 'btn-primary custom-btn'
                                                        }`}
                                                        onClick={() =>
                                                            handleToggleFavourite(property.id, isFavourite)
                                                        }
                                                        disabled={actionLoadingId === property.id}
                                                    >
                                                        {actionLoadingId === property.id
                                                            ? 'Updating...'
                                                            : isFavourite
                                                            ? 'Remove from Favourites'
                                                            : 'Add to Favourites'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="dashboard-card card">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-title mb-0">My Favourites</h3>
                                    <span className="text-muted small">{favourites.length}</span>
                                </div>

                                {favourites.length === 0 ? (
                                    <div className="border rounded-3 p-4 bg-light text-center">
                                        <i className="bi bi-heart text-muted fs-4 d-block mb-2"></i>
                                        <p className="text-muted small mb-0">
                                            You have not added any favourite properties yet.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column gap-3">
                                        {favourites.map((property) => (
                                            <div key={property.id} className="property-card p-3">
                                                <h4 className="h6 mb-1">{property.title}</h4>
                                                <p className="text-muted small mb-1">
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    {property.location}
                                                </p>
                                                <p className="fw-semibold mb-3">
                                                    {property.price.toLocaleString()}
                                                </p>
                                                <button
                                                    className="btn btn-outline-danger btn-sm w-100"
                                                    onClick={() => handleToggleFavourite(property.id, true)}
                                                    disabled={actionLoadingId === property.id}
                                                >
                                                    {actionLoadingId === property.id ? 'Removing...' : 'Remove'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;