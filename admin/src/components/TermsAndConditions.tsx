import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          This document outlines the terms and conditions governing the relationship between Owners and Employees within the organization.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Definitions</h2>
            <p className="text-gray-600">
              - <strong>Owner:</strong> The individual or entity responsible for the overall management and decision-making of the platform.<br />
              - <strong>Employee:</strong> The individual tasked with operational responsibilities and assisting in platform management as directed by the Owner.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. Responsibilities</h2>
            <p className="text-gray-600">
              <strong>Owner:</strong> 
              <ul className="list-disc pl-5 mt-2">
                <li>Oversees all administrative operations of the platform.</li>
                <li>Defines roles, sets targets, and evaluates employee performance.</li>
                <li>Ensures timely payment for work completed by Employees.</li>
              </ul>
              <br />
              <strong>Employee:</strong> 
              <ul className="list-disc pl-5 mt-2">
                <li>Performs assigned tasks diligently and in compliance with organizational policies.</li>
                <li>Maintains confidentiality regarding sensitive platform operations and user data.</li>
                <li>Reports progress, issues, or suggestions to the Owner as required.</li>
              </ul>
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. Confidentiality and Data Protection</h2>
            <p className="text-gray-600">
              Both parties agree to maintain confidentiality regarding sensitive business information. Employees are prohibited from sharing user data, platform strategies, or proprietary information without written consent from the Owner.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Termination of Employment</h2>
            <p className="text-gray-600">
              Employment may be terminated under the following conditions:
              <ul className="list-disc pl-5 mt-2">
                <li>By the Owner, in cases of misconduct or failure to meet performance expectations.</li>
                <li>By the Employee, with a prior notice period of two weeks.</li>
              </ul>
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Dispute Resolution</h2>
            <p className="text-gray-600">
              Any disputes arising from this agreement shall be resolved through mutual discussion. If unresolved, mediation or legal recourse may be sought as a last resort.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">6. Amendments</h2>
            <p className="text-gray-600">
              The Owner reserves the right to amend these terms as necessary. Employees will be informed of any changes and may accept or reject them within a reasonable timeframe.
            </p>
          </section>

          {/* Agreement Section */}
          <div className="border-t border-gray-300 mt-6 pt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Acknowledgment</h2>
            <p className="text-gray-600">
              By proceeding, both the Owner and Employee acknowledge that they have read, understood, and agree to abide by the terms and conditions outlined in this document.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
