import './AuditLog.css';

const auditLogData = [
  {
    datetime: '2025-05-01 09:15:23',
    description: 'Shipment ORD-123 dispatched',
    orderId: 'ORD-123',
    logisticsProvider: 'FastShip Logistics',
    location: 'Warehouse A',
    statusBefore: 'Ready for Dispatch',
    statusAfter: 'In Transit',
  },
  {
    datetime: '2025-05-01 12:45:10',
    description: 'Order ORD-124 packaging completed',
    orderId: 'ORD-124',
    logisticsProvider: 'QuickMove Transport',
    location: 'Supplier Facility',
    statusBefore: 'Processing',
    statusAfter: 'Ready for Dispatch',
  },
  {
    datetime: '2025-05-01 15:30:05',
    description: 'Shipment ORD-123 arrived at sorting center',
    orderId: 'ORD-123',
    logisticsProvider: 'FastShip Logistics',
    location: 'Sorting Center',
    statusBefore: 'In Transit',
    statusAfter: 'At Sorting Center',
  },
  {
    datetime: '2025-05-01 18:00:00',
    description: 'Shipment ORD-125 delayed due to weather',
    orderId: 'ORD-125',
    logisticsProvider: 'Global Freight',
    location: 'Warehouse B',
    statusBefore: 'Ready for Dispatch',
    statusAfter: 'Delayed',
  },
];

export const AuditLog = () => {
  return (
    <div className="p-3 d-flex flex-column h-100">
      <div className="pb-3">
        <h2>Audit Log</h2>
      </div>
      <div className="audit-log table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Datetime</th>
              <th>Description</th>
              <th>Order ID</th>
              <th>Logistics Provider</th>
              <th>Location</th>
              <th>Status Before</th>
              <th>Status After</th>
            </tr>
          </thead>
          <tbody>
            {auditLogData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.datetime}</td>
                <td>{entry.description}</td>
                <td>{entry.orderId}</td>
                <td>{entry.logisticsProvider}</td>
                <td>{entry.location}</td>
                <td>{entry.statusBefore}</td>
                <td>{entry.statusAfter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
