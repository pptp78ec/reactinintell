import React, {useEffect, useState} from "react";
import AuthorsList from "./AuthorList";
import ChaptersList from "./ChapterList";
import Login from "./Login";
import NavBar from "./NavBar";
import Register from "./Register";
import StoriesList from "./StoriesList";
import {Cookies, CookiesProvider} from "react-cookie";
import axios from 'axios';
import ReadChapter from "./ReadChapter";
import UserProfile from "./UserProfile";
import AddStory from "./AddStory";
import AddChapter from "./AddChapter";
import jwtDecode from "jwt-decode";
import CurrentUser from "./CurrentUser";
import EditStory from "./EditStory";
import EditProfile from "./EditProfile";
import EditChapter from "./EditChapter";
import Search from "./Search";
import Top50Stories from "./Top50Stories";
import MainPage from "./MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    let [selectedmenu, select] = useState(null);
    let [transfer, setTransfer] = useState(null);
    let [loggedstatus, setLoggedStatus] = useState(false);
    let [currentuser, setCurrentUser] = useState(null);
    let [page, setPage] = useState(null);
    let [config, setConfig] = useState(null);
    let [server] = useState(`http://localhost:5122`);
    useEffect(() => {
        let tkn = new Cookies().get("token");
        let jwt;
        let conf = {
            headers: {
                Authorization: ""
            }
        }
        try {
            jwt = jwtDecode(tkn);
        } catch (Exception) {
            jwt = null;
        }
        if (jwt !== null) {
            conf["headers"]["Authorization"] = "Bearer " + jwt;
            setConfig(conf)
            if (loggedstatus === false) {
                setLoggedStatus(true);
                if (currentuser === null) {
                    let id = jwt.id;
                    axios.get(server + `/GetAuthor/` + id).then(resp => {
                        let user = resp.data;
                        let currentusr = new CurrentUser(user.id, user.name, user.email, user.password, user.personalData);
                        setCurrentUser(currentusr);
                    });
                }
            } else {
                setLoggedStatus(false);
                new Cookies().remove("token");
            }
        }
    }, [])
    return (
        <>
            <CookiesProvider>
                <NavBar select={select} setTransfer={setTransfer} loggedstatus={loggedstatus}
                        setLoggedStatus={setLoggedStatus} currentuser={currentuser} config={config} server={server}></NavBar>
                <MainPage selectedmenu={selectedmenu} server={server}></MainPage>
                                <StoriesList selectedmenu={selectedmenu} select={select} setTransfer={setTransfer}
                             config={config} server={server}></StoriesList>
                <AuthorsList selectedmenu={selectedmenu} transfer={transfer} config={config} setTransfer={setTransfer} select={select} server={server}></AuthorsList>
                <ChaptersList selectedmenu={selectedmenu} select={select} transfer={transfer}
                              setTransfer={setTransfer} loggedstatus={loggedstatus}
                              currentuser={currentuser} config={config} server={server}></ChaptersList>
                <Register selectedmenu={selectedmenu} select={select} transfer={transfer} config={config} server={server}></Register>
                <ReadChapter selectedmenu={selectedmenu} transfer={transfer} loggedstatus={loggedstatus}
                             setTransfer={setTransfer} select={select} currentuser={currentuser}
                             config={config} server={server}></ReadChapter>
                <Login selectedmenu={selectedmenu} select={select} transfer={transfer} setloggedStatus={setLoggedStatus}
                       setCurrentUser={setCurrentUser} currentuser={currentuser} config={config} server={server}></Login>
                <UserProfile selectedmenu={selectedmenu} transfer={transfer} select={select} setTransfer={setTransfer}
                             loggedstatus={loggedstatus} currentuser={currentuser} config={config} server={server}></UserProfile>
                <AddStory selectedmenu={selectedmenu} select={select} currentuser={currentuser}
                          config={config} server={server}></AddStory>
                <AddChapter selectedmenu={selectedmenu} select={select} currentuser={currentuser} transfer={transfer}
                            setTransfer={setTransfer} config={config} server={server}></AddChapter>
                <EditStory selectedmenu={selectedmenu} select={select} transfer={transfer} setTransfer={setTransfer}
                           config={config} server={server}></EditStory>
                <EditChapter selectedmenu={selectedmenu} select={select} transfer={transfer} setTransfer={setTransfer}
                             config={config} server={server}></EditChapter>
                <EditProfile selectedmenu={selectedmenu} select={select} transfer={transfer}
                             currentuser={currentuser} config={config} server={server}></EditProfile>
                <Search select={select} selectedmenu={selectedmenu} transfer={transfer} setTransfer={setTransfer}
                        config={config} server={server}></Search>
                <Top50Stories setTransfer={setTransfer} selectedmenu={selectedmenu} select={select} setPage={setPage}
                              config={config} server={server}></Top50Stories>
            </CookiesProvider>

        </>

    );
}

export default App;
