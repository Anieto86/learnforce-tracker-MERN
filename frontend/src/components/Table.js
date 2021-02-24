import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

//todo styled and icons
import { Dropdown } from "react-bootstrap";

import { FaFilter, FaCloudUploadAlt } from "react-icons/fa";

import EditModalComponent from "./EditModalComponent";

//todo styled and icons
import styled from "styled-components";

const TitleStyled = styled.h2`
  display: flex;
  justify-content: flex-start;
`;

const LineStyled = styled.hr`
  padding: 1.5px;
  background: rgb(7, 103, 195);
  background: linear-gradient(
    90deg,
    rgba(7, 103, 195, 1) 14%,
    rgba(175, 172, 172, 1) 14%
  );
  margin-bottom: 30px;
`;

const ButtonStyle = styled.button`
  border: 1px solid #21262e;
`;

const InputStyle = styled.input`
  border: 1px solid #21262e;
`;

const SearchStyle = styled.div`
  position: relative;
  color: #aaa;
  font-size: 16px;
`;

const TableStyle = styled.table`
  margin-top: 50px;
  text-align: left;
  overflow: auto;
  max-height: 100px;
`;

const StyledDropdown = styled.div`
  color: #0599fd;
  .remove-caret.dropdown-toggle::after {
    display: none;
  }
`;



function Table() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTicketId, setEditTicketId] = useState("");

  console.log(showEditModal, "show edit modal");

  //!API Call
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tickets`)
      .then((res) => {
        console.log(res, "get");
        setTickets(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

 
  const searchTicket = tickets.filter((ticket) => {
    return ticket.title.toLowerCase().includes(search.toLowerCase());
  });

  const statusUpdateClick = async (id) => {
    await axios
      .put(`http://localhost:5000/api/tickets/${id}`)
      .then((res) => {
        console.log(res.data, "update");
      })
      .catch((err) => console.log(err));
  };

  const deleteTicket = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/tickets/${id}`)
      .then((res) => {
        console.log(res.data, "delete");
      })
      .catch((err) => console.log(err));
    await axios
      .get(`http://localhost:5000/api/tickets`)
      .then((res) => {
        console.log(res, "get");
        setTickets(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  const launchEditModal = useCallback((id) => {
    setEditTicketId(id);
    setShowEditModal(true);
  }, []);

  return (
    <div className='container'>
      <div>
        <TitleStyled> Feature Request Tracker</TitleStyled>
      </div>

      <LineStyled />

      <div className='row' style={{ marginBotton: "10px" }}>
        <SearchStyle className='col-7 d-grid block'>
          <InputStyle
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type='text'
            className='form-control'
            id='formGroupExampleInput'
            placeholder='filter by title'
          />
        </SearchStyle>

        <div className='col-3 d-grid block'>
          <ButtonStyle className='btn btn '>
            <FaFilter />
            Show filter options
          </ButtonStyle>
        </div>
        <div className='col-2 d-grid block'>
          <ButtonStyle className='btn btn '>
            <FaCloudUploadAlt /> Export CSV
          </ButtonStyle>
        </div>
      </div>

      <TableStyle className='container table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>TITLE</th>
            <th scope='col'>CLIENT</th>
            <th scope='col'>CRM</th>
            <th scope='col'>SUBMITED</th>
            <th scope='col'>STATUS</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {console.log(tickets, "tickets")}
          {searchTicket.map((ticket, i) => (
            <tr key={i}>
              <th scope='row'>{ticket.id}</th>
              <td>{ticket.title}</td>
              <td>{ticket.client}</td>
              <td>{ticket.crm}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              <td>{ticket.status}</td>
              <td>
                <StyledDropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ color: "#0599fd", size: "20px" }}
                      variant='btn btn'
                      id='dropdown-basic'
                      className='remove-caret'
                    >
                      {" "}
                      ...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Header
                        eventKey='baudratestate2400'
                        className='set-status-header'
                      >
                        Set status
                      </Dropdown.Header>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        style={{ color: "#0599fd" }}
                        as='button'
                        onClick={() => statusUpdateClick(ticket.id, "BACKLOG")}
                        eventKey={ticket.id}
                      >
                        Backlog
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ color: "#0599fd" }}
                        as='button'
                        onClick={() => statusUpdateClick(ticket.id, "PLANNED")}
                        eventKey={ticket.id}
                      >
                        Planned
                      </Dropdown.Item>
                      <Dropdown.Item
                        style={{ color: "#0599fd" }}
                        as='button'
                        onClick={() =>
                          statusUpdateClick(ticket.id, "IN DEVELOPMENT")
                        }
                        eventKey={ticket.id}
                      >
                        In Development
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header
                        eventKey='baudratestate9600'
                        className='actions-header'
                      >
                        Actions
                      </Dropdown.Header>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        style={{ color: "#0599fd" }}
                        eventKey='baudratestate9600'
                        onClick={() => launchEditModal(ticket.id)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        as='button'
                        eventKey='baudratestate9600'
                        onClick={() => deleteTicket(ticket.id)}
                        style={{ color: "#0599fd" }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </StyledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyle>

      {showEditModal && (
        <EditModalComponent
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          handleClose={handleClose}
          editTicketId={editTicketId}
          setTickets={setTickets}
        />
      )}
    </div>
  );
}

export default Table;

