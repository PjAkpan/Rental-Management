import React, { useState, useEffect } from "react";
import axios from "axios";

type Payment = {
  id: string;
  status: string;
};

const PaymentTracking = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch payment data
    axios
      .get("/api/payments")
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      });
  }, []);

  const generateReceipt = (paymentId: string) => {
    // Call API to generate receipt
    axios
      .post(`/api/payments/${paymentId}/generate-receipt`)
      .then((response) => {
        console.log("Receipt generated", response.data);
      })
      .catch((error) => console.error("Error generating receipt:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6">Payment Tracking</h2>
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between p-4 bg-white shadow-md rounded-lg"
            >
              <div>
                <p className="font-bold">Payment ID: {payment.id}</p>
                <p>Status: {payment.status}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => generateReceipt(payment.id)}
                  className="text-blue-500"
                >
                  Generate Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentTracking;
