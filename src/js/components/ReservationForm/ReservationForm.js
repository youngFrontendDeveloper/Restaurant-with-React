import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../Modal/Modal";

const nameRegExp = /[a-zа-яA-ZА-Я]$/;
const phoneRegExp = /[\+7][0-9]{10}$/;
const mailRegExp = /^[a-zа-я0-9-\._]+@[a-z0-9-_]+\.[a-z0-9-_]{2,6}/iu;

const schema = yup.object().shape( {
  firstName: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 15, "В этом поле должно быть не более 15-х символов" ),

  lastName: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 20, "В этом поле должно быть не более 20-х символов" ),

  state: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" ),

  reservationDate: yup.string().required( "Пожалуйста, заполните это поле" ),

  phone: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( phoneRegExp, "Телефон должен соответствовать виду: +79172546925" ),

  guestNumber: yup
    .number()
    .required( "Пожалуйста, заполните это поле" )
    .positive( "Цифры должны быть только положительными" )
    .integer( "Цифры должны быть целыми" ),

  email: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( mailRegExp, "Неправильно заполнен email" ),

  subject: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 3, "В этом поле должно быть не менее 3-х символов" ),
} );

function ReservationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    resolver: yupResolver( schema ),
    mode: "onBlur",
  } );
  const [ isMessageSent, setMessageSent ] = useState( 0 );
  const [ firstName, setFirstName ] = useState( "" );

  const onSubmit = (data) => {
    console.log( data );
    setMessageSent( 1 );
    setTimeout( () => {
      setMessageSent( 0 );
      setFirstName( "" );
    }, 3000 );
  };

  return (
    <>
      <form
        className="reservation__form form form--size--s"
        action="#"
        method="post"
        onSubmit={ handleSubmit( onSubmit ) }
      >
        <div className="form-col form-col--size--s">
          <input
            className={
              errors.firstName
                ? "form-item form-item--error text"
                : "form-item text"
            }
            { ...register( "firstName" ) }
            type="text"
            placeholder="First Name"
            name="firstName"
            value={ firstName }
            onChange={ (e) => setFirstName( e.target.value ) }
          />
          { errors.firstName && (
            <p className="form--error">{ errors.firstName.message }.</p>
          ) }

          <input
            className={
              errors.lastName
                ? "form-item form-item--error text"
                : "form-item text"
            }
            { ...register( "lastName" ) }
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          { errors.lastName && (
            <p className="form--error">{ errors.lastName.message }</p>
          ) }

          <input
            className={
              errors.state ? "form-item form-item--error text" : "form-item text"
            }
            { ...register( "state" ) }
            type="text"
            placeholder="State"
            name="state"
          />
          { errors.state && <p className="form--error">{ errors.state.message }</p> }

          <input
            className={
              errors.reservationDate
                ? "form-item form-item--error text"
                : "form-item text"
            }
            { ...register( "reservationDate" ) }
            type="date"
            placeholder="Reservation Date"
            name="reservationDate"
          />
          { errors.reservationDate && (
            <p className="form--error">{ errors.reservationDate.message }</p>
          ) }
        </div>

        <div className="form-col form-col--size--s">
          <input
            className={
              errors.phone ? "form-item form-item--error text" : "form-item text"
            }
            { ...register( "phone" ) }
            type="tel"
            placeholder="Phone"
            name="phone"
          />
          { errors.phone && <p className="form--error">{ errors.phone.message }</p> }
          <input
            className={
              errors.guestNumber
                ? "form-item form-item--error text"
                : "form-item text"
            }
            { ...register( "guestNumber" ) }
            type="number"
            placeholder="Guest number"
            name="guestNumber"
          />
          { errors.guestNumber && (
            <p className="form--error">{ errors.guestNumber.message }</p>
          ) }
          <input
            className={
              errors.email ? "form-item form-item--error text" : "form-item text"
            }
            type="email"
            { ...register( "email" ) }
            placeholder="Email"
            name="email"
          />
          { errors.email && <p className="form--error">{ errors.email.message }</p> }
          <input
            className={
              errors.subject
                ? "form-item form-item--error text"
                : "form-item text"
            }
            { ...register(
              "subject" ) }
            type="text"
            placeholder="Subject"
            name="subject"
          />
          { errors.subject && (
            <p className="form--error">{ errors.subject.message }</p>
          ) }
        </div>
        <div className="form-col">
          <button className="button" type="submit">
            Reserve
          </button>
        </div>
      </form>
      <Modal isMessageSent={ isMessageSent }/>
    </>
  );
}

export default ReservationForm;
