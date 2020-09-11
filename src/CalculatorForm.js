import React from 'react';
import {Card, Form, Col, Row, Button, InputGroup} from 'react-bootstrap'

class CalculatorForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            amount: '',
            rate: '',
            term: 1,
            frequency: '',
            numberOfPayments: 0.0,
            mortgagePayment: 0.0,
            totalInterest: 0.0,
            totalCost: 0.0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let result = this.computeResults();
        this.setState({
            numberOfPayments: result.numberOfPayments,
            mortgagePayment: result.mortgagePayment,
            totalInterest: result.totalInterest,
            totalCost: result.totalCost
        });
    }


    computeResults(){

        const principal = parseFloat(this.state.amount);
        const interestRate = parseFloat(this.state.rate) / 100 /12;
        const numberOfPayments = parseFloat(this.state.term) * this.state.frequency; //monthly
    
        //calculate mortgage payment 
        const x = Math.pow(1 + interestRate, numberOfPayments);
        const monthly = (principal * x * interestRate)/(x-1);
        const mortgagePayment = monthly.toFixed(2);
    
        const totalInterest = (monthly * numberOfPayments - principal).toFixed(2);
    
        const totalCost = (monthly * numberOfPayments).toFixed(2);
    
        return {
            numberOfPayments: numberOfPayments,
            mortgagePayment: mortgagePayment,
            totalInterest: totalInterest,
            totalCost: totalCost
        }
    }

    
    render(){
        return(
            <div>
                <div className="app-padding">
                    <h2>Mortgage Calculator</h2>
                    <p>This Mortgage Calculator will calculate your mortgage payment. It will also determine
                        your estimated payments for mortgage, and interest rates </p>
                </div>
                <Card>
                    <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Mortgage amount
                            </Form.Label>
                            <Col sm={3}>
                                <InputGroup className="mb-2 mr-sm-2">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                    id="mortgageAmount"
                                    value={this.state.amount} 
                                    onChange={this.handleChange} 
                                    type="number" 
                                    name="amount"
                                    placeholder="100000.00" />
                                </InputGroup>
                                <Form.Text id="passwordHelpBlock" muted>
                                    Amount to be paid per period
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Interest rate
                            </Form.Label>
                            <Col sm={3}>
                                <InputGroup className="mb-2 mr-sm-2">
                                    <Form.Control 
                                    type="number" 
                                    name="rate"
                                    value={this.state.rate}
                                    onChange={this.handleChange}
                                    placeholder="1" />
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Term
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control 
                                as="select"
                                name="term"
                                defaultValue={this.state.term}
                                onChange={this.handleChange}>
                                    <option value="1">1 year</option>
                                    <option value="2">2 years</option>
                                </Form.Control>
                                <Form.Text id="passwordHelpBlock" muted>
                                    The number of term years
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Payment frequency
                            </Form.Label>
                            <Col sm={3}>
                                <InputGroup className="mb-2 mr-sm-2">
                                    <Form.Control 
                                    type="number" 
                                    name="frequency"
                                    value={this.state.frequency}
                                    onChange={this.handleChange}
                                    placeholder="12" />
                                </InputGroup>
                                <Form.Text id="passwordHelpBlock" muted>
                                    The payment frequency in months
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" value="Submit">Calculate</Button>
                            </Col>
                        </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>

                <Row style={{margin: '0.5em'}}>
                    <Col style={{marginRight: '1em'}} md="auto" className="fill-box summary-margin">
                        <h2>${this.state.totalInterest}</h2>
                        <p>Total interest</p>
                    </Col>
                    <Col style={{marginRight: '1em'}} md="auto" className="fill-box">
                        <h2>${this.state.totalCost}</h2>
                        <p>Total cost</p>
                    </Col>
                    <Col style={{marginRight: '1em'}} md="auto"  className="fill-box">
                        <h2>${this.state.mortgagePayment}</h2>
                        <p>Mortgage payment</p>
                    </Col>
                    <Col style={{marginRight: '1em'}}md="auto"  className="fill-box">
                        <h2>{this.state.numberOfPayments}</h2>
                        <p>Number of payments</p>
                    </Col>
                </Row>
            </div>

        )

    }

}

export default CalculatorForm;