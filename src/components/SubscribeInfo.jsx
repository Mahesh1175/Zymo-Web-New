import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

export default function SubscriptionFormPage({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { car, startDate, endDate, userData,totalAmount, activeTab ,city} = location.state;
  useEffect(() => {
    document.title = title;
  }, [title]);
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
  } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let  age = today.getFullYear() - birthDate.getFullYear();

      // Adjust for cases where birth month/day is later in the year
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
      }

      if (age < 21) {
          newErrors.dob = "You must be at least 21 years old";
      }
  }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("formData", formData);
      navigate("/subscribe/upload-doc", {
        state: { ...location.state, userData: formData }
      });
    }
  };

  return (
    <>
    <Helmet>
    <title>{title}</title>
                <meta name="description" content="Subscribe to Zymo for exclusive self-drive car rental benefits. Join now and enjoy hassle-free bookings!" />
                <meta property="og:title" content={title} />
        <meta property="og:description" content="Explore Zymo's car subscription plans and subscribe now for the best deals!" />
                <link rel="canonical" href="https://zymo.app/subscribe/subscribe-info" />

    </Helmet>
    <div className="min-h-screen bg-[#212121] text-white px-4 md:px-8">
      <div className="container mx-auto max-w-4xl py-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-1 md:left-5 top-8 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all"
        >
          <ArrowLeft size={28} />
        </button>

        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-xl p-2 md:text-4xl font-bold">Subscription Booking</h1>
        </div>

        <div className="bg-[#2A2A2A] p-5 md:p-8 rounded-xl shadow-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { label: "Name (as on Driving License)", name: "name", type: "text", placeholder: "Enter your Name" },
              { label: "Email", name: "email", type: "email", placeholder: "Enter your Email" },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your Phone Number", maxLength: 10 },
              { label: "Date of Birth", name: "dob", type: "date", placeholder: "" },
              { label: "Street Address", name: "address", type: "text", placeholder: "Enter your Street Address", fullWidth: true },
              { label: "City", name: "city", type: "text", placeholder: "Enter your City Name" },
              { label: "Pincode", name: "pincode", type: "text", placeholder: "Enter your Pincode", maxLength: 6 }
            ].map(({ label, name, type, placeholder, fullWidth, maxLength }) => (
              <div key={name} className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  maxLength={maxLength}
                  className="w-full p-2 md:p-3 rounded-lg backdrop-blur-md bg-[#424242] text-white border border-white/10 focus:outline-none text-sm md:text-base"
                  placeholder={placeholder}
                />
                {errors[name] && <p className="text-red-500 text-xs md:text-sm">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8">
            <button
              onClick={handleNext}
              className="w-full p-3 md:p-4 rounded-lg font-semibold text-base md:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-appColor text-black border"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
