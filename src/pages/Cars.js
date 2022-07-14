import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Cars = () => {


    const [carBand, setCarBand] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [modalcarBand, setmodalCarBand] = useState(false);
    const [modalregistrationNumber, setmodalRegistrationNumber] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL + 'api/car/get/all').then((res) => {
            console.log(res.data[0]);
            setData(res.data);
        });
    }, [])

    const [del, setDel] = useState([false, null])

    const send = async function() {
        if(carBand == null || registrationNumber == null){
            alert("Заполните все поля");
        }else {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL + 'api/car/save', {carBand, registrationNumber})
                console.log(res)
            } catch (e) {
                console.log(e)
            }

            data.push({'carBand': carBand, 'registrationNumber': registrationNumber})
            if(del[0]){
                removePost(del[1])
            }
            setModal(!modal)
        }
    }

    const removePost = (index) => {
        try{
            const res = axios.delete(process.env.REACT_APP_API_URL + 'api/car/delete', {data: data[index]});
            console.log(res)
        }catch (e){
            alert(e)
        }
        console.log('helo');
        console.log(data[index]);
        setData(data.filter(p => p !== data[index]));
    }

    const change = (index) => {
        setCarBand(data[index].carBrand);
        setRegistrationNumber(data[index].registrationNumber);
        setModal(true);
        setDel([true, index]);
    }

    return (
        <div>

            <Modal.Dialog style={{display: modal ? 'block' : 'none'}}>
                <Modal.Header closeButton onClick={() => {setModal(!modal); setDel([false, null]);}}>
                    <Modal.Title>Добавить Машину</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Марка автомобиля</Form.Label>
                            <Form.Control onChange={(e) => {setCarBand(e.target.value)}} onClick={() => {setmodalCarBand(!modalcarBand);}} type="text" value={carBand} placeholder="" />
                            <div className="select" style={{display: modalcarBand ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setmodalCarBand(!modalcarBand); setCarBand(obj.carBrand); e.preventDefault();}} className="option">{obj.carBrand}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Гос.рег. номер автомобиля</Form.Label>
                            <Form.Control onChange={(e) => {setRegistrationNumber(e.target.value)}} onClick={() => {setmodalRegistrationNumber(!modalregistrationNumber);}} type="text" value={registrationNumber} placeholder="" />
                            <div className="select" style={{display: modalregistrationNumber ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setmodalRegistrationNumber(!modalregistrationNumber); setRegistrationNumber(obj.registrationNumber); e.preventDefault();}} className="option">{obj.registrationNumber}</button>
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

            <div><button onClick={() => {setModal(!modal); setDel([false, null]);}} style={{background: '#212529', color: 'white', marginTop: '-100px', border: 'none', width: '100%'}}>Добавить новую Машину</button></div>



            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Марка автомобиля</th>
                    <th>Гос.рег. номер автомобиля</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((obj, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{obj.carBrand}</td>
                                <td>{obj.registrationNumber}</td>
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

export default Cars;