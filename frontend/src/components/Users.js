import React,  { useState, useEffect } from 'react'

const API = process.env.REACT_APP_API;



export const Users = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ users, setUsers ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch(`${ API }/users`,{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const data = await resp.json();
        console.log(data);
    }

    const getUsers = async () => {
        const resp = await fetch(`${ API }/users`)
        const data = await resp.json();
        setUsers(data);
    }
    

    useEffect(()=> {
        getUsers();
    }, [])


    const deleteUser = async (id) => {
        const resp = await fetch(`${API}/users/${id}`, {
            method : 'DELETE'
        });
        const data = await resp.json();        
        console.log(data);
        await getUsers();
    }


    const updateUser = (id) => {
        console.log(id);
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={ handleSubmit } className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text" onChange={e => setName(e.target.value)} 
                            value={ name }
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />
                    </div>
                    

                    <div className="form-group">
                        <input 
                            type="email" onChange={e => setEmail(e.target.value)} 
                            value={ email }
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" onChange={e => setPassword(e.target.value)} 
                            value={ password }
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        Create
                    </button>

                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                            <button 
                                className="btn btn-secondary btn-sm btn-block"
                                onClick={() => updateUser(user._id)}
                                >
                                Edit
                            </button>
                            <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick={() => deleteUser(user._id)}
                                >
                                Delete
                            </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}