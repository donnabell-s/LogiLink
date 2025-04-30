import { ActiveDeliveries } from "../ActiveDeliveries/ActiveDeliveries";
import { ShipmentVolume } from "../ShipmentVolume/ShipmentVolume";
import { CostDelayAnalytics } from "../CostDelayAnalytics/CostDelayAnalytics";
import { DeliveryPerformance } from "../DeliveryPerformance/DeliveryPerformance";

export const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <DeliveryPerformance />
                    <ShipmentVolume/>
                    <CostDelayAnalytics/>
                </div>
                <div>
                    <ActiveDeliveries />
                </div>
            </div>
            
            {/* Add your dashboard content here */}
        </div>
    );
}