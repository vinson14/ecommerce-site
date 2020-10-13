import React from "react";
import { Table, Button } from "react-bootstrap";

class CartTable extends React.Component {
    getTotalCost = () => {
        if (!this.props.cart) {
            return 0;
        }

        let totalCost = 0;

        for (let i = 0; i < this.props.cart.length; i++) {
            totalCost +=
                this.props.cart[i].quantity * this.props.cart[i].product_price;
        }

        return totalCost;
    };

    render() {
        const cartRows = this.props.cart.map((item) => (
            <tr key={item.id} className="text-center">
                <td>{item.product_name}</td>
                <td>{item.product_price}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity * item.product_price}</td>
                <td>
                    <Button
                        onClick={(e) => this.props.deleteProduct(item.id, e)}
                        variant="outline-dark"
                        className="mx-3"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

        const tableFoot = (
            <tfoot>
                <tr>
                    <td colSpan="3" className="text-right font-weight-bold">
                        Total Price:
                    </td>
                    <td className="text-center">{this.getTotalCost()}</td>
                </tr>
            </tfoot>
        );

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>{cartRows}</tbody>
                {tableFoot}
            </Table>
        );
    }
}

export default CartTable;
