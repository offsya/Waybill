import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Company = () => {


    const [name, setName] = useState(null)
    const [modalname, setmodalName] = useState(false)
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL + 'api/company/get/all').then((res) => {
            console.log(res.data[0]);
            setData(res.data);
        });
    }, [])

    const [del, setDel] = useState([false, null])

    const send = async function() {
        if(name == null){
            alert("Заполните все поля");
        }else {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL + 'api/company/save', {name})
                console.log(res)
            } catch (e) {
                console.log(e)
            }

            data.push({'name': name})
            if(del[0]){
                removePost(del[1])
            }
            setModal(!modal)
        }
    }


    const removePost = (index) => {
        try{
            const res = axios.delete(process.env.REACT_APP_API_URL + 'api/company/delete', {data: data[index]});
            console.log(res)
        }catch (e){
            alert(e)
        }
        console.log('helo');
        console.log(data[index]);
        setData(data.filter(p => p !== data[index]));
    }


    const change = (index) => {
        setName(data[index].name);
        setModal(true);
        setDel([true, index]);
    }

    return (
        <div>


            <Modal.Dialog style={{display: modal ? 'block' : 'none'}}>
                <Modal.Header closeButton onClick={() => {setModal(!modal); setDel([false, null]);}}>
                    <Modal.Title>Добавить Компанию</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя компании</Form.Label>
                            <Form.Control onChange={(e) => {setName(e.target.value)}} onClick={() => {setmodalName(!modalname);}} type="text" value={name} placeholder="" />
                            <div className="select" style={{display: modalname ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setmodalName(!modalname); setName(obj.name); e.preventDefault();}} className="option">{obj.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => {setModal(!modal); setDel([false, null]);}} variant="secondary">Закрыть</Button>
                    <Button onClick={() => {send()}} variant="primary">Сохранить</Button>
                </Modal.Footer>
            </Modal.Dialog>

            <div><button onClick={() => {setModal(!modal); setDel([false, null]);}} style={{background: '#212529', color: 'white', marginTop: '-100px', border: 'none', width: '100%'}}>Добавить новую Компанию</button></div>


            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя компании</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((obj, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{obj.name}</td>
                                <td><button style={{border: 'none', background: 'none'}} onClick={() => {change(index)}}>✓</button></td>
                                <td><button style={{border: 'none', background: 'none'}} onClick={() => {removePost(index)}}>X</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default Company;