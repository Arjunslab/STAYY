import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faStar,
  faCalendarAlt,
  faHeart as faSolidHeart,
  faSearch,
  faCog,
  faCompass,
  faSuitcaseRolling,
  faHistory,
  faCheckCircle,
  faEnvelope,
  faPhoneAlt,
  faSpinner,
  faWallet,
  faShareAlt,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updating, setUpdating] = useState(false);


  const [bookings, setBookings] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([
  ]);

  const [featuredStays, setFeaturedStays] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await API.get("/account");
        setUser(response.data);
        setName(response.data.name || "");
        setEmail(response.data.email || "");
        setPhone(response.data.phone || "");
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Session validation failed.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await API.get("/dashboard/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    const fetchFeatured = async () => {
      try {
        const res = await API.get("/dashboard/featured");
        setFeaturedStays(res.data);
      } catch (err) {
        console.error("Failed to fetch featured stays:", err);
      }
    };

    fetchProfile();
    fetchBookings();
    fetchFeatured();
  }, [token, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError("");
    setUpdateSuccess("");

    try {
      const response = await API.post("/account/update-info", {
        name,
        email,
        phone
      });
      setUpdateSuccess("Profile updated successfully!");
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Auto-dismiss success message and reload header context
      setTimeout(() => {
        setUpdateSuccess("");
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      setUpdateError(err.response?.data?.error || "Failed to update profile information.");
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleSave = (placeId) => {
    setSavedPlaces(prev => prev.filter(p => p.id !== placeId));
  };

  const handleRatePastStay = (bookingId, newRating) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, rating: newRating } : b))
    );
  };

  const filteredFeatured = featuredStays.filter(
    stay =>
      stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stay.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return "Good morning";
    if (hrs < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">Validating STAYY Session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Server Error! We are extremely sorry</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          {/* <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-200"
          >
            Re-login
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
    
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-900 px-6 py-10 md:py-16 text-white text-center md:text-left shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <span className="bg-white/20 dark:bg-purple-900/40 text-yellow-300 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
             STAYY Reward Club
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-3">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="text-purple-100 dark:text-slate-300 mt-2 text-lg font-medium">
              Welcome back. Where are we staying next?
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <img
              src={user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover shadow-md"
            />
            <div className="text-left">
              <p className="font-bold text-lg leading-tight">{user?.name}</p>
              <p className="text-sm text-purple-200">{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-1 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded text-xs font-extrabold uppercase">
                <FontAwesomeIcon icon={faStar} />
                <span>{user?.tier || "Gold Tier"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          
          <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-3">Navigation</p>
              <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === "overview"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faCompass} />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === "bookings"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faSuitcaseRolling} />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === "saved"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faSolidHeart} />
                  <span>Saved Places</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === "settings"
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faCog} />
                  <span>Settings</span>
                </button>
              </nav>
            </div>

            
            <div className="hidden lg:block bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950 border border-slate-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute right-[-20px] top-[-20px] w-28 h-28 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="font-extrabold text-sm tracking-wide text-yellow-400 uppercase">STAYY Loyalty Card</h3>
              <p className="text-2xl font-black mt-4 tracking-wider">{user?.points || 0} <span className="text-xs text-slate-400 font-semibold uppercase">pts</span></p>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
                <div className="bg-yellow-400 h-2 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.5)]" style={{ width: `${Math.min((user?.points || 0), 100)}%` }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">{(user?.points || 0) < 100 ? 100 - (user?.points || 0) : 0} bookings remaining until Platinum tier</p>
            </div>
          </div>

     
          <div className="lg:col-span-3">
            
          
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fadeIn">
                
        
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Active Stays</p>
                    <p className="text-3xl font-black mt-2 text-purple-600 dark:text-purple-400">{bookings.filter(b => b.status === "Upcoming").length}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Saved Places</p>
                    <p className="text-3xl font-black mt-2 text-purple-600 dark:text-purple-400">{savedPlaces.length}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Loyalty Level</p>
                    <p className="text-xl font-extrabold mt-3 text-yellow-500 dark:text-yellow-400">{user?.tier}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">STAYY Wallet</p>
                      <p className="text-xl font-black mt-2 text-purple-600 dark:text-purple-400">₹{user?.balance || 0}</p>
                    </div>
                    <FontAwesomeIcon icon={faWallet} className="text-slate-300 dark:text-slate-700 text-2xl" />
                  </div>
                </div>

              
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm">
                  <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faSearch} className="text-purple-600 dark:text-purple-400" />
                    <span>Search Featured Hotels</span>
                  </h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type a city or hotel name (e.g. Manali, Shimla, Jaipur)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-purple-500 transition text-sm"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  </div>
                </div>

                
                <div>
                  <h2 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCompass} className="text-purple-600 dark:text-purple-400" />
                    <span>Trending Escapes</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredFeatured.length > 0 ? (
                      filteredFeatured.map((stay) => (
                        <div key={stay.id} className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                          <div className="relative h-44 overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <img
                              src={stay.image}
                              alt={stay.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                              <FontAwesomeIcon icon={faStar} />
                              <span>{stay.rating}</span>
                            </div>
                            <div className="absolute bottom-3 left-3 flex gap-1">
                              {stay.tags.map((tag, idx) => (
                                <span key={idx} className="bg-slate-950/70 text-white backdrop-blur text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                              <FontAwesomeIcon icon={faMapMarkerAlt} />
                              <span>{stay.location}</span>
                            </div>
                            <h3 className="font-bold text-base mt-1 text-slate-800 dark:text-slate-100 line-clamp-1">{stay.name}</h3>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                              <div>
                                <p className="text-xs text-slate-400">Starting from</p>
                                <p className="font-extrabold text-purple-600 dark:text-purple-400 text-sm">{stay.price}</p>
                              </div>
                              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2 px-3.5 rounded-lg transition">
                                View Deal
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-1 md:col-span-3 text-center py-10 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl">
                        <p className="text-slate-400 dark:text-slate-500">No properties matched "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <FontAwesomeIcon icon={faSuitcaseRolling} className="text-purple-600 dark:text-purple-400" />
                  <span>My Stay History</span>
                </h2>
                
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-5">
                      <div className="w-full md:w-40 h-28 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={booking.image} alt={booking.hotelName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                              booking.status === "Upcoming"
                                ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            }`}>
                              {booking.status}
                            </span>
                            <span className="text-xs text-slate-400 font-bold">{booking.id}</span>
                          </div>
                          <h3 className="font-extrabold text-lg mt-1.5 text-slate-800 dark:text-slate-100">{booking.hotelName}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs font-semibold mt-1">
                            <span><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1.5" />{booking.location}</span>
                            <span><FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5" />{booking.checkIn} - {booking.checkOut}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-4">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium uppercase">Total Paid</span>
                            <span className="font-black text-slate-800 dark:text-slate-100">{booking.price}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {booking.status === "Completed" && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-400 mr-1.5 font-bold">Rate Stay:</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => handleRatePastStay(booking.id, star)}
                                    className="text-sm transition hover:scale-125 focus:outline-none"
                                  >
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      className={star <= booking.rating ? "text-yellow-400" : "text-slate-300 dark:text-slate-700"}
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                            {booking.status === "Upcoming" && (
                              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2 px-4 rounded-xl transition">
                                Manage Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

         
            {activeTab === "saved" && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <FontAwesomeIcon icon={faSolidHeart} className="text-red-500" />
                  <span>Your Saved Places</span>
                </h2>
                
                {savedPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {savedPlaces.map((place) => (
                      <div key={place.id} className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="relative h-40 overflow-hidden bg-slate-200 dark:bg-slate-800">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleToggleSave(place.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 dark:bg-slate-900/95 text-red-500 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition"
                          >
                            <FontAwesomeIcon icon={faSolidHeart} />
                          </button>
                          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-0.5 rounded text-xs font-extrabold flex items-center gap-1 text-yellow-500 dark:text-yellow-400 shadow-sm">
                            <FontAwesomeIcon icon={faStar} />
                            <span>{place.rating}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <span>{place.location}</span>
                          </p>
                          <h3 className="font-extrabold text-base mt-1 text-slate-800 dark:text-slate-100 line-clamp-1">{place.name}</h3>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">{place.price}</span>
                            <button className="text-[11px] font-bold text-purple-600 dark:text-purple-400 group-hover:underline flex items-center gap-1">
                              <span>Book Room</span>
                              <FontAwesomeIcon icon={faArrowRight} className="text-[9px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl">
                    <FontAwesomeIcon icon={faRegularHeart} className="text-4xl text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="text-slate-400 dark:text-slate-500 font-semibold text-lg">No saved properties yet</p>
                    <p className="text-xs text-slate-400 mt-1">Properties you wishlist will appear here.</p>
                  </div>
                )}
              </div>
            )}

      
            {activeTab === "settings" && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <FontAwesomeIcon icon={faCog} className="text-purple-600 dark:text-purple-400" />
                  <span>Profile Settings</span>
                </h2>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">
                  {updateSuccess && (
                    <div className="mb-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/40 text-green-700 dark:text-green-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{updateSuccess}</span>
                    </div>
                  )}

                  {updateError && (
                    <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-2">
                      <span>{updateError}</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} className="space-y-5">
                    <div className="flex flex-col md:flex-row items-center gap-5 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                      <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User")}
                        alt="Profile Avatar"
                        className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover"
                      />
                      <div className="text-center md:text-left">
                        <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">{name}</h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">To change your avatar, sign in using Google Auth.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-purple-500 transition text-sm font-medium"
                            required
                          />
                          <FontAwesomeIcon icon={faUser} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-purple-500 transition text-sm font-medium"
                            required
                          />
                          <FontAwesomeIcon icon={faEnvelope} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Phone Number</label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="Enter phone number (e.g. +91 9876543210)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-purple-500 transition text-sm font-medium"
                          />
                          <FontAwesomeIcon icon={faPhoneAlt} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={updating}
                      className="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 mt-4"
                    >
                      {updating ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Save Profile Details</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}