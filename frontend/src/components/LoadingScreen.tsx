import logo from "../assets/images/bci-logo.png";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <img src={logo} alt="BCI" className="h-12 w-auto animate-pulse" />
      <p className="text-ink/50">Loading...</p>
    </div>
  );
}
