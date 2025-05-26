import { useNavigate, useParams } from "react-router-dom";
import { CountryItemMainInfoComponent } from "./CountryItemMainInfoComponent";
import { CountryItemAditonalInfoComponent } from "./CountryItemAditonalInfoComponent";

export const CountryItem = ({ countryDetails }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleDashboard = () => {
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleBack}
        className="mb-8 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        ← Volver
      </button>

      <button
        onClick={handleDashboard}
        className="ml-4 mb-8 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CountryItemMainInfoComponent
          countryDetails={countryDetails}
        ></CountryItemMainInfoComponent>
        <CountryItemAditonalInfoComponent
          countryDetails={countryDetails}
        ></CountryItemAditonalInfoComponent>
      </div>
    </>
  );
};
