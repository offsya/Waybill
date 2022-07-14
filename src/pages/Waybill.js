import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const Waybill = () => {


    const [modalshiftNumber, setmodalshiftNumber] = useState(false);
    const [modalOrg, setModalOrg] = useState(false);
    const [modalDriver, setModalDriver] = useState(false);
    const [modalFrom, setModalFrom] = useState(false);
    const [modalTo, setModalTo] = useState(false);

    const [series, setSeries] = useState(null);
    const [number, setNumber] = useState(null);
    const [shiftNumber, setShiftNumber] = useState(null);
    const [createDate, setCreateDate] = useState(null);
    const [secondName, setSecondName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [name, setName] = useState(null)

    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);

    useEffect(async () => {
        try{
            await axios.get(process.env.REACT_APP_API_URL + 'api/waybill/get/all').then((res) => {
                console.log(res.data[0]);
                setData(res.data);
            });
        }catch (e){
            console.log('Trubbles')
        }
    }, [])


    const [del, setDel] = useState([false, null])

    const send = async function() {
        if (series == null || number == null || shiftNumber == null || createDate == null || firstName == null || secondName == null || patronymic == null || from == null || to == null || name == null) {
            alert("Заполните все поля");
        } else {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL + 'api/waybill/save', {
                    series,
                    number,
                    shiftNumber,
                    createDate,
                    firstName,
                    secondName,
                    patronymic,
                    from,
                    to,
                    name
                })
                console.log(res)
            } catch (e) {
                console.log(e)
            }


            data.push({
                'series': series,
                'number': number,
                'shiftNumber': shiftNumber,
                'createDate': createDate,
                'driver': {'firstName': firstName, 'secondName': secondName, 'patronymic': patronymic},
                'route': {'from': from, 'to': to},
                'company': {'name': name}
            })
            if(del[0]){
                removePost(del[1])
            }
            setModal(!modal)
        }
    }


    const removePost = (index) => {
        try{
            const res = axios.delete(process.env.REACT_APP_API_URL + 'api/waybill/delete', {data: data[index]});
            console.log(res)
        }catch (e){
            alert(e)
        }
        console.log('helo');
        console.log(data[index]);
        setData(data.filter(p => p !== data[index]));
    }

    const change = (index) => {
        setSeries(data[index].series);
        setNumber(data[index].number);
        setShiftNumber(data[index].shiftNumber);
        setCreateDate(data[index].createDate);
        setFirstName(data[index].driver.firstName);
        setSecondName(data[index].driver.secondName);
        setPatronymic(data[index].driver.patronymic);
        setName(data[index].company.name);
        setFrom(data[index].route.from);
        setTo(data[index].route.to);
        setModal(true);
        setDel([true, index]);
    }


    return (
        <div>
            <Modal.Dialog style={{display: modal ? 'block' : 'none'}}>
                <Modal.Header closeButton onClick={() => {setModal(!modal); setDel([false, null]);}}>
                    <Modal.Title>Добавить Накладную</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Серия путевки</Form.Label>
                            <Form.Control onChange={(e) => {setSeries(e.target.value)}} type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Номер путевки</Form.Label>
                            <Form.Control onChange={(e) => {setNumber(e.target.value)}} type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Номер смены (дневная/ночная)</Form.Label>
                            <Form.Control onClick={() => {setmodalshiftNumber(!modalshiftNumber)}} onChange={(e) => {setShiftNumber(e.target.value)}} type="text" value={shiftNumber} placeholder="" />
                            <div className="select" style={{display: modalshiftNumber ? 'flex' : 'none'}}>
                                <button onClick={(e) => {setmodalshiftNumber(!modalshiftNumber); setShiftNumber('Дневная'); e.preventDefault();}} className="option">Дневная</button>
                                <button onClick={(e) => {setmodalshiftNumber(!modalshiftNumber); setShiftNumber('Ночная'); e.preventDefault();}} className="option">Ночная</button>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Дата формирования путевого листа</Form.Label>
                            <Form.Control onChange={(e) => {setCreateDate(e.target.value)}} type="text" placeholder="" />
                        </Form.Group>

                        <Form.Label>Данные Водителя</Form.Label>
                        <Form.Group className="mb-3">

                            <div style={{display: 'flex'}}>
                                <Form.Control onChange={(e) => {setSecondName(e.target.value)}} onClick={() => {setModalDriver(!modalDriver);}} type="text" value={secondName} placeholder="Фамилия" />
                                <Form.Control onChange={(e) => {setFirstName(e.target.value)}} onClick={() => {setModalDriver(!modalDriver);}} type="text" value={firstName} placeholder="Имя" />
                                <Form.Control onChange={(e) => {setPatronymic(e.target.value)}} onClick={() => {setModalDriver(!modalDriver);}} type="text" value={patronymic} placeholder="Отчество" />

                            </div>
                            <div className="select" style={{display: modalDriver ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setModalDriver(!modalDriver); setFirstName(obj.driver.firstName); setSecondName(obj.driver.secondName); setPatronymic(obj.driver.patronymic); e.preventDefault();}} className="option">{obj.driver.secondName + ' ' + obj.driver.firstName + ' ' + obj.driver.patronymic}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Начало маршрута</Form.Label>
                            <Form.Control onChange={(e) => {setFrom(e.target.value)}} onClick={() => {setModalFrom(!modalFrom);}} type="text" value={from} placeholder="" />

                            <div className="select" style={{display: modalFrom ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setModalFrom(!modalFrom); setFrom(obj.route.from); e.preventDefault();}} className="option">{obj.route.from}</button>
                                        )
                                    })
                                }
                            </div>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Конец маршрута</Form.Label>
                            <Form.Control onChange={(e) => {setTo(e.target.value)}} onClick={() => {setModalTo(!modalTo);}} type="text" value={to} placeholder="" />
                            <div className="select" style={{display: modalTo ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setModalTo(!modalTo); setTo(obj.route.to); e.preventDefault();}} className="option">{obj.route.to}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Наименование Организации</Form.Label>
                            <Form.Control onChange={(e) => {setName(e.target.value)}} onClick={() => {setModalOrg(!modalOrg);}} type="text" value={name} placeholder="" />
                            <div className="select" style={{display: modalOrg ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setModalOrg(!modalOrg); setName(obj.company.name); e.preventDefault();}} className="option">{obj.company.name}</button>
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

            <div><button onClick={() => {setModal(!modal); setDel([false, null]);}} style={{background: '#212529', color: 'white', marginTop: '-100px', border: 'none', width: '100%'}}>Добавить новую Накладную</button></div>


            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Серия путевки</th>
                    <th>Номер путевки</th>
                    <th>Номер смены (дневная/ночная)</th>
                    <th>Дата формирования путевого листа</th>
                    <th>Водитель указанный в путевом листе</th>
                    <th>Маршрут указанный в путевом листе</th>
                    <th>Компания указаная в путевом листе</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((obj, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{obj.series}</td>
                                <td>{obj.number}</td>
                                <td>{obj.shiftNumber}</td>
                                <td>{obj.createDate}</td>
                                <td>{obj.driver.secondName + ' ' + obj.driver.firstName + ' ' + obj.driver.patronymic}</td>
                                <td>{obj.route.from + '-' + obj.route.to}</td>
                                <td>{obj.company.name}</td>
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

export default Waybill;