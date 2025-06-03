
import { SmartCardOrganizer } from "../cards/SmartCardOrganizer";

export const AnalyticsSmartOrganization = () => {
  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900">
        Smart Organization
      </h3>
      <div className="max-h-64 md:max-h-80 overflow-y-auto">
        <SmartCardOrganizer />
      </div>
    </div>
  );
};
