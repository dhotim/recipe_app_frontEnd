import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main>
      <h3>Sorry</h3>
      <hr />
      <div>This resource is not available...</div>
      <Link to="/">Go back to Home</Link>
    </main>
  );
}
