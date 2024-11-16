

import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Terms and Conditions</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">1. Agreement Overview</h2>
        <p className="text-gray-600 mt-2">
          These Terms and Conditions form a legally binding agreement between tenants and landlords for the use of the hostel management platform. By signing up and using this service, tenants agree to abide by all outlined policies and guidelines.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">2. Rental Payment Terms</h2>
        <p className="text-gray-600 mt-2">
          Tenants are responsible for timely payment of rent as agreed upon in the rental agreement. Late payments may incur additional fees, as stated by the landlord. All payments must be completed through the platform, using approved payment methods.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">3. Maintenance and Repairs</h2>
        <p className="text-gray-600 mt-2">
          The landlord is responsible for maintaining the property in a habitable condition. Tenants are required to report any maintenance issues via the platform, attaching relevant details, photos, or videos when needed. Landlords will address and prioritize repairs based on the urgency of the request.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">4. Tenant Responsibilities</h2>
        <p className="text-gray-600 mt-2">
          Tenants must keep the property clean, avoid causing damage, and respect other tenants. Actions that disrupt the peace, cause harm, or damage the property may result in eviction. Tenants are also responsible for notifying the landlord of any issues affecting their units promptly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">5. Privacy and Data Protection</h2>
        <p className="text-gray-600 mt-2">
          The platform respects tenants' privacy and is committed to protecting personal information. Tenants' data will be stored securely and only shared with the landlord and service providers as necessary. By using the platform, tenants consent to the collection and use of their data in accordance with our Privacy Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">6. Security</h2>
        <p className="text-gray-600 mt-2">
          Tenants are responsible for maintaining the security of their accounts, including protecting their login credentials. The platform employs security measures to protect tenant data, but tenants must report any suspicious activity immediately to prevent unauthorized access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">7. Termination and Eviction</h2>
        <p className="text-gray-600 mt-2">
          Either the tenant or landlord may terminate the rental agreement in accordance with local tenancy laws and the terms specified in the lease. The landlord reserves the right to evict tenants who violate these Terms and Conditions, engage in illegal activities, or damage the property.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">8. Liability</h2>
        <p className="text-gray-600 mt-2">
          The landlord is not responsible for any damages to tenant belongings or injuries that occur due to tenant negligence. Landlords and tenants are encouraged to review insurance policies for additional coverage.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">9. Changes to Terms</h2>
        <p className="text-gray-600 mt-2">
          The platform reserves the right to update these Terms and Conditions at any time. Tenants will be notified of significant changes, and continued use of the platform indicates acceptance of the new terms.
        </p>
      </section>

      <p className="text-gray-600 text-sm mt-4">
        By signing up and using the platform, tenants and landlords acknowledge and agree to these Terms and Conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;
