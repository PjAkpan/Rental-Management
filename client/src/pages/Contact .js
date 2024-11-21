import React from "react";

const ContactPage = () => {
  const adminWhatsAppNumber = "2348029338839"; // Replace with actual WhatsApp number
  const adminEmail = "johnson.peacead@gmail.com"; // Replace with actual email address

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-gray-100 shadow-md">
        {/* Back Arrow */}
        <button
          className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
          onClick={() => window.history.back()}
        >
          <span>🔙</span> <span>Back</span>
        </button>

        {/* Home Icon */}
        <button
          className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <span>🏠</span> <span>Home</span>
        </button>
      </nav>

      {/* Contact Content */}
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <p className="mb-6 text-gray-600">
            Reach out to us via email or WhatsApp. We're here to help!
          </p>

          {/* Email Section */}
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 hover:bg-blue-600"
            onClick={() => (window.location.href = `mailto:${adminEmail}`)}
          >
            📧 Send an Email
          </button>

          {/* WhatsApp Section */}
          <button
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            onClick={() =>
              (window.location.href = `https://wa.me/${adminWhatsAppNumber}`)
            }
          >
            💬 Message on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
