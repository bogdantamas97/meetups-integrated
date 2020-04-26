import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

//TODO delete when scrum is over.
export default class DateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello world!"
    };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/events?_expand=users").then(result => {
      result.data.map(item => {
        this.timestampToDateTimeConversion(item.timestamp);
      });
    });
  }

  timestampToDateTimeConversion(timestamp) {
    //JS Variant
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let milisecs = date.getUTCMilliseconds();
    let day = date.getUTCDay();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();

    // var dayMoment = moment.unix(timestamp);
    // console.log(dayMoment.format("hh:mm"));

    //MomentJS -recommended
    console.log(moment.unix(timestamp).format("DD MMM 'YY   hh:mm"));
  }

  render() {
    return <div> Hello </div>;
  }
}
