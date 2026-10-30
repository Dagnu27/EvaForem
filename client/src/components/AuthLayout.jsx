import About from './About';

const AuthLayout = ({ children }) => (
  <main className="auth">
    <div className="auth__card">{children}</div>
    <About />
  </main>
);

export default AuthLayout;