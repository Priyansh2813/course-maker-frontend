import { server } from "../store";
import axios from "axios";
export const login=(email,password)=>async(dispatch)=>{
    //with this the user info is stored in redux and can be used in any component of the project.
    try {
        dispatch({type:'loginRequest'});
        const {data} = await axios.post(`${server}/login`,{email,password},{
            headers:{
                'Content-type':"application/json",
            },
            withCredentials:true,
        
        });

        dispatch({type:"loginSuccess",payload:data});
    } catch (error) {
        dispatch({type:"loginFailed",payload:error.response.data.message});
    }
};


export const loadUser=()=>async(dispatch)=>{
    //with this the user info is stored in redux and can be used in any component of the project.
    try {
        dispatch({type:'loadUserRequest'});
        const {data} = await axios.get(`${server}/me`,{
            withCredentials:true,
        });

        dispatch({type:"loadUserSuccess",payload:data.user});
    } catch (error) {
        console.log("reaching here")
        dispatch({type:"loadUserFailed",payload:error.response.data.message});
    }
};

export const logout=()=>async(dispatch)=>{
    //with this the user info is stored in redux and can be used in any component of the project.
    try {
        dispatch({type:'logoutRequest'});
        const {data} = await axios.get(`${server}/logout`,{
            withCredentials:true,
        });

        dispatch({type:"logoutSuccess",payload:data.message});
    } catch (error) {
        dispatch({type:"logoutFailed",payload:error.response.data.message});
    }
};


export const register=(formdata)=>async(dispatch)=>{
    //with this the user info is stored in redux and can be used in any component of the project.
    try {
        dispatch({type:'registerRequest'});
        const {data} = await axios.post(`${server}/register`,formdata,{
            headers:{
                'Content-type':"multipart/formdata",//to take multiple data from form
            },
            withCredentials:true,
        
        });

        dispatch({type:"registerSuccess",payload:data});
    } catch (error) {
        dispatch({type:"registerFailed",payload:error.response.data.message});
    }
};

export const buySubscription=()=>async(dispatch)=>{
    //with this the user info is stored in redux and can be used in any component of the project.
    try {
        dispatch({type:'buySubscriptionRequest'});
        const {data} = await axios.get(`${server}/subscribe`,{
            withCredentials:true,
        });

        dispatch({type:"buySubscriptionSuccess",payload:data.subscriptionId});
    } catch (error) {
        dispatch({type:"buySubscriptionFail",payload:error.response.data.message});
    }
};

export const cancelSubscription=()=>async(dispatch)=>{
    //with this the user info is stored in redux and can be used in any component of the project.
    try {
        dispatch({type:'cancelSubscriptionRequest'});
        const {data} = await axios.delete(`${server}/subscribe/cancel`,{
            withCredentials:true,
        });

        dispatch({type:"cancelSubscriptionSuccess",payload:data.message});
    } catch (error) {
        dispatch({type:"cancelSubscriptionFail",payload:error.response.data.message});
    }
};
