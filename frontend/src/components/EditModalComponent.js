import React, {useState} from "react";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";

import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import styled from "styled-components";


const TitleStyled = styled.h2`
  display: flex;
  justify-content: flex-start;
`;

const LineStyled = styled.hr`
 padding: 1.5px;
 background: rgb(7,103,195);
background: linear-gradient(90deg, rgba(7,103,195,1) 14%, rgba(175,172,172,1) 14%);
`;


function EditModalComponent(props) {

    const [title, setTitle] = useState('');
    const [client, setClient] = useState('');
    const [crm, setCrm] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleClientChange = (e) => {
        setClient(e.target.value)
    }

    const handleCrmChange = (e) => {
        setCrm(e.target.value)
    }
  
    const handleEditSubmit = async (e) => {
    e.preventDefault();
    let payload = {'title': title, 'client': client, 'crm': crm}
    await axios.post(`http://localhost:5000/tickets/${props.editTicketId}`, payload)
    .then((res) => {
      console.log(res.data, "update");
    })
    await axios
      .get(`http://localhost:5000/api/tickets`)
      .then((res) => {
        console.log(res, "get");
        props.setTickets(res.data);
      })
      .catch((err) => console.log(err));
    props.setShowEditModal(false)
  };
  

  return (
    <Modal show={props.showEditModal} onHide={props.handleClose} backdrop="static" centered>
        <Modal.Body>
          <div className='container'>
            <div>
              <TitleStyled> Edit Ticket</TitleStyled>
            </div>
              <LineStyled />
              <form onSubmit={handleEditSubmit}>
        <div className='row'>
          <div className='col-12'>
            <TextField
              onChange={handleTitleChange}
              id='standard-full-width'
              label='Title*'
              style={{ margin: 8 }}
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <TextField
              onChange={handleClientChange}
              id='standard-full-width'
              label='Client*'
              style={{ margin: 8 }}
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <InputLabel htmlFor='age-native-simple ' style={{ margin: 6 }}>
              --Select crm--
            </InputLabel>
            <Select native onChange={handleCrmChange}>
              <option aria-label='None' value='' />
              <option value={"Robin Bleck"}>Robin Bleck</option>
              <option value={"Ben Borin"}>Ben Borin</option>
              <option value={"Dan Potter"}>Dan Potter</option>
              <option value={"Johnny Zhou"}>Johnny Zhou</option>
            </Select>
          </div>
        </div>
      </form>
            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleEditSubmit}>
        Edit Ticket
        </Button>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel Editing
        </Button>
      </Modal.Footer>
      </Modal>
  );
}

export default EditModalComponent;
