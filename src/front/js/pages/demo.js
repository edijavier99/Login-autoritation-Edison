import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword ]= useState("")
	const navigate = useNavigate();


	const onSubmit = () =>{
		
			if(email === '') {
				alert(' Email is Empty!')
			} else if(password === ''){
				alert('Password is empty!')
			} else {
				fetch(`https://edijavier99-friendly-fishstick-g9g447xxw47fp9j-3001.preview.app.github.dev/api/login`, { 
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }) 
			})
			.then((res) => res.json())
			.then((result) => {
				console.log('Token is Here =====>', result);
				localStorage.setItem("jwt-token", result.token);
				alert('You are logged in!')
				navigate("/")
			}).catch((err) => {
				console.log(err);
			})
			}
	}

	return (
		<div className="container">
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">Email address</label>
						<input 
						type="email" 
						class="form-control" 
						id="exampleInputEmail1" 
						aria-describedby="emailHelp"
						value={email}
						onChange={(e) => setEmail(e.target.value)}

						/>
						<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Password</label>
						<input 
						type="password" 
						class="form-control" 
						id="exampleInputPassword1"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					
					<button onClick={()=>{onSubmit()}}>SUBMIT</button>
		</div>
	);
};
