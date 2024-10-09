import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import sha512 from 'crypto-js/sha512';
import './PaymentDetails.css';
import './App.css';
import logo from './iitm-logo.png';

const PaymentDetails = () => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
//   const [txnId, setTxnId] = useState('');

  const handlePayment = async () => {
    try {
      setLoading(true);
      const merchantKey = 'CB1GNEF54O'; // Your merchant key
      const salt = '3NRYIGNARI'; // Your salt
      const txnId = 'TXN_' + new Date().getTime();
    //   setTxnId(txnId);
      const amount = '1.00'; // This should come from props or state
      const productInfo = 'Sample Product';
      const firstName = 'Azhagar';
      const email = 'user@example.com';
      const phone = '1234567890';

      // Construct the hash string using sha512
      const hashString = `${merchantKey}|${txnId}|${amount}|${productInfo}|${firstName}|${email}|||||||||||${salt}`;
      const hash = sha512(hashString).toString();

      // Create the payload for the API call
      const payload = {
        key: merchantKey,
        txnid: txnId,
        amount: amount,
        productinfo: productInfo,
        firstname: firstName,
        email: email,
        phone: phone,
        surl: 'https://webhook.site/success', // Replace with your success URL
        furl: 'https://webhook.site/failure', // Replace with your failure URL
        hash: hash,
        udf1: "",
        udf2: "",
        udf3: "",
        udf4: "",
        udf5: "",
        udf6: "",
        udf7: ""
      };

      // Make the API request to initiate the payment link
      const response = await axios.post(
        'https://pay.easebuzz.in/payment/initiateLink',
        qs.stringify(payload),
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // Extract the token from the response and construct the payment URL
      const paymentToken = response.data.data;
      const paymentLink = `https://pay.easebuzz.in/pay/${paymentToken}`;

      if (paymentLink) {
        setPaymentUrl(paymentLink);
      } else {
        alert('Failed to generate payment link');
      }
    } catch (error) {
      console.error('Payment Error:', error.response ? error.response.data : error.message);
      alert('Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="header">
        <img src={logo} alt="IITM Logo" className="logo" />
        <h1>INDIAN INSTITUTE OF TECHNOLOGY MADRAS</h1>
      </div>
    <div className="container">
      <div className="header">
        <h1>Payment Details</h1>
      </div>

      <div className="details">
        <div className="detail-item">
          <span className="label">Pass Type:</span>
          <span className="value">School Staff Pass</span>
        </div>
        <div className="detail-item">
          <span className="label">Pass Fee:</span>
          <span className="value">0</span>
        </div>
        <div className="detail-item">
          <span className="label">Pvc Fee:</span>
          <span className="value">0</span>
        </div>
        <div className="detail-item">
          <span className="label">Total Amount:</span>
          <span className="value">0</span>
        </div>
      </div>

      <div className="button-container">
        <button className="payment-button" onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>

      {paymentUrl && (
        <iframe
          src={paymentUrl}
          title="Payment"
          width="100%"
          height="600px"
          style={{ border: 'none', marginTop: '20px' }}
          onLoad={() => setLoading(false)}
        />
      )}
    </div>
    </>
  );
};

export default PaymentDetails;
