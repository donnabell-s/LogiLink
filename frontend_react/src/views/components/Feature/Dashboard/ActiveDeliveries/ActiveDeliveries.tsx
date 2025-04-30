import "./ActiveDeliveries.css";

export const ActiveDeliveries = () => {
    // Sample data for the deliveries
    const deliveries = [
        { orderNo: "ord-123", destination: "Cebu, Talisay", status: "Delay" },
        { orderNo: "ord-124", destination: "Davao, City", status: "On Time" },
        { orderNo: "ord-125", destination: "Manila, Quezon City", status: "Delayed" },
        { orderNo: "ord-126", destination: "Cebu, Mandaue", status: "Arrived" },
        { orderNo: "ord-127", destination: "Iloilo, City", status: "In Transit" },
    ];

    return (
        <div className="active-del d-flex flex-column gap-2">
            <h6>Active Orders</h6>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Destination</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery, index) => (
                        <tr key={index}>
                            <td>{delivery.orderNo}</td>
                            <td>{delivery.destination}</td>
                            <td>{delivery.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};