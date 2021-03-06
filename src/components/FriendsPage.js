import React, { useState, useEffect } from "react";
import FriendCard from "./FriendCard";

function FriendsPage(props) {

    const [cardLimit, setCardLimit] = useState(25);
    const [users, setUsers] = useState([]);
    const [pageSelect, setPageSelect] = useState("All");
    
    async function getAllUsers() {
        try {
            let res = await fetch("/users", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type": "all"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUsers(resJson);

            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    async function getFriends() {
        try {
            let res = await fetch("/users", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type": "friends"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUsers(resJson.friends);

            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    async function getFriendRequests() {
        try {
            let res = await fetch("/users", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type": "friend-requests"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUsers(resJson.recievedRequestFriends);

            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    function handleNavClick (e){
        setPageSelect(e.target.innerHTML);
    }

    function populateUsers(){
        if (pageSelect == "All"){
            getAllUsers();
        }
        else if (pageSelect == "Friends"){
            getFriends();
        }
        else if (pageSelect == "Friend Requests"){
            getFriendRequests();
        }
    }

    useEffect(() => {
        populateUsers();
    }, [pageSelect])

    function incrementCardLimit() {
        const prevLimit = cardLimit;
        setCardLimit(prevLimit + 5);
    }

    if (!props.userInfo){
        return (null);
    }

    return (
        <div className="friends-page">
            <div className="friends-container">
                <h2> Discover</h2>
                <div className="friends-nav-bar">
                    <button onClick={handleNavClick} 
                        className={pageSelect=="All" ? "selected" : null}>All
                    </button>
                    <button onClick={handleNavClick} 
                        className={pageSelect=="Friends" ? "selected" : null}>Friends
                    </button>
                    <button onClick={handleNavClick} 
                        className={pageSelect=="Friend Requests" ? "selected" : null}>Friend Requests
                    </button>
                </div>
                <div className="friends-grid">
                    {users.map((e) => <FriendCard key={e._id} friend={e} 
                    userInfo={props.userInfo}></FriendCard>)}
                </div>
            <button onClick={incrementCardLimit}>View More</button>
            </div>
        </div>
    );
}

export default FriendsPage;
