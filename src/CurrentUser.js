
class CurrentUser {
    constructor(id, name, email, password, personaldata) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.password = password;
        this.personaldata = personaldata;
    }
}

export default CurrentUser;