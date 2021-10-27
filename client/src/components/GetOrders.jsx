import React from "react";
import { useSelector } from "react-redux";
import OrdersRow from "../components/OrdersRow";
const GetOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.user.currentUser);
  let heading;
  let noOrdersMessage;
  let sortedItems;

  const isAdmin = user.isAdmin;

  //sort orders by date
  if (orders) {
    const items = [...orders];
    if (isAdmin) {
      if (items) {
        sortedItems = items
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((o, i) => <OrdersRow key={o._id} order={o} index={i} />);
      }
      heading = "Pending Orders";
      noOrdersMessage = "There are currently no pending orders!";
    } else {
      if (items) {
        sortedItems = items
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((o, i) => <OrdersRow key={o._id} order={o} index={i} />);
      }
      heading = "My Orders";
      noOrdersMessage = "You have not made any orders!";
    }
  }

  return (
    <div className="container" style={{ overflow: "scroll" }}>
      <h2 className="text-center">{heading}</h2>
      <div className="row">
        <div className="col-md-12" id="customer-orders">
          <div className="box">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>View</th>
                    {isAdmin && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>{sortedItems}</tbody>
              </table>
              {!orders && <h3 className="text-warning">{noOrdersMessage}</h3>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetOrders;
