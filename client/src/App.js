import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataRows: this.props.data,
      selectedRows: [],
      selected: false,
      data: null
    }
    this.selectAll = this.selectAll.bind(this)
    this.selectRow = this.selectRow.bind(this)
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  selectAll() {
    if (this.checkIfSelected()) {
      this.setState({
        selectedRows: [],
      })
    } else {
      this.setState({
        selectedRows: this.state.dataRows
      })
    }
  }
  
  checkIfSelected() {
    let a = new Set(this.state.dataRows)
    let b = new Set(this.state.selectedRows)
    
    return (a.size === b.size && [...a].every(value => b.has(value)))
  }
  
  selectRow(event, row) {
    if (!this.state.selectedRows.includes(row)) {
      this.setState({
        selectedRows: [...this.state.selectedRows, row]
      })
    } else {
      let filtered = this.state.selectedRows.filter(item => item !== row)
      this.setState({
        selectedRows: filtered
      })
    }
  }
  
  renderHeaders() {
    return (
      <tr>
        <th scope="col"><input onChange={this.selectAll} type="checkbox" checked={this.checkIfSelected()}/></th>
        {Object.keys(this.state.dataRows[0]).map(key => <th key={key}>{key}</th>)}
      </tr>
    )
  }
  
  renderRows() {
    return (
      this.state.dataRows.map(row => {
        return(
        <tr key={row.id}>
          <th scope='row'><input onChange={(e) => this.selectRow(e, row)} type="checkbox" checked={this.state.selectedRows.includes(row)} /></th>
          {Object.values(row).map(item => {return(<td key={item}>{item}</td>)})}
        </tr>
        )
      })
    )
  }

  renderButtons() {
    let status = !this.state.selectedRows.length > 0

    return(
      <ButtonToolbar aria-label="Toolbar with button groups" className='ToolBar'>
        <ButtonGroup className="me-2" aria-label="Block/unblock">
          <Button  variant='warning' type='submit' disabled={status}>Block</Button> <Button variant='success' type='submit' disabled={status}>Unblock</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Delete">
          <Button variant='danger' type='submit' disabled={status}>Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    )
  }

  render() {
    return (
      <form>
        <Row className='my-2'>
          <Col lg={{span: 3, offset: 9}} sm={8}>
            <ButtonToolbar aria-label="Toolbar with button groups" className='ToolBar'>
              {this.renderButtons()}
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col lg={{span: 10, offset: 1}} sm={12}>
            <Table striped hover>
              <thead>
                {this.renderHeaders()}
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </form>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired
}

export default App;

