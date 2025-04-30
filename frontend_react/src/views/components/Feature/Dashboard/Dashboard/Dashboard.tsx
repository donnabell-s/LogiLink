import { ActiveDeliveries } from "../ActiveDeliveries/ActiveDeliveries";
import { ShipmentVolume } from "../ShipmentVolume/ShipmentVolume";
import { CostDelayAnalytics } from "../CostDelayAnalytics/CostDelayAnalytics";
import { DeliveryPerformance } from "../DeliveryPerformance/DeliveryPerformance";
import { Map } from "../Map/Map";
import "./Dashboard.css";

export const Dashboard = () => {
    return (
        <div className="p-3 d-flex flex-column h-100">
            <div className="d-flex flex-row justify-content-between align-items-center pb-3">
                <h2>Dashboard</h2>
                <div className="d-flex flex-row gap-2">
                    <select></select>
                    <button className="export">Export</button>
                </div>
            </div>
            <div className="d-flex flex-column h-100 gap-4">
                <div className="d-flex flex-row gap-4">
                    <DeliveryPerformance />
                    <ShipmentVolume/>
                    <CostDelayAnalytics/>
                </div>
                <div className="d-flex flex-row gap-4">
                    <Map />
                    <ActiveDeliveries />
                </div>
            </div>
        </div>
    );
}