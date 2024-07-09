import "./style.css";

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="page-err">
      <div className="box-left">
        <h1 className="text-title">404. That's an error</h1>
        <h2 className="text-error-h2">Page not found</h2>
        <p className="text-error-p">
          Oh có vẻ URL{" "}
          <strong className="pathname">{window.location.pathname}</strong> không
          tồn tại!
        </p>
        <p className="text-error-p">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã xảy ra lỗi khác.
        </p>
        <p className="text-error-p">
          Quay trở lại hoặc đi đến{" "}
          <Link to="/" className="error-link ">
            <strong>duahau.netlify.app</strong>
          </Link>{" "}
          để chọn một hướng đi mới.
        </p>
      </div>
      <button
        type="button"
        title="back home"
        className="error-button"
        onClick={() => window.history.back()}
      >
        Quay lại
      </button>
    </div>
  );
};

export default Error;
