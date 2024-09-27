import './Email.css';

function EmailPage() {
    const email = localStorage.getItem('email');
    const username=localStorage.getItem('username');
    return (
        <div className='main-Emailcontainer'>
            <div className="email-page-container">
                <div className="logo-and-name">
                    <img src="./email-image.png" alt="email Logo" className='emailLogo' />
                </div>
                <div className="mail-and-logo">
                    <h1 className="heading">Verify Your Email Address</h1>

                </div>
                <p className="email-para">Hello , <span className="email-placeholder">{username}</span></p>
                <p className="email-para">
                    We've sent a message to <span className="email-placeholder">{email}</span> with the link to activate your account.
                </p>
            </div>
        </div>
    );
}

export default EmailPage;