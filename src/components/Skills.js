import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdAddCircleOutline, MdEdit,MdCancel, MdOutlineCancel } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
function Skills() {

  const skills = useSelector(state => state.skills)
  const dispatch = useDispatch();
  const {addSkill, removeSkill} = bindActionCreators(actionCreators, dispatch);

  // const [skills, setSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  }
  const handleClear = () => {
    skills.map(() => {
      return (
        removeSkill()
      )
    })
  }
  const handleShow = () => setShow(true);
  const [isEdit, setIsEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  const [input, setInput] = useState("")
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSkills = (e) => {
    e.preventDefault();
    const valid = e.currentTarget;
    if (!valid.checkValidity()) {
      setValidated(true);
    }
    else {
      setIsEdit(true);
      addSkill(input)
      // setSkills([...skills, input]);
      setInput("");
    }
  }

  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id)
    setAlert(true);
  }
  const handleDelete = (id) => {
    removeSkill(id)
    // skills.splice(id, 1);
    // setSkills(skills);
    setAlert(false);
    // if (skills.length === 0) {
    //   setIsEdit(false);
    // }
  }
  useEffect(()=>{
    if (skills.length === 0) {
      setIsEdit(false);
    }
  },[skills])

  return (
    <Row className="justify-content-center mt-2 ">
      <Col md={8} sm={12} className="d-flex justify-content-between align-items-center bg-light rounded about_sec">
        <h5 className="m-0 heading">Skills</h5>
        {!isEdit && <MdAddCircleOutline size={30} className="rounded edit" onClick={handleShow} />}
        {isEdit && <MdEdit size={30} className="rounded edit" onClick={handleShow} />}
      </Col>
      <Col md={8} sm={12} className='skills_sec'>
        <Row className="border-bottom pt-3">
          <Col md={12} className="d-flex flex-wrap">
            {
              skills.map((items, id) => {
                return (
                  <p className="technology rounded" key={id}>{items}</p>
                )
              })
            }


          </Col>
        </Row>

      </Col>
      <Modal show={show} onHide={handleClose} centered backdrop="static" className='modal_profile_details'>
        <Modal.Header>
          <Modal.Title>Skills</Modal.Title>
          <div>
          <MdCancel size={30} className="rounded edit" onClick={handleClose} />         
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} className="mb-2" onSubmit={handleSkills}>
            <Form.Group className="">
              <Form.Control required type="text" size="sm" placeholder="Enter Skill" value={input} onChange={handleInput} />
            </Form.Group>
            <button type="submit" className="button mt-3">
           <span> Add Skill</span>  
            </button>
            <button onClick={handleClear} className="button mt-3 ms-4">
           <span> Clear Skills</span>  
            </button>
          </Form>
          <hr></hr>
          <div className="d-flex flex-wrap">
            {
              skills.map((items, id) => {
                return (
                  <p key={id} className="technology rounded ">{items} &nbsp; <MdOutlineCancel className="delete rounded" onClick={() => { handleAlert(id) }} /></p>
                )
              })
            }
          </div>
        </Modal.Body>

      </Modal>
      <Modal show={Alert} onHide={handleAlertClose} className="text-center modal_profile_details" size="sm" centered >
        <Modal.Body>
          <h4>Are you sure ?</h4>
          <ImCheckmark size={30} className="rounded edit" onClick={() => { handleDelete(deleteId) }} />
          <ImCross size={25} className="rounded edit" onClick={handleAlertClose} />
        </Modal.Body>
      </Modal>
    </Row>
  )
}

export default Skills