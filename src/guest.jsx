import React, {Component} from 'react';
import axios from 'axios';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup} from 'reactstrap';

class Guests extends Component{
	
	state = { 
		guests: [],
		newGuestData: {
			firstName: '',
			middleName: '',
			lastName: '',
			birthDate: ''
		},
		editGuestData: {
			id:'',
			firstName: '',
			middleName: '',
			lastName: '',
			birthDate: ''
		},
		newGuestModal: false,
		editGuestModal: false
	}
	componentWillMount(){
		this._refreshGuests();
	}
	toggleNewGuestModal(){
		this.setState({
			newGuestModal: ! this.state.newGuestModal
		});
	}
	toggleEditGuestModal() {
		this.setState({
		  editGuestModal: ! this.state.editGuestModal
		});
	  }
	addGuest(){
		axios.post("http://localhost:8080/HotelBooking/rest/guests", this.state.newGuestData).then((response)=>{
		this._refreshGuests();	
		let { guests } = this.state;
			guests.push(response.data);
			this.setState({ guests, newGuestModal: false, newGuestData: {
				firstName: '',
				middleName: '',
				laststName: '',
				birthDate: ''
				}
			}); 
		});
	}
	updateGuest() {
		let { firstName, middleName, lastName, birthDate } = this.state.editGuestData;
	
		axios.put("http://localhost:8080/HotelBooking/rest/guests/" + this.state.editGuestData.id, {
			firstName, middleName, lastName, birthDate
		}).then((response) => {
			console.log(response.data)
			this._refreshGuests();
	this.setState({
			  editGuestModal: false, editGuestData: { id: '', firstName: '', middleName: '', lastName: '', birthDate: '' }
			})
			
		});
	}
	editGuest(id, firstName, middleName, lastName, birthDate) {
		this.setState({
			editGuestData: { id, firstName, middleName, lastName, birthDate }, editGuestModal: ! this.state.editGuestModal
		});
	}
	deleteGuest(id) {
	axios.delete("http://localhost:8080/HotelBooking/rest/guests/" + id).then((response) => {
		this._refreshGuests();
	});
	}
	_refreshGuests() {
	axios.get("http://localhost:8080/HotelBooking/rest/guests").then((response) => {
		this.setState({
		guests: response.data
		})
	});
	}
	render(){ 
		let guests = this.state.guests.map((guest)=>{
			return(
				<tr key={guest.id}>
						<td>{guest.id}</td>
						<td>{guest.firstName}</td>
						<td>{guest.middleName}</td>
						<td>{guest.lastName}</td>
						<td>{guest.birthDate}</td>
						<td>
							<Button color = "success" size="md"className="mr-2" onClick={this.editGuest.bind(this, guest.id, guest.firstName, guest.middleName, guest.lastName, guest.birthDate)}>Edit</Button>
							<Button color = "danger" size="md" onClick={this.deleteGuest.bind(this, guest.id)}>Delete</Button>
						</td>
				</tr>
			)
		});
	
		return(	
		<div className="App container"><h2>Guest List</h2> 
		
		<Button color="primary" onClick={this.toggleNewGuestModal.bind(this)} className="my-3">Add Guest</Button>
		<Modal isOpen={this.state.newGuestModal} toggle={this.toggleNewGuestModal.bind(this)}>
			<ModalHeader toggle={this.toggleNewGuestModal.bind(this)}>Add a new guest</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="firstName">First Name</Label>
					<Input id="firstName" value={this.state.newGuestData.firstName} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.firstName = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="middleName">Middle Name (Optional)</Label>
					<Input id="middleName" value={this.state.newGuestData.middleName} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.middleName = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="lastName">Last Name</Label>
					<Input id="lastName" value={this.state.newGuestData.lastName} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.lastName = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="birthDate">BirthDate</Label>
					<Input type="date" id="birthDate" value={this.state.newGuestData.birthDate} onChange={(e) => {
					let { newGuestData } = this.state;

					newGuestData.birthDate = e.target.value;

					this.setState({ newGuestData });
					}} />
				</FormGroup>

			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={this.addGuest.bind(this)}>Add Guest</Button>{' '}
				<Button color="secondary" onClick={this.toggleNewGuestModal.bind(this)}>Cancel</Button>
        	</ModalFooter>
		</Modal>
		<Modal isOpen={this.state.editGuestModal} toggle={this.toggleEditGuestModal.bind(this)}>
			<ModalHeader toggle={this.toggleEditGuestModal.bind(this)}>Edit a new guest</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="firstName">First Name</Label>
					<Input id="firstName" value={this.state.editGuestData.firstName} onChange={(e) => {
						let { editGuestData } = this.state;

						editGuestData.firstName = e.target.value;

						this.setState({ editGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="middleName">Middle Name (Optional)</Label>
					<Input id="middleName" value={this.state.editGuestData.middleName} onChange={(e) => {
					let { editGuestData } = this.state;

					editGuestData.middleName = e.target.value;

					this.setState({ editGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="lastName">Last Name</Label>
					<Input id="lastName" value={this.state.editGuestData.lastName} onChange={(e) => {
					let { editGuestData } = this.state;

					editGuestData.lastName = e.target.value;

					this.setState({ editGuestData });
					}} />
				</FormGroup>
				<FormGroup>
					<Label for="birthDate">birthDate</Label>
					<Input type="date" id="birthDate" value={this.state.editGuestData.birthDate} onChange={(e) => {
					let { editGuestData } = this.state;

					editGuestData.birthDate = e.target.value;

					this.setState({ editGuestData });
					}} />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
			<Button color="primary" onClick={this.updateGuest.bind(this)}>Update Guest</Button>{' '}
			<Button color="secondary" onClick={this.toggleEditGuestModal.bind(this)}>Cancel</Button>
			</ModalFooter>
    	</Modal>
			<Table>
				<thead>
					<tr>
						<th>Guest ID</th>
						<th>First Name</th>
						<th>Middle Name</th>
						<th>Last Name</th>
						<th>Birth Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{guests}
				</tbody>
			</Table>
			</div>
			
		);
	}
}
export default Guests;