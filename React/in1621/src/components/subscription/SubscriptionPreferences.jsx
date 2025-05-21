'use client';
import { useState } from 'react';

export default function SubscriptionPreferences() {
  const [preferences, setPreferences] = useState({
    promotionalEmails: true,
    orderNotifications: true,
    newItemAlerts: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });
      
      if (response.ok) {
        setMessage({ text: 'Preferences saved!', type: 'success' });
        setIsEditing(false);
      }
    } catch (error) {
      setMessage({ text: 'Failed to save', type: 'error' });
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-6`} style={{ backgroundColor: '#D5CEA3' }}>
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#3C2A21' }}>
        Email Preferences
      </h2>

      {message && (
        <div className={`mb-4 p-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        {/* Promotional Emails */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium" style={{ color: '#3C2A21' }}>Promotional Emails</h3>
            <p className="text-sm" style={{ color: '#1A120B' }}>Special offers, discounts, and news</p>
          </div>
          <ToggleSwitch
            checked={preferences.promotionalEmails}
            onChange={() => handleToggle('promotionalEmails')}
            disabled={!isEditing}
          />
        </div>

        {/* Order Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium" style={{ color: '#3C2A21' }}>Order Notifications</h3>
            <p className="text-sm" style={{ color: '#1A120B' }}>Order confirmations and shipping updates</p>
          </div>
          <ToggleSwitch
            checked={preferences.orderNotifications}
            onChange={() => handleToggle('orderNotifications')}
            disabled={!isEditing}
          />
        </div>

        {/* New Item Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium" style={{ color: '#3C2A21' }}>New Item Alerts</h3>
            <p className="text-sm" style={{ color: '#1A120B' }}>Notifications about new products</p>
          </div>
          <ToggleSwitch
            checked={preferences.newItemAlerts}
            onChange={() => handleToggle('newItemAlerts')}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="py-2 px-4 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
          >
            Edit Preferences
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEditing(false);
                setPreferences(initialPreferences);
                setMessage(null);
              }}
              className="py-2 px-4 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Toggle Switch Component
function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? 'bg-[#3C2A21]' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onChange}
      disabled={disabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-[#E5E5CB] transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}