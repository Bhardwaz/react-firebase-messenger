import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const { data, statusText } = useRouteError();
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        width: "90vw",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Oops❕❕ {statusText}</h1>
      <h2>{data} ❕</h2>
      <img
        style={{ width: "350px", borderRadius: "50%" }}
        src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
        alt="404 Error"
      />

      <Link to="/">
        <button
          style={{
            backgroundColor: "green",
            border: "none",
            padding: "6px 10px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Home
        </button>
      </Link>
    </div>
  );
};
export default Error;
