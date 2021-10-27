import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OnSale from "../components/OnSale";
import GetOrders from "../components/GetOrders";
import { fetchUserOrders } from "../redux/ordersRedux";
import { userRequest } from "../requestMetods";
import {
  clearProductFromCartByIndex,
  clearCart,
  addProduct,
} from "../redux/cartRedux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const TopCreateOrder = styled.div`
  width: 100vw;
  height: 60%;
  padding-top: 15vh;
  overflow: scroll;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const OrderButtons = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 20vw;
  height: 9vh;
`;

const Details = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const PriceDetail = styled.div`
  width: 30vw;
  display: flex;

  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div``;
const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveItemButton = styled.button`
  width: 15vw;
  height: 35%;
  padding-right: 1vw;
`;
const FilterSize = styled.select`
  width: 30vw;
`;
const FilterSizeOption = styled.option``;

const Orders = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders(user._id));
  }, [dispatch, user]);

  const emptyCartByIndex = (index) => {
    dispatch(clearProductFromCartByIndex({ index: index }));
  };
  const testDelivery = async () => {
    try {
      const res = await userRequest
        .post("delivery/check", {
          cart: cart,
        })
        .then();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const CreateOrder = async () => {
    if (!user.address) return toast("nema adrese");
    if (cart.products.length > 0) {
      try {
        const res = await userRequest.post(`/orders/create/${user._id}`, {
          userId: user._id,
          products: cart.products.map((item, i) => ({
            productId: item._id,
            size: getProductSize(i),
            price: getProductPrice(i).toFixed(2),
          })),
          amount: getTotal(),
          address: user.address,
          date: Date.now(),
        });

        console.log(res.data);
        toast.success("order completed");
        dispatch(clearCart());
      } catch (error) {}
    } else {
      toast.warning("cart empty");
    }
  };
  const handleChange = (i) => {
    //update price
    document.getElementById("price" + i).innerText =
      "€" + getProductPrice(i).toFixed(2);
    //update total
    document.getElementById("total").innerText = "Ukupno:" + getTotal() + "€";
  };

  const getProductPrice = (cartIndex) => {
    return cart.products[cartIndex].price[
      document.getElementById("size" + cartIndex)?.value
    ];
  };
  const getProductSize = (cartIndex) => {
    return cart.products[cartIndex].size[
      document.getElementById("size" + cartIndex)?.value
    ];
  };

  const getTotal = () => {
    var total = 0;
    cart.products.map(
      (pizza, i) =>
        (total += parseFloat(
          pizza.price[document.getElementById("size" + i)?.value].toFixed(2)
        ))
    );
    return total;
  };

  useEffect(() => {
    cart.products.map(
      (pizza, i) =>
        (document.getElementById("price" + i).innerText =
          "€" +
          pizza.price[document.getElementById("size" + i)?.value].toFixed(2))
    );
  }, [cart.products]);

  return (
    <div>
      <ToastContainer />
      <OnSale />
      <Navbar />
      <Container>
        <TopCreateOrder>
          {cart.products.length > 0 && (
            <Info>
              {cart.products.map((product, cartIndex) => (
                <Product key={cartIndex}>
                  <ProductDetail>
                    <Image src={product?.img} />
                    <Details>
                      <ProductName>
                        <b>Pizza:</b> {product?.name}
                      </ProductName>

                      <FilterSize
                        id={"size" + cartIndex}
                        placeholder="Select option"
                        defaultValue="1"
                        onChange={() => handleChange(cartIndex)}
                      >
                        {product.size.map((size, i) => (
                          <FilterSizeOption key={i} value={i}>
                            {size}
                          </FilterSizeOption>
                        ))}
                      </FilterSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice id={"price" + cartIndex}>
                      €{getProductPrice(cartIndex)}
                    </ProductPrice>
                    <RemoveItemButton
                      onClick={() => emptyCartByIndex(cartIndex)}
                    >
                      delete
                    </RemoveItemButton>
                    <RemoveItemButton
                      onClick={() => dispatch(addProduct(product))}
                    >
                      add
                    </RemoveItemButton>
                  </PriceDetail>
                </Product>
              ))}
              <TotalRow id={"total"}>Ukupno:{getTotal()} €</TotalRow>
              <OrderButtons>
                <button onClick={() => dispatch(clearCart())}>
                  clear cart
                </button>
                <button onClick={() => CreateOrder()}>order</button>
                <button onClick={() => testDelivery()}>check delivery</button>
              </OrderButtons>
            </Info>
          )}
        </TopCreateOrder>
        <GetOrders />
      </Container>
      <Footer />
    </div>
  );
};

export default Orders;
