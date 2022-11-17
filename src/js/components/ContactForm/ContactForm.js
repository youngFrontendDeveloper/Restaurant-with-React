import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../Modal/Modal";

const nameRegExp = /[a-zа-яA-ZА-Я]$/;
const mailRegExp = /^[a-zа-я0-9-\._]+@[a-z0-9-_]+\.[a-z0-9-_]{2,6}/iu;
const messRegExp = /[a-zа-яA-ZА-Я0-9-().,.,::!??]$/;

const schema = yup.object().shape( {
  name: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 15, "В этом поле должно быть не более 15-х символов" ),

  email: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( mailRegExp, "Неправильно заполнен email" ),

  subject: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 3, "В этом поле должно быть не менее 3-х символов" ),

  mess: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( messRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 5, "В этом поле должно быть не менее 5-х символов" ),
} );

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    resolver: yupResolver( schema ),
    mode: "onBlur",
  } );
  const [ isMessageSent, setMessageSent ] = useState( 0 );
  // const [ name, setName ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ subject, setSubject ] = useState( "" );
  const [ mess, setMess ] = useState( "" );

   const onSubmit = ({ name, email, subject, mess }) => {
    console.log( { name, email, subject, mess } );
    setMessageSent( 1 );
    setTimeout( () => {
      setMessageSent( 0 );
      // setName( "" );
      setEmail( "" );
      setSubject( "" );
      setMess( "" );
    }, 3000 );
  };


  return (
    <>
      <form
        className="form"
        action="#"
        method="post"
        onSubmit={ handleSubmit( onSubmit ) }
      >
        <div className="form-col">
          <input
            className={
              errors.name ? "form-item form-item--error text" : "form-item text"
            }
            { ...register( "name" ) }
            type="text"
            placeholder="Name"
            name="name"
            // value={ name }
            // onChange={ (e) => setName( e.target.value ) }
          />
          { errors.name && <p className="form--error">{ errors.name.message }</p> }
          <input
            className={
              errors.email ? "form-item form-item--error text" : "form-item text"
            }
            { ...register( "email" ) }
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ (e) => setEmail( e.target.value ) }
          />
          { errors.email && <p className="form--error">{ errors.email.message }</p> }
          <input
            className="form-item text"
            { ...register( "subject" ) }
            type="text"
            placeholder="Subject"
            name="subject"
            value={ subject }
            onChange={ (e) => setSubject( e.target.value ) }
          />
          { errors.subject && <p className="form--error">{ errors.subject.message }</p> }
        </div>
        <div className="form-col">
        <textarea
          className="form-item form-item--message"
          { ...register( "mess" ) }
          name="mess"
          id="message"
          placeholder="Message"
          value={ mess }
          onChange={ (e) => setMess( e.target.value ) }
        />
          { errors.mess && <p className="form--error">{ errors.mess.message }</p> }
        </div>
        <div className="form-col">
          <button className="button" type="submit">
            Send message
          </button>
        </div>
      </form>
      <Modal isMessageSent={ isMessageSent }/>
    </>
  );
}

export default ContactForm;
