import RegistrationForm from "../components/RegistrationForm";

export default function Register() {
  return (
    <div className="section-container py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Register Now</h1>
        <p className="mx-auto max-w-2xl text-ink/70">
          Fill out the form below and our team will confirm your seat and batch timing.
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <RegistrationForm />
      </div>
    </div>
  );
}
