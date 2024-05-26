import React from 'react'
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const TabAccountSettings = props => {
    const [formData,setFormData] = useState({});
    const [showDelete,setShowDelete] = useState(false);

	const  onFinish = (e) => {
		e.preventDefault();
		console.log(formData)
	}

	const setFormValue = (name,value) =>{
		setFormData({...formData, [name]: value })
	}
    return (
        <div>
            <form onSubmit={onFinish} className="">
                <h4 style={{ color: "#dc3545" }}>
                    <strong>Delete Account</strong>
                </h4>
                <hr />
                <Row className="profile-edit">
                    <Col sm={3}>
                        <label htmlFor="name" className="col-form-label" >
                            Confirm Deletion
                        </label>
                    </Col>
                    <Col>
                        <Form.Check
                            inline
                            label="All your data is permenantally deleted, if once account deleted?"
                            name="group1"
                            type={'checkbox'}
                            id={`policy-1`}
                            onClick={(e)=>setFormValue('policy_1',e?.target?.checked)}
                            checked={formData?.policy_1}
                        />
                        <Form.Check
                            inline
                            label="You did not recover your account ever, if once account deleted?"
                            name="group1"
                            type={'checkbox'}
                            id={`policy-2`}
                            onClick={(e)=>setFormValue('policy_2',e?.target?.checked)}
                            checked={formData?.policy_2}
                        />
                    </Col>
                </Row>
                {(!showDelete || !formData?.policy_2 || !formData?.policy_1) && <Button type="submit" size={`md`} variant="outline-danger" className="w-100 my-2" onClick={()=>{setShowDelete(true)}}>Delete Account</Button>}
                {
                    formData?.policy_1 && formData?.policy_2 && showDelete && <div className='my-1'>
                        <div className={`text-danger mb-2`}>Are you sure you wants to delete your account?</div>
                        <input
                            className="form-control mb-2"
                            placeholder='Any Reason to delete your account?'
                            name="desc"
                            onChange={(e)=>setFormValue('desc',e?.target?.value)}
                            value={formData?.desc || ""}
                            required
                        />
                        <div className='d-flex gap-2'>
                            <Button
                                type="submit" 
                                size={`md`} 
                                variant="danger" 
                                className="w-50"
                            >Yes,Delete Account</Button>
                            <Button 
                                size={`md`} 
                                variant="success" 
                                className="w-50" 
                                onClick={()=>{
                                    setFormData({
                                        ...formData,
                                        policy_1:"",
                                        policy_2:"",
                                        desc:"",
                                    });
                                    setShowDelete(false);
                                }}
                            >Cancel</Button>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}

export default TabAccountSettings
