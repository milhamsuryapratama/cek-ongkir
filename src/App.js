import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class App extends Component {

  constructor() {
    super();
    this.state = {
      provinsi: [],
      kotaAsal: [],
      kotaTujuan: [],
      data: {
        origin: '',
        destination: '',
        weight: '',
        courier: ''
      },
      hasil: []
    }
    this.handleProvince = this.handleProvince.bind(this);
    this.handleProvinceTujuan = this.handleProvinceTujuan.bind(this);
    this.handleWeightandCourier = this.handleWeightandCourier.bind(this);
    this.handleCourier = this.handleCourier.bind(this);
    this.handleKotaAsal = this.handleKotaAsal.bind(this);
    this.handleKotaTujuan = this.handleKotaTujuan.bind(this);
    this.cekOngkir = this.cekOngkir.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3011/provinsi')
      .then(response => {
        this.setState({
          provinsi: response.data.rajaongkir.results
        })
        // return axios.get('http://localhost:3011/kota')
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleProvince(e) {
    const id = e.target.value;
    axios.get(`http://localhost:3011/kota/${id}`)
      .then(response => {
        this.setState({
          kotaAsal: response.data.rajaongkir.results
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleProvinceTujuan(e) {
    const id = e.target.value;
    axios.get(`http://localhost:3011/kota/${id}`)
      .then(response => {
        this.setState({
          kotaTujuan: response.data.rajaongkir.results
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleWeightandCourier = (name, value) => {
    const data = this.state.data
    data[name] = value
  }

  handleCourier(e) {
    const data = this.state.data
    const value = e.target.value;
    data['courier'] = value;
  }

  handleKotaAsal(e) {
    const data = this.state.data
    const value = e.target.value;
    data['origin'] = value;
  }

  handleKotaTujuan(e) {
    const data = this.state.data
    const value = e.target.value;
    data['destination'] = value;
  }

  cekOngkir(e) {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('origin', this.state.data.origin);
    // formData.append('destination', this.state.data.destination);
    // formData.append('weight', this.state.data.weight);
    // formData.append('courier', this.state.data.courier);
    axios.post('http://localhost:3011/ongkir', {
      origin: this.state.data.origin,
      destination: this.state.data.destination,
      weight: this.state.data.weight,
      courier: this.state.data.courier
    })
      .then(response => {
        this.setState({
          hasil: response.data.rajaongkir.results[0].costs
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <strong><h2>Cek Ongkos Kirim</h2></strong>
        <form onSubmit={this.cekOngkir}>
          <select onChange={this.handleProvince}>
            {this.state.provinsi.map(function (r, i) {
              return <option key={r.province_id} value={r.province_id}>{r.province}</option>
            })}
          </select>
          <br />
          <br />
          <select onChange={this.handleKotaAsal}>
            {this.state.kotaAsal.map(function (r, i) {
              return <option key={r.city_id} value={r.city_id}>{r.type} {r.city_name}</option>
            })}
          </select>
          <hr />
          <select onChange={this.handleProvinceTujuan}>
            {this.state.provinsi.map(function (r, i) {
              return <option key={r.province_id} value={r.province_id}>{r.province}</option>
            })}
          </select>
          <br />
          <br />
          <select onChange={this.handleKotaTujuan}>
            {this.state.kotaTujuan.map(function (r, i) {
              return <option key={r.city_id} value={r.city_id}>{r.type} {r.city_name}</option>
            })}
          </select>
          <hr />
          <input
            type="text"
            placeholder="Isi Berat"
            onChange={event => this.handleWeightandCourier('weight', event.target.value)}
          />
          <br />
          <br />
          <select onChange={this.handleCourier}>
            <option>-- PILIH KURIR --</option>
            <option value="jne">JNE</option>
            <option value="pos">POS</option>
            <option value="tiki">TIKI</option>
          </select>
          <br />
          <br />
          <button>Cek</button>
          <hr />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th">Sercice</TableCell>
                <TableCell component="th">Ongkos</TableCell>
                <TableCell component="th">ETD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.hasil.map(function (r, i) {
                return <TableRow key={i}>
                  <TableCell>{r.service} ({r.description})</TableCell>
                  <TableCell>{r.cost[0].value}</TableCell>
                  <TableCell>{r.cost[0].etd} hari</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </form>
      </div>
    );
  }
}


export default App;
