import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Routes = () => {

    const [startRoute, setStartRoute] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);


    const [modalstartRoute, setmodalStartRoute] = useState(false);
    const [modalfrom, setmodalFrom] = useState(false);
    const [modalto, setmodalTo] = useState(false);

    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API_URL + 'api/route/get/all').then((res) => {
            console.log(res.data[0]);
            setData(res.data);
        });
    }, [])

    const [del, setDel] = useState([false, null])

    const send = async function() {
        try{
            const res = await axios.post(process.env.REACT_APP_API_URL + 'api/route/save', {startRoute, from, to})
            console.log(res)
        }catch (e){
            console.log(e)
        }

        data.push({'startRoute':startRoute, 'from':from, 'to': to})
        if(del[0]){
            removePost(del[1])
        }
        setModal(!modal)
    }

    const removePost = (index) => {
        if (startRoute == null || from == null || to == null) {
            alert("Заполните все поля");
        } else {
            try {
                const res = axios.delete(process.env.REACT_APP_API_URL + 'api/route/delete', {data: data[index]});
                console.log(res)
            } catch (e) {
                alert(e)
            }
            console.log('helo');
            console.log(data[index]);
            setData(data.filter(p => p !== data[index]));
        }
    }

    const change = (index) => {
        setStartRoute(data[index].startRoute)
        setFrom(data[index].from);
        setTo(data[index].to);
        setModal(true);
        setDel([true, index]);
    }

    return (
        <div>

            <Modal.Dialog style={{display: modal ? 'block' : 'none'}}>
                <Modal.Header closeButton onClick={() => {setModal(!modal); setDel([false, null]);}}>
                    <Modal.Title>Добавить Маршрут</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Начало маршрута</Form.Label>
                            <Form.Control onChange={(e) => {setFrom(e.target.value)}} onClick={() => {setmodalFrom(!modalfrom);}} type="text" value={from} placeholder="" />
                            <div className="select" style={{display: modalfrom ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setmodalFrom(!modalfrom); setFrom(obj.from); e.preventDefault();}} className="option">{obj.from}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Конец маршрута</Form.Label>
                            <Form.Control onChange={(e) => {setTo(e.target.value)}} onClick={() => {setmodalTo(!modalto);}} type="text" value={to} placeholder="" />
                            <div className="select" style={{display: modalto ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setmodalTo(!modalto); setTo(obj.to); e.preventDefault();}} className="option">{obj.to}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Место стоянки</Form.Label>
                            <Form.Control onChange={(e) => {setStartRoute(e.target.value)}} onClick={() => {setmodalStartRoute(!modalstartRoute);}} type="text" value={startRoute} placeholder="" />
                            <div className="select" style={{display: modalstartRoute ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setmodalStartRoute(!modalstartRoute); setStartRoute(obj.startRoute); e.preventDefault();}} className="option">{obj.startRoute}</button>
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

            <div><button onClick={() => {setModal(!modal); setDel([false, null]);}} style={{background: '#212529', color: 'white', marginTop: '-100px', border: 'none', width: '100%'}}>Добавить Новый Маршрут</button></div>



            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Место стоянки</th>
                    <th>Начало маршрута</th>
                    <th>Конец маршрута</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((obj, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{obj.startRoute}</td>
                                <td>{obj.from}</td>
                                <td>{obj.to}</td>
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

export default Routes;