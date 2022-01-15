import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration:"2000"
});
function Bookingscreen() {
  let params = useParams();

  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const [totalamount, setTotalAmount] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  useEffect(async () => {
    try {
      setloading(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })
      ).data;

      setTotalAmount(data.rentperday * totaldays);

      console.log(data);
      setroom(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }, []);

  async function onToken(token) {
    const BookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", BookingDetails);
      setloading(false);
      Swal.fire("Congratulations","Your Rooms Booked Successfully","success").then(result=>{
        window.location.href='/bookings'
      })

    } catch (error) {
      setloading(false);
      seterror(true);
      Swal.fire("Oops","Something Went Wrong","error")

    }
  }
  return (
    <div className="mt-5" data-aos="fade-left">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigImg" />
          </div>
          <div className="col-md-5">
            <div style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name :{JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                </p>
                <p>Form Date :{params.fromdate} </p>
                <p>To Date : {params.todate}</p>
                <p>Max Count :{room.maxcount}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total Days :{totaldays} </p>
                <p>Rent Per Day :{room.rentperday} </p>
                <p>Total Amount :{totalamount}</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency="INR"
                stripeKey="pk_test_TdqXCqxUgHLKjdJ7woXpluN400eDwSd2LD"
              >
                <button className="btn btn-primary">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
