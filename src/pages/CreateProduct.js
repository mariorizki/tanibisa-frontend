import React, { Component } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { connect } from 'react-redux';
import { getCommodities } from '../redux/actions/commodities';
import Form from '../components/Form';

import Footer from '../components/Footer';
import { addProduct } from '../redux/actions/addproduct';

const StyledDiv = styled.div`
  text-align: center;
  margin: 100px 0;
`;

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      price: '',
      commodity_id: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(getCommodities());
  }

  onChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log('submit for create product');
    event.preventDefault();

    if (this.state.price && this.state.commodity_id) {
      this.props.dispatch(
        // this is a thunk in actions
        addProduct({
          price: Number(this.state.price),
          commodity_id: this.state.commodity_id
        })
      );
    } else {
      console.error('One of the add product input is missing');
    }
  };

  render() {
    return (
      <div>
        <Navigation />
        <StyledDiv>
          <h3>CREATE YOUR PRODUCT</h3>

          <Form onSubmit={this.handleSubmit}>
            <select name="commodity_id" onChange={this.onChange}>
              {this.props.commodities &&
                this.props.commodities.map(commodity => {
                  return (
                    <option value={commodity._id} key={commodity.id}>
                      {commodity.name}
                    </option>
                  );
                })}
            </select>

            <p>Price</p>

            <input
              name="price"
              onChange={this.onChange}
              value={this.state.price}
              type="number"
              placeholder="price"
            />

            <input type="submit" value="Create Product" />
          </Form>
        </StyledDiv>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.commodities.isLoading,
    commodities: state.commodities.data,
    farmers: state.farmers.data
  };
};

export default connect(mapStateToProps)(CreateProduct);
