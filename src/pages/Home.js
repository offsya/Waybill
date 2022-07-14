import React, {useEffect, useState} from 'react';
import axios from "axios";
import Select from 'react-select'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Home = () => {


    const [modalshiftNumber, setmodalshiftNumber] = useState(false);
    const [modalOrg, setModalOrg] = useState(false);
    const [modalDriver, setModalDriver] = useState(false);
    const [modalStartRoute, setModalStartRoute] = useState(false);
    const [modalFrom, setModalFrom] = useState(false);
    const [modalTo, setModalTo] = useState(false);


    const [serial, setSerial] = useState(null);
    const [number, setNumber] = useState(null);
    const [shiftNumber, setShiftNumber] = useState(null);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [org, setOrg] = useState(null);
    const [adr, setAdr] = useState(null);
    const [tel, setTel] = useState(null);
    const [carBrand, setCarBrand] = useState(null);
    const [registrationNumber, setRegistrationNumber] = useState(null);
    const [driver, setDriver] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [secondName, setSecondName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [startRoute, setStartRoute] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);


    const [data, setData] = useState([]);


    useEffect(async () => {
        try{
            await axios.get(process.env.REACT_APP_API_URL + 'api/waybill/get/all').then((res) => {
                console.log(res.data[0]);
                console.log('get zapros')
                setData(res.data);
            });
        }catch (e){
            console.log('Trubbles')
        }
    }, [])


    function send(){
        if(shiftNumber == null || org == null || carBrand == null || registrationNumber == null || firstName == null || secondName == null || patronymic == null || driverLicense == null || from == null || to == null || startRoute == null){
            alert("Заполните все поля");
        }else{
            alert('Отправлено')
            try {
                return axios.post(process.env.REACT_APP_API_URL + 'api/waybill/save', {
                    shiftNumber,
                    org,
                    carBrand,
                    registrationNumber,
                    driverLicense,
                    firstName,
                    secondName,
                    patronymic,
                    startRoute,
                    from,
                    to
                }).then((ret) => {
                    console.log(ret.data);
                });
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <div>
            <Modal.Dialog>
            <h1>Путевой Лист</h1>

                <Modal.Body>
                    <Form>
                        {/*<Form.Group className="mb-3">
                            <Form.Label>Серия путевки</Form.Label>
                            <Form.Control onChange={(e) => {setSerial(e.target.value)}} type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Номер путевки</Form.Label>
                            <Form.Control onChange={(e) => {setNumber(e.target.value)}} type="text" placeholder="" />
                        </Form.Group>*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Номер смены (дневная/ночная)</Form.Label>
                            <Form.Control onClick={() => {setmodalshiftNumber(!modalshiftNumber)}} onChange={(e) => {setShiftNumber(e.target.value)}} type="text" value={shiftNumber} placeholder="" />
                            <div className="select" style={{display: modalshiftNumber ? 'flex' : 'none'}}>
                                <button onClick={(e) => {setmodalshiftNumber(!modalshiftNumber); setShiftNumber('Дневная'); e.preventDefault();}} className="option">Дневная</button>
                                <button onClick={(e) => {setmodalshiftNumber(!modalshiftNumber); setShiftNumber('Ночная'); e.preventDefault();}} className="option">Ночная</button>
                            </div>
                        </Form.Group>
                        {/*<Form.Label>Дата формирования путевого листа</Form.Label>
                        <Form.Group style={{display: 'flex'}} className="mb-3 flex">
                            <Form.Control onChange={(e) => {setDay(e.target.value)}} type="number" placeholder="дд" />
                            <Form.Control onChange={(e) => {setMonth(e.target.value)}} type="number" placeholder="мм" />
                            <Form.Control onChange={(e) => {setYear(e.target.value)}} type="number" placeholder="гг" />
                        </Form.Group>*/}
                        <Form.Group className="mb-3">
                            <Form.Label>Наименование Организации</Form.Label>
                            <Form.Control onChange={(e) => {setOrg(e.target.value)}} onClick={() => {setModalOrg(!modalOrg);}} type="text" value={org} placeholder="" />
                            <div className="select" style={{display: modalOrg ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setModalOrg(!modalOrg); setOrg(obj.company.name); e.preventDefault();}} className="option">{obj.company.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                        {/*<Form.Group className="mb-3">
                            <Form.Label>Адресс Организации</Form.Label>
                            <Form.Control onChange={(e) => {setAdr(e.target.value)}} type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Телефон Организации</Form.Label>
                            <Form.Control onChange={(e) => {setTel(e.target.value)}} type="number" placeholder="" />
                        </Form.Group>*/}
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
                                            <button onClick={(e) => {setModalDriver(!modalDriver); setFirstName(obj.driver.firstName); setSecondName(obj.driver.secondName); setPatronymic(obj.driver.patronymic); setDriverLicense(obj.driver.driverLicense); setCarBrand(obj.driver.car.carBrand); setRegistrationNumber(obj.driver.car.registrationNumber); e.preventDefault();}} className="option">{obj.driver.secondName + ' ' + obj.driver.firstName + ' ' + obj.driver.patronymic}</button>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Номер водительского удостоверения</Form.Label>
                            <Form.Control onChange={(e) => {setDriverLicense(e.target.value)}} type="text" value={driverLicense} placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Марка Авто</Form.Label>
                            <Form.Control onChange={(e) => {setCarBrand(e.target.value)}} type="text" value={carBrand} placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Гос.рег. номер автомобиля</Form.Label>
                            <Form.Control onChange={(e) => {setRegistrationNumber(e.target.value)}} type="text" value={registrationNumber} placeholder="" />
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
                            <Form.Control onChange={(e) => {setTo(e.target.value)}} onClick={() => {setModalTo(!modalTo)}} type="text" value={to} placeholder="" />
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
                            <Form.Label>Место стоянки</Form.Label>
                            <Form.Control onChange={(e) => {setStartRoute(e.target.value)}} onClick={() => {setModalStartRoute(!modalStartRoute)}} type="text" value={startRoute} placeholder="" />

                            <div className="select" style={{display: modalStartRoute ? 'flex' : 'none'}}>
                                {
                                    data.map((obj) => {
                                        return(
                                            <button onClick={(e) => {setModalStartRoute(!modalStartRoute); setStartRoute(obj.route.startRoute); e.preventDefault();}} className="option">{obj.route.startRoute}</button>
                                        )
                                    })
                                }
                            </div>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                    <div>
                        <button onClick={() => {send()}} className="but">
                            Отправить
                        </button>
                    </div>
            </Modal.Dialog>
        </div>
    );
};

export default Home;