import { useState } from 'react'
import './SignInModal.css'

const SignInModal = ({ onClose }) => {
    const [phone, setPhone] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])

    const handlePhoneSubmit = (e) => {
        e.preventDefault()
        if (phone.length === 10) {
            setShowOtp(true)
        }
    }

    const handleOtpChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Auto-focus next input
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`)?.focus()
            }
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="signin-content">
                    <div className="signin-left">
                        <img
                            src="https://in.bmscdn.com/webin/common/icons/logo.svg"
                            alt="BookMyShow"
                            className="signin-logo"
                            onError={(e) => {
                                e.target.style.display = 'none'
                            }}
                        />
                        <h2>Get Started</h2>
                        <p>Sign in to access your tickets, offers, and rewards.</p>

                        <div className="signin-illustration">
                            <svg viewBox="0 0 200 200" fill="none">
                                <circle cx="100" cy="100" r="80" fill="rgba(220, 53, 88, 0.1)" />
                                <path d="M60 80h80v60a10 10 0 01-10 10H70a10 10 0 01-10-10V80z" fill="#dc3558" opacity="0.8" />
                                <path d="M55 80h90a5 5 0 015 5v5H50v-5a5 5 0 015-5z" fill="#dc3558" />
                                <circle cx="80" cy="110" r="8" fill="white" />
                                <circle cx="120" cy="110" r="8" fill="white" />
                                <rect x="75" y="125" width="50" height="4" rx="2" fill="white" opacity="0.6" />
                            </svg>
                        </div>
                    </div>

                    <div className="signin-right">
                        {!showOtp ? (
                            <form onSubmit={handlePhoneSubmit}>
                                <h3>Login / Sign Up</h3>
                                <div className="phone-input">
                                    <span className="country-code">+91</span>
                                    <input
                                        type="tel"
                                        placeholder="Enter Mobile Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        maxLength={10}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-full"
                                    disabled={phone.length !== 10}
                                >
                                    Continue
                                </button>

                                <div className="signin-divider">
                                    <span>OR</span>
                                </div>

                                <div className="social-signin">
                                    <button type="button" className="social-btn google">
                                        <svg viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Continue with Google
                                    </button>
                                    <button type="button" className="social-btn email">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                        Continue with Email
                                    </button>
                                </div>

                                <p className="signin-terms">
                                    I agree to the <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy</a>
                                </p>
                            </form>
                        ) : (
                            <div className="otp-section">
                                <h3>Verify with OTP</h3>
                                <p className="otp-sent">Sent to +91 {phone}</p>

                                <div className="otp-inputs">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className="otp-input"
                                        />
                                    ))}
                                </div>

                                <button className="btn btn-primary btn-lg btn-full">
                                    Verify OTP
                                </button>

                                <button
                                    className="change-number"
                                    onClick={() => setShowOtp(false)}
                                >
                                    Change Phone Number
                                </button>

                                <p className="resend-otp">
                                    Didn't receive OTP? <button>Resend OTP</button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInModal
