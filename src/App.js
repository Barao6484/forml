import React, { useState } from 'react';
import logo from "./img/my.jpg";
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    phone: '',
    Subject: '',
    Message: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { Name, Email, phone, Subject, Message } = formData;

    try {
      const response = await fetch("https://api.sheetmonkey.io/form/dZxS4swjd2knDULrmd1hf2", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, Email, phone, Subject, Message })
      });

      if (response.ok) {
        alert('Dados Submetidos com sucesso');
        setFormData({
          Name: '',
          Email: '',
          phone: '',
          Subject: '',
          Message: ''
        });
      } else {
        throw new Error('Erro ao submeter os dados');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao submeter os dados');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Formulario de contacto</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Nome'
          name='Name'
          type='text'
          value={formData.Name}
          onChange={handleChange}
        />
        <input
          placeholder='Email'
          name='Email'
          type='email'
          value={formData.Email}
          onChange={handleChange}
        />
        <input
          placeholder='Telefone'
          name='phone'
          type='tel'
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          placeholder='Assunto'
          name='Subject'
          type='text'
          value={formData.Subject}
          onChange={handleChange}
        />
        <textarea
          placeholder='Mensagem'
          name='Message'
          value={formData.Message}
          onChange={handleChange}
        ></textarea>
        <input className="button" type="submit" />
      </form>
    </div>
  );
}