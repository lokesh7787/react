import React, { Component } from "react";
import { Form, Text, Scope } from "informed";
import BaseJoi from "joi";
import Extension from "joi-date-extensions";
import "./App.scss";

const Joi = BaseJoi.extend(Extension);
class FormValidation extends Component {
  schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .required(),
    dob: Joi.date()
      .format("DD-MM-YYYY")
      .required(),
    address: Joi.object({
      line1: Joi.required(),
      line2: Joi.optional(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      zip: Joi.number()
        .integer()
        .min(100000)
        .max(999999)
    }).required()
  });

  state = {
    errors: [],
    sucess: null,
    user: {
      name: "Lokesh",
      dob: "10-12-2302",
      line1: "no-25c thamari street",
      line2: "saraswathi nagar Avadi",
      city: "chennai",
      state: "tamilnadu",
      country: "india"
    }
  };

  handlesubmit = response => {
    const result = Joi.validate(response, this.schema, { abortEarly: false });
    this.setState({ errors: [], success: null });
    console.log(result);
    if (result && result.error && result.error["message"]) {
      this.setState({
        errors: result.error.details
      });
      return false;
    }

    this.setState({ success: "Success" });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="container p-5 Appsass">
        <Form onSubmit={this.handlesubmit}>
          <div className="form-group">
            <label htmlFor="name" className="required">
              Full Name
            </label>
            <Text
              field="name"
              initialValue={user["name"]}
              id="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="required">
              Date of Birth
            </label>
            <Text
              field="dob"
              initialValue={user["dob"]}
              id="dob"
              className="form-control"
            />
          </div>
          <Scope scope="address">
            <div className="form-group">
              <label htmlFor="line1" className="required">
                Line1
              </label>
              <Text
                field="line1"
                initialValue={user["line1"]}
                id="line1"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="line2" className="required">
                Line2
              </label>
              <Text
                field="line2"
                initialValue={user["line2"]}
                id="line2"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="required">
                city
              </label>
              <Text
                field="city"
                initialValue={user["city"]}
                id="city"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="required">
                state
              </label>
              <Text
                field="state"
                initialValue={user["state"]}
                id="state"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country" className="required">
                country
              </label>
              <Text
                field="country"
                initialValue={user["country"]}
                id="country"
                className="form-control"
              />
            </div>
            {/* <div className="chid-div">
              <div style={{ display: "inline-block" }}>
                <div>line1:</div>
                <div>
                  <Text field="line1" />
                </div>
              </div>
              <div>
                <div>line2:</div>
                <div>
                  <Text field="line2" />
                </div>
              </div> */}
            {/* <div>
                <div>city:</div>
                <div>
                  <Text field="city" />
                </div>
              </div>
              <div>
                <div>state:</div>
                <div>
                  <Text field="state" />
                </div>
              </div>
              <div>
                <div>country:</div>
                <div>
                  <Text field="country" />
                </div>
              </div>
              <div>
                <div>zip:</div>
                <div>
                  <Text field="zip" />
                </div>
              </div>
            </div> */}
          </Scope>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <div />
          {this.state.errors && this.state.errors.length > 0 && (
            <ul>
              {this.state.errors.map((error, idx) => {
                return <li key={idx}>{error["message"]}</li>;
              })}
            </ul>
          )}
          {this.state.success && <div>{this.state.success}</div>}
        </Form>
      </div>
    );
  }
}

export default FormValidation;
