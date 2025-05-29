'use client';
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AccountDetailsWrapper() {
    return (
        <SessionProvider>
            <AccountDetails />
        </SessionProvider>
    );
}

function AccountDetails() {
    const { status } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mnumber: '',
        address: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [activeTab, setActiveTab] = useState('details');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/login");
        } else if (status === "authenticated") {
            fetchUserData();
        }
    }, [status, router]);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/account');
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setFormData({
                    firstname: data.userDetails?.firstname || '',
                    lastname: data.userDetails?.lastname || '',
                    mnumber: data.userDetails?.mnumber || '',
                    address: data.userDetails?.address || ''
                });
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/account', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setMessage({ text: 'Details updated successfully', type: 'success' });
                setIsEditing(false);
                fetchUserData();
            } else {
                setMessage({ text: 'Failed to update details', type: 'error' });
            }
        } catch {
            setMessage({ text: 'An error occurred', type: 'error' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }
        try {
            const response = await fetch('/api/account/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                }),
            });
            if (response.ok) {
                setMessage({ text: 'Password changed successfully', type: 'success' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                const errorData = await response.json();
                setMessage({ text: errorData.error || 'Failed to change password', type: 'error' });
            }
        } catch {
            setMessage({ text: 'An error occurred', type: 'error' });
        }
    };

    const handleDeleteAccount = async () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const response = await fetch('/api/account', { method: 'DELETE' });
                if (response.ok) {
                    signOut({ callbackUrl: '/' });
                } else {
                    setMessage({ text: 'Failed to delete account', type: 'error' });
                }
            } catch {
                setMessage({ text: 'An error occurred', type: 'error' });
            }
        }
    };

    if (status === "loading" || !userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#E5E5CB' }}>
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#E5E5CB' }}>
            <div className="w-full max-w-2xl p-4">
                <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: '#1A120B' }}>My Account</h1>
                <div className="flex border-b mb-4" style={{ borderColor: '#3C2A21' }}>
                    <button
                        className={`py-2 px-4 ${activeTab === 'details' ? 'font-bold border-b-2' : ''} cursor-pointer`}
                        style={{ color: '#3C2A21', borderColor: '#3C2A21' }}
                        onClick={() => setActiveTab('details')}
                    >
                        Account Details
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'password' ? 'font-bold border-b-2' : ''} cursor-pointer`}
                        style={{ color: '#3C2A21', borderColor: '#3C2A21' }}
                        onClick={() => setActiveTab('password')}
                    >
                        Change Password
                    </button>
                </div>
                {message.text && (
                    <div className={`mb-4 p-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.text}
                    </div>
                )}
                {activeTab === 'details' && (
                    <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: '#D5CEA3' }}>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2" style={{ color: '#3C2A21' }}>Basic Information</h2>
                            <div className="mb-2">
                                <span className="font-medium" style={{ color: '#3C2A21' }}>Username: </span>
                                <span style={{ color: '#1A120B' }}>{userData.user?.username}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-medium" style={{ color: '#3C2A21' }}>Email: </span>
                                <span style={{ color: '#1A120B' }}>{userData.user?.email}</span>
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-2" style={{ color: '#3C2A21' }}>
                            {isEditing ? 'Edit Personal Details' : 'Personal Details'}
                        </h2>
                        {!isEditing ? (
                            <div className="mb-4">
                                {userData.userDetails ? (
                                    <>
                                        <div className="mb-2">
                                            <span className="font-medium" style={{ color: '#3C2A21' }}>Name: </span>
                                            <span style={{ color: '#1A120B' }}>
                                                {userData.userDetails.firstname} {userData.userDetails.lastname}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-medium" style={{ color: '#3C2A21' }}>Mobile: </span>
                                            <span style={{ color: '#1A120B' }}>{userData.userDetails.mnumber}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-medium" style={{ color: '#3C2A21' }}>Address: </span>
                                            <span style={{ color: '#1A120B' }}>{userData.userDetails.address}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p style={{ color: '#3C2A21' }}>No additional details saved yet.</p>
                                )}
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-4 py-2 px-4 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                                >
                                    Edit Details
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block mb-1" style={{ color: '#3C2A21' }}>First Name</label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                            style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-1" style={{ color: '#3C2A21' }}>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                            style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1" style={{ color: '#3C2A21' }}>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mnumber"
                                        value={formData.mnumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                        style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1" style={{ color: '#3C2A21' }}>Delivery Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                        style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                        required
                                    />
                                    <small className="text-xs" style={{ color: '#3C2A21' }}>* We only deliver within a 3km radius from our shop.</small>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setMessage({ text: '', type: '' });
                                        }}
                                        className="flex-1 py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                        <div className="mt-6 pt-4 border-t" style={{ borderColor: '#3C2A21' }}>
                            <button
                                onClick={() => signOut()}
                                className="w-full py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === 'password' && (
                    <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: '#D5CEA3' }}>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: '#3C2A21' }}>Change Password</h2>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1" style={{ color: '#3C2A21' }}>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1" style={{ color: '#3C2A21' }}>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1" style={{ color: '#3C2A21' }}>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                    style={{ borderColor: '#3C2A21', backgroundColor: '#D5CEA3', color: '#1A120B' }}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                            >
                                Change Password
                            </button>
                        </form>
                        <div className="mt-6 pt-4 border-t" style={{ borderColor: '#3C2A21' }}>
                            <button
                                onClick={handleDeleteAccount}
                                className="w-full py-2 rounded-lg border-2 border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white transition duration-200 cursor-pointer"
                            >
                                Delete My Account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
