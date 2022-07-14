import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const Driver = () => {
    const [firstName, setFName] = useState(null);
    const [secondName, setLName] = useState(null);
    const [patronymic, setOtch] = useState(null);
    const [driverLicense, setYdost] = useState(null);
    const [carBrand, setMarka] = useState(null);
    const [registrationNumber, setGosNomer] = useState(null);



    const [modalfirstName, setmodalFName] = useState(false);
    const [modalsecondName, setmodalLName] = useState(false);
    const [modalpatronymic, setmodalOtch] = useState(false);
    const [modaldriverLicense, setmodalYdost] = useState(false);
    const [modalcarBrand, setmodalMarka] = useState(false);
    const [modalregistrationNumber, setmodalGosNomer] = useState(false);


    const [modal, setModal] = useState(false);
    const [data, setData] = useState([
        /*{'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}},
        {'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}},
        {'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}},
        {'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}},
        {'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}},
        {'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}},
        {'firstName':firstName, 'secondName':secondName, 'patronymic': patronymic, 'driverLicense': driverLicense, 'car':{'carBrand': carBrand, 'registrationNumber': registrationNumber}}
*/
    ]);


    useEffect(async () => {
            await axios.get(process.env.REACT_APP_API_URL + 'api/driver/get/all').then((res) => {
                console.log(res.data[0]);
                setData(res.data);
            });


    }, [])


    const [del, setDel] = useState([false, null])

    const send = async function() {

        if(firstName == null || secondName == null || patronymic == null || driverLicense == null || carBrand == null || registrationNumber == null){
            alert("Заполните все поля");
        }else {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL + 'api/driver/save', {
                    firstName,
                    secondName,
                    patronymic,
                    driverLicense,
                    carBrand,
                    registrationNumber
                })
                console.log(res)
            } catch (e) {
                console.log(e)
            }

            data.push({
                'firstName': firstName,
                'secondName': secondName,
                'patronymic': patronymic,
                'driverLicense': driverLicense,
                'car': {'carBrand': carBrand, 'registrationNumber': registrationNumber}
            })
            if(del[0]){
                removePost(del[1])
            }
            setModal(!modal)
        }
    }

    const removePost = (index) => {
        try{
            const res = axios.delete(process.env.REACT_APP_API_URL + 'api/driver/delete', {data: data[index]});
            console.log(res)
        }catch (e){
            alert(e)
        }
        console.log('helo');
        console.log(data[index]);
        setData(data.filter(p => p !== data[index]));
    }


    const change = (index) => {
        setFName(data[index].firstName);
        setLName(data[index].secondName);
        setOtch(data[index].patronymic);
        setYdost(data[index].driverLicense);
        setMarka(data[index].car.carBrand);
        setGosNomer(data[index].car.registrationNumber);
        setModal(true);
        setDel([true, index]);
    }


    return (


    <div>

        <Modal.Dialog style={{display: modal ? 'block' : 'none'}}>
            <Modal.Header closeButton onClick={() => {setModal(!modal); setDel([false, null]);}}>
                <Modal.Title>Добавить Водителя</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя водителя</Form.Label>
                        <Form.Control onChange={(e) => {setFName(e.target.value)}} onClick={() => {setmodalFName(!modalfirstName);}} type="text" value={firstName} placeholder="" />
                        <div className="select" style={{display: modalfirstName ? 'flex' : 'none'}}>
                            {
                                data.map((obj) => {
                                    return(
                                        <button onClick={(e) => {setmodalFName(!modalfirstName); setFName(obj.firstName); e.preventDefault();}} className="option">{obj.firstName}</button>
                                    )
                                })
                            }
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия водителя</Form.Label>

                        <Form.Control onChange={(e) => {setLName(e.target.value)}} onClick={() => {setmodalLName(!modalsecondName);}} type="text" value={secondName} placeholder="" />
                        <div className="select" style={{display: modalsecondName ? 'flex' : 'none'}}>
                            {
                                data.map((obj) => {
                                    return(
                                        <button onClick={(e) => {setmodalLName(!modalsecondName); setLName(obj.secondName); e.preventDefault();}} className="option">{obj.secondName}</button>
                                    )
                                })
                            }
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Отчество водителя</Form.Label>
                        <Form.Control onChange={(e) => {setOtch(e.target.value)}} onClick={() => {setmodalOtch(!modalpatronymic);}} type="text" value={patronymic} placeholder="" />
                        <div className="select" style={{display: modalpatronymic ? 'flex' : 'none'}}>
                            {
                                data.map((obj) => {
                                    return(
                                        <button onClick={(e) => {setmodalOtch(!modalpatronymic); setOtch(obj.patronymic); e.preventDefault();}} className="option">{obj.patronymic}</button>
                                    )
                                })
                            }
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Номер водительского удостоверения</Form.Label>
                        <Form.Control onChange={(e) => {setYdost(e.target.value)}} onClick={() => {setmodalYdost(!modaldriverLicense);}} type="text" value={driverLicense} placeholder="" />
                        <div className="select" style={{display: modaldriverLicense ? 'flex' : 'none'}}>
                            {
                                data.map((obj) => {
                                    return(
                                        <button onClick={(e) => {setmodalYdost(!modaldriverLicense); setYdost(obj.driverLicense); e.preventDefault();}} className="option">{obj.driverLicense}</button>
                                    )
                                })
                            }
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Гос.рег. номер автомобиля</Form.Label>
                        <Form.Control onChange={(e) => {setGosNomer(e.target.value)}} onClick={() => {setmodalGosNomer(!modalregistrationNumber);}} type="text" value={registrationNumber} placeholder="" />
                        <div className="select" style={{display: modalregistrationNumber ? 'flex' : 'none'}}>
                            {
                                data.map((obj) => {
                                    return(
                                        <button onClick={(e) => {setmodalGosNomer(!modalregistrationNumber); setGosNomer(obj.car.registrationNumber); setMarka(obj.car.carBrand); e.preventDefault();}} className="option">{obj.car.registrationNumber}</button>
                                    )
                                })
                            }
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Марка закреплённого авто.</Form.Label>
                        <Form.Control onChange={(e) => {setMarka(e.target.value)}} onClick={() => {setmodalMarka(!modalcarBrand);}} type="text" value={carBrand} placeholder="" />
                        <div className="select" style={{display: modalcarBrand ? 'flex' : 'none'}}>
                            {
                                data.map((obj) => {
                                    return(
                                        <button onClick={(e) => {setmodalMarka(!modalcarBrand); setMarka(obj.car.carBrand); e.preventDefault();}} className="option">{obj.car.carBrand}</button>
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

        <div><button onClick={() => {setModal(!modal); setDel([false, null]);}} style={{background: '#212529', color: 'white', marginTop: '-100px', border: 'none', width: '100%'}}>Добавить нового Водителя</button></div>
        <Table style={{zIndex: '1'}} striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Фамилия водителя</th>
                    <th>Имя водителя</th>
                    <th>Отчество водителя</th>
                    <th>Номер водительского удостоверения</th>
                    <th>Автомобиль закрепленый за водителем</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((obj, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{obj.secondName}</td>
                                <td>{obj.firstName}</td>
                                <td>{obj.patronymic}</td>
                                <td>{obj.driverLicense}</td>
                                <td>{obj.car.carBrand + '(' + obj.car.registrationNumber +')'}</td>
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

export default Driver;